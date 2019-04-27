import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import withDynamicImport from 'hocs/withDynamicImport';

import {
  Answers,
  getToolboxBlocks,
  getToolboxCategories,
  workspaceConfiguration,
  getAnswersFromWorkspace,
} from './BlocklyUtils';

import * as Blocks from '../Blocks';
import * as OldBlocks from '../AldarDestination/Blocks';

const getStateFromProps = (props, isInitial) => {
  const { answers } = props;
  if (!props.Blockly) return { toolboxConfiguration: {} };
  const toolboxCategories = getToolboxCategories(props.toolboxXML);
  const toolboxBlocks = getToolboxBlocks(props.toolboxXML);
  const hasCategory = Boolean(toolboxCategories.length);
  const answersBlocks = (props.isOld ? OldBlocks : Blocks)
    .getAnswersBlock(answers, props.Blockly) || {};
  const answersFromWorkspace = isInitial
    ? getAnswersFromWorkspace(props.workspaceXML)
    : [];

  if (answersFromWorkspace.length > 0 && isInitial) {
    answersFromWorkspace.map(({ type }) => {
      const nextIndex = Answers.getNextIndex();
      (props.isOld ? OldBlocks : Blocks)
        .generateAnswer({ key: type, label: `Answer${nextIndex}`, Blockly: props.Blockly });
      Answers.answer = { id: [type], value: '' };
      return null;
    });
  }

  const toolboxConfiguration = hasCategory
    ? {
      toolboxCategories: [
        ...(Array.isArray(toolboxCategories)) ? toolboxCategories : [],
        {
          name: 'AskAnswers',
          blocks: [
            ...(Array.isArray(answersBlocks)) ? answersBlocks : [],
            ...(Array.isArray(answersFromWorkspace)) ? answersFromWorkspace : [],
          ],
        },
      ],
    }
    : {
      toolboxBlocks: [
        ...(Array.isArray(toolboxBlocks) ? toolboxBlocks : []),
        ...(Array.isArray(answersBlocks) ? answersBlocks : []),
        ...(Array.isArray(answersFromWorkspace) ? answersFromWorkspace : []),
      ],
    };

  return { toolboxConfiguration };
};

const initBlocks = (customBlocks, isOld) => customBlocks
&& customBlocks.map((customBlock) => {
  (isOld ? OldBlocks : Blocks)[customBlock](window.Blockly);
  return null;
});

const initObjectsBlocks = (objectsBlocks, isOld) => objectsBlocks
&& (isOld ? OldBlocks : Blocks).initObjects(objectsBlocks, window.Blockly);

const initCustomBlocks = ({
  customBlocks, objectsBlocks, isOld,
}) => {
  if (customBlocks) initBlocks(customBlocks, isOld);
  if (objectsBlocks) initObjectsBlocks(objectsBlocks, isOld);
};

class BlocklyDrawer extends PureComponent {
  static propTypes = {
    answers: PropTypes.shape({}),
    customBlocks: PropTypes.arrayOf(PropTypes.string).isRequired,
    objectBlocks: PropTypes.arrayOf(PropTypes.shape({})),
    onEdit: PropTypes.func.isRequired,
    workspaceXML: PropTypes.string,
    isOld: PropTypes.bool,
  }

  static defaultProps = {
    answers: [],
    objectBlocks: null,
    workspaceXML: '',
    isOld: false,
  };

  state = getStateFromProps(this.props, true);

  componentWillMount() {
    const { customBlocks, objectBlocks, isOld } = this.props;
    if (!this.props.Blockly) return;
    window.Blockly = this.props.Blockly;
    initCustomBlocks({
      customBlocks, objectsBlocks: objectBlocks, isOld, props: this.props,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.Blockly && nextProps.Blockly) {
      window.Blockly = nextProps.Blockly;
      const { customBlocks, objectBlocks, isOld } = this.props;

      initCustomBlocks({
        customBlocks, objectsBlocks: objectBlocks, isOld, props: nextProps,
      });
    }
    const { answers } = nextProps;
    const { answers: prevAnswers } = this.props;
    const answersKeys = Object.keys(answers);
    const prevAnswersKeys = Object.keys(prevAnswers);

    if (answersKeys.length) {
      const isAnswersEqual = Boolean(answersKeys
        .filter(answer => prevAnswersKeys.includes(answer)).length);

      if (!isAnswersEqual) {
        (this.props.isOld ? OldBlocks : Blocks)
          .getAnswersBlock(answersKeys, this.props.Blockly);
      }
    }
    const newState = getStateFromProps(nextProps, !this.props.Blockly && nextProps.Blockly);
    this.setState(newState);
  }

  componentWillUnmount() {
    this.workspace = null;
  }

  subscribeToWorkspace = (workspace) => {
    this.workspace = workspace;
    workspace.addChangeListener(this.handleWorkspaceChange);
  };

  workspace = null;

  handleWorkspaceChange = (event) => {
    const { type, blockId } = event;
    const block = this.workspace.getBlockById(blockId) || { type: '' };

    if (block.type === 'ask') {
      this.handleAnswerChange({ blockId, type });
    }

    if (this.props.Blockly.Events.BLOCK_DELETE === type) {
      const { ids: deletedBlocksIds } = event;
      deletedBlocksIds.map((deletedBlockId) => {
        if (Answers.getAnswerById(deletedBlockId)) {
          this.removeAnswerVariable(deletedBlockId);
        }
        return null;
      });
    }
  };

  handleAnswerChange = ({ blockId, type }) => {
    if (this.props.Blockly.Events.BLOCK_CREATE === type) {
      this.createNewAnswerVariable({ blockId });
    }
  };

  /* Answer generation */
  createNewAnswerVariable = ({ blockId }) => {
    if (this.props.Blockly.Blocks[blockId] && this.props.Blockly.JavaScript[blockId]) return;
    const nextIndex = Answers.getNextIndex();
    (this.props.isOld ? OldBlocks : Blocks)
      .generateAnswer({ key: blockId, label: `Answer${nextIndex}`, Blockly: this.props.Blockly });
    Answers.answer = { id: [blockId], value: '' };
  };

  removeAnswerVariable = (blockId) => {
    Answers.removeChangeById(blockId);
    if (!this.props.Blockly) return;
    if (!this.props.Blockly.Blocks) return;
    if (!this.props.Blockly.Blocks.length) return;

    delete this.props.Blockly.Blocks[blockId];
    delete this.props.Blockly.JavaScript[blockId];
  };

  workspaceDidChange = (workspace) => {
    try {
      if (!this.workspace) {
        this.subscribeToWorkspace(workspace);
      }

      const code = this.props.Blockly.JavaScript.workspaceToCode(workspace);
      this.props.onEdit(code);
    } catch (err) {
      console.warn('Unhandled error: ', err);
    }
  }

  render() {
    const { ReactBlocklyComponent } = this.props;

    return this.state.toolboxConfiguration
      && Object.keys(this.state.toolboxConfiguration).length !== 0 && ReactBlocklyComponent
      ? (
        <ReactBlocklyComponent.BlocklyEditor
          {...this.state.toolboxConfiguration}
          workspaceConfiguration={workspaceConfiguration}
          initialXml={this.props.workspaceXML}
          wrapperDivClassName="fill-height"
          workspaceDidChange={this.workspaceDidChange}
        />
      ) : null;
  }
}

const withDynamicImports = withDynamicImport([
  {
    importThread: import('react-blockly-component'),
    parse: 'default',
    name: 'ReactBlocklyComponent',
  },
  { importThread: import('node-blockly/browser'), name: 'Blockly', parse: 'default' },
]);

export default withDynamicImports(BlocklyDrawer);
