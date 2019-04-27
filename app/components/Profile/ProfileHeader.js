import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spin, Button } from 'antd';

import { StudentRankingSchema } from 'schemas';
import { StatefulView } from 'components';
import Avatar from '../Avatar/index';
import Images from '../../theme/Images';

const { logoutIcon, pointsIcon: pointsSVG } = Images;

const Spinner = styled(Spin)`
  height: 40px;
  margin-top: 80px;
  width: 100%;
  justify-content: center;
  justify-items: center;

  i {
    background-color: #7a64ff;
  }
`;

const UserContainer = styled.div`
  display: flex;
  margin-top: 80px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const UserLeftWrap = styled.div`
  display: flex;
`;

const UserRightWrap = styled.div`
  display: block;
`;

const UserNameDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.p`
  font-size: 30px;
  margin: 0;
`;

const UserPoints = styled.div`
  display: flex;
  margin-top: 8px;
  font-size: 16px;
`;

const StyledImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

const AvatarDiv = styled.div`
  margin-right: 32px;
  margin-left: 10px;
`;

const StyledButton = styled(Button)`
  display: flex;
  background-color: #7a64ff;
  flex-direction: row;
  border: 1px solid white;
  align-items: center;

  &:hover {
    background-color: #7a64ff;
    color: white;
  }

  &:focus {
    background-color: #7a64ff;
    color: white;
  }
`;

const Label = styled.div`
  text-decoration: none;
  color: white;
  cursor: pointer;
`;

const StyledSvg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

class ProfileHeader extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    onLogoutButtonClick: PropTypes.func.isRequired,
  };

  renderProfileHeader = ({ data }) => (
    <UserContainer>
      <UserLeftWrap>
        <AvatarDiv>
          <Avatar size="big" userAvatar={data.avatar} />
        </AvatarDiv>
        <UserNameDiv>
          <Username>{data.username}</Username>
          <UserPoints>
            <StyledImg src={pointsSVG} alt="pointsSVG" />
            {`${data.wupai} wupai`}
          </UserPoints>
        </UserNameDiv>
      </UserLeftWrap>
      <UserRightWrap>
        <StyledButton key="выйти" onClick={this.props.onLogoutButtonClick}>
          <StyledSvg src={logoutIcon} />
          <Label>{this.props.t('headerMenu.logout')}</Label>
        </StyledButton>
      </UserRightWrap>
    </UserContainer>
  );

  renderProfileHeaderLoading = () => (
    <UserContainer>
      <Spinner />
    </UserContainer>
  );

  render() {
    const { userId } = this.props;
    return (
      <StudentRankingSchema userId={userId}>
        {StatefulView({
          renderOkState: this.renderProfileHeader,
          renderLoading: this.renderProfileHeaderLoading,
        })}
      </StudentRankingSchema>
    );
  }
}

export default ProfileHeader;
