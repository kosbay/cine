import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';
import {
  Form, Icon, Input, Button, InputNumber,
} from 'antd';
import { Spinner } from 'components';

const FormItem = Form.Item;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px;
  max-width: 1024px;
  margin: auto;
  height: calc(100vh - 144px w- 64px);

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

const StyledNumberInput = styled(InputNumber)`
  height: 40px;
  width: 100%
`;

const StyledIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;

const LoginButton = styled(Button)`
  width: 100%;
  height: 40px;
`;

const DateCVVLine = styled.div`
  display: flex;
  justify-content: space-between
`;

class SaveCard extends Component {
  state={
    loading: false,
  }


  handleSubmit = (e) => {
    const { form, onSubmitButtonClick } = this.props;
    e.preventDefault();
    this.setState({ loading: true });
    form.validateFields((err, values) => {
      if (!err) {
        onSubmitButtonClick(values);
      }
    });
    this.setState({ loading: false });
  };

  checkCardNumber = (rule, value, callback) => {
    if (typeof (value) === 'number') {
      callback();
      return;
    }
    callback('Некорректный номер карты!');
  }

  render() {
    const {
      form: { getFieldDecorator }, t, formId,
    } = this.props;
    const { loading } = this.state;
    return (
      <Container>
        <RightDiv>
          <Title>
            Добавление карты
          </Title>
          <StyledForm
            onSubmit={this.handleSubmit}
            layout="vertical"
            id={formId}
          >
            <FormItem>
              {getFieldDecorator('cardNumber', {
                rules: [{ validator: this.checkCardNumber }],
              })(
                <StyledNumberInput
                  prefix={
                    <StyledIcon type="lock" />
                  }
                  placeholder="Номер карты"
                  formatter={x => x.toString().replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')}
                  data-cp="cardNumber"
                  onChange={value => console.log('Номер карты', value)}
                />
              )}
            </FormItem>
            <DateCVVLine>
              <FormItem>
                {getFieldDecorator('month', {
                  rules: [
                    { required: true, message: 'Пожалуйста, введите месяц истечения карты!' },
                  ],
                })(
                  <StyledNumberInput
                    placeholder="Месяц истечения карты"
                    data-cp="expDateMonth"
                    max={12}
                    min={1}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('year', {
                  rules: [
                    {
                      required: true, message: 'Пожалуйста, введите год истечения карты!',
                    },
                  ],
                })(
                  <StyledNumberInput
                    placeholder="Год истечения карты"
                    data-cp="expDateYear"
                    min={19}
                    max={30}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('cvv', {
                  rules: [
                    { required: true, message: 'Пожалуйста, введите CVV карты!' },
                  ],
                })(
                  <StyledNumberInput
                    prefix={
                      <StyledIcon type="question-circle" />
                  }
                    placeholder="CVV"
                    data-cp="cvv"
                  />
                )}
              </FormItem>
            </DateCVVLine>
            <FormItem>
              {getFieldDecorator('cardName', {
                rules: [
                  { required: true, message: 'Пожалуйста, введите имя на карте!' },
                ],
              })(
                <StyledInput
                  placeholder="Name on Card"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Пожалуйста, введите Email!' },
                ],
              })(
                <StyledInput
                  placeholder="Email"
                  type="email"
                />
              )}
            </FormItem>
            <FormItem>
              {
                loading
                  ? (<Spinner />)
                  : (
                    <LoginButton
                      loading={loading}
                      type="primary"
                      htmlType="submit"
                    >
                      Добавить карту
                    </LoginButton>
                  )
              }
            </FormItem>
          </StyledForm>
        </RightDiv>
      </Container>
    );
  }
}

SaveCard.propTypes = {
  t: PropTypes.func.isRequired,
  onSubmitButtonClick: PropTypes.func.isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
  formId: PropTypes.string.isRequired,
};

const WrappedSaveCard = Form.create()(SaveCard);

const EnchantedSaveCard = withNamespaces()(WrappedSaveCard);


export default EnchantedSaveCard;
