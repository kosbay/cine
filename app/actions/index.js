import axios from 'axios';
import { normalize } from 'normalizr';

import config from 'config';
import {
  ADD_ENTITIES,
  SAVE_LINK,
  ENROLL_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  UPDATE_USER_COINS,
  LOGOUT_USER,
  REMOVE_ENTITIES,
} from './types';
import { EnrollmentStatus } from '../store/models';

const token = () => localStorage.getItem('token');

const headers = { headers: { Authorization: `Bearer ${token}` } };

export const loginUser = async (values, dispatch) => {
  const res = await axios.post(`${config.getBackendUrl()}/api/auth/login`, values);
  const newToken = res.data ? res.data.token : '';
  if (newToken.length > 0) {
    localStorage.setItem('token', newToken);
  }
  dispatch({ type: FETCH_USER_SUCCESS, payload: res.data.user });
};

export const logoutUser = (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT_USER });
  dispatch({ type: REMOVE_ENTITIES });
};

export const saveURLBeforLogin = (url, dispatch) => {
  dispatch({ type: SAVE_LINK, url });
};

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get(`${config.getBackendUrl()}/api/auth/current_user`, headers);
    dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_USER_ERROR, payload: err });
  }
};

export const saveCurrentUser = (user, dispatch) => {
  dispatch({ type: FETCH_USER_SUCCESS, payload: user });
};

export const saveEnrollmentStatusToRedux = (enrollmentStatus, dispatch) => {
  const normalizedEnrollmentStatus = normalize(enrollmentStatus, EnrollmentStatus);
  dispatch({ type: ADD_ENTITIES, payload: normalizedEnrollmentStatus.entities });
};

export const updateUserCoins = (coins, dispatch) => {
  dispatch({ type: UPDATE_USER_COINS, payload: coins });
};

export const enrollUser = (courseId, userId) => async (dispatch) => {
  const res = await axios.post(`${config.getBackendUrl()}/api/enrollment`, {
    ...headers,
    courseId,
    userId,
  });
  dispatch({ type: ENROLL_USER, payload: res.status });
};

export const savePricesToRedux = (prices, dispatch) => {
  dispatch({ type: ADD_ENTITIES, payload: prices });
};
