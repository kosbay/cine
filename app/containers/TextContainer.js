import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../components/highlight';

const TextContainer = styled.div`
  width: 100%;
  font-size: 20px;

  & > * > code {
    background: #efefef;
    padding: 2px 4px;
  }

  & > pre {
    background: #161a36;
    color: #fff;
    padding: 16px;
  }

  img {
    max-width: 80%;
  }
`;

const Text = ({ lesson }) => {
  const key = `${lesson._id}-TextLesson`;
  return (
    <TextContainer
      className="ql-editor"
      key={key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: lesson.text,
      }}
    />
  );
};

Text.propTypes = {
  lesson: PropTypes.shape({ text: PropTypes.string }).isRequired,
};

export default Text;
