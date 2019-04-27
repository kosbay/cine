import { FETCH_SCHOOLS_LIST } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SCHOOLS_LIST:
      return action.payload;
    default:
      return state;
  }
}
