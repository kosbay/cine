import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Body from './Body';
import Images from '../../theme/Images';

const { avatar } = Images;

const COLORS = [
  '#FF7F40',
  '#7598FF',
  '#7556ED',
  '#FF4088',
  '#83C245',
  '#45C292',
];

const AvatarContainer = styled.div`
  position: relative;
  border-radius: 50%;
  background: #ffd263;
  overflow: hidden;
  ${({ size }) => (size === 'big' ? 'width: 80px' : 'width: 32px')};
  ${({ size }) => (size === 'big' ? 'height: 80px' : 'height: 32px')};
`;


const Img = styled.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  top: 0;
  left: 0;
`;

const Avatar = ({ size, userAvatar }) => {
  const {
    body, color, eyes, mouth,
  } = userAvatar;
  return (
    <AvatarContainer size={size}>
      <Body size={size} bodyIndex={body} color={COLORS[color]} />
      <Img src={avatar.eyes[`eyes${eyes}`]} />
      <Img src={avatar.mouth[`mouth${mouth}`]} />
    </AvatarContainer>
  );
};

Avatar.propTypes = {
  size: PropTypes.string,
  userAvatar: PropTypes.shape({
    body: PropTypes.number,
    color: PropTypes.number,
    eyes: PropTypes.number,
    mouth: PropTypes.number,
  }),
};

Avatar.defaultProps = {
  size: 'big',
  userAvatar: PropTypes.shape({
    body: 1,
    color: 1,
    eyes: 1,
    mouth: 1,
  }),
};

export default Avatar;
