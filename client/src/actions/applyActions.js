import axios from 'axios';
import { fileserver } from '../constants';

import { GET_ERRORS, SUCCESS, GET_APPLIES } from './types'

export const getAppliesByUniver = univer_id => dispatch => {
  axios
    .get(`/api/apply/${univer_id}`)
      .then(res =>
        dispatch({
          type: GET_APPLIES,
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

export const getAppliesByUser = () => dispatch => {
  axios
    .get(`/api/apply`)
      .then(res =>
        dispatch({
          type: GET_APPLIES,
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

export const approved = id => dispatch => {
  axios
    .put(`/api/apply/app/${id}`)
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

export const refuse = (id, reason) => dispatch => {
  axios
    .put(`/api/apply/${id}`, { reason })
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

export const createApply = (checkout, cardData, applyData, filesData, history) => dispatch => {
    console.log(filesData, 69)
  if((filesData && filesData.length === 5) || (applyData.sex === 'female' && filesData.length === 4)) {
    axios
      .post('/api/apply', applyData)
      .then(app => {
        let i = 1;
        filesData.forEach(file => {
          const photo = new FormData()
          photo.append('file', file)
          axios
            .post(`http://${fileserver}:9999/upload/image`, photo, {
              headers: { "X-Requested-With": "XMLHttpRequest" }
            })
            .then(file => {
              axios
                .put(`/api/apply/add_docs/${app.data._id}`, file.data)
                .then(res => {
                  if(i === 5 || (applyData.sex === 'female' && i === 4)) {
                      console.log(i, 88)
                    const result = checkout.createCryptogramPacket()
                    if (result.success) {
                      axios
                        .post(`/api/payment/pay`, {
                          cryptogram: result.packet,
                          cardData
                        })
                        .then(res => {
                          if(res.data.done) {
                            history.push('/student/done')
                          } else {
                            acsUrl(res.data).then(data => {
                              data.submit()
                            })
                          }
                        })
                        .catch(err => {
                          deleteApply(app.data._id);
                          dispatch({
                            type: GET_ERRORS,
                            payload: { error: 'Ошибка при оплате'}
                          })
                        })
                    } else {
                      deleteApply(app.data._id);
                      dispatch({
                        type: GET_ERRORS,
                        payload: { error: 'Ошибка при оплате'}
                      })
                    }
                  }
                  i++
                })
                .catch(err =>
                  dispatch({
                    type: GET_ERRORS,
                    payload: { error: 'Файлы должны быть отправлены в JPEG или JPG.' }
                  })
                )
            })
        })
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: { error: 'Вы загрузили не все документы'}
    })
  }
}

const deleteApply = id => {
    console.log(id, 144)
    axios
        .delete(`/api/apply/${id}`)
        .then(res =>
            console.log(res.data, 147)
        )
        .catch(err =>
            console.log(err.response.data)
        )
}

const acsUrl = (data) => {
  return new Promise((resolve, reject) => {
    var g = document.createElement('form')
    g.setAttribute('action', data.AcsUrl)
    g.setAttribute('method', 'POST')
    g.innerHTML = ` <input type="hidden" name="PaReq" value="${data.PaReq}">
                    <input type="hidden" name="MD" value="${data.TransactionId}">
                    <input type="hidden" name="TermUrl" value="http://localhost:3000/api/payment/finish/">`
    resolve(document.body.appendChild(g))
  })
}
