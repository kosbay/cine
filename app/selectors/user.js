import { createSelector } from 'reselect';

const getCurrentUser = (state) => {
  const currentUser = state.auth.user;
  return currentUser;
};

const getCurrentUserSelector = createSelector(
  [getCurrentUser],
  currentUser => currentUser
);

export { getCurrentUserSelector };
