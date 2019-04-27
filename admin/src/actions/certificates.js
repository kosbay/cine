import axios from "axios";

import { pushError, pushMessage } from "./messages";

import {
  FETCH_CERTIFICATES,
  FETCH_CERTIFICATE,
  ADD_CERTIFICATE,
  REMOVE_CERTIFICATE
} from "./types";

export const fetchCertificates = () => async dispatch => {
  try {
    const res = await axios.get("/api/certificates");
    return dispatch({ type: FETCH_CERTIFICATES, payload: res.data });
  } catch (err) {
    if (err.response) {
      return pushError(dispatch, err.response.data);
    }

    return pushError(dispatch, "Unspecified error");
  }
};

export const fetchCertificate = id => async dispatch => {
  try {
    const res = await axios.get(`/api/certificates/${id}`);
    dispatch({ type: FETCH_CERTIFICATE, payload: res.data, id });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const updateCertificate = (id, values) => async dispatch => {
  try {
    const res = await axios.put(`/api/certificates/${id}`, values);
    dispatch({ type: FETCH_CERTIFICATE, payload: res.data, id });
    pushMessage(dispatch, "Successfully updated certificate");
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const deleteCertificate = certificateId => async dispatch => {
  try {
    const res = await axios.delete(`/api/certificates/${certificateId}`);
    pushMessage(dispatch, "Successfully deleted certificate");
    dispatch({ type: REMOVE_CERTIFICATE, payload: certificateId });
    return res;
  } catch (err) {
    if (err.response) {
      return pushError(dispatch, err.response.data);
    }
    return pushError(dispatch, "Unspecified error");
  }
};

export const createCertificate = certificate => async dispatch => {
  await axios
    .post("/api/certificates", certificate)
    .then(res => {
      dispatch({ type: ADD_CERTIFICATE, payload: res.data });
      pushMessage(dispatch, "Successfully created certificate");
    })
    .catch(error => {
      if (error.response) {
        if (error.response.data) {
          error.response.data.map(errMessage => {
            pushError(dispatch, errMessage.msg);
          });
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};
