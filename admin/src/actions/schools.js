import axios from "axios";

import { pushError, pushMessage } from "./messages";

import {
  FETCH_SCHOOLS,
  FETCH_SCHOOL,
  ADD_SCHOOL,
  FETCH_SCHOOLS_LIST,
  REMOVE_SCHOOL
} from "./types";

export const fetchSchools = page => async dispatch => {
  try {
    const res = await axios.get(`/api/schools?page=${page || 1}`);
    dispatch({ type: FETCH_SCHOOLS, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const fetchSchoolsList = () => async dispatch => {
  try {
    const res = await axios.get(`/api/schoolsList`);
    dispatch({ type: FETCH_SCHOOLS_LIST, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const fetchSchool = id => async dispatch => {
  try {
    const res = await axios.get(`/api/schools/${id}`);
    dispatch({ type: FETCH_SCHOOL, payload: res.data, id });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const updateSchool = (id, values) => async dispatch => {
  try {
    const res = await axios.post(`/api/schools/${id}`, values);
    dispatch({ type: FETCH_SCHOOL, payload: res.data, id });
    pushMessage(dispatch, "Successfully updated school");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const deleteSchool = schoolId => async dispatch => {
  try {
    const res = await axios.delete(`/api/schools/${schoolId}`);
    pushMessage(dispatch, "Successfully deleted school");
    dispatch({ type: REMOVE_SCHOOL, payload: schoolId });
    return res;
  } catch (err) {
    if (err.response) {
      return pushError(dispatch, err.response.data);
    }
    return pushError(dispatch, "Unspecified error");
  }
};

export const createSchool = school => async dispatch => {
  await axios
    .post("/api/schools", school)
    .then(res => {
      dispatch({ type: ADD_SCHOOL, payload: res.data });
      pushMessage(dispatch, "Successfully created school");
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
