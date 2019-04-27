import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactBlocklyComponent from 'react-blockly-component';
import Blockly from 'node-blockly/browser';
import * as Blocks from "../Blocks";
import * as OldBlocks from "./OldBlocks";

import {
  Answers,
  getToolboxBlocks,
  getToolboxCategories,
  workspaceConfiguration,
  getAnswersFromWorkspace
} from '../Blockly/BlocklyUtils';

window.Blockly = Blockly;

const { BlocklyEditor } = ReactBlocklyComponent;

const getStateFromProps = (props, isInitial) => {
  const toolboxCategories = getToolboxCategories(props.toolboxXML);
  const toolboxBlocks = getToolboxBlocks(props.toolboxXML);
  const hasCategory = Boolean(toolboxCategories.length);
  const answersFromWorkspace = isInitial
    ? getAnswersFromWorkspace(props.workspaceXML)
    : [];

  if (answersFromWorkspace.length > 0 && isInitial) {
    Answers.clearChanges();
    answersFromWorkspace.map(({ type }) => {
      const nextIndex = Answers.getNextIndex();
      (props.isOld ? OldBlocks : Blocks).generateAnswer({ key: type, label: `Answer${nextIndex}`, Blockly});
      Answers.answer = { id: [type], value: "" };
      return null;
    });
  }

  const allAnswers = Object.keys(Answers.answers).map(answerKey => ({ type: answerKey }));

  const toolboxConfiguration = hasCategory
    ? {
        toolboxCategories: [
          ...(Array.isArray(toolboxCategories)) ? toolboxCategories : [],
          {
            name: 'AskAnswers',
            blocks: [
              ...(Array.isArray(allAnswers)) ? allAnswers : []
            ]
          }
        ]
      }
    : {
        toolboxBlocks: [
          ...(Array.isArray(toolboxBlocks) ? toolboxBlocks : []),
          ...(Array.isArray(allAnswers)) ? allAnswers : []
        ]
    };

  return {toolboxConfiguration};
};

const initBlocks = (customBlocks, isOld) =>
  customBlocks &&
  customBlocks.map(customBlock => {
    (isOld ? OldBlocks : Blocks)[customBlock](window.Blockly);
    return null;
  });

const initObjectsBlocks = (objectsBlocks, isOld) =>
  objectsBlocks && (isOld ? OldBlocks : Blocks).initObjects(objectsBlocks, window.Blockly);

const initCustomBlocks = ({customBlocks, objectsBlocks, isOld}) => {
  if (customBlocks) initBlocks(customBlocks, isOld);
  if (objectsBlocks) initObjectsBlocks(initObjectsBlocks, isOld);
};

class BlocklyDrawer extends PureComponent {
  static propTypes = {
    answers: PropTypes.shape({}),
    customBlocks: PropTypes.arrayOf(PropTypes.string).isRequired,
    objectBlocks: PropTypes.arrayOf(PropTypes.shape({})),
    onEdit: PropTypes.func.isRequired,
    workspaceXML: PropTypes.string,
    isOld: PropTypes.bool
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
    initCustomBlocks({ customBlocks, objectBlocks, isOld });
  }

  componentWillReceiveProps(nextProps) {
    const { answers } = nextProps;
    const {answers: prevAnswers} = this.props;
    const answersKeys = Object.keys(answers);
    const prevAnswersKeys = Object.keys(prevAnswers);

    if (answersKeys.length) {
      const isAnswersEqual = Boolean(answersKeys.filter(answer => prevAnswersKeys.includes(answer)).length);

      if (!isAnswersEqual) {
        (this.props.isOld ? OldBlocks : Blocks).getAnswersBlock(answersKeys, Blockly);
      }
    }
    const newState = getStateFromProps(nextProps);
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
    const { type, blockId} = event;
    const block = this.workspace.getBlockById(blockId) || { type: "" };

    if (block.type === 'ask') {
      this.handleAnswerChange({blockId, type});
    }

    if (Blockly.Events.BLOCK_DELETE === type) {
      const { ids: deletedBlocksIds } = event;
      deletedBlocksIds.map(deletedBlockId => {
        if (Answers.getAnswerById(deletedBlockId)) {
          this.removeAnswerVariable(deletedBlockId);
        }
      return null;  
      });
    }
  };

  handleAnswerChange = ({blockId, type}) => {
    if (Blockly.Events.BLOCK_CREATE === type) {
      this.createNewAnswerVariable({ blockId });
    }
  };

  /* Answer generation */
  createNewAnswerVariable = ({blockId}) => {
    if (Blockly.Blocks[blockId] && Blockly.JavaScript[blockId] ) return;
    const nextIndex = Answers.getNextIndex();
    (this.props.isOld ? OldBlocks : Blocks).generateAnswer({ key: blockId, label: `Answer${nextIndex}`, Blockly});
    Answers.answer = { id: [blockId], value: "" };
  };

  removeAnswerVariable = (blockId) => {
    Answers.removeChangeById(blockId);
    if (!Blockly) return;
    if (!Blockly.Blocks) return;
    if (!Blockly.Blocks.length) return;

    delete Blockly.Blocks[blockId];
    delete Blockly.JavaScript[blockId];
  };

  workspaceDidChange = (workspace) => {
    try {
      if (!this.workspace) {
        this.subscribeToWorkspace(workspace);
      }

      const code = Blockly.JavaScript.workspaceToCode(workspace);
      this.props.onEdit(code);
    } catch (err) {
      console.warn('Unhandled error: ', err);
    }
  }

  render() {
    return (
      <BlocklyEditor
        {...this.state.toolboxConfiguration}
        workspaceConfiguration={workspaceConfiguration}
        initialXml={this.props.workspaceXML}
        wrapperDivClassName="fill-height"
        workspaceDidChange={this.workspaceDidChange}
      />
  )}
}

export default BlocklyDrawer;
