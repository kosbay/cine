import { FETCH_TARIFFS, ADD_TARIFF, REMOVE_TARIFF } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TARIFFS:
      return action.payload;
    case ADD_TARIFF:
      return [...state, action.payload];
    case REMOVE_TARIFF:
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}
