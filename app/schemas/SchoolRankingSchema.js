import React from 'react';
import PropTypes from 'prop-types';

import Querry from './Querry';

class SchoolRankingSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    schoolId: PropTypes.string,
  }

  static defaultProps = {
    schoolId: '',
  };

  render() {
    const { children, schoolId } = this.props;
    const variables = { schoolId };
    return <Querry endpoint="schoolInfo" variables={variables}>{children}</Querry>;
  }
}

export default SchoolRankingSchema;
