import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompact';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';
import Router from 'next/router';
import page from 'hocs/page';
import { LoginForm } from 'components';
import { loginUser, saveURLBeforLogin } from 'actions/index';

class Login extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      user: PropTypes.shape({
        role: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    }).isRequired,
    loginUser: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    router: PropTypes.shape({ push: PropTypes.func }).isRequired,
    saveURLBeforLogin: PropTypes.func.isRequired,
  };

  state = { error: false };

  handleError = (isError) => {
    this.setState({ error: isError });
  };

  handleLoginButtonClick = async (values) => {
    try {
      const editedValues = { username: values.username.trim(), password: values.password.trim() };
      const {
        router,
        loginUser: loginUserProp,
        auth: { url },
        saveURLBeforLogin: saveURLBeforLoginFunc,
      } = this.props;
      await loginUserProp(editedValues);
      this.handleError(false);
      if (url) {
        router.push(url);
        saveURLBeforLoginFunc('');
      } else if (this.props.auth.user.role === 'teacher') {
        Router.push('/school');
      } else {
        Router.push('/myprogram');
      }
    } catch (err) {
      this.handleError(true);
    }
  };

  render() {
    const { error } = this.state;
    const { t } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {`
          ${t('pages.login')} | ${t('pages.website')}
          `}
          </title>
        </Helmet>
        <LoginForm
          onLoginButtonClick={this.handleLoginButtonClick}
          handleError={this.handleError}
          error={error}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: values => loginUser(values, dispatch),
  saveURLBeforLogin: url => saveURLBeforLogin(url, dispatch),
});

const mapStateToProps = ({ auth }) => ({ auth });

const withState = connect(
  mapStateToProps,
  mapDispatchToProps
);

const EnhancedLogin = compose(
  page,
  withNamespaces(),
  withState
)(Login);

export default EnhancedLogin;
