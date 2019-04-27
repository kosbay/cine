import axios from "axios";

import { pushError, pushMessage } from "./messages";

import {
  FETCH_FACULTIES,
  FETCH_FACULTY,
  ADD_FACULTY,
  REMOVE_FACULTY
} from "./types";

export const fetchFaculties = () => async dispatch => {
  try {
    const res = await axios.get("/api/faculties");
    dispatch({ type: FETCH_FACULTIES, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const fetchFaculty = id => async dispatch => {
  try {
    const res = await axios.get(`/api/faculties/${id}`);
    dispatch({ type: FETCH_FACULTY, payload: res.data, id });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const updateFaculty = (id, values) => async dispatch => {
  try {
    const res = await axios.post(`/api/faculties/${id}`, values);
    dispatch({ type: FETCH_FACULTY, payload: res.data, id });
    pushMessage(dispatch, "Successfully updated faculty");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const deleteFaculty = facultyId => async dispatch => {
  try {
    const res = await axios.delete(`/api/faculties/${facultyId}`);
    pushMessage(dispatch, "Successfully deleted faculty");
    dispatch({ type: REMOVE_FACULTY, payload: facultyId });
    return res;
  } catch (err) {
    if (err.response) {
      return pushError(dispatch, err.response.data);
    }
    return pushError(dispatch, "Unspecified error");
  }
};

export const createFaculty = faculty => async dispatch => {
  axios
    .post("/api/faculties", faculty)
    .then(res => {
      dispatch({ type: ADD_FACULTY, payload: res.data });
      pushMessage(dispatch, "Successfully created faculty");
    })
    .catch(error => {
      if (error.response) {
        if (error.response.data) {
          error.response.data.map(errMessage => {
            pushError(dispatch, errMessage.msg);
          });
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};
