import { FETCH_FACULTIES, ADD_FACULTY, REMOVE_FACULTY } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_FACULTIES:
      return action.payload;
    case ADD_FACULTY:
      return [...state, action.payload];
    case REMOVE_FACULTY:
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}
