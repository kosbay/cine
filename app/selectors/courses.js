
import { createSelector } from 'reselect';

const getCourses = state => state.courses;
const getUsersCourses = state => state.userCourses;

const getCourse = (state, props) => {
  const { courseId } = props;
  const courses = getCourses(state);
  const course = Object.keys(courses).filter(id => `${id}`.localeCompare(`${courseId}`) === 0)[0];
  return course;
};

const getUserCourse = (state, props) => {
  const { courseId } = props;
  const courses = getUsersCourses(state);
  const course = Object.keys(courses).filter(id => `${id}`.localeCompare(`${courseId}`) === 0)[0];
  return course;
};

const makeGetCourseSelector = () => createSelector(
  [getCourse],
  course => course
);

const makeGetUserCourseSelector = () => createSelector(
  [getUserCourse],
  userCourse => userCourse
);

const getCoursesSelector = createSelector(
  [getCourses],
  courses => courses
);

const getUserCoursesSelector = createSelector(
  [getUsersCourses],
  userCourses => userCourses
);

export {
  makeGetCourseSelector, makeGetUserCourseSelector, getCoursesSelector, getUserCoursesSelector,
};
