import { FETCH_MODULES, ADD_MODULE, REMOVE_MODULE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MODULES:
      return action.payload;
    case ADD_MODULE:
      return [...state, action.payload];
    case REMOVE_MODULE:
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}
