import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NewsListItem from './NewsListItem';
import getNotifications from '../../selectors/notifications';
import '../../styles/index.css';

const ResponsiveWrapper = styled.div`
  margin: auto;
  margin-top: 20px;
  margin-bottom: 40px;
  max-width: 1024px;
  width: 90%;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 20px;
  }
`;

const NewsTitle = styled.p`
  color: #606dc9;
  font-size: 48px;
  margin-bottom: 50px;
  height: 60px;
  width: 100%;
`;

const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  margin-bottom: 64px;
`;

const NewsList = ({ t, notifications, updateNotification }) => {
  notifications.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    return 0;
  }).reverse();

  // console.log(notifications, 'no');

  return (
    <ResponsiveWrapper>
      <NewsTitle>{t('pages.news')}</NewsTitle>
      <NewsWrapper>

        { notifications.map(
          notification => (
            <NewsListItem
              key={notification._id}
              notification={notification}
              updateNotification={updateNotification}
            />
          )
        )}
      </NewsWrapper>
    </ResponsiveWrapper>
  );
};

const makeStateToProps = (state, ownProps) => ({
  notifications: getNotifications(state, ownProps),
});

NewsList.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateNotification: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default connect(makeStateToProps)(NewsList);
