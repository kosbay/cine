import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';

import { UserCertificates } from 'components';
import { UserCertificatesSchema } from 'schemas';
import withCurrentUser from 'hocs/withCurrentUser';

const CertificatesContainer = ({ currentUser }) => (
  <UserCertificatesSchema userId={currentUser._id}>
    {UserCertificates}
  </UserCertificatesSchema>
);

CertificatesContainer.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const EnhancedCertificatesContainer = compose(
  withCurrentUser(),
)(CertificatesContainer);

export default EnhancedCertificatesContainer;
