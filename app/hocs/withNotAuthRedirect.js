import React from 'react';
import { hoistStatics } from 'recompact';
import { connect } from 'react-redux';
import Router from 'next/router';

const withNoAuthRedirect = hoistStatics(
  (ComposedComponent) => {
    class WithNotAuthRedirect extends React.PureComponent {
      componentDidMount() {
        this.handleAutheticatedUser(this.props);
      }

      componentWillReceiveProps(nextProps) {
        this.handleAutheticatedUser(nextProps);
      }

      handleAutheticatedUser = (props) => {
        if (props.auth && props.auth.user) {
          Router.push('/');
        }
      };

      render() {
        return <ComposedComponent {...this.props} />;
      }
    }

    const mapStateToProps = ({ auth }) => ({ auth });

    return connect(mapStateToProps)(WithNotAuthRedirect);
  }
);

export default withNoAuthRedirect;
