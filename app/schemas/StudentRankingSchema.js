import React from 'react';
import PropTypes from 'prop-types';

import Querry from './Querry';

class StudentRankingSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    userId: PropTypes.string,
  }

  static defaultProps = {
    userId: '',
  };

  render() {
    const { children, userId } = this.props;

    return <Querry endpoint="studentRank" path={userId}>{children}</Querry>;
  }
}

export default StudentRankingSchema;
