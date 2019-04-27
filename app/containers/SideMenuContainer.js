import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import Images from 'theme/Images';

import NewsMenuContainer from './NewsMenuContainer';

const SideMenuWrapper = styled.div`
  width: 112px;
  height: 100vh;
  background: #fff;
  box-shadow: 4px 0 4px rgba(0, 0, 0, 0.02);
  position: fixed;
`;

const ItemsWrapper = styled.div`
  height: calc(100vh - 64px);
  overflow: hidden;
  overflow-y: scroll;

  a:last-child {
    div {
      margin-bottom: 20px;
    }
  }

  ::-webkit-scrollbar {
    width: 1px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #7d8bf7;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const MenuItem = styled.div`
  height: 104px;
  width: 96px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  color: #8b98ae;
  font-size: 16px;
  font-weight: 800;
  margin: 0 7px 0 7px;

  &:hover {
    color: #7d8bf7;
  }

  ${p => p.selected
    && `
    border-radius: 12px;
    color: white;
    background: #7d8bf7;

    &:hover {
      color: white;
    }
  `}

  &:first-child {
    margin-top: 16px;
  }
`;

const Image = styled.img`
  width: 48px;
  height: 48px;
  margin: 16px 20px 8px 16px;
`;

const Social = styled.div`
  width: 100%;
  height: 64px;
  background: #f6f6f6;
  display: flex;
  flex-direction: row;
`;

const SocialIcon = styled.img`
  width: 32px;
  height: 32px;
  margin: 16px 0 16px 16px;
  filter: grayscale(100%);

  &:hover {
    filter: grayscale(0%);
  }
`;

const Gradient = styled.div`
  position: fixed;
  bottom: 64px;
  height: 64px;
  width: 110px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
`;

class SideMenuContainer extends Component {
  menuItems = [
    {
      label: 'myprogram',
      link: '/myprogram',
      icon: '',
      img: 'learn',
    },
    {
      label: 'profile',
      link: this.props.auth.user ? `/profile?userId=${this.props.auth.user._id}` : '/login',
      icon: '',
      img: 'profile',
    },
    {
      label: 'rating',
      link: '/rating',
      icon: '',
      img: 'rating',
    },
    {
      label: 'news',
      link: '/news',
      icon: '',
      img: 'news',
    },
    {
      label: 'contests',
      link: '/contests',
      icon: '',
      img: 'contests',
    },
    {
      label: 'faculties',
      link: '/faculties',
      icon: '',
      img: 'faculties',
    },
    {
      label: 'courses',
      link: '/courses',
      icon: '',
      img: 'courses',
    },
    // {
    //   label: 'tariffs',
    //   link: '/tariff',
    //   icon: '',
    //   img: 'prices',
    // },
  ];

  teacherLinks = {
    label: 'school',
    link: '/school',
    icon: '',
    img: 'school',
  };

  render() {
    const { pathname, t, auth } = this.props;
    let rightMenuItems = this.menuItems;
    if (auth.user && auth.user.role === 'teacher') {
      rightMenuItems = [this.teacherLinks, ...rightMenuItems];
    }
    return (
      <SideMenuWrapper>
        <ItemsWrapper>
          {rightMenuItems.map(item => ((item.label === 'news')
            ? <NewsMenuContainer key={item.label} pathname={pathname} t={t} news={item} />
            : (
              <Link key={item.label} href={item.link}>
                <a style={{ textDecoration: 'none' }}>
                  <MenuItem selected={pathname.indexOf(item.label) !== -1}>
                    <Image src={Images.sidemenu[item.img]} />
                    {t(`pages.${item.label}`)}
                  </MenuItem>
                </a>
              </Link>
            )))}
        </ItemsWrapper>
        <Gradient />
        <Social>
          <a href="https://www.instagram.com/wunder.kz">
            <SocialIcon src={Images.sidemenu.instagram} alt="instagram" />
          </a>
          <a href="https://www.youtube.com/channel/UCtQaoQC6hC0v5uVpJ8iB-xg">
            <SocialIcon
              href="https://www.youtube.com/channel/UCtQaoQC6hC0v5uVpJ8iB-xg"
              src={Images.sidemenu.youtube}
              alt="youtube"
            />
          </a>
        </Social>
      </SideMenuWrapper>
    );
  }
}

SideMenuContainer.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({ _id: PropTypes.string }),
  }).isRequired,
  t: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default withNamespaces()(SideMenuContainer);
