import { FETCH_SUBMISSION } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SUBMISSION:
      return { ...state, [action.id]: action.payload };
    default:
      return state;
  }
}
