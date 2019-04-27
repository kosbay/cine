import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import {
  SaveCard, CreditCard,
} from 'components';
import { compose } from 'recompact';
import { HiddenSecureFormContainer } from 'containers';
import withUserCreditCard from 'hocs/withUserCreditCard';
import { message } from 'antd';
import { SaveCardMutation } from '../schemas';


const PUBLIC_ID = 'pk_a5d25dfedd2c9463a745654eec655';
const FORM_ID = 'test_id';

class SaveCardContainer extends React.PureComponent {
  state = {
    secureCallback: null,
  }

  static propTypes = {
    nextStep: PropTypes.func.isRequired,
    userCreditCard: PropTypes.PropTypes.shape({}).isRequired,
  };

  checkout = null;

  componentDidMount() {
    if (process.browser) {
      this.initChekout();
    }
  }

  initChekout = () => {
    /* eslint-disable */ 
    this.checkout = new cp.Checkout(
      PUBLIC_ID,
      document.getElementById(FORM_ID)
    );
    /* eslint-enable */
  };

  handleSubmitButtonClick = mutate => async (values) => {
    const { nextStep } = this.props;
    const result = await this.checkout.createCryptogramPacket();
    if (result.success) {
      const { packet } = result;
      const { email, cardName } = values;
      const { data, error } = await mutate(
        {
          variables: {
            packet,
            email,
            cardName,
          },
        }
      );
      if (data && data.secureCallback) {
        this.setState({
          secureCallback: data.secureCallback,
        });
      }
      if (data) {
        message.success(data, 4);
        nextStep();
      }
      if (error) { console.log('EROOR', error); }
    } else {
      message.error('Введены неправильные данные!', 4);
    }
  }

  renderSubscription = (mutate) => {
    const handleSubmitButtonClick = this.handleSubmitButtonClick(mutate);
    return (
      <SaveCard
        onSubmitButtonClick={handleSubmitButtonClick}
        formId={FORM_ID}
      />
    );
  }

  render() {
    const { secureCallback } = this.state;
    const { userCreditCard } = this.props;

    return (
      <Fragment>
        <div style={{ display: 'flex' }}>
          {
          userCreditCard && (
          <CreditCard userCreditCard={userCreditCard} />
          )
        }
          <SaveCardMutation>
            {this.renderSubscription}
          </SaveCardMutation>
        </div>
        {
          secureCallback && (
          <HiddenSecureFormContainer
            paReq={secureCallback.PaReq}
            url={secureCallback.AcsUrl}
            md={secureCallback.MD}
            callbackUrl={secureCallback.callbackUrl}
          />
          )
        }
      </Fragment>
    );
  }
}

const EnhancedSaveCardContainer = compose(
  withUserCreditCard(),
  withNamespaces()
)(SaveCardContainer);

export default EnhancedSaveCardContainer;
