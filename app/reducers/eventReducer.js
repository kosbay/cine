import {
  FETCH_EVENT_START,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_ERROR,
} from 'actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_EVENT_START: {
      return { ...state, loading: true }; }
    case FETCH_EVENT_SUCCESS: {
      return { ...state, ...action.payload, loading: false }; }
    case FETCH_EVENT_ERROR: {
      return { ...state, ...action.payload, loading: false }; }
    default:
      return state;
  }
};
