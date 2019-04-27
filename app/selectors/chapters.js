import { createSelector } from 'reselect';

import { getUserChapterFromState, getChapterFromState } from '../store/models';

const getChapters = state => state.chapters;
const getUserChapters = state => state.userChapters;

const getChapter = (state, props) => {
  const { chapterId } = props;
  const chapter = getChapterFromState(chapterId, state);
  return chapter;
};

const getUserChapter = (state, props) => {
  const { chapterId } = props;
  const chapter = getUserChapterFromState(chapterId, state);
  return chapter;
};

const makeGetChapterSelector = () => createSelector(
  [getChapter],
  chapter => chapter
);

const makeGetUserChapterSelector = () => createSelector(
  [getUserChapter],
  userChapter => userChapter
);

const getChaptersSelector = createSelector(
  [getChapters],
  chapters => chapters
);

const getUserChaptersSelector = createSelector(
  [getUserChapters],
  chapters => chapters
);

export {
  makeGetChapterSelector,
  makeGetUserChapterSelector,
  getChaptersSelector,
  getUserChaptersSelector,
};
