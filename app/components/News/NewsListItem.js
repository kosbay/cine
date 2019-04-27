import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrackVisibility from 'react-on-screen';
import moment from 'moment';
import styled from 'styled-components';
import Firebase from '../../lib/FirebaseNotifications';
import '../../styles/index.css';

const SingleNews = styled.div`
  width: 100%;
  position: relative;
  background-color: #fff;
  margin-bottom: 24px;
  min-width: 250px;
  padding: 32px;
  display: flex;
  flex-direction: row;
`;

const BreakingNews = styled.div`
  width: 100%; 
  position: relative;
  background-color: #fff;
  margin-bottom: 24px;
  min-width: 250px;
  padding: 32px;
  background-color: #D8DCFF;
`;

const SingleNewsName = styled.div`
  line-height: 24px;
  font-weight: 800;
  margin-bottom: 16px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
`;

const SingleNewsDescription = styled.div`
  line-height: 16px;
  font-size: 14px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.85);
`;

const ImageWrapper = styled.img`
  width: 110px;
  height: 110px;
  margin-left: 20px;
`;

const NewsWrapper = styled.div`
  width: 100%;
`;

class ComponentToTrack extends Component {
  componentDidUpdate() {
    this.updateNotificationStatus();
  }

  updateNotificationStatus = async () => {
    const { notification, isVisible, updateNotification } = this.props;
    if (!notification.isRead && isVisible) {
      await Firebase.updateNotificationStatus({ notificationId: notification._id });
      await updateNotification(notification._id);
    }
  };

  render() {
    const { notification } = this.props;

    const NewsType = notification.isRead ? SingleNews : BreakingNews;
    return (
      <NewsType>
        <NewsWrapper>
          <SingleNewsName>{notification.notificationMessageId.title}</SingleNewsName>
          <SingleNewsDescription>
            {
              notification.notificationMessageId.description
            }
          </SingleNewsDescription>
          <SingleNewsDescription>
            {
              notification.createdAt ? moment(notification.createdAt).fromNow() : null
            }
          </SingleNewsDescription>
        </NewsWrapper>
        {
          notification.notificationMessageId.imageURL
          && <ImageWrapper src={notification.notificationMessageId.imageURL} />
        }
      </NewsType>
    );
  }
}

const NewsListItem = ({ notification, updateNotification }) => {
  if (!notification.notificationMessageId) {
    return (
      <SingleNews>
        <SingleNewsName>Message was deleted</SingleNewsName>
      </SingleNews>
    );
  }
  return (
    <TrackVisibility once>
      <ComponentToTrack notification={notification} updateNotification={updateNotification} />
    </TrackVisibility>
  );
};

NewsListItem.propTypes = {
  notification: PropTypes.shape({}).isRequired,
  updateNotification: PropTypes.func.isRequired,
};

ComponentToTrack.propTypes = {
  notification: PropTypes.shape({}).isRequired,
  isVisible: PropTypes.bool,
  updateNotification: PropTypes.func.isRequired,
};

ComponentToTrack.defaultProps = {
  isVisible: false,
};


export default NewsListItem;
