import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

import CodeEditor from "./CodeEditor";
import BlocklyPlayground from "./BlocklyPlayground";

class BlocklyCodeGenerator extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    isModalVisisble: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    objectBlocks: PropTypes.arrayOf(PropTypes.shape({})),
    customBlocks: PropTypes.arrayOf(PropTypes.shape({})),
    workspaceXML: PropTypes.string,
    toolboxXML: PropTypes.string,
    isOld: PropTypes.bool
  };

  static defaultProps = {
    objectBlocks: [],
    workspaceXML: "",
    toolboxXML: "",
    customBlocks: [],
    isOld: false
  };

  state = {
    code: "",
    xml: this.props.workspaceXML
  };

  handleBlocklyCodeChange = (code, xml) => this.setState({ code, xml });

  handleCodeChange = () => {};

  handleOkButtonClick = () =>
    this.props.onSave({ code: this.state.code, xml: this.state.xml });

  render() {
    const {
      isModalVisisble,
      title,
      onCancel,
      objectBlocks,
      customBlocks,
      toolboxXML
    } = this.props;

    return (
      <Modal
        visible={isModalVisisble}
        title={title}
        okText="Save"
        onCancel={onCancel}
        onOk={this.handleOkButtonClick}
      >
        <BlocklyPlayground
          isOld={this.props.isOld}
          objectBlocks={objectBlocks}
          customBlocks={customBlocks}
          workspaceXML={this.state.xml}
          toolboxXML={toolboxXML}
          onParseCode={this.handleBlocklyCodeChange}
        />

        <CodeEditor
          onTextChange={this.handleCodeChange}
          value={this.state.code}
        />
      </Modal>
    );
  }
}

export default BlocklyCodeGenerator;
