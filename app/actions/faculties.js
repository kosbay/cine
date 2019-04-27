import axios from 'axios';
import { normalize } from 'normalizr';
import { faculty, userFaculty } from '../store/models';

import config from '../config';

import { ADD_ENTITIES, ENROLL_USER_IN_FACULTY } from './types';

const token = () => localStorage.getItem('token');
const headers = { headers: { Authorization: `Bearer ${token}` } };
// schemas
export const saveFacultiesToRedux = (faculties, dispatch) => {
  const normalizedData = normalize(faculties, [faculty]);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};

export const saveFacultyToRedux = (faculties, dispatch) => {
  const normalizedData = normalize(faculties, faculty);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};

export const fetchFaculty = id => async (dispatch) => {
  const res = await axios.get(`${config.getBackendUrl()}/api/faculties/${id}`, {
    ...headers,
    params: { populateCourses: 1 },
  });

  const normalizedData = normalize(res.data, faculty);

  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};

export const saveFacultiesWithProgressToRedux = (facultiesData, dispatch) => {
  facultiesData.map((oneFaculty) => {
    const normalizedData = normalize(oneFaculty, userFaculty);
    dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
    return null;
  });
};

export const enrollUserInFaculty = facultyId => async (dispatch) => {
  const res = await axios.post(`${config.getBackendUrl()}/api/enrollment/faculties`, {
    ...headers,
    facultyId,
  });
  dispatch({ type: ENROLL_USER_IN_FACULTY, payload: res.data });
};
