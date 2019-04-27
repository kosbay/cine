import { FETCH_CERTIFICATE } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CERTIFICATE:
      return { ...state, [action.id]: action.payload };
    default:
      return state;
  }
}
