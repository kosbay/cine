import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompact';

import Querry from './Querry';
import { saveUserSubscriptionsToRedux as saveSubscriptionsToRedux } from '../actions/userSubscriptions';
import getUserSubscriptionsSelector from '../selectors/userSubscriptions';


class UserSubscriptionsSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    userSubscriptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    saveSubscriptionsToRedux: PropTypes.func.isRequired,
  };

  render() {
    const { children, userSubscriptions } = this.props;

    return <Querry normalizer={this.props.saveSubscriptionsToRedux} initialData={userSubscriptions} endpoint="userSubscription">{children}</Querry>;
  }
}

const makeStateToProps = () => {
  const getUserSubscriptions = getUserSubscriptionsSelector();
  return (state, ownProps) => ({
    userSubscriptions: getUserSubscriptions(state, ownProps),
  });
};

const withState = connect(makeStateToProps, { saveSubscriptionsToRedux });
const EnhancedUserSubscriptionsSchema = compose(withState)(UserSubscriptionsSchema);

export default EnhancedUserSubscriptionsSchema;
