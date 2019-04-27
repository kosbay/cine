import React from 'react';
import PropTypes from 'prop-types';

import Mutation from './Mutation';

class SignUpMutation extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    const { children } = this.props;
    return <Mutation endpoint="signUp">{children}</Mutation>;
  }
}

export default SignUpMutation;
