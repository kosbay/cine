import React, { Component } from "react";
import PropTypes from "prop-types";
import { Upload, message, Icon, Button } from "antd";

class ImageUpload extends Component {
  onChange = info => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      this.props.onUpdate(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const uploadProps = {
      accept: "image/*",
      name: "file",
      action: "https://api.cloudinary.com/v1_1/wundereducation/image/upload",
      data: {
        upload_preset: "f5g6r5cq"
      }
    };

    return (
      <Upload {...uploadProps} onChange={this.onChange}>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
    );
  }
}

ImageUpload.propTypes = {
  onUpdate: PropTypes.func.isRequired
};

export default ImageUpload;
