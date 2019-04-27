import { Component } from 'react';
import 'firebase/storage';
import PropTypes from 'prop-types';

import Firebase from 'lib/Firebase';

class FileUploadMutation extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
    error: null,
    data: null,
    progress: 0,
  };

  handleFileUploadStateChange = (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    this.setState({ progress });
  };

  handleFileUpload = async (file) => {
    Firebase.init();
    try {
      let justName = '';
      let type = '';
      if (file.name.indexOf('.zip')) {
        justName = file.name.substr(0, file.name.indexOf('.zip'));
        type = '.zip';
      } else if (file.name.indexOf('.rar')) {
        justName = file.name.substr(0, file.name.indexOf('.rar'));
        type = '.rar';
      } else {
        justName = file.name.substr(0, file.name.indexOf('.'));
        type = file.name.substr(file.name.indexOf('.'), file.name.indexOf('.') + 4);
      }
      const fileName = Firebase.generateName(justName) + type;
      this.setState({
        loading: true,
        error: null,
        data: null,
        progress: 0,
      });
      const uploadTask = await Firebase.uploadFile({
        name: fileName,
        file,
        onStateChange: this.handleFileUploadStateChange,
      });
      const fileUrl = await uploadTask.ref.getDownloadURL();
      this.setState({
        loading: false,
        error: null,
        data: { fileName, fileUrl },
        progress: 0,
      });
      return {
        loading: false,
        error: null,
        data: { fileName, fileUrl },
        progress: 0,
      };
    } catch (error) {
      this.setState({
        loading: false,
        error,
        data: null,
        progress: 0,
      });
      return {
        loading: false,
        error,
        data: null,
        progress: 0,
      };
    }
  };

  render() {
    const {
      data, loading, error, progress,
    } = this.state;
    const { children } = this.props;
    return children(this.handleFileUpload, {
      data,
      loading,
      error,
      progress,
    });
  }
}

export default FileUploadMutation;
