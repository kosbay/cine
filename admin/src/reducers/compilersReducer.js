import { FETCH_COMPILER_LIST } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_COMPILER_LIST:
      return action.payload;
    default:
      return state;
  }
}
