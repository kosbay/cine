import React from 'react';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';

import page from 'hocs/page';
import { Helmet } from 'react-helmet';

import NewsContainer from 'containers/NewsContainer';

const News = ({ t }) => (
  <React.Fragment>
    <Helmet>
      <title>
        {`
          ${t('pages.news')} | ${t('pages.website')}
        `}
      </title>
    </Helmet>
    <NewsContainer />
  </React.Fragment>
);

News.propTypes = {
  t: PropTypes.func.isRequired,
};

const EnhancedNews = compose(
  page,
  withNamespaces()
)(News);

export default EnhancedNews;
