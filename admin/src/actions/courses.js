import axios from "axios";

import { pushError, pushMessage } from "./messages";

import {
  FETCH_COURSES,
  FETCH_COURSE,
  ADD_COURSE,
  REMOVE_COURSE
} from "./types";

export const fetchCourses = () => async dispatch => {
  try {
    const res = await axios.get("/api/courses");
    dispatch({ type: FETCH_COURSES, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const fetchCourse = id => async dispatch => {
  try {
    const res = await axios.get(`/api/courses/${id}`);
    dispatch({ type: FETCH_COURSE, payload: res.data, id });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const updateCourse = (id, values) => async dispatch => {
  try {
    const res = await axios.post(`/api/courses/${id}`, values);
    dispatch({ type: FETCH_COURSE, payload: res.data, id });
    pushMessage(dispatch, "Successfully updated course");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const deleteCourse = courseId => async dispatch => {
  try {
    const res = await axios.delete(`/api/courses/${courseId}`);
    dispatch({ type: REMOVE_COURSE, payload: courseId });
    pushMessage(dispatch, "Successfully deleted course");
    return res;
  } catch (err) {
    if (err.response) {
      return pushError(dispatch, err.response.data);
    }
    return pushError(dispatch, "Unspecified error");
  }
};

export const createCourse = course => async dispatch => {
  axios
    .post("/api/courses", course)
    .then(res => {
      dispatch({ type: ADD_COURSE, payload: res.data });
      pushMessage(dispatch, "Successfully created course");
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
