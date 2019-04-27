import React from 'react';
import PropTypes from 'prop-types';

import Querry from './Querry';

class SchoolsRankingSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    sortBy: PropTypes.shape({}),
  }

  static defaultProps = {
    sortBy: {
      sortByWupai: -1,
    },
  };

  render() {
    const { children, sortBy } = this.props;
    return <Querry endpoint="schools" variables={sortBy}>{children}</Querry>;
  }
}

export default SchoolsRankingSchema;
