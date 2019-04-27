import React from 'react';
import PropTypes from 'prop-types';
import { SignUpForm } from '../components';
import { SignUpMutation } from '../schemas';

class SignUpContainer extends React.PureComponent {
  state = { error: false };

  handleError = (isError) => {
    this.setState({ error: isError });
  };

  handleSignUpButtonClick = mutate => async (values) => {
    const {
      email, contact, name, password,
    } = values;

    try {
      console.log('click register', values, this.state.error);
      const { data, error } = await mutate({
        variables: {
          email, contact, name, password,
        },
      });

      if (data) {
        // message.success('succes', 4);
        console.log('Response from Cancel', data);
      }

      if (error) {
        console.log('EROOR', error);
      }
    } catch (err) {
      this.handleError(true);
    }
  };

  renderSignUp = (mutate) => {
    const { error } = this.state;
    const handleSignUpButtonClick = this.handleSignUpButtonClick(mutate);

    return (
      <SignUpForm
        onRegisterButtonClick={handleSignUpButtonClick}
        handleError={this.handleError}
        error={error}
      />
    );
  }

  render() {
    return (
      <SignUpMutation>
        { this.renderSignUp }
      </SignUpMutation>
    );
  }
}


export default SignUpContainer;
