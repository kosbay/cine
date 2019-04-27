import { normalize } from 'normalizr';
import { tariff } from '../store/models';

import { ADD_ENTITIES } from './types';


export const saveTariffToRedux = (tariffData, dispatch) => {
  const normalizedData = normalize(tariffData, tariff);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};

export const saveTariffsToRedux = (tariffData, dispatch) => {
  const normalizedData = normalize(tariffData, [tariff]);
  dispatch({ type: ADD_ENTITIES, payload: normalizedData.entities });
};
