import axios from "axios";

import { pushError, pushMessage } from "./messages";

import {
  FETCH_CONTESTS,
  UPDATE_CONTEST,
  ADD_CONTEST,
  REMOVE_CONTEST
} from "./types";

export const fetchContests = () => async dispatch => {
  try {
    const res = await axios.get("/api/contests");
    dispatch({ type: FETCH_CONTESTS, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const updateContest = (id, values) => async dispatch => {
  try {
    const res = await axios.post(`/api/contest/${id}`, values);
    dispatch({ type: UPDATE_CONTEST, payload: res.data, id });
    pushMessage(dispatch, "Successfully updated contest");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const deleteContest = contestID => async dispatch => {
  try {
    const res = await axios.delete(`/api/contest/${contestID}`);
    pushMessage(dispatch, "Successfully deleted contest");
    dispatch({ type: REMOVE_CONTEST, payload: contestID });
    return res;
  } catch (err) {
    if (err.response) {
      return pushError(dispatch, err.response.data);
    }
    return pushError(dispatch, "Unspecified error");
  }
};

export const createContest = contest => async dispatch => {
  await axios
    .post("/api/contest", contest)
    .then(res => {
      dispatch({ type: ADD_CONTEST, payload: res.data });
      pushMessage(dispatch, "Successfully created contest");
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
