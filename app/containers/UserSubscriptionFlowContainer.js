import React from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import withUserCreditCard from 'hocs/withUserCreditCard';
import { UserSubscriptionFlow } from 'components';

class UserSubscriptionFlowContainer extends React.PureComponent {
  static propTypes = {
    userCreditCard: PropTypes.shape({}).isRequired,
  };

  render() {
    const { userCreditCard } = this.props;
    return (
      <UserSubscriptionFlow
        isUserHasCard={!!(userCreditCard && Object.keys(userCreditCard).length !== 0)}
      />
    );
  }
}

const EnhancedUserSubscriptionFlowContainer = compose(
  withUserCreditCard(),
  withNamespaces()
)(UserSubscriptionFlowContainer);

export default EnhancedUserSubscriptionFlowContainer;
