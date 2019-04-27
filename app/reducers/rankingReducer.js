import { FETCH_USERS_BY_RANK, FETCH_SCHOOLS_BY_RANK } from "../actions/types";

const initialState = {
  users: [],
  schools: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_BY_RANK:
      return { ...state, users: action.payload };
    case FETCH_SCHOOLS_BY_RANK:
      return { ...state, schools: action.payload };
    default:
      return state;
  }
};
