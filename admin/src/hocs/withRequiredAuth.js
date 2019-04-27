import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { redirectToLogin as redirectAction } from "../actions/auth";

const adminRole = "admin";
const withRequiredAuth = (ComposedComponent, role = adminRole) => {
  class Authenticate extends React.PureComponent {
    state = {
      isAuthenticated: false,
      isAllowed: false
    };

    componentDidMount() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { auth, redirectAction, history } = this.props;

      if (!auth || !auth.role) {
        this.setState({ isAuthenticated: false});
        redirectAction(history);
      }
      else if(auth.role !== role){
        this.setState({ isAuthenticated: false, isAllowed: false });
        redirectAction(history);
      }
      else {
        this.setState({ isAuthenticated: true, isAllowed: true });
      }
    }

    render() {
      return (
        <div>
          { this.state.isAuthenticated && this.state.isAllowed
            ? <ComposedComponent {...this.props} />
            : null }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({ auth: state.auth });

  Authenticate.defaultProps = {
    auth: {}
  };
  Authenticate.propTypes = {
    auth: PropTypes.shape({}),
    redirectAction: PropTypes.func.isRequired
  };

  return connect(
    mapStateToProps,
    { redirectAction }
  )(Authenticate);
}

export default withRequiredAuth;
