import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'recompact';

import { notificationsDidFetch as saveNotificationsToRedux } from '../actions/notifications';
import Querry from './Querry';
import makeGetNotificationsSelector from '../selectors/notifications';

class NotificationsSchema extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    saveNotificationsToRedux: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

  render() {
    const { notifications, children, userId } = this.props;
    return <Querry initialData={notifications} normalizer={this.props.saveNotificationsToRedux} endpoint="notifications" path={userId}>{children}</Querry>;
  }
}

const makeStateToProps = () => {
  const getNotifications = makeGetNotificationsSelector();
  return (state, ownProps) => ({
    notifications: getNotifications(state, ownProps),
  });
};

const mapDispatchToProps = dispatch => ({
  saveNotificationsToRedux: notifications => saveNotificationsToRedux(dispatch, notifications),
});

const withState = connect(makeStateToProps, mapDispatchToProps);

const EnhancedNotificationsSchema = compose(withState)(NotificationsSchema);

export default EnhancedNotificationsSchema;
