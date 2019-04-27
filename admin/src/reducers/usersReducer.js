import { 
  FETCH_USERS,
  // ADD_USER,
  // REMOVE_USER
  } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    // REMOVED BECAUSE OF PAGINATION
    // case ADD_USER:
    //   return [...state, action.payload];
    // case REMOVE_USER:
    //   return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}
