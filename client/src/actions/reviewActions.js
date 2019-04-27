import axios from 'axios'

import { GET_REVIEWS, SUCCESS, GET_ERRORS, GET_COUNT_REVS } from './types';

export const getReviews = id => dispatch => {
  axios
    .get(`/api/review/${id}`)
    .then(res =>
      dispatch({
        type: GET_REVIEWS,
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

export const getCountRevs = id => dispatch => {
  axios
    .get(`/api/review/count/${id}`)
    .then(res =>
      dispatch({
        type: GET_COUNT_REVS,
        payload: res.data
      })
    )
}

export const addReview = (data, id) => dispatch => {
  axios
    .post(`/api/review`, {
      data,
      id
     })
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
