import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const withCurrentUser = () => (ComposedComponent) => {
  class WithCurrentUser extends React.PureComponent {
    render() {
      return (
        <ComposedComponent {...this.props}/>
      )
    }
  }

  WithCurrentUser.propTypes = {
    auth: PropTypes.shape({
      user: PropTypes.shape({}),
    }).isRequired,
  };
  
  function mapStateToProps({ auth }) {
    return { auth };
  }
  
  const EnhancedWithCurrentUser = connect(mapStateToProps, null)(WithCurrentUser);

  return EnhancedWithCurrentUser;
}

export default withCurrentUser;
