import { GET_STUDENT } from '../actions/types'

const initialState = {}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_STUDENT:
      return {
        ...state,
        student: actions.payload
      }
    default:
      return state
  }
}
