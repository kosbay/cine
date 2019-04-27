import { normalize } from 'normalizr';

import { UserSkills } from '../store/models';
import { ADD_ENTITIES } from './types';

const saveUserSkillsToRedux = userSkills => (dispatch) => {
  const normalizedUserSkills = normalize(userSkills, UserSkills);
  dispatch({ type: ADD_ENTITIES, payload: normalizedUserSkills.entities });
};

export default saveUserSkillsToRedux;
