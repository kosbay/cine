
import { createSelector } from 'reselect';

import { getLessonFromState, getUserLessonFromState } from '../store/models';

const getLesson = (state, props) => {
  const { lessonId } = props;
  const lesson = getLessonFromState(lessonId, state);

  return lesson;
};

const getUserLesson = (state, props) => {
  const { lessonId } = props;
  const lesson = getUserLessonFromState(lessonId, state);

  return lesson;
};

const makeGetLessonSelector = () => createSelector(
  [getLesson],
  lesson => lesson
);

const makeGetUserLessonSelector = () => createSelector(
  [getUserLesson],
  lesson => lesson
);

/* eslint-disable */
export { makeGetLessonSelector, makeGetUserLessonSelector };
