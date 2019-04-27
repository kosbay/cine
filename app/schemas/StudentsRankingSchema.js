import React from 'react';
import PropTypes from 'prop-types';

import Querry from './Querry';

class StudentsRankingSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    sortBy: PropTypes.shape({}),
  }

  static defaultProps = {
    sortBy: {
      sortByWupai: -1,
      role: 'user',
    },
  };

  render() {
    const { children, sortBy } = this.props;
    return <Querry endpoint="users" variables={sortBy}>{children}</Querry>;
  }
}

export default StudentsRankingSchema;
