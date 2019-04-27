import { FETCH_CHAPTER } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CHAPTER:
      return { ...state, [action.id]: action.payload };
    default:
      return state;
  }
}
