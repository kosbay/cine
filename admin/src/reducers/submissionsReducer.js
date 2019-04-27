import { FETCH_SUBMISSIONS, REMOVE_SUBMISSION } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SUBMISSIONS:
      return action.payload;
    case REMOVE_SUBMISSION:
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}
