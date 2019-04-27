import React from "react";
import PropTypes from "prop-types";
import { Modal, Input, Avatar } from "antd";

import ImageUpload from "./ImageUpload";

const nameInputStyle = { marginBottom: 8 };

class ProjectForm extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
  };

  state = {
    imageURL: "",
    name: ""
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  handleImageUpload = imageURL => this.setState({ imageURL });

  handleOkButtonClick = () => this.props.onCreate({ ...this.state });

  render() {
    const { visible, title, onCancel } = this.props;
    return (
      <Modal
        visible={visible}
        title={title}
        okText="Create"
        onCancel={onCancel}
        onOk={this.handleOkButtonClick}
      >
        <Input
          placeholder="Name"
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleInputChange}
          style={nameInputStyle}
        />
        <Avatar size="xlarge" src={this.state.imageURL} />
        <ImageUpload onUpdate={this.handleImageUpload} />
      </Modal>
    );
  }
}

export default ProjectForm;
