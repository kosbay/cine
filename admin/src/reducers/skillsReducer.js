import { FETCH_SKILLS, ADD_SKILL, REMOVE_SKILL } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SKILLS:
      return action.payload;
    case ADD_SKILL:
      return [...state, action.payload];
    case REMOVE_SKILL:
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}
