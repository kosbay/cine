import React from 'react';
import PropTypes from 'prop-types';

import Mutation from './Mutation';

class SaveCardMutation extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    const { children } = this.props;
    return <Mutation endpoint="firstPayment">{children}</Mutation>;
  }
}

export default SaveCardMutation;
