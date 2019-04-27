import isEmpty from '../validation/is-empty'

import { SET_CURRENT_USER, SET_NEWPASSWORD_EMAIL } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  user: {},
  newPasswordEmail: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case SET_NEWPASSWORD_EMAIL:

      return {
        ...state,
        newPasswordEmail: action.payload
      }
    default:
      return state
  }
}
