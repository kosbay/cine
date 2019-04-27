import React from 'react';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu } from 'components';
import { logoutUser } from 'actions';
import Router from 'next/router';

class MenuContainer extends React.PureComponent {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    linksHidden: PropTypes.bool.isRequired,
  };

  handleLogoutButtonClick = () => {
    const { logout } = this.props;
    logout();
    Router.push('/');
  };

  render() {
    const { linksHidden } = this.props;
    return (
      !linksHidden && <Menu {...this.props} onLogoutButtonClick={this.handleLogoutButtonClick} />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => logoutUser(dispatch),
});

const withState = connect(
  null,
  mapDispatchToProps
);

const EnhancedMenuContainer = compose(withState)(MenuContainer);

export default EnhancedMenuContainer;
