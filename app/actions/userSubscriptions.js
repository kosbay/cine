import { normalize } from 'normalizr';

import { UserSubscriptions } from '../store/models';
import { ADD_ENTITIES } from './types';

export const saveUserSubscriptionsToRedux = userSubscriptions => (dispatch) => {
  const normalizedData = normalize(userSubscriptions, [UserSubscriptions]);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};
