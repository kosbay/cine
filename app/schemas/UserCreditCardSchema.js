import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { saveUserCreditCardToRedux } from 'actions/userCreditCard';
import { makeGetUserCreditCardSelector } from 'selectors';
import Querry from './Querry';

class UserCreditCardSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    userCreditCard: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
    saveUserCreditCardToRedux: PropTypes.func.isRequired,
  }

  static defaultProps = {
    userCreditCard: null,
  };

  render() {
    const {
      userCreditCard, saveUserCreditCardToRedux: saveUserCreditCardToReduxFunc, children,
    } = this.props;
    return <Querry normalizer={saveUserCreditCardToReduxFunc} initialData={userCreditCard} endpoint="userCreditCard">{children}</Querry>;
  }
}

const makeStateToProps = () => {
  const getUserCreditCard = makeGetUserCreditCardSelector();
  return (state, ownProps) => ({
    userCreditCard: getUserCreditCard(state, ownProps),
  });
};

const mapDispatchToProps = dispatch => ({
  saveUserCreditCardToRedux: userCreditCard => saveUserCreditCardToRedux(userCreditCard, dispatch),
});

const withState = connect(makeStateToProps, mapDispatchToProps);
const EnhancedUserCreditCardSchema = compose(withState)(UserCreditCardSchema);

export default EnhancedUserCreditCardSchema;
