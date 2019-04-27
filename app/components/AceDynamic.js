import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

const LANGUAGE_HELPER = {
  1: 'c_cpp',
  10: 'java',
  116: 'python',
};

const aceEditorProps = { $blockScrolling: true };
const aceEditorOptions = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  showLineNumbers: true,
  tabSize: 2,
};

const WrappedAceEditor = ({
  compilerId, onChange, value, ...otherProps
}) => {
  const mode = LANGUAGE_HELPER[compilerId];
  return (
    <AceEditor
      mode={mode}
      theme="monokai"
      onChange={onChange}
      name="code"
      value={value}
      editorProps={aceEditorProps}
      tabSize={2}
      width="100%"
      setOptions={aceEditorOptions}
      {...otherProps}
    />
  );
};

WrappedAceEditor.propTypes = {
  compilerId: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

WrappedAceEditor.defaultProps = {
  compilerId: 0,
};

export default WrappedAceEditor;
