import axios from "axios";

import { pushError, pushMessage } from "./messages";

import {
  FETCH_NOTIFICATION_MESSAGES, ADD_NOTIFICATION_MESSAGE,
  FETCH_NOTIFICATIONS, ADD_NOTIFICATION
} from "./types";

export const fetchNotificationMessages = type => async dispatch => {
  try {
    let query = "";
    if(type){
      query = `?type=${type}`
    }
    const res = await axios.get(`/api/notificationMessages${query}`);
    dispatch({ type: FETCH_NOTIFICATION_MESSAGES, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const createNotificationMessages = notificationMessage => async dispatch => {
  await axios
    .post("/api/notificationMessage", notificationMessage)
    .then(res => {
      dispatch({ type: ADD_NOTIFICATION_MESSAGE, payload: res.data });
      pushMessage(dispatch, "Successfully created Notification Messages");
    })
    .catch(error => {
      console.log(error)
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

export const fetchNotifications = () => async dispatch => {
  try {
    
    const res = await axios.get("/api/notifications");
    dispatch({ type: FETCH_NOTIFICATIONS, payload: res.data });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export const createNotification = (notificationMessage, recieverType) => async dispatch => {
  await axios
    .post(`/api/notification?recieverType=${recieverType}`, notificationMessage)
    .then(res => {
      dispatch({ type: ADD_NOTIFICATION, payload: res.data });
      pushMessage(dispatch, "Successfully created Notification");
    })
    .catch(error => {
      console.log(error)
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