import React from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";

import "brace/mode/java";
import "brace/theme/github";

const CodeEditor = ({ value, onTextChange, style }) => (
  <AceEditor
    value={value}
    mode="java"
    theme="github"
    onChange={onTextChange}
    editorProps={{ $blockScrolling: true }}
    style={style}
  />
);

CodeEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  style: PropTypes.shape({})
};

CodeEditor.defaultProps = {
  style: {}
};

export default CodeEditor;
