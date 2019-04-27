import { FETCH_FACULTY } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_FACULTY:
      return { ...state, [action.id]: action.payload };
    default:
      return state;
  }
}
