import axios from "axios";

import { pushError, pushMessage } from "./messages";

import { FETCH_SELF } from "./types";

import LocalStorageUtils from '../utils/LocalStorageUtils';

axios.interceptors.request.use((config) => {
  // Do something before request is sent
  const token = LocalStorageUtils.get('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    ...config.headers
  } 

  const newConfig = { ...config, headers};
  return newConfig;
}, (error) => 
  // Do something with request error
  Promise.reject(error)
);

export const registerUser = (values, history) => async dispatch => {
  try {
    const res = await axios.post("/api/auth/register", values);
    history.push("/");
    dispatch({ type: FETCH_SELF, payload: res.data.user });
    pushMessage(dispatch, "Successfully registered user");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const loginUser = (values, history) => async dispatch => {
  try {
    const res = await axios.post("/api/auth/login", values);
    history.push("/");
    const { token } = res.data;
    LocalStorageUtils.save({key: 'token', value: token});
    dispatch({ type: FETCH_SELF, payload: res.data.user });
    pushMessage(dispatch, "Successfully logged in user");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const logout = dispatch => {
  try {
    LocalStorageUtils.remove('token');
    dispatch({ type: FETCH_SELF, payload: null });
  } catch (err) {
      pushError(dispatch, "Unspecified error");
  }
}

export const fetchSelf = () => async dispatch => {
  try {
    const token = LocalStorageUtils.get('token');
    if (!token) {
      pushError(dispatch, 'Unauthorized');
      return;
    }

    const res = await axios.get("/api/auth/current_user");
    dispatch({ type: FETCH_SELF, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const redirectToLogin = (history) => async dispatch => {
  history.push("/");
  pushError(dispatch, "Please sign in to continue!");
}
