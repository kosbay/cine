import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import { FileUploadMutation } from 'schemas';
import { FileUpload } from 'components';

class FileUploadContainer extends React.PureComponent {
  static propTypes = {
    uploadButtonLabel: PropTypes.string,
    onDidUpload: PropTypes.func.isRequired,
    fileName: PropTypes.string,
    fileUrl: PropTypes.string,
    onFileSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    uploadButtonLabel: 'Upload file',
    fileName: '',
    fileUrl: '',
  };

  handleFileUpload = onFileUpload => async (file) => {
    const { onDidUpload: onDidUploadFunc } = this.props;
    try {
      const fileUrl = await onFileUpload(file);

      onDidUploadFunc(fileUrl);
    } catch (err) {
      // eslint-disable-next-line
      console.warn('Error: ', err);
    }
  };

  renderFileUpload = (onFileUpload, { loading, error, progress }) => {
    const {
      uploadButtonLabel, fileName, onFileSubmit, fileUrl,
    } = this.props;
    const handleFileUpload = this.handleFileUpload(onFileUpload);

    return (
      <FileUpload
        onFileSubmit={onFileSubmit}
        fileUrl={fileUrl}
        fileName={fileName}
        onFileUpload={handleFileUpload}
        uploadButtonLabel={uploadButtonLabel}
        progress={progress}
        loading={loading}
        error={error}
      />
    );
  };

  render() {
    return (
      <FileUploadMutation>{this.renderFileUpload}</FileUploadMutation>
    );
  }
}

export default withNamespaces()(FileUploadContainer);
