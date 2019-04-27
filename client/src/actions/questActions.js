import axios from 'axios'

import { GET_QUESTS } from './types';

export const getQuests = () => dispatch => {
  axios
    .get(`/api/quest`)
    .then(res =>
      dispatch({
        type: GET_QUESTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      })
    )
}

export const addQuest = data => dispatch => {
  axios
    .post(`/api/quest`, { quest: data })
    .then(res =>
      location.reload()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    )
}

export const addAns = id => dispatch => {
  console.log(id);
}
