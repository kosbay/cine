
import { createSelector } from 'reselect';

import { getUserFacultyFromState, getUserFacultiesFromState, getFacultyFromState, getFacultiesFromState } from '../store/models';

const getFaculty = (state, props) => {
    const { facultyId } = props;
    const faculty = getFacultyFromState(facultyId, state);
    return faculty;
}

const getFaculties = (state) => {
  const faculties = getFacultiesFromState(state);
  return faculties;
}

const getUserFaculty = (state, props) => {
    const { facultyId } = props;
    const faculty = getUserFacultyFromState(facultyId, state);
    return faculty;
}

const getUserFaculties = (state) => {
  const faculties = getUserFacultiesFromState(state);
  return faculties;
};

const makeGetFacultySelector = () => createSelector(
    [getFaculty],
    faculty => faculty
);

const makeGetUserFacultySelector = () => createSelector(
    [getUserFaculty],
    userChapter => userChapter
);

const getFacultiesSelector = createSelector(
    [getFaculties],
    chapters => chapters
);

const getUserFacultiesSelector = createSelector(
    [getUserFaculties],
    chapters => chapters
);

export { 
  makeGetFacultySelector,
  makeGetUserFacultySelector,
  getFacultiesSelector,
  getUserFacultiesSelector
};