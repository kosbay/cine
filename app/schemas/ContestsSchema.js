import React from 'react';
import PropTypes from 'prop-types';

import Querry from './Querry';

class ContestsSchema extends React.PureComponent {
    static propTypes = {
      children: PropTypes.func.isRequired,
    }

    render() {
      const { children } = this.props;
      return (
        <Querry
          endpoint="getContests"
        >
          {children}
        </Querry>
      );
    }
}

export default ContestsSchema;
