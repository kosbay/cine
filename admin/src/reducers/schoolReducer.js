import { FETCH_SCHOOL } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SCHOOL:
      return { ...state, [action.id]: action.payload };
    default:
      return state;
  }
}
