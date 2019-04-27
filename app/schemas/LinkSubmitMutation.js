import React from 'react';
import PropTypes from 'prop-types';

import Mutation from './Mutation';

class LinkSubmitMutation extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    const { children } = this.props;
    return <Mutation endpoint="finishLesson">{children}</Mutation>;
  }
}

export default LinkSubmitMutation;
