import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';

import page from 'hocs/page';
import ProfileContainer from 'containers/ProfileContainer';

const Profile = ({ router }) => {
  const {
    query: { userId },
  } = router;

  return (
    <ProfileContainer key={userId} userId={userId} />
  );
};

Profile.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({ userId: PropTypes.string }),
  }).isRequired,
};

const EnhancedProfile = compose(
  page,
)(Profile);

export default EnhancedProfile;
