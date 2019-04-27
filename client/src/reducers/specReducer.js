import { GET_TOP_SPEC } from '../actions/types'

const initialState = {}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_TOP_SPEC:
      return {
        ...state,
        top_spec: actions.payload
      }
    default:
      return state
  }
}
