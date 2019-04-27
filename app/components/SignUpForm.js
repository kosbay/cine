import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
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

const PhoneNumber = styled(NumberFormat)`
  height: 40px;
  display: inline-block;
  padding: 4px 30px;
  width: 100%;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  :focus{
    outline: none !important;
    border: 1px solid #54affb;
    box-shadow:0 0 5px #d9e7fe;
  }
  :hover{
    border: 1px solid #97a2db;
  }
  ::placeholder{
    color: rgba(0, 0, 0, 0.25);
    opacity: 1;
  }
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

const StyledPhoneIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
  position: absolute;
  height: 14px;
  width: 14px;
  top: 12px;
  left: 12px;
`;

const LoginButton = styled(Button)`
  width: 100%;
  height: 40px;
`;


class SignUpForm extends Component {
  state={
    loading: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.handleEdit();
    }
  }

  handleSubmit = (e) => {
    const { form, onRegisterButtonClick } = this.props;
    e.preventDefault();
    this.setState({ loading: true });
    form.validateFields((err, values) => {
      if (!err) {
        onRegisterButtonClick(values);
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

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароли не соответствуют!');
    } else {
      callback();
    }
  }

  checkPhoneNumber = (rule, value, callback) => {
    const phoneRegex = /^\+?\d?\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-\d{2}?/;
    console.log('check ', value, phoneRegex.test(value));
    if (phoneRegex.test(value)) {
      callback();
    }
    callback('Некорректный номер телефона');
  }

  render() {
    const { form: { getFieldDecorator }, error, t } = this.props;

    return (
      <Container>
        <LeftDiv>
          {t('loginPage.greetings')}
        </LeftDiv>
        <StyledDivider type="vertical" />
        <RightDiv>
          <Title>
            Регистрация
          </Title>
          <StyledForm
            onSubmit={this.handleSubmit}
            onChange={this.handleEdit}
            layout="vertical"
          >

            <FormItem>
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: 'Пожалуйста введите своё Ф.И.О!' },
                ],
              })(
                <StyledInput
                  prefix={
                    <StyledIcon type="user" />
                  }
                  placeholder="Ф.И.О"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('contact', {
                rules: [
                  { required: true, message: 'Пожалуйста введите свой контактный номер!' },
                  { validator: this.checkPhoneNumber },
                ],
              })(
                <div>
                  <StyledPhoneIcon type="phone" />
                  <PhoneNumber
                    placeholder="Контактный номер"
                    format="+7 (###) ###-##-##"
                    prefix="$"
                  />
                </div>


              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Пожалуйста введите свой электронный адрес!' },
                  {
                    type: 'email', message: 'Введен некорректный адрес!',
                  },
                ],
              })(
                <StyledInput
                  prefix={
                    <StyledIcon type="mail" />
                  }
                  placeholder="Электронный адрес"
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
                    <StyledIcon type="unlock" />
                  }
                  type="password"
                  placeholder="Пароль"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('passwordConfirm', {
                rules: [
                  { required: true, message: t('loginPage.passwordWarning') },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <StyledInput
                  prefix={
                    <StyledIcon type="lock" />
                  }
                  type="password"
                  placeholder="Повторите пароль"
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
                type="primary"
                htmlType="submit"
              >
                Зарегистрироваться
              </LoginButton>
            </FormItem>
          </StyledForm>
        </RightDiv>
      </Container>
    );
  }
}

SignUpForm.propTypes = {
  error: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
  handleError: PropTypes.func.isRequired,
  onRegisterButtonClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};


const WrappedSignUpForm = Form.create()(SignUpForm);

const EnchantedRegistration = withNamespaces()(WrappedSignUpForm);

export default EnchantedRegistration;
