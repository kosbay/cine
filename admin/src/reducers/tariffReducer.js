import { FETCH_TARIFF } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TARIFF:
      return { ...state, [action.id]: action.payload };
    default:
      return state;
  }
}
