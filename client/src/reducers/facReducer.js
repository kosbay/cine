import {
  ADD_FAC_SPEC,
  GET_FACS_BY_UNIVER,
  GET_SPECS_BY_UNIVER
} from '../actions/types'

const initialState = {}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_FAC_SPEC:
      return {
        ...state,
        success: actions.payload
      }
    case GET_FACS_BY_UNIVER:
      return {
        ...state,
        facs: actions.payload
      }
    case GET_SPECS_BY_UNIVER:
      return {
        ...state,
        specs: actions.payload
      }
    default:
      return state
  }
}
