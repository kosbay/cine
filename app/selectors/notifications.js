import { createSelector } from 'reselect';

const getNotifications = (state) => {
  const notifications = Object.values(state.notifications);
  return notifications;
};

const getNotificationsSelector = createSelector(
  [getNotifications],
  notifications => notifications
);

export default getNotificationsSelector;
