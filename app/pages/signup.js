import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';

import page from 'hocs/page';
import SignUpContainer from '../containers/SignUpContainer';

const SignUp = ({ t }) => (
  <React.Fragment>
    <Helmet>
      <title>
        {`
          ${t('pages.signUp')} | ${t('pages.website')}
        `}
      </title>
    </Helmet>
    <SignUpContainer />
  </React.Fragment>
);

SignUp.propTypes = {
  t: PropTypes.func.isRequired,
};

const EnhancedSignUp = compose(
  page,
  withNamespaces(),
)(SignUp);

export default EnhancedSignUp;
