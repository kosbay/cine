import { FETCH_SELF } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_SELF:
      return action.payload || null;
    default:
      return state;
  }
}
