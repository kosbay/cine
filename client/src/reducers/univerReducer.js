import {
  GET_UNIVER,
  GET_TOP_UNIVERS,
  GET_UNIVERS,
  GET_COUNT,
  GET_CURRENT_UNIVER,
  ADD_FAC_SPEC,
  GET_FACS_BY_UNIVER,
  GET_SPECS_BY_UNIVER
} from '../actions/types'

const initialState = {}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_UNIVER:
      return {
        ...state,
        univer: actions.payload
      }
    case GET_TOP_UNIVERS:
      return {
        ...state,
        top_univers: actions.payload
      }
    case GET_UNIVERS:
      return {
        ...state,
        univers: actions.payload
      }
    case GET_COUNT:
      return {
        ...state,
        count: actions.payload
      }
    case GET_CURRENT_UNIVER:
      return {
        ...state,
        profile: actions.payload
      }
    default:
      return state
  }
}
