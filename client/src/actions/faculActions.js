import axios from 'axios';
import { fileserver } from '../constants';

import {
  GET_ERRORS,
  SUCCESS,
  GET_FACS_BY_UNIVER,
  GET_SPECS_BY_UNIVER
} from './types'

export const getFacsByUniver = id => dispatch => {
  axios
    .get(`/api/facul/fac/${id}`)
    .then(res =>{
      dispatch({
        type: GET_FACS_BY_UNIVER,
        payload: res.data
      })}
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    )
}

export const getSpecsByUniver = id => dispatch => {
  axios
    .get(`/api/facul/spec/${id}`)
    .then(res =>
      dispatch({
        type: GET_SPECS_BY_UNIVER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    )
}

export const getSpecsByFac = id => dispatch => {
  axios
    .get(`/api/facul/spec_by_f/${id}`)
    .then(res =>{
      dispatch({
        type: GET_SPECS_BY_UNIVER,
        payload: res.data
      })}
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    )
}

export const addFacSpec = (fac, specs) => dispatch => {
  axios
    .post('/api/facul/add_fac', { fac, specs })
    .then(res =>
      dispatch({
        type: SUCCESS
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const changeSpec = (id, data) => dispatch => {
  axios
    .put(`/api/facul/put_spec/${id}`, data)
    .then(res =>
      location.reload()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    )
}

export const deleteSpec = id => dispatch => {
  axios
    .delete(`/api/facul/delete_spec/${id}`)
    .then(res =>
      dispatch({
        type: SUCCESS
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    )
}

export const deleteFac = id => dispatch => {
  axios
    .delete(`/api/facul/delete_fac/${id}`)
    .then(res =>
      dispatch({
        type: SUCCESS
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    )
}
