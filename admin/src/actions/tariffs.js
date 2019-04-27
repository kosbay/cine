import axios from "axios";

import { pushError, pushMessage } from "./messages";

import { FETCH_TARIFFS, FETCH_TARIFF, ADD_TARIFF, REMOVE_TARIFF } from "./types";

export const fetchTariffs = () => async dispatch => {
  try {
    const res = await axios.get("/api/tariffs");
    dispatch({ type: FETCH_TARIFFS, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const fetchTariff = id => async dispatch => {
  try {
    const res = await axios.get(`/api/tariff/${id}`);
    dispatch({ type: FETCH_TARIFF, payload: res.data, id });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const updateTariff = (id, values) => async dispatch => {
  try {
    const res = await axios.put(`/api/tariff/${id}`, values);
    dispatch({ type: FETCH_TARIFF, payload: res.data, id });
    pushMessage(dispatch, "Successfully updated tariff");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const deleteTariff = tariffId => async dispatch => {
  try {
    const res = await axios.delete(`/api/tariff/${tariffId}`);
    dispatch({ type: REMOVE_TARIFF, payload: tariffId });
    pushMessage(dispatch, "Successfully deleted tariff");
    return res;
  } catch (err) {
    if (err.response) {
      return pushError(dispatch, err.response.data);
    }
    return pushError(dispatch, "Unspecified error");
  }
};

export const createTariff = tariff => async dispatch => {
  try {
    const res = await axios.post("/api/tariff", tariff);
    dispatch({ type: ADD_TARIFF, payload: res.data });
    pushMessage(dispatch, "Successfully created tariff");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};
