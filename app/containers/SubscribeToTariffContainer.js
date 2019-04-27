import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { SubscribeToTariff } from 'components';
import { message } from 'antd';
import { SubscribeToTariffMutation } from '../schemas';

class SubscribeToTariffContainer extends React.PureComponent {
  static propTypes = {
    tariff: PropTypes.shape({}),
  };

  static defaultProps = {
    tariff: null,
  };

  state = {
    tariffId: null,
    facultyId: null,
  }

  // componentDidMount() {
  //   this.setState({
  //     tariffId: this.props.tariff._id,
  //   });
  // }

  handleTariffChange = (value) => {
    this.setState({
      tariffId: value,
    });
  }

  handleFacultyChange = (value) => {
    this.setState({
      facultyId: value,
    });
  }

  handleSubscriptionClick = mutate => async () => {
    const { tariffId, facultyId } = this.state;
    const { data, error } = await mutate(
      {
        variables: { tariffId, facultyId },
      }
    );
    if (data) {
      message.success(data, 6);
    }
    if (error) message.error('Произашла ошибка! Повторите позже!', 6);
  }

  renderSubscription = (mutate) => {
    const { tariff } = this.props;
    const handleSubscriptionButtonClick = this.handleSubscriptionClick(mutate);
    return (
      <SubscribeToTariff
        tariff={tariff}
        onTariffChange={this.handleTariffChange}
        onFacultyChange={this.handleFacultyChange}
        onSubscriptionButtonClick={handleSubscriptionButtonClick}
      />
    );
  }

  render() {
    return (
      <SubscribeToTariffMutation>
        {this.renderSubscription}
      </SubscribeToTariffMutation>
    );
  }
}

export default withNamespaces()(SubscribeToTariffContainer);
