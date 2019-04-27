import axios from 'axios';
import config from '../config';

import { FETCH_USERS_BY_RANK, FETCH_SCHOOLS_BY_RANK } from './types';

const token = () => localStorage.getItem('token');

const headers = { headers: { Authorization: `Bearer ${token}` } };

export const fetchUsersByRank = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${config.getBackendUrl()}/api/users`, {
      ...headers,
      params: { sortByWupai: -1 },
    });

    dispatch({ type: FETCH_USERS_BY_RANK, payload: data });
  } catch (err) {
    // TODO: handle error
  }
};

export const fetchSchoolsByRank = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${config.getBackendUrl()}/api/schools`, {
      ...headers,
      params: { sortByWupai: -1 },
    });

    dispatch({ type: FETCH_SCHOOLS_BY_RANK, payload: data });
  } catch (err) {
    // TODO: handle error
  }
};
