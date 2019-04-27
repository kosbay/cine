import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { Avatar } from 'components';

const UserCard = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 700px) {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;
const UserIcon = styled.img`
  height: 80px;
  width: 80px;
  margin-top: 24px;
  border-radius: 50%;
`;
const Name = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-top: 16px;
  margin-bottom: 16px;
  color: #232424;
`;
const Point = styled.div`
  font-size: 16px;
  text-align: center;
`;
const Position = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: #4f5aa6;
  text-align: center;
`;

const Place = styled.div`
  width: 48px;
  font-size: 16px;
  font-weight: 600;
  color: #4f5aa6;
  text-align: center;
`;

const AvatarWrapper = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PositionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 700px) {
    flex-direction: row;
    justify-content: space-around;
    width: fit-content;

    > div:first-child {
      margin-right: 20px;
    }
  }
`;

const RankingCard = ({
  name, wupai, imageUrl, position, avatar,
}) => (
  <UserCard>
    <TopWrapper>
      {imageUrl && <UserIcon style={{ marginRight: '7px' }} src={imageUrl} alt="userSVG" />}
      {avatar && (
        <AvatarWrapper>
          <Avatar size="big" userAvatar={avatar} />
        </AvatarWrapper>
      )}
      <Name>{name}</Name>
    </TopWrapper>
    <Point>{`${wupai} wupai`}</Point>
    <PositionWrapper>

      <Position>{position}</Position>
      <Place>место</Place>
    </PositionWrapper>
  </UserCard>
);

RankingCard.propTypes = {
  avatar: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  wupai: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  position: PropTypes.number.isRequired,
};

RankingCard.defaultProps = {
  imageUrl: null,
};

export default RankingCard;
