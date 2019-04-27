import { createSelector } from 'reselect';

import { getUserSubscriptionsFromState } from '../store/models';

const getUserSubscriptions = (state) => {
  const userSubscriptions = getUserSubscriptionsFromState(state);
  return userSubscriptions;
};

const getUserSubscriptionsSelector = () => createSelector(
  [getUserSubscriptions],
  userSubscriptions => userSubscriptions
);

export default getUserSubscriptionsSelector;
