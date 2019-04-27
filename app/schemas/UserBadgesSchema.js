import React from 'react';
import PropTypes from 'prop-types';

import Querry from './Querry';

class UserBadgesSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  };

  render() {
    const { children, userId } = this.props;
    return <Querry endpoint="achievementsBySubjectId" variables={{ subjectId: userId }}>{children}</Querry>;
  }
}

export default UserBadgesSchema;
