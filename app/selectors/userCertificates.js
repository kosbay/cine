import { createSelector } from 'reselect';

import { getUserCertificatesFromState } from '../store/models';

const getUserCertificates = (state) => {
  const userCertificates = getUserCertificatesFromState(state);
  return userCertificates;
};

const makeGetUserCertificatesSelector = () => createSelector(
  [getUserCertificates],
  userCertificates => userCertificates
);

export default makeGetUserCertificatesSelector;
