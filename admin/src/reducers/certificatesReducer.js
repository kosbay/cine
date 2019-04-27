import { FETCH_CERTIFICATES, ADD_CERTIFICATE, REMOVE_CERTIFICATE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CERTIFICATES:
      return action.payload;
    case ADD_CERTIFICATE:
      return [...state, action.payload];
    case REMOVE_CERTIFICATE:
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}
