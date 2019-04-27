import React, { Component } from 'react';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';

import { TariffsSchema } from 'schemas';
import { StatefulView } from 'components';
import page from 'hocs/page';
import { Helmet } from 'react-helmet';

import { TariffContainer } from 'containers';

class Tariffs extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  renderTariffs = ({ data: tariffs }) => (
    <TariffContainer tariffs={tariffs} />
  )

  renderLoadingTariffs = () => (
    <TariffContainer loading />
  )

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {`
              ${t('pages.tariffs')} | ${t('pages.website')}
            `}
          </title>
        </Helmet>
        <TariffsSchema>
          {StatefulView({
            renderOkState: this.renderTariffs,
            renderLoading: this.renderLoadingTariffs,
          })}
        </TariffsSchema>
      </React.Fragment>
    );
  }
}

const EnhancedTariffs = compose(
  page,
  withNamespaces(),
)(Tariffs);

export default EnhancedTariffs;
