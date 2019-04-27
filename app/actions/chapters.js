import axios from 'axios';
import { normalize } from 'normalizr';
import { chapter, userChapter } from '../store/models';

import config from '../config';

import { ADD_ENTITIES } from './types';

const token = () => localStorage.getItem('token');
const headers = { headers: { Authorization: `Bearer ${token}` } };

export const fetchUserChapterWithProgress = (
  userId,
  chapterId
) => async (dispatch) => {
  const res = await axios.get(`${config.getBackendUrl()}/api/progress/getChapterWithProgress`, {
    ...headers,
    params: { userId, chapterId },
  });
  const normalizedData = normalize(res.data, userChapter);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};

export const saveUserChapterToRedux = (chapterData, dispatch) => {
  const normalizedData = normalize(chapterData, userChapter);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};

export const saveChapterToRedux = (chapterData, dispatch) => {
  const normalizedData = normalize(chapterData, chapter);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};
