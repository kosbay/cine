import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { getCurrentUserSelector } from 'selectors';
import Querry from './Querry';
import { saveCurrentUser as saveCurrentUserRedux } from '../actions';

class CurrentUserSchema extends React.PureComponent {
  static propTypes = {
    currentUser: PropTypes.shape({}),
    children: PropTypes.func.isRequired,
    saveCurrentUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    currentUser: {},
  }

  render() {
    const { currentUser, children, saveCurrentUser } = this.props;

    return (
      <Querry
        initialData={currentUser}
        normalizer={saveCurrentUser}
        endpoint="currentUser"
      >
        {children}
      </Querry>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUserSelector(state),
});

const mapDispatchToProps = dispatch => ({
  saveCurrentUser: user => saveCurrentUserRedux(user, dispatch),
});

const withState = connect(mapStateToProps, mapDispatchToProps);

const EnhancedCurrentUserSchema = compose(withState)(CurrentUserSchema);

export default EnhancedCurrentUserSchema;
