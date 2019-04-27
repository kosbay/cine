import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button, Progress, Icon, Upload,
} from 'antd';
import { withNamespaces } from 'react-i18next';

import Firebase from 'lib/Firebase';

const { Dragger } = Upload;

const SendButton = styled(Button)`
  margin-top: 16px;
  margin-bottom: 20px;
`;

class FileUpload extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    progress: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.shape({}),
    onFileUpload: PropTypes.func.isRequired,
    uploadButtonLabel: PropTypes.string.isRequired,
    fileName: PropTypes.string,
    fileUrl: PropTypes.string,
    onFileSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: {},
    fileName: '',
    fileUrl: '',
  };

  static getDerivedStateFromProps(props, state) {
    const list = [{
      uid: '-1',
      name: props.fileName,
      status: 'done',
    },
    ];
    if (state.fileList.length > 0
      && props.fileName !== state.fileList[0].name && state.fileList[0].uid.localeCompare('-1') === 0) {
      return {
        fileList: list,
      };
    }
    return null;
  }


  state = {
    fileList: [
      {
        uid: '-1',
        name: this.props.fileName || this.props.fileUrl.replace('https://firebasestorage.googleapis.com/v0/b/wunder-dev.appspot.com/o/files', ''),
        status: 'done',
      },
    ],
  };


  uploadListOptions = {
    showPreviewIcon: true,
    showRemoveIcon: true,
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const { onFileUpload: onFileUploadFunc } = this.props;
    onFileUploadFunc(fileList[0]);
  };

  handleBeforeUpload = (file) => {
    this.setState({ fileList: [file] });
    return false;
  }

  handleRemove = async () => {
    const { fileName, onFileSubmit } = this.props;
    await Firebase.removeFile(fileName);
    onFileSubmit({ fileName: 'Здесь должно быть ваше задание', fileUrl: 'Здесь должно быть ваше задание' });
    await this.setState({ fileList: [] });
  };

  renderProgress = () => {
    const { progress } = this.props;
    return (
      <Progress
        percent={parseInt(progress.toFixed(), 10)}
        status="active"
      />
    );
  }

  renderFileUploadContent = () => {
    const { t } = this.props;
    return (
      <React.Fragment>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          {t('fileSubmit.filePlaceholder')}
        </p>
        <p className="ant-upload-hint">*.zip, *.rar</p>
      </React.Fragment>
    );
  }

  render() {
    const { fileList } = this.state;

    const {
      loading, uploadButtonLabel, fileName,
    } = this.props;
    const isFileExist = fileName && (fileName.localeCompare('Здесь должно быть ваше задание') === 0 || fileList.length === 0);
    return (
      <React.Fragment>
        <Dragger
          disabled={!isFileExist}
          accept=".zip"
          multiple={false}
          customRequest={this.handleUpload}
          showUploadList={this.uploadListOptions}
          beforeUpload={this.handleBeforeUpload}
          fileList={fileList}
          style={{ height: 300 }}
          onRemove={this.handleRemove}
        >
          {this.renderFileUploadContent()}
        </Dragger>

        {loading && this.renderProgress()}

        <SendButton onClick={this.handleUpload}>
          {uploadButtonLabel}
        </SendButton>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(FileUpload);
