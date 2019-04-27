import { ADD_ERROR, ADD_MESSAGE, REMOVE_MESSAGE } from "./types";

const pushError = (dispatch, errorMessage) =>
  dispatch({
    type: ADD_ERROR,
    payload: errorMessage
  });

const pushMessage = (dispatch, message) =>
  dispatch({
    type: ADD_MESSAGE,
    payload: message
  });

const removeMessage = () => async dispatch => {
  dispatch({ type: REMOVE_MESSAGE });
};

export { pushError, pushMessage, removeMessage };
