import { CHECK_ENROLLMENT, ENROLL_USER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CHECK_ENROLLMENT: {
      return { ...state, status: action.payload };
    }
    case ENROLL_USER: {
      return { ...state, status: action.payload };
    }
    default:
      return state;
  }
};
