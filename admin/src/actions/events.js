import axios from "axios";

import { pushMessage } from "./messages";
import displayError from "./errorHelper";

import {
  FETCH_EVENTS,
  FETCH_EVENT,
  ADD_EVENT,
  REMOVE_EVENT,
  UPDATE_EVENT
} from "./types";

export const fetchEvents = () => async dispatch => {
  try {
    const res = await axios.get("/api/events");
    dispatch({ type: FETCH_EVENTS, payload: res.data });
  } catch (err) {
    displayError(err, dispatch);
  }
};

export const fetchEvent = eventId => async dispatch => {
  try {
    const res = await axios.get(`/api/event/${eventId}`);
    dispatch({ type: FETCH_EVENT, payload: res.data });
  } catch (err) {
    displayError(err, dispatch);
  }
};

export const createEvent = event => async dispatch => {
  try {
    const res = await axios.post("/api/event", event);
    dispatch({ type: ADD_EVENT, payload: res.data });
    pushMessage(dispatch, "Successfully created event");
  } catch (err) {
    displayError(err, dispatch);
  }
};

export const updateEvent = (id, values) => async dispatch => {
  try {
    const res = await axios.post(`/api/event/${id}`, values);
    dispatch({ type: UPDATE_EVENT, payload: res.data, id });
    pushMessage(dispatch, "Successfully updated event");
  } catch (err) {
    if (err) {
      displayError(err, dispatch);
    }
  }
};

export const deleteEvent = eventId => async dispatch => {
  try {
    await axios.delete(`/api/event/${eventId}`);
    dispatch({ type: REMOVE_EVENT, payload: eventId });
    pushMessage(dispatch, "Successfully deleted event");
  } catch (err) {
    displayError(err, dispatch);
  }
};
