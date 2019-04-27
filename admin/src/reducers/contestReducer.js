import { FETCH_CONTESTS, ADD_CONTEST, REMOVE_CONTEST } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CONTESTS:
      return action.payload;
    case ADD_CONTEST:
      return [...state, action.payload];
    case REMOVE_CONTEST:
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}