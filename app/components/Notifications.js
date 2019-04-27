import React from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
import PropTypes from 'prop-types';

import { notificationsDidFetch } from '../actions/notifications';
import Firebase from '../lib/FirebaseNotifications';

class Notifications extends React.Component {
  unsubscribeToSocket = null;

  componentDidMount() {
    Firebase.init();
    const { auth } = this.props;
    if (auth && auth.user && auth.user._id) {
      Firebase.subscribeToNotifications({
        userId: auth.user._id,
        onChildAdded: this.handleMessageCame,
      });
    }
  }

  handleHideNotification = async (n) => {
    const { auth } = this.props;
    Firebase.editNotification({ notificationId: n._id, userId: auth.user._id });
  }

  handleMessageCame = async (data) => {
    if (!data) return;
    this.props.notificationsDidFetch(data);
    await Promise.all(
      (Array.isArray(data)
        ? data : [data]).map(async (message) => {
        const notificationMessage = message.notificationMessageId || {
          title: 'Сообщение удалено',
          description: ' ',
          _id: 'dasdkamdksa',
        };

        await notification.open({
          duration: 10,
          message: notificationMessage.title,
          description: notificationMessage.description,
          key: message._id,
          onClose: this.handleHideNotification(message),
          icon: message.notificationMessageId.imageURL && (
            <img
              style={{ width: 50, height: 50, marginLeft: -20 }}
              src={notificationMessage.imageURL}
              alt={notificationMessage.title}
            />
          ),
          style: {
            marginBottom: 10,
          },
        });
        setTimeout(async () => {
          this.handleHideNotification(message);
        }, 10000);
      })
    );
  };

  render() {
    return null;
  }
}

Notifications.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  notificationsDidFetch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => ({
  notificationsDidFetch: notifications => notificationsDidFetch(dispatch, notifications),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
