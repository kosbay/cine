import { normalize } from 'normalizr';

import { UserCertificates } from '../store/models';
import { ADD_ENTITIES } from './types';

const saveUserCertificatesToRedux = userCertificates => (dispatch) => {
  const normalizedUserCertificates = normalize(userCertificates, [UserCertificates]);
  dispatch({ type: ADD_ENTITIES, payload: normalizedUserCertificates.entities });
};

export default saveUserCertificatesToRedux;
