import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import { News } from 'components';
import { notificationsDidFetch, updateNotification } from '../actions/notifications';
import Firebase from '../lib/FirebaseNotifications';

class NewsContainer extends React.PureComponent {
  componentWillMount() {
    Firebase.init();
    this.fetchNotifications();
  }

  fetchNotifications = async () => {
    const { auth } = this.props;

    if (auth && auth.user && auth.user._id) {
      const notifications = await Firebase.getAllNotifications(auth.user._id);
      this.props.notificationsDidFetch(notifications);
    }
    return null;
  }

  render() {
    const { t } = this.props;
    moment.locale(t('languageCode'));

    return (
      <News t={t} updateNotification={this.props.updateNotification} />
    );
  }
}

NewsContainer.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({ _id: PropTypes.string }),
  }).isRequired,
  t: PropTypes.func.isRequired,
  notificationsDidFetch: PropTypes.func.isRequired,
  updateNotification: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, notifications }) => ({ auth, notifications });

const mapDispatchToProps = dispatch => ({
  notificationsDidFetch: notifications => notificationsDidFetch(dispatch, notifications),
  updateNotification: notification => updateNotification(dispatch, notification),
});

const EnhancedNewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer);

export default withNamespaces()(EnhancedNewsContainer);
