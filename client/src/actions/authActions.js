import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { fileserver } from '../constants';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_NEWPASSWORD_EMAIL,
  RESET_PASSWORD,
  CLEAR_ERRORS,
  CLEAR_CURRENT_PROFILE
} from './types'

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/auth/registration', userData)
    .then(res => history.push('/auth/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const registerUniver = (userData, profileData, filesData, history) => dispatch => {
  axios
    .post('/api/auth/registration', userData)
    .then(res => {
        const _id = res.data._id
        const photos = [];
        const photo = new FormData()
        photo.append('file', filesData[0])
        axios
          .post(`http://${fileserver}:9999/upload/image`, photo, {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          })
          .then(res => {
            const photo = res.data
            axios
              .post('/api/auth/profile', {
                profileData,
                photo,
                _id
              })
              .then(res => history.push('/auth/login'))
          })
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          )
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const loginUser = userData => dispatch => {
  axios
    .post('/api/auth/login', userData)
    .then(res => {
      const {token} = res.data;
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const sendToken = (email, history) => dispatch => {
  axios
    .post('/api/reset/sendToken', {
      email
    })
    .then(res => {
      dispatch({
        type: SET_NEWPASSWORD_EMAIL,
        payload: email
      })

      history.push('/auth/sendedpass')

    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const resetPassword = (obj, history) => dispatch => {
  axios.post('/api/reset', {
    token: obj.token,
    newPassword: obj.password,
    newPassword2: obj.password2
  })
    .then(res => history.push('/auth/login'))
    .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    )
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false)
  dispatch(setCurrentUser({}))
  if(history) {
    history.push('/')
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}
