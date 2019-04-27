import axios from 'axios';

import { GET_TOP_SPEC, GET_ERRORS } from './types'

export const getTopSpec = () => dispatch => {
  axios
    .get('/api/facul/top')
    .then(res =>
      dispatch({
        type: GET_TOP_SPEC,
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
