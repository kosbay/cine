import axios from "axios";

import { pushError, pushMessage } from "./messages";

import {
  FETCH_SUBMISSIONS,
  FETCH_SUBMISSION,
  REMOVE_SUBMISSION
} from "./types";

export const fetchSubmissions = ({ page, username, status, lessonName }) => async dispatch => {
  try {
    const res = await axios.get("/api/submissions", {params: { page, username, status, lessonName }});
    dispatch({ type: FETCH_SUBMISSIONS, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const fetchSubmission = id => async dispatch => {
  try {
    const res = await axios.get(`/api/submissions/${id}`);
    dispatch({ type: FETCH_SUBMISSION, payload: res.data, id });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const updateSubmission = (id, values) => async dispatch => {
  try {
    const res = await axios.post(`/api/submissions/${id}`, values);
    dispatch({ type: FETCH_SUBMISSION, payload: res.data, id });
    pushMessage(dispatch, "Successfully updated submission");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const deleteSubmission = submissionId => async dispatch => {
  try {
    const res = await axios.delete(`/api/submissions/${submissionId}`);
    dispatch({ type: REMOVE_SUBMISSION, payload: submissionId });
    pushMessage(dispatch, "Successfully deleted submission");
    return res;
  } catch (err) {
    if (err.response) {
      return pushError(dispatch, err.response.data);
    }
    return pushError(dispatch, "Unspecified error");
  }
};
