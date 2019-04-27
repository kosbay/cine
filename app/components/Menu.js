import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Col, Icon, Badge } from 'antd';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { withRouter } from 'next/router';
import { withSize } from 'react-sizeme';

import Avatar from './Avatar/index';
import Images from '../theme/Images';

const Container = styled.div`
  z-index: 5;
  width: 100%;
  height: 64px;
  background-color: #606dc9;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const SubDiv = styled.div`
  width: calc(100% - 48px);
  display: flex;
  flex-direction: row;
`;

const LeftColumn = styled.div`
  display: flex;
  text-align: right;
  justify-content: space-around;
  margin-left: 60px;
  width: 30%;
  max-width: 400px;

  @media screen and (max-width: 840px) {
    margin-left: 20px;
  }
`;

const RightColumn = styled(Col)`
  display: flex;
  width: fit-content;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 0;
  margin-left: auto;
`;

const Logo = styled.img`
  max-height: 35px;
  width: auto;
  cursor: pointer;
`;

const AvatarDiv = styled.span`
  width: ${p => p.username.length * 7 + 40}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PointsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd263;
  padding: 0 10px;
`;

const StyledLink = styled.a`
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
  padding: 0 10px;
  transition: background 0.2s ease-in-out;
  ${p => (p.isAvatar ? 'padding-left: 0' : '')};
  ${p => p.isCurrent
    && `
    color: #fff;
    background: #434ea2;
    text-decoration: none;
  `}

  &:hover,
  &:focus {
    color: #fff;
    background: #4f5aaf;
    text-decoration: none;
  }
`;

const Label = styled.div`
  text-decoration: none;
  color: #fff;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  margin-right: 5px;
  color: #fff;
`;

const StyledSvg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const {
  courseIcon, facultyIcon, loginIcon, logotype, logoutIcon, pointsIcon, ratingIcon,
} = Images;

const links = [
  {
    label: 'faculties',
    url: '/faculties',
    iconUrl: facultyIcon,
    dot: false,
    childPathname: '/faculty',
  },
  {
    label: 'courses',
    url: '/courses',
    iconUrl: courseIcon,
    dot: false,
    childPathname: '/course',
  },
  {
    label: 'raiting',
    url: '/raiting',
    iconUrl: ratingIcon,
    dot: false,
  },
];

const teacherLinks = [
  {
    label: 'school',
    url: '/school',
    type: 'schedule',
    dot: false,
    childPathname: '/faculty',
  },
  {
    label: 'faculties',
    url: '/faculties',
    iconUrl: facultyIcon,
    dot: false,
    childPathname: '/faculty',
  },
  {
    label: 'courses',
    url: '/courses',
    iconUrl: courseIcon,
    dot: false,
    childPathname: '/course',
  },
  {
    label: 'raiting',
    url: '/raiting',
    iconUrl: ratingIcon,
    dot: false,
    childPathname: '/raiting',
  },
];

const renderLinks = (rightLinks, t, pathname) => rightLinks.map(({
  type, url, label, dot, iconUrl, childPathname,
}) => (
  <Link key={label} href={url} passHref>
    <StyledLink isCurrent={pathname === url || pathname === childPathname}>
      {iconUrl ? <StyledSvg src={iconUrl} /> : <StyledIcon type={type} />}
      <Badge dot={dot} offset={[5, 0]}>
        <Label>{t(`headerMenu.${label}`)}</Label>
      </Badge>
    </StyledLink>
  </Link>
));

const HorizontalMenu = ({
  auth, onLogoutButtonClick, t, router,
}) => (
  <Container>
    <SubDiv>
      <a href="https://www.wunder.kz/">
        <Logo src={logotype} />
      </a>
      <LeftColumn>
        {renderLinks(
          auth.user && auth.user.role === 'teacher' ? teacherLinks : links,
          t,
          router.pathname
        )}
      </LeftColumn>
      {auth.user && auth.user.username ? (
        <RightColumn>
          <PointsDiv>
            <img style={{ marginRight: '7px' }} src={pointsIcon} alt="pointsSVG" />
            {auth.user.wupai ? auth.user.wupai : 0}
            {' wupai'}
          </PointsDiv>
          <Link href={{ pathname: '/profile', query: { userId: auth.user._id } }} passHref>
            <StyledLink isAvatar>
              <AvatarDiv username={auth.user.username}>
                <Avatar size="small" userAvatar={auth.user.avatar} />
                <Label>{auth.user.username}</Label>
              </AvatarDiv>
            </StyledLink>
          </Link>
          <StyledLink key="выйти" onClick={onLogoutButtonClick} href="#">
            <StyledSvg src={logoutIcon} />
            <Label>{t('headerMenu.logout')}</Label>
          </StyledLink>
        </RightColumn>
      ) : (
        <RightColumn>
          <StyledLink key="войти">
            <StyledSvg src={loginIcon} />
            <Link href="/login">
              <Label>{t('headerMenu.login')}</Label>
            </Link>
          </StyledLink>
        </RightColumn>
      )}
    </SubDiv>
  </Container>
);

HorizontalMenu.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  onLogoutButtonClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  size: PropTypes.shape({ width: PropTypes.number, height: PropTypes.number }).isRequired,
  router: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

const withState = connect(
  mapStateToProps,
  null
);

const EnchantedMenu = compose(
  withState,
  withRouter,
  withSize(),
  withNamespaces()
)(HorizontalMenu);

export default EnchantedMenu;
