import React from 'react';
import { compose } from 'recompact';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';

import page from 'hocs/page';
import RankingContainer from 'containers/RankingContainer';

const Rating = ({ t }) => (
  <React.Fragment>
    <Helmet>
      <title>
        {`
          ${t('pages.rating')} | ${t('pages.website')}
          `}
      </title>
    </Helmet>
    <RankingContainer />
  </React.Fragment>
);

Rating.propTypes = {
  t: PropTypes.func.isRequired,
};

const EnhancedRating = compose(
  page,
  withNamespaces(),
)(Rating);

export default EnhancedRating;
