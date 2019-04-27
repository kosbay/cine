import { createSelector } from 'reselect';

import { getUserCreditCardFromState } from '../store/models';

const getUserCreditCard = (state, props) => {
  const { userId } = props;
  const userCreditCard = getUserCreditCardFromState(userId, state);

  return userCreditCard;
};

const makeGetUserCreditCardSelector = () => createSelector(
  [getUserCreditCard],
  userCreditCard => userCreditCard
);


export {
  makeGetUserCreditCardSelector,
};
