import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';

import { Profile } from 'components';
import withCurrentUser from 'hocs/withCurrentUser';

class ProfileContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { userId } = this.props;
    if (userId !== nextProps.userId) {
      return true;
    }
    return false;
  }

  render() {
    const {
      userId, currentUser,
    } = this.props;
    const isCurrentUser = `${currentUser._id}`.localeCompare(`${userId}`) === 0;
    return (
      <Profile
        isCurrentUser={isCurrentUser}
        key={userId}
        currentUser={currentUser}
        userId={userId}
      />
    );
  }
}

ProfileContainer.propTypes = {
  currentUser: PropTypes.shape({
    skills: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

const EnhancedProfileContainer = compose(
  withCurrentUser(),
)(ProfileContainer);

export default EnhancedProfileContainer;
