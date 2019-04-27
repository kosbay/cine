import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { getTariffsSelector } from 'selectors/tariffs';
import { saveTariffsToRedux } from 'actions/tariffs';
import Querry from './Querry';

class TariffSchema extends React.PureComponent {
  static propTypes = {
    saveTariffsToRedux: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    tariffs: PropTypes.shape({}).isRequired,
  }

  render() {
    const { tariffs, children, saveTariffsToRedux: saveTariffsToReduxFunc } = this.props;
    const initialData = tariffs.length ? tariffs : null;
    return (
      <Querry
        initialData={initialData}
        normalizer={saveTariffsToReduxFunc}
        endpoint="fetchTariffs"
      >
        {children}
      </Querry>
    );
  }
}
const makeStateToProps = state => ({ tariffs: getTariffsSelector(state) });
const mapDispatchToProps = dispatch => ({
  saveTariffsToRedux: tariffs => saveTariffsToRedux(tariffs, dispatch),
});

const withState = connect(makeStateToProps, mapDispatchToProps);
const EnhancedTariffSchema = compose(withState)(TariffSchema);

export default EnhancedTariffSchema;
