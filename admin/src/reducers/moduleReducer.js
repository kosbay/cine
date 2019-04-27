import { FETCH_MODULE } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MODULE:
      return { ...state, [action.id]: action.payload };
    default:
      return state;
  }
}
