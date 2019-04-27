import { FETCH_CHAPTERS, ADD_CHAPTER, REMOVE_CHAPTER } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CHAPTERS:
      return action.payload;
    case ADD_CHAPTER:
      return [...state, action.payload];
    case REMOVE_CHAPTER:
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}
