import { SUCCESS } from '../actions/types';

const initialState = {};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case SUCCESS:
      return { success: true };
    default:
      return state;
  }
}
