import { normalize } from 'normalizr';
import { userLesson, lesson } from '../store/models';

import { ADD_ENTITIES } from './types';

export const updateLessonLocally = (newLesson, dispatch) => {
  const normalizedData = normalize(newLesson, userLesson);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};

export const saveLessonToRedux = (lessonData, dispatch) => {
  const normalizedData = normalize(lessonData, lesson);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};
