import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Images from '../../theme/Images';

const ratingImage = Images.ratingIcon;
const smileImage = Images.smileGrey;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 30px;
  font-weight: 450;
  color: black;
  margin-top: 80px;
  margin-bottom: 80px;
`;

const HeaderInfo = styled.div`
  display: flex;
  font-size: 16px;
  color: black;
  font-weight: 400;
  margin-top: 20px;
`;

const Image = styled.img`
  height: 24px;
  width: auto;
  margin-right: 8px;
`;

const SchoolHeader = ({ data }) => (
  <HeaderDiv>
    {data.name}
    <HeaderInfo>
      <Image style={{ filter: 'invert(100%)', opacity: 0.6 }} src={ratingImage} />
      {`${data.position} место`}
      <Image style={{ marginLeft: '48px' }} src={smileImage} />
      {`${data.studentsCount} учеников`}
    </HeaderInfo>
  </HeaderDiv>
);

SchoolHeader.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default SchoolHeader;
