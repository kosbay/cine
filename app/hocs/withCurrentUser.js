import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CurrentUserSchema } from 'schemas';

const withCurrentUser = () => (ComposedComponent) => {
  class WithCurrentUser extends React.PureComponent {
    renderWithCurrentUser = props => ({
      data: user, loading, error,
    }) => (
      <ComposedComponent
        currentUserLoading={loading}
        currentUser={user || {}}
        error={error}
        {...props}
      />
    );

    render() {
      return (
        <CurrentUserSchema>
          {this.renderWithCurrentUser(this.props)}
        </CurrentUserSchema>
      );
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
  });

  WithCurrentUser.propTypes = {
    auth: PropTypes.shape({
      user: PropTypes.shape({}),
    }).isRequired,
  };

  const EnhancedWithCurrentUser = connect(mapStateToProps, null)(WithCurrentUser);
  return EnhancedWithCurrentUser;
};

export default withCurrentUser;
