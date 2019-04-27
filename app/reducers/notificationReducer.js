
import { NOTIFICATION_STATE_CHANGE, NOTIFICATIONS_ADD, NOTIFICATION_UPDATE } from 'actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_ADD:
      return { ...state, ...action.notifications };
    case NOTIFICATION_UPDATE:
      return {
        ...state,
        [action.notificationId]: {
          ...state[action.notificationId],
          isRead: true,
          isSend: true,
        },
      };
    case NOTIFICATION_STATE_CHANGE:

      return { ...state, ...action.notification };
    default: return state;
  }
};
