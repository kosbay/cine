import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Images from '../../theme/Images';

const TaskWrapper = styled.div`
  background-color: #d9d9d9;
  margin-bottom: 16px;
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  height: 93px;
  width: 93px;
  background-image: url(${Images.aldar});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: auto 8px 0 8px;
`;

const TaskContainer = styled.div`
  background-color: #fff;
  margin: 8px;
  color: #232424;
  font-size: 16px;
  width: calc(100% - 93px);
  padding: 8px 16px;
  border-radius: 8px;
`;

const AldarTask = ({ text }) => (
  <TaskWrapper>
    <ImageContainer />
    <TaskContainer>{text}</TaskContainer>
  </TaskWrapper>
);

AldarTask.propTypes = {
  text: PropTypes.string.isRequired,
};

export default AldarTask;
