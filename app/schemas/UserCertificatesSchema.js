import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'recompact';

import saveUserCertificatesToRedux from '../actions/userCertificates';
import Querry from './Querry';
import makeGetUserCertificatesSelector from '../selectors/userCertificates';

class UserCertificatesSchema extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    saveUserCertificatesToRedux: PropTypes.func.isRequired,
    userCertificates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

  render() {
    const { userCertificates, children, userId } = this.props;
    return <Querry initialData={userCertificates} normalizer={this.props.saveUserCertificatesToRedux} endpoint="userCertificates" path={userId}>{children}</Querry>;
  }
}

const makeStateToProps = () => {
  const getUserCertificates = makeGetUserCertificatesSelector();
  return (state, ownProps) => ({
    userCertificates: getUserCertificates(state, ownProps),
  });
};

const withState = connect(makeStateToProps, { saveUserCertificatesToRedux });

const EnhancedUserCertificatesSchema = compose(withState)(UserCertificatesSchema);

export default EnhancedUserCertificatesSchema;
