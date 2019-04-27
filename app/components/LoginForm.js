import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';
import {
  Form, Icon, Input, Button, Divider,
} from 'antd';

const FormItem = Form.Item;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  max-width: 1024px;
  margin: auto;
  height: calc(100vh - 144px - 64px);

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 24px;
  }
`;

const Title = styled.p`
  color: #606dc9;
  font-size: 32px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
  text-align: center;
`;

const RightDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 24px;
    width: 100%;
  }
`;

const LeftDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const StyledForm = styled(Form)`
  background: #fff;
  border-radius: 6px;
  width: 100%;
  padding: 24px;

  & > .ant-form-item {
    padding: 0;
    margin-bottom: 16px;

    &:last-child {
      margin-top: 32px;
      margin-bottom: 0;
    }
  }
`;

const StyledInput = styled(Input)`
  height: 40px;
`;

const StyledDivider = styled(Divider)`
  height: 350px;
  margin: 0 40px;

  @media (max-width: 768px) {
    height: 0;
  }
`;

const StyledIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;

const LoginButton = styled(Button)`
  width: 100%;
  height: 40px;
`;

class LoginForm extends Component {
  state={
    loading: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.handleEdit();
    }
  }

  handleSubmit = (e) => {
    const { form, onLoginButtonClick } = this.props;
    e.preventDefault();
    this.setState({ loading: true });
    form.validateFields((err, values) => {
      if (!err) {
        onLoginButtonClick(values);
      }
    });
  };

  handleEdit = () => {
    const { loading } = this.state;
    const { error, handleError } = this.props;
    if (loading) {
      this.setState({ loading: false });
    }
    if (error) {
      handleError(false);
    }
  }

  render() {
    const { form: { getFieldDecorator }, error, t } = this.props;
    const { loading } = this.state;
    return (
      <Container>
        <LeftDiv>
          {t('loginPage.greetings')}
        </LeftDiv>
        <StyledDivider type="vertical" />
        <RightDiv>
          <Title>
            {t('loginPage.label')}
          </Title>
          <StyledForm
            onSubmit={this.handleSubmit}
            onChange={this.handleEdit}
            layout="vertical"
          >
            <FormItem>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: t('loginPage.loginWarning') },
                ],
              })(
                <StyledInput
                  prefix={
                    <StyledIcon type="user" />
                  }
                  placeholder={t('loginPage.loginPlaceholder')}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: t('loginPage.passwordWarning') },
                ],
              })(
                <StyledInput
                  prefix={
                    <StyledIcon type="lock" />
                  }
                  type="password"
                  placeholder={t('loginPage.passwordPlaceholder')}
                />
              )}
            </FormItem>
            {error && (
            <ErrorMessage>
              {t('loginPage.loginError')}
            </ErrorMessage>
            ) }
            <FormItem>
              <LoginButton
                loading={loading}
                type="primary"
                htmlType="submit"
              >
                {t('loginPage.loginButtonLabel')}
              </LoginButton>
            </FormItem>
          </StyledForm>
        </RightDiv>
      </Container>
    );
  }
}

LoginForm.propTypes = {
  error: PropTypes.bool.isRequired,
  handleError: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
};

const WrappedLoginForm = Form.create()(LoginForm);

const EnchantedLogin = withNamespaces()(WrappedLoginForm);


export default EnchantedLogin;
