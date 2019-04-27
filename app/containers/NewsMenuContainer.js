import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Images from 'theme/Images';
import getNotifications from '../selectors/notifications';

const MenuItem = styled.div`
  position: relative;
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

const UnreadNews = styled.div`
  position: absolute;
  z-index: 1;  
  right: 5px;
  top: 0;
  width: 30px;
`;

const Image = styled.img`
  width: 48px;
  height: 48px;
  margin: 16px 20px 8px 16px;
`;

const NewsMenuContainer = ({
  notifications, news, pathname, t,
}) => {
  const unreadNews = notifications.filter(item => !item.isRead).length;
  return (
    <Link key={`${news.label}|${news.link}-sidemenu`} href={news.link}>
      <a style={{ textDecoration: 'none' }}>
        <MenuItem selected={pathname.indexOf(news.label) !== -1}>
          <UnreadNews>
            <Badge count={unreadNews} />
          </UnreadNews>
          <Image src={Images.sidemenu[news.img]} />
          {t(`pages.${news.label}`)}
        </MenuItem>
      </a>
    </Link>
  );
};

NewsMenuContainer.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  news: PropTypes.shape({}).isRequired,
  t: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

const makeStateToProps = (state, ownProps) => ({
  notifications: getNotifications(state, ownProps),
});

export default connect(makeStateToProps)(NewsMenuContainer);
