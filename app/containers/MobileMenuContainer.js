import React from 'react';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { MobileMenu } from 'components';
import { logoutUser } from 'actions';

class MobileMenuContainer extends React.PureComponent {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  }

  handleLogoutButtonClick = () => {
    const { logout } = this.props;
    logout();
    Router.push('/');
  };

  render() {
    return <MobileMenu {...this.props} onLogoutButtonClick={this.handleLogoutButtonClick} />;
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => logoutUser(dispatch),
});

const withState = connect(null, mapDispatchToProps);

const EnhancedMobileMenuContainer = compose(withState)(MobileMenuContainer);

export default EnhancedMobileMenuContainer;
