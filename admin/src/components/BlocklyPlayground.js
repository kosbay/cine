import PropTypes from "prop-types";
import React from "react";
import { Button } from "antd";

import { Answers } from './Blockly/BlocklyUtils';
import BlocklyDrawer from "./Blockly";

let code = "";
let xml = "";
class BlocklyPlayground extends React.PureComponent {
  static propTypes = {
    objectBlocks: PropTypes.arrayOf(PropTypes.shape({})),
    customBlocks: PropTypes.arrayOf(PropTypes.string).isRequired,
    onParseCode: PropTypes.func.isRequired,
    toolboxXML: PropTypes.string,
    workspaceXML: PropTypes.string,
    isOld: PropTypes.bool
  };

  static defaultProps = {
    toolboxXML: "",
    workspaceXML: "",
    objectBlocks: [],
    isOld: false
  };

  state = {
    answers: {}
  };

  componentDidMount() {
    this.subscribeToAnswers();
  }

  componentWillUnmount() {
    this.unsubscribeToAnswers();
    Answers.clearChanges();
  }

  subscribeToAnswers = () => {
    this.unsubscribeToAnswers = Answers.subscribe(this.handleAnswersChange);
  }

  handleAnswersChange = ({
    change, eventType
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

  handleAnswerAdd = ({id: blockId, value}) => {
    const answers = {...this.state.answers, [blockId]: value};
    this.setState({ answers });
  };

  handleAnswerRemove = ({id}) => {
    const answers = {...this.state.answers};
    delete answers[id];
    this.setState({answers});
  }

  handleCodeEdit = (newCode) => {
    code = newCode;
  };

  handleXMLChange = (newXml) => {
    xml = newXml;
  };

  handleParseCodeButtonClick = () => this.props.onParseCode(code, xml);

  render() {
    return (
      <div style={{width: '100%', height: '50%'}}>
        <div>
          Если для вас не важны аргументы say и ask, то можете вставить
          {"F%wqks@3"}
          для чисел 
          {"38218390128"}
        </div>
        <BlocklyDrawer
          isOld={this.props.isOld}
          onXMLEdit={this.handleXMLChange}
          customBlocks={this.props.customBlocks}
          objectBlocks={this.props.objectBlocks}
          answers={this.state.answers}
          toolboxXML={this.props.toolboxXML}
          workspaceXML={this.props.workspaceXML}
          onEdit={this.handleCodeEdit}
        />
        <Button onClick={this.handleParseCodeButtonClick}>Parse Code</Button>
      </div>
    );
  }
}

export default BlocklyPlayground;
