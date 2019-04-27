
import { createSelector } from 'reselect';
import { getTariffFromState } from '../store/models';

const getTariffs = state => state.tariffs;

const getTariff = (state, props) => {
  const { tariffId } = props;
  const tariff = getTariffFromState(tariffId, state);

  return tariff;
};


const getTariffsSelector = createSelector(
  [getTariffs],
  tariffs => tariffs
);

const makeGetTariffSelector = () => createSelector(
  [getTariff],
  tariff => tariff
);

export {
  getTariffsSelector,
  makeGetTariffSelector,
};
