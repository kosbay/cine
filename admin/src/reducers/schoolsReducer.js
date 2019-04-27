import { FETCH_SCHOOLS, ADD_SCHOOL, REMOVE_SCHOOL } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SCHOOLS:
      return { ...action.payload };
    case ADD_SCHOOL:
      return { ...state, docs: [...state.docs, action.payload] };
    case REMOVE_SCHOOL:
      return {
        ...state,
        docs: state.docs.filter(item => item._id !== action.payload)
      };
    default:
      return state;
  }
}
