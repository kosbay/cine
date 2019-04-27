import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.div`
  font-size: 18px;

  & > * > code {
    background: #efefef;
    padding: 2px 4px;
  }

  & > pre {
    background: #161a36;
    color: #fff;
    padding: 16px;
  }
`;

const AceIDEHeader = ({ text }) => (
  <React.Fragment>
    <Text
      className="ql-editor"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  </React.Fragment>
);

AceIDEHeader.propTypes = {
  text: PropTypes.string,
};

AceIDEHeader.defaultProps = {
  text: '',
};

export default AceIDEHeader;
