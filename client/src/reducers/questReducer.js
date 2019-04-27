import { GET_QUESTS } from '../actions/types'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTS:
      return {
        ...state,
        quests: action.payload
      }
    default:
      return state;
  }
}
