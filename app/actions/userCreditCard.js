import { normalize } from 'normalizr';

import { UserCreditCard } from '../store/models';
import { ADD_ENTITIES } from './types';

export const saveUserCreditCardToRedux = (userCreditCardData, dispatch) => {
  const normalizedData = normalize(userCreditCardData, [UserCreditCard]);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};
