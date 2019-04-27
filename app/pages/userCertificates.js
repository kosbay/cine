import React from 'react';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';

import page from 'hocs/page';
import { Helmet } from 'react-helmet';
import UserCertificatesContainer from 'containers/UserCertificatesContainer';

const UserCertificatePage = ({ t }) => (
  <React.Fragment>
    <Helmet>
      <title>
        {`${t('pages.certificates')} | ${t('pages.website')}`}
      </title>
    </Helmet>
    <UserCertificatesContainer />
  </React.Fragment>
);

UserCertificatePage.propTypes = {
  t: PropTypes.func.isRequired,
};

const EnhancedUserCertificatePage = compose(
  page,
  withNamespaces(),
)(UserCertificatePage);

export default EnhancedUserCertificatePage;
