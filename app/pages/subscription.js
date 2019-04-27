import React from 'react';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';

import page from 'hocs/page';
import { Helmet } from 'react-helmet';
import { UserSubscriptionFlowContainer } from 'containers';

const Subscription = ({ t }) => (
  <React.Fragment>
    <Helmet>
      <title>
        {`${t('pages.subscription')} | ${t('pages.website')}`}
      </title>
    </Helmet>
    <UserSubscriptionFlowContainer />
  </React.Fragment>
);

Subscription.propTypes = {
  t: PropTypes.func.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({ courseId: PropTypes.string }),
  }).isRequired,
};

const EnhancedSubscription = compose(
  page,
  withNamespaces(),
)(Subscription);

export default EnhancedSubscription;
