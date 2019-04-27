import React from 'react';
import PropTypes from 'prop-types';
import Querry from './Querry';

class FetchEventsSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    const {
      children,
    } = this.props;
    return (
      <Querry
        initialData={null}
        endpoint="activeEvent"
      >
        {children}
      </Querry>
    );
  }
}

export default FetchEventsSchema;
