import { FETCH_COURSE } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_COURSE:
      return { ...state, [action.id]: action.payload };
    default:
      return state;
  }
}
