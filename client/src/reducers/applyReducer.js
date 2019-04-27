import { GET_APPLIES } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APPLIES:
      return action.payload;
    default:
      return state;
  }
}
