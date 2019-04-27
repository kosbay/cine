import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { Answers } from './Blockly/BlocklyUtils';
import Event from './Game/EventEmitter';
import BlocklyDrawer from './Blockly';

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
    const answers = { ...this.state.answers, [blockId]: value };
    this.setState({ answers });
  };

  handleAnswerRemove = ({ id }) => {
    const answers = { ...this.state.answers };
    delete answers[id];
    this.setState({ answers });
  }

  handleCodeEdit = (newCode) => {
    code = newCode;
  };

  runCode = async () => {
    if (!code) return this.props.executionComplete('');
    /* eslint-disable no-unused-vars */
    try {
      const askAnswers = { ...this.state.answers };
      const EventEmitter = Event;
      Event.push({ type: 'reset', params: { identifier: 'worldBoard' } });
      /* eslint-disable no-eval */
      await eval(`(async () => {${code}})();`);
      /* eslint-enable no-eval */

      this.props.executionComplete(code);
      return null;
    } catch (err) {
      console.warn(err);
      this.props.executionComplete(code);
      return null;
    }
    /* eslint-enable no-unused-vars */
  };

  render() {
    return (
      <BlocklyWrapper>
        <BlocklyDrawer
          customBlocks={this.props.customBlocks}
          objectBlocks={this.props.objectBlocks}
          answers={this.state.answers}
          toolboxXML={this.props.toolboxXML}
          workspaceXML={this.props.workspaceXML}
          onEdit={this.handleCodeEdit}
        />
      </BlocklyWrapper>
    );
  }
}

export default BlocklyPlayground;
