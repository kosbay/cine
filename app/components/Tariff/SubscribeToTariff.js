import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { Button, Tooltip } from 'antd';
import { SubscriptionFacultiesContainer, SubscriptionTariffsContainer } from 'containers';
import { Spinner } from 'components';

class SubscribeToTariff extends Component {
  static propTypes = {
    onSubscriptionButtonClick: PropTypes.func.isRequired,
    onTariffChange: PropTypes.func.isRequired,
    onFacultyChange: PropTypes.func.isRequired,
    tariff: PropTypes.shape({}),
  }

  static defaultProps = {
    tariff: {},
  };

  state = {
    loading: false,
    isFacultyChoosed: false,
  }

  handleClick = async () => {
    this.setState({ loading: true });
    await this.props.onSubscriptionButtonClick();
    this.setState({ loading: false });
  }

  handleFacultyChoosed = () => {
    this.setState({ isFacultyChoosed: true });
  }

  render() {
    const {
      tariff, onTariffChange, onFacultyChange,
    } = this.props;
    const { loading, isFacultyChoosed } = this.state;
    return (
      <div style={{ marginLeft: '5%', marginRight: '5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <SubscriptionTariffsContainer tariff={tariff} onTariffChange={onTariffChange} />
          <SubscriptionFacultiesContainer
            onFacultyChange={onFacultyChange}
            onFacultyChoosed={this.handleFacultyChoosed}
          />
        </div>
        {
          loading
            ? (<Spinner />)
            : (
              <div style={{ textAlign: 'center' }}>
                <Tooltip title={isFacultyChoosed ? '' : 'Выберите Факультет!'}>
                  <Button type="primary" onClick={this.handleClick} disabled={!isFacultyChoosed}>
                    Оплатить и Подписаться
                  </Button>
                </Tooltip>
              </div>
            )
        }
      </div>
    );
  }
}


const EnchantedSubscribeToTariff = withNamespaces()(SubscribeToTariff);


export default EnchantedSubscribeToTariff;
