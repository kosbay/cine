
import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Spinner } from 'components';

const AceEditor = dynamic(
  import('../AceDynamic'),
  { ssr: false, loading: () => <Spinner /> }
);
const aceEditorProps = { $blockScrolling: true };


const LANGUAGE_HELPER = {
  1: 'c_cpp',
  10: 'java',
  116: 'python',
};
const WrappedAceEditor = ({ compilerId, onChange, value }) => {
  const mode = LANGUAGE_HELPER[compilerId];

  return (
    <AceEditor
      mode={mode}
      theme="monokai"
      onChange={onChange}
      name="code"
      value={value}
      editorProps={aceEditorProps}
      width="100%"
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
