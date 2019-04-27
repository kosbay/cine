import axios from "axios";

import { pushError, pushMessage } from "./messages";

import {
  FETCH_CHAPTERS,
  FETCH_CHAPTER,
  ADD_CHAPTER,
  REMOVE_CHAPTER
} from "./types";

export const fetchChapters = () => async dispatch => {
  try {
    const res = await axios.get("/api/chapters");
    dispatch({ type: FETCH_CHAPTERS, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const fetchChapter = id => async dispatch => {
  try {
    const res = await axios.get(`/api/chapters/${id}`);
    dispatch({ type: FETCH_CHAPTER, payload: res.data, id });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const updateChapter = (id, values) => async dispatch => {
  try {
    const res = await axios.post(`/api/chapters/${id}`, values);
    dispatch({ type: FETCH_CHAPTER, payload: res.data, id });
    pushMessage(dispatch, "Successfully updated chapter");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const deleteChapter = chapterId => async dispatch => {
  try {
    const res = await axios.delete(`/api/chapters/${chapterId}`);
    pushMessage(dispatch, "Successfully deleted chapter");
    dispatch({ type: REMOVE_CHAPTER, payload: chapterId });
    return res;
  } catch (err) {
    if (err.response) {
      return pushError(dispatch, err.response.data);
    }
    return pushError(dispatch, "Unspecified error");
  }
};

export const createChapter = chapter => async dispatch => {
  await axios
    .post("/api/chapters", chapter)
    .then(res => {
      dispatch({ type: ADD_CHAPTER, payload: res.data });
      pushMessage(dispatch, "Successfully created chapter");
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
