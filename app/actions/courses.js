import axios from 'axios';
import { normalize } from 'normalizr';
import { course, userCourse } from '../store/models';

import config from '../config';

import { ADD_ENTITIES, ENROLL_USER_IN_COURSE } from './types';

const token = () => localStorage.getItem('token');
const headers = { headers: { Authorization: `Bearer ${token}` } };

export const saveCourseToRedux = (courseData, dispatch) => {
  const normalizedData = normalize(courseData, course);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};

export const saveCoursesToRedux = (coursesData, dispatch) => {
  const normalizedData = normalize(coursesData, [course]);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};

export const saveCourseWithProgressToRedux = (courseData, dispatch) => {
  const normalizedData = normalize(courseData, userCourse);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};

export const saveCoursesWithProgressToRedux = (coursesData, dispatch) => {
  coursesData.map((oneCourse) => {
    const normalizedData = normalize(oneCourse, userCourse);
    dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
    return null;
  });
};

export const enrollUserInCourse = (courseId, dispatch) => {
  const res = axios.post(`${config.getBackendUrl()}/api/enrollment`, {
    ...headers,
    courseId,
  });
  dispatch({ type: ENROLL_USER_IN_COURSE, payload: res.status });
};
