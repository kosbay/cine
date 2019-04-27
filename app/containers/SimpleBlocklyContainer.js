import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { Spinner, Blockly } from '../components';

const AceEditor = dynamic(import('../components/AceDynamic'), {
  ssr: false,
  loading: () => <Spinner />,
});

class SimpleBlocklyContainer extends Component {
  state = {
    code: '',
  };

  handleEdit = (code) => {
    this.setState({ code });
  };

  render() {
    const {
      lesson: {
        toolboxXML, workspaceXML, text, code,
      },
    } = this.props;
    const injectOptions = {
      toolbox: toolboxXML,
      workspace: workspaceXML,
    };
    return (
      <div style={{ width: '100%' }}>
        <div
          className="ql-editor"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
        <Blockly onEdit={this.handleEdit} injectOptions={injectOptions} />
        {this.state.code.trim() === code.trim() ? 'success' : 'fail'}
        <AceEditor
          mode="javascript"
          name="blah2"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin
          showGutter
          highlightActiveLine
          value={this.state.code}
          readOnly
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    );
  }
}

SimpleBlocklyContainer.propTypes = {
  lesson: PropTypes.shape({
    toolboxXML: PropTypes.string,
    workspaceXML: PropTypes.string,
    code: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default SimpleBlocklyContainer;
