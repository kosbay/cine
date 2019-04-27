import { createSelector } from 'reselect';

import { getUserSkillsFromState } from '../store/models';

const getUserSkills = (state, props) => {
  const { userId } = props;
  const userSkills = getUserSkillsFromState(userId, state);
  return userSkills;
}

const makeGetUserSkillsSelector = () => createSelector(
  [getUserSkills],
  userSkills => userSkills
);

export default makeGetUserSkillsSelector;
