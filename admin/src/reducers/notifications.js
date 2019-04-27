import { FETCH_NOTIFICATIONS, ADD_NOTIFICATION } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return action.payload;
    case ADD_NOTIFICATION:
      return [...state, action.payload];
    default:
      return state;
  }
}
