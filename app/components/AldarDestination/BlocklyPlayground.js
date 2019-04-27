import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { Answers } from '../Blockly/BlocklyUtils';
import BlocklyDrawer from './BlocklyOld';

let code = '';

const BlocklyWrapper = styled.div`
  width: 100%;
  height: calc(100% - 112px);
`;

class BlocklyPlayground extends React.PureComponent {
  static propTypes = {
    objectBlocks: PropTypes.arrayOf(PropTypes.shape({})),
    customBlocks: PropTypes.arrayOf(PropTypes.string).isRequired,
    isRunButtonClick: PropTypes.bool.isRequired,
    executionComplete: PropTypes.func.isRequired,
    setFunctions: PropTypes.func.isRequired,
    toolboxXML: PropTypes.string,
    workspaceXML: PropTypes.string,
  };

  static defaultProps = {
    toolboxXML: '',
    workspaceXML: '',
    objectBlocks: [],
  };

  state = {
    answers: {},
  };

  componentDidMount() {
    this.subscribeToAnswers();
  }

  componentWillReceiveProps(nextProps) {
    const { isRunButtonClick } = nextProps;
    const { isRunButtonClick: prevIsRunButtonClick } = this.props;

    if (isRunButtonClick !== prevIsRunButtonClick && isRunButtonClick) {
      this.runCode();
    }
  }

  componentWillUnmount() {
    this.unsubscribeToAnswers();
    Answers.clearChanges();
  }

  subscribeToAnswers = () => {
    this.unsubscribeToAnswers = Answers.subscribe(this.handleAnswersChange);
  }

  handleAnswersChange = ({
    change, eventType,
  }) => {
    /* eslint-disable */
    switch(eventType) {
      case Answers.eventType.ADD:
        this.handleAnswerAdd(change);
        return;
      case Answers.eventType.DELETE:
        this.handleAnswerRemove(change);
    }
    /* eslint-enable */
  };

  handleAnswerAdd = ({ id: blockId, value }) => {
    // eslint-disable-next-line
    const answers = { ...this.state.answers, [blockId]: value };
    this.setState({ answers });
  };

  handleAnswerRemove = ({ id }) => {
    // eslint-disable-next-line
    const answers = { ...this.state.answers };
    delete answers[id];
    this.setState({ answers });
  }

  handleCodeEdit = (newCode) => {
    code = newCode;
  };

  runCode = async () => {
    const { executionComplete: executionCompleteFunc, setFunctions: setFunctionsFunc } = this.props;
    if (!code) return executionCompleteFunc();

    /* eslint-disable no-unused-vars */
    try {
      const blockFunctions = setFunctionsFunc();
      // TODO: we dont use this askAnswers
      const askAnswers = Answers.answers;

      /* eslint-disable no-eval */
      await eval(`(async () => {${code}})();`);
      /* eslint-enable no-eval */

      executionCompleteFunc(code);
      return null;
    } catch (err) {
      console.warn(err);
      executionCompleteFunc(code);
      return null;
    }
    /* eslint-enable no-unused-vars */
  };

  render() {
    const {
      customBlocks, objectBlocks, toolboxXML, workspaceXML,
    } = this.props;
    const {
      answers,
    } = this.state;
    console.log('Render in BlocklyPlayground');
    return (
      <BlocklyWrapper>
        <BlocklyDrawer
          isOld
          customBlocks={customBlocks}
          objectBlocks={objectBlocks}
          answers={answers}
          toolboxXML={toolboxXML}
          workspaceXML={workspaceXML}
          onEdit={this.handleCodeEdit}
        />
      </BlocklyWrapper>
    );
  }
}

export default BlocklyPlayground;
