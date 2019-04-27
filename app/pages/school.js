import React from 'react';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import page from 'hocs/page';
import { SchoolContainer } from 'containers';

const School = ({ t }) => (
  <React.Fragment>
    <Helmet>
      <title>
        {`
          ${t('pages.school')} | ${t('pages.website')}
          `}
      </title>
    </Helmet>
    <SchoolContainer />
  </React.Fragment>
);

School.propTypes = {
  t: PropTypes.func.isRequired,
};

const EnhancedSchool = compose(
  page,
  withNamespaces(),
)(School);

export default EnhancedSchool;
