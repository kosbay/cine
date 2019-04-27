import axios from "axios";

import { pushError, pushMessage } from "./messages";

import { FETCH_SKILLS, FETCH_SKILL, ADD_SKILL, REMOVE_SKILL } from "./types";

export const fetchSkills = () => async dispatch => {
  try {
    const res = await axios.get("/api/skills");
    dispatch({ type: FETCH_SKILLS, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const fetchSkill = id => async dispatch => {
  try {
    const res = await axios.get(`/api/skills/${id}`);
    dispatch({ type: FETCH_SKILL, payload: res.data, id });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const updateSkill = (id, values) => async dispatch => {
  try {
    const res = await axios.post(`/api/skills/${id}`, values);
    dispatch({ type: FETCH_SKILL, payload: res.data, id });
    pushMessage(dispatch, "Successfully updated skill");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const deleteSkill = skillId => async dispatch => {
  try {
    const res = await axios.delete(`/api/skills/${skillId}`);
    dispatch({ type: REMOVE_SKILL, payload: skillId });
    pushMessage(dispatch, "Successfully deleted skill");
    return res;
  } catch (err) {
    if (err.response) {
      return pushError(dispatch, err.response.data);
    }
    return pushError(dispatch, "Unspecified error");
  }
};

export const createSkill = skill => async dispatch => {
  try {
    const res = await axios.post("/api/skills", skill);
    dispatch({ type: ADD_SKILL, payload: res.data });
    pushMessage(dispatch, "Successfully created skill");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};
