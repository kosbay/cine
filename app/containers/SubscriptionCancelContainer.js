import React from 'react';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';
import { compose } from 'recompact';

import withUserCreditCard from 'hocs/withUserCreditCard';
import { Button, message } from 'antd';
import { SubscriptionCancelMutation } from '../schemas';

const CancelButton = styled(Button)`
  margin-bottom: 16px;
`;
class SubscriptionCancelContainer extends React.PureComponent {
  handleSubscriptionCancelClick = mutate => async () => {
    const { data, error } = await mutate({});
    if (data) {
      message.success('succes', 4);
      console.log('Response from Cancel', data);
    }
    if (error) console.log('Response from cancel error', error);
  }

  renderCancelButton = (mutate) => {
    const handleSubscriptionCancelClick = this.handleSubscriptionCancelClick(mutate);
    return (
      <CancelButton
        onClick={handleSubscriptionCancelClick}
      >
        Отписаться
      </CancelButton>
    );
  }

  render() {
    return (
      <SubscriptionCancelMutation>
        {this.renderCancelButton}
      </SubscriptionCancelMutation>
    );
  }
}

const EnhancedSubscriptionCancelContainer = compose(
  withUserCreditCard(),
  withNamespaces()
)(SubscriptionCancelContainer);

export default EnhancedSubscriptionCancelContainer;
