import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import {
  Steps, Button, Tooltip,
} from 'antd';
import { SaveCardContainer, SubscribeToTariffContainer } from 'containers';

const Step = Steps.Step;

class UserSubscriptionFlow extends Component {
  static propTypes = {
    isUserHasCard: PropTypes.bool.isRequired,
  }

  state = {
    current: 0,
  }
  /* eslint-disable */
  nextStep = () => {
    this.setState(prevState => ({ current: prevState.current + 1 }));
  }
  /* eslint-enable */

  prevStep = () => {
    this.setState(prevState => ({ current: prevState.current - 1 }));
  }

  steps = [{
    title: 'Добавление карты',
    content: <SaveCardContainer nextStep={this.nextStep} />,
  }, {
    title: 'Подписаться на тариф',
    content: <SubscribeToTariffContainer />,
  }];


  render() {
    const { current } = this.state;
    const { isUserHasCard } = this.props;
    return (
      <div>
        <div style={{ margin: '20px 10% 20px 10%' }}>
          <Steps current={current}>
            {this.steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </div>
        <div className="steps-content">{this.steps[current].content}</div>
        <div className="steps-action">
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {
              current < this.steps.length - 1
              && (
              <Tooltip title={isUserHasCard ? '' : 'Добавьте карту!'}>
                <Button type="primary" onClick={() => this.nextStep()} disabled={!isUserHasCard}>
                  Готово
                </Button>
              </Tooltip>
              )
            }
          </div>
          <div style={{ marginLeft: '5%' }}>
            {
              current > 0
              && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prevStep()}>
                Вернуться
              </Button>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}


const EnchantedUserSubscriptionFlow = withNamespaces()(UserSubscriptionFlow);


export default EnchantedUserSubscriptionFlow;
