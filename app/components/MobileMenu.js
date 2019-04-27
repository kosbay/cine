import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Row, Col } from 'antd';
import { withNamespaces } from 'react-i18next';
import { compose } from 'recompact';

import Images from '../theme/Images';

const { logotype: logoSVG, letterX: closeSVG, lineMenu: menuSVG } = Images;

const Container = styled.div`
  z-index: 1000;
  width: 100%;
  height: 64px;
  background-color: #606dc9;
  display: flex;
  align-items: center;
  flex-direction: 'column';

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  max-height: 35px;
  width: auto;
  margin: 20px;
  cursor: pointer;
`;

const Icon = styled.img`
  max-height: 20px;
  max-width: 20px;
  margin: 20px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const ItemsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInformation = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledLink = styled.div`
  height: 50px;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

class MobileMenu extends Component {
  state = {
    isMenuVisible: false,
  };

  teacherLinks = [
    {
      label: 'school',
      url: '/school',
      hideInLearn: true,
    },
    {
      label: 'faculties',
      url: '/faculties',
    },
    {
      label: 'courses',
      url: '/courses',
    },
    {
      label: 'raiting',
      url: '/raiting',
    },
    {
      label: 'contacts',
      url: '/contacts',
    },
  ];

  links = [
    {
      label: 'faculties',
      url: '/faculties',
    },
    {
      label: 'courses',
      url: '/courses',
    },
    {
      label: 'raiting',
      url: '/raiting',
    },
    {
      label: 'contacts',
      url: '/contacts',
    },
  ];

  handleLogoutButtonClick = () => {
    this.toggleCollapsed();
    const { onLogoutButtonClick } = this.props;
    onLogoutButtonClick();
  };

  toggleCollapsed = () => {
    const { isMenuVisible } = this.state;
    this.setState({
      isMenuVisible: !isMenuVisible,
    });
  };

  renderLinks = (links) => {
    const { linksHidden, t } = this.props;
    return (
      <Links>
        {links.map(link => (linksHidden !== link.hideInLearn && (
          <Link key={link.label} href={link.url} passHref>
            <StyledLink onClick={this.toggleCollapsed}>
              {t(`headerMenu.${link.label}`)}
            </StyledLink>
          </Link>
        )))
        }
      </Links>
    );
  };

  renderLoginLogout = () => {
    const { auth, t } = this.props;
    if (auth.user && auth.user.username) {
      return (
        <UserInformation>
          <Links>
            <Link href={{ pathname: '/profile', query: { userId: auth.user._id } }}>
              <StyledLink onClick={this.toggleCollapsed}>
                <UserName>{auth.user.username}</UserName>
              </StyledLink>
            </Link>
            <StyledLink onClick={this.handleLogoutButtonClick}>{t('headerMenu.logout')}</StyledLink>
          </Links>
        </UserInformation>
      );
    }
    return (
      <Link href="/login">
        <StyledLink onClick={this.toggleCollapsed}>{t('headerMenu.login')}</StyledLink>
      </Link>
    );
  };

  render() {
    const { auth } = this.props;
    const { isMenuVisible } = this.state;
    const isTeacher = auth.user && auth.user.role === 'teacher';

    return (
      <Container>
        <Row
          type="flex"
          align="middle"
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            flexFlow: 'nowrap',
            justifyContent: 'space-between',
          }}
        >
          <a href="https://www.platform.wunder.kz/">
            <Logo src={logoSVG} />
          </a>
          <Icon src={isMenuVisible ? closeSVG : menuSVG} onClick={this.toggleCollapsed} />
        </Row>
        <Row
          type="flex"
          align="middle"
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            flexFlow: 'nowrap',
            backgroundColor: '#2C3157',
            top: '64px',
            justifyContent: 'center',
          }}
        >
          <Col style={{ width: '100%' }}>
            {isMenuVisible && (
              <ItemsContainer>
                {this.renderLinks(isTeacher ? this.teacherLinks : this.links)}
                <React.Fragment>{this.renderLoginLogout(auth)}</React.Fragment>
              </ItemsContainer>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

MobileMenu.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  onLogoutButtonClick: PropTypes.func.isRequired,
  linksHidden: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

const withState = connect(
  mapStateToProps,
  null
);

const EnchantedMenu = compose(
  withState,
  withNamespaces()
)(MobileMenu);

export default EnchantedMenu;
