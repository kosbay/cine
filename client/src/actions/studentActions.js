import axios from 'axios';
import { fileserver } from '../constants';

import {
  GET_ERRORS,
  SUCCESS,
  GET_STUDENT
} from './types';

export const getStudent = () => dispatch => {
  axios
    .get(`/api/student`)
    .then(res =>
      dispatch({
        type: GET_STUDENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const addStudent = data => dispatch => {
  axios
    .post(`/api/student`, data)
    .then(res =>
      location.reload()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
