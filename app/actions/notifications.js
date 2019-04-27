import { NOTIFICATION_STATE_CHANGE, NOTIFICATIONS_ADD, NOTIFICATION_UPDATE } from './types';

export const notificationsDidFetch = (dispatch, notifications) => {
  const notificationsObject = Array.isArray(notifications)
    ? notifications.reduce((acc, n) => ({ ...acc, [n._id]: n }), {})
    : { [notifications._id]: notifications };

  dispatch({ notifications: notificationsObject, type: NOTIFICATIONS_ADD });
};

export const updateNotification = (dispatch, notificationId) => {
  dispatch({ notificationId, type: NOTIFICATION_UPDATE });
};

export const notificationStateChange = (dispatch, notification) => {
  dispatch({ type: NOTIFICATION_STATE_CHANGE, notification });
};
