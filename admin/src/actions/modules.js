import axios from "axios";

import { pushMessage, pushError } from "./messages";
import displayError from "./errorHelper";

import {
  FETCH_MODULES,
  FETCH_MODULE,
  ADD_MODULE,
  REMOVE_MODULE
} from "./types";

export const fetchModules = () => async dispatch => {
  try {
    const res = await axios.get("/api/modules");
    dispatch({ type: FETCH_MODULES, payload: res.data });
  } catch (err) {
    displayError(err, dispatch);
  }
};

export const fetchModule = id => async dispatch => {
  try {
    const res = await axios.get(`/api/modules/${id}`);
    dispatch({ type: FETCH_MODULE, payload: res.data, id });
  } catch (err) {
    displayError(err, dispatch);
  }
};

export const updateModule = (id, values) => async dispatch => {
  try {
    await axios.post(`/api/modules/${id}`, values);
    const res = await axios.get(`/api/modules/${id}`);
    dispatch({ type: FETCH_MODULE, payload: res.data, id });
    pushMessage(dispatch, "Successfully updated module");
  } catch (err) {
    displayError(err, dispatch);
  }
};

export const deleteModule = moduleId => async dispatch => {
  try {
    await axios.delete(`/api/modules/${moduleId}`);
    dispatch({ type: REMOVE_MODULE, payload: moduleId });
    pushMessage(dispatch, "Successfully deleted module");
  } catch (err) {
    displayError(err, dispatch);
  }
};

export const createModule = module => async dispatch => {
  await axios
    .post("/api/modules", module)
    .then(res => {
      dispatch({ type: ADD_MODULE, payload: res.data });
      pushMessage(dispatch, "Successfully created module");
    })
    .catch(error => {
      if (error.response) {
        if (error.response.data) {
          error.response.data.map(errMessage => {
            pushError(dispatch, errMessage.msg);
            return null;
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

export const createLessonInModule = (moduleId, values) => async dispatch => {
  try {
    const res = await axios.post(`/api/modules/${moduleId}/lessons`, values);
    dispatch({ type: FETCH_MODULE, payload: res.data, id: moduleId });
    pushMessage(dispatch, "Successfully created lesson");
  } catch (err) {
    displayError(err, dispatch);
  }
};

export const updateLessonInModule = (
  moduleId,
  lessonId,
  values
) => async dispatch => {
  try {
    const res = await axios.post(
      `/api/modules/${moduleId}/lessons/${lessonId}`,
      values
    );
    dispatch({ type: FETCH_MODULE, payload: res.data, id: moduleId });
    pushMessage(dispatch, "Successfully updated lesson values");
  } catch (err) {
    displayError(err, dispatch);
  }
};

export const deleteLessonInModule = (moduleId, lessonId) => async dispatch => {
  try {
    const res = await axios.delete(
      `/api/modules/${moduleId}/lessons/${lessonId}`
    );
    dispatch({ type: FETCH_MODULE, payload: res.data, id: moduleId });
  } catch (err) {
    displayError(err, dispatch);
  }
};

export const moveLessonInModule = ({
  lessonId,
  prevModule,
  nextModule
}) => async dispatch => {
  try {
    await axios.put(
      `/api/lesson/${lessonId}?prevModule=${prevModule}&nextModule=${nextModule}`
    );
  } catch (err) {
    displayError(err, dispatch);
  }
};
