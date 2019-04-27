import { FETCH_NOTIFICATION_MESSAGES, ADD_NOTIFICATION_MESSAGE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_NOTIFICATION_MESSAGES:
      return action.payload;
    case ADD_NOTIFICATION_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
}
