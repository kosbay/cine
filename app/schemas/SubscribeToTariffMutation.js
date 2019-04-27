import React from 'react';
import PropTypes from 'prop-types';

import Mutation from './Mutation';

class SubscribeToTariffMutation extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    const { children } = this.props;
    return <Mutation endpoint="saveSubscription">{children}</Mutation>;
  }
}

export default SubscribeToTariffMutation;
