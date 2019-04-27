import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import { StatefulView, Spinner } from 'components';
import { SubscriptionCancelContainer } from '../../containers';
import { UserSubscriptionsSchema } from '../../schemas';

const SubscriptionWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const SubscriptionContainer = styled.div`
  width: 100%;
  display: flex; 
  flex-direction: row;
  align-items: center;
  background: #FFFFFF;
  height: 144px;
  padding: 24px 40px;
`;

const Label = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #232424;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const SubscriptionInfo = styled.div`
  width: 100%;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const TariffType = styled.div`
  font-weight: 800;
  font-size: 20px;
  color: #232424;
`;

const PriceText = styled.div`
    font-size: 16px;
    color: #232424;
    margin: 12px 0;
  `;

const InfoText = styled.div`
  font-size: 14px;
  color: rgba(35, 36, 36, 0.5);`;

const Unsubscribe = styled.div`
  display: flex;
  flex-direction: column;
  right: 0;
`;

class UserSubscription extends Component {
  renderSubscription = ({ data }) => {
    if (data.length > 0) {
      return (
        <SubscriptionWrapper>
          <Label>Тариф</Label>
          {
        data.map(subscription => (
          <SubscriptionContainer>
            <Image src={subscription.tariffId.imageURL} />
            <SubscriptionInfo>
              <TariffType>
                {subscription.tariffId.name}
              </TariffType>
              <PriceText>
                {subscription.tariffId.price}
                тг/месяц
              </PriceText>
              <InfoText>
                Автоматически продлится
                {' '}
                {moment(subscription.startDate).add(30, 'day').format('Do MMMM, YYYY')}
              </InfoText>
            </SubscriptionInfo>
            <Unsubscribe>
              <SubscriptionCancelContainer />
              <InfoText>
                Отмена вступит в силу по окончанию вашей текущей подписки
              </InfoText>
            </Unsubscribe>
          </SubscriptionContainer>
        ))
      }
        </SubscriptionWrapper>
      );
    }
    return null;
  }

  renderLoadingSubscription = () => (
    <Spinner />
  )

  render() {
    const { t } = this.props;
    moment.locale(t('languageCode'));
    return (
      <UserSubscriptionsSchema>
        {StatefulView({
          renderOkState: this.renderSubscription,
          renderLoading: this.renderLoadingSubscription,
        })
        }
      </UserSubscriptionsSchema>
    );
  }
}

UserSubscription.propTypes = {
  t: PropTypes.func.isRequired,
};

export default UserSubscription;
