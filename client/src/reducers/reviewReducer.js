import { GET_COUNT_REVS, GET_REVIEWS } from '../actions/types'

const initialState = {}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_COUNT_REVS:
      return {
        ...state,
        count: actions.payload
      }
    case GET_REVIEWS:
      return {
        ...state,
        revs: actions.payload
      }
    default:
      return state
  }
}
