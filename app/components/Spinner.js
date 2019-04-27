import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerIcon = styled(Icon)`
  color: #ffd263;
  font-size: 80px;
`;

const Spinner = () => (
  <SpinnerWrapper>
    <SpinnerIcon type="loading" />
  </SpinnerWrapper>
);

export default Spinner;
