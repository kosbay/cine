import axios from 'axios';
import { fileserver } from '../constants';

import {
  GET_UNIVER,
  GET_TOP_UNIVERS,
  GET_UNIVERS,
  GET_COUNT,
  GET_ERRORS,
  GET_CURRENT_UNIVER,
  SUCCESS
} from './types'

export const getUniver = () => dispatch => {
  axios
    .get(`/api/univer`)
    .then(res =>
      dispatch({
        type: GET_UNIVER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_UNIVER,
        payload: null
      })
    )
}

export const getUniverById = _id => dispatch => {
  axios
    .get(`/api/univer/one/${_id}`)
    .then(res =>
      dispatch({
        type: GET_UNIVER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_UNIVER,
        payload: null
      })
    )
}

export const getTopUnivers = () => dispatch => {
  axios
    .get('/api/univer/top')
    .then(res =>
      dispatch({
        type: GET_TOP_UNIVERS,
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

export const getUnivers = () => dispatch => {
  axios
    .get('/api/univer/all')
    .then(res =>
      dispatch({
        type: GET_UNIVERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_UNIVERS,
        payload: null
      })
    )
}

export const getCount = () => dispatch => {
  axios
    .get('/api/univer/count')
    .then(res => {
      dispatch({
        type: GET_COUNT,
        payload: res.data
      })
    })
}

export const getCurrentUniversityProfile = () => dispatch => {
  axios
    .get('/api/univer')
    .then(res =>
      dispatch({
        type: GET_CURRENT_UNIVER,
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

export const createUniverProfile = (profileData, filesData, history) => dispatch => {
  axios
    .post('/api/univer/profile', profileData)
    .then(res => {
      if(filesData.length > 0) {
        filesData.forEach((file, i) => {
          const photo = new FormData()
          photo.append('file', file)
          axios
            .post(`http://${fileserver}:9999/upload/image`, photo, {
              headers: { "X-Requested-With": "XMLHttpRequest" }
            })
            .then(res => {
              if(i === 0) {
                axios
                  .put('/api/univer/add_logo', res.data)
                  .then(res => {

                  })
                  .catch(err =>
                    dispatch({
                      type: GET_ERRORS,
                      payload: { files: 'Файлы должны отправлены в JPEG или JPG.' }
                    })
                  )
              }
              if(i === 1) {
                axios
                  .put('/api/univer/add_wall', res.data)
                  .then(res =>
                    history.push('/univer/profile/')
                  )
                  .catch(err =>
                    dispatch({
                      type: GET_ERRORS,
                      payload: { files: 'Файлы должны отправлены в JPEG или JPG.' }
                    })
                  )
              }
            })
        })
      } else {
        location.reload()
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const changeLogo = data => dispatch => {
  const file = new FormData()
  file.append('file', data[0])
  axios
    .post(`http://${fileserver}:9999/upload/image`, file)
    .then(res =>
      axios
        .put(`/api/univer/add_logo`, res.data)
        .then(res =>
          location.reload()
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        )
    )
}

export const changePhoto = data => dispatch => {
  const file = new FormData()
  file.append('file', data[0])
  axios
    .post(`http://${fileserver}:9999/upload/image`, file)
    .then(res =>
      axios
        .put(`/api/univer/add_wall`, res.data)
        .then(res =>
          location.reload()
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        )
    )
}

export const changeDesc = desc => dispatch => {
  axios
    .put(`/api/univer/edit_desc`, { desc })
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

const sendData = (profile, logo, dispatch, history) => {
  axios
    .post('/api/univer/profile', {
      profile,
      logo
    })
    .then(res =>
      getCurrentUniversityProfile()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
