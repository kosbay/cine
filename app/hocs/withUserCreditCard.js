import React from 'react';
import { connect } from 'react-redux';

import { UserCreditCardSchema } from 'schemas';

const withUserCreditCard = () => (ComposedComponent) => {
  class WithUserCreditCard extends React.PureComponent {
    renderWithUserCreditCard = ({
      data: userCreditCard, loading, error,
    }) => (
      <ComposedComponent
        {...this.props}
        userCreditCardLoading={loading}
        userCreditCard={userCreditCard || {}}
        error={error}
      />
    );

    render() {
      return (
        <UserCreditCardSchema>
          {this.renderWithUserCreditCard}
        </UserCreditCardSchema>
      );
    }
  }

  // const mapStateToProps = state => ({
  //   userCreditCard: state.userCreditCard,
  // });

  WithUserCreditCard.propTypes = {
    // userCreditCard: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  const EnhancedWithUserCreditCard = connect()(WithUserCreditCard);
  return EnhancedWithUserCreditCard;
};

export default withUserCreditCard;
