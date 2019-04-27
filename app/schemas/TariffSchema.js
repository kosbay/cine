import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { saveTariffToRedux } from 'actions/tariffs';
import { makeGetTariffSelector } from 'selectors';
import Querry from './Querry';

class TariffSchema extends React.PureComponent {
  static propTypes = {
    tariffId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    tariff: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    saveTariffToRedux: PropTypes.func.isRequired,
  }

  static defaultProps = {
    tariff: null,
  };

  render() {
    const {
      tariffId, tariff, saveTariffToRedux: saveTariffToReduxFunc, children,
    } = this.props;
    return <Querry normalizer={saveTariffToReduxFunc} initialData={tariff} endpoint="fetchTariff" path={tariffId}>{children}</Querry>;
  }
}

const makeStateToProps = () => {
  const getTariff = makeGetTariffSelector();
  return (state, ownProps) => ({
    tariff: getTariff(state, ownProps),
  });
};

const mapDispatchToProps = dispatch => ({
  saveTariffToRedux: tariff => saveTariffToRedux(tariff, dispatch),
});

const withState = connect(makeStateToProps, mapDispatchToProps);
const EnhancedTariffSchema = compose(withState)(TariffSchema);

export default EnhancedTariffSchema;
