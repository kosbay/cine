import { ADD_ERROR, ADD_MESSAGE, REMOVE_MESSAGE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case ADD_ERROR:
      return [...state, { type: ADD_ERROR, message: action.payload }];
    case ADD_MESSAGE:
      return [...state, { type: ADD_MESSAGE, message: action.payload }];
    case REMOVE_MESSAGE:
      if (state.length > 0) return state.slice(1);
      return [];
    default:
      return state;
  }
}
