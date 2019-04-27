import { FETCH_COURSES, ADD_COURSE, REMOVE_COURSE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_COURSES:
      return action.payload;
    case ADD_COURSE:
      return [...state, action.payload];
    case REMOVE_COURSE:
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}
