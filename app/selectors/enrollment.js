import { createSelector } from 'reselect';

import { getEnrollmentStatusFromState } from '../store/models';

const getEnrollmentStatus = (state, props) => {
  const { id } = props;
  const enrollmentStatus = getEnrollmentStatusFromState(id, state);

  return enrollmentStatus;
}

const makeGetEnrollmentStatusSelector = () => createSelector(
  [getEnrollmentStatus],
  enrollmentStatus => enrollmentStatus
);

/* eslint-disable */
export { makeGetEnrollmentStatusSelector };
