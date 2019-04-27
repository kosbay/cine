import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { TariffsSchema } from 'schemas';
import {
  StatefulView, Spinner, TariffCard,
} from 'components';
import { Col, Select } from 'antd';

const Option = Select.Option;

const FacultyContainerWrapper = styled.div`
  display: flex;
  max-width: 1024px;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 20px;
  }
`;

const StyledCol = styled(Col)`
  margin-bottom: 64px;
  max-width: 484px;
  height: 376px;

  @media screen and (max-width: 500px) {
    margin-right: 0;
    margin-bottom: 20px;
    justify-content: center;
  }
`;

const FacultiesWrap = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: column;
  margin-bottom: 100px;
`;


class SubscriptionTariffsContainer extends React.PureComponent {
  static propTypes = {
    onTariffChange: PropTypes.func.isRequired,
    tariff: PropTypes.shape({}),
  };

  static defaultProps = {
    tariff: {},
  }

  state = {
    selectedTariff: null,
  }

  componentDidMount() {
    this.setState({
      selectedTariff: this.props.tariff,
    });
  }

  handleChange = (value) => {
    this.setState({
      selectedTariff: value,
    });
    const tariffId = value._id;
    this.props.onTariffChange(tariffId);
  }

  renderLoading = () => (
    <Spinner />
  )

  renderSubscribtionTariffs = ({ data: tariffs }) => {
    const { selectedTariff } = this.state;
    return (
      <FacultyContainerWrapper id="TariffContainerWrapper">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Выберите Факультет"
          optionFilterProp="children"
          onChange={this.handleChange}
          filterOption={
            (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          value={selectedTariff && selectedTariff.name ? selectedTariff.name : 'Выберите Тариф'}
        >
          {
          tariffs && tariffs.map(tariff => (
            <Option key={tariff._id} value={tariff}>
              {tariff.name}
            </Option>
          ))
        }
        </Select>
        <FacultiesWrap>
          {
            selectedTariff && (
            <StyledCol>
              <TariffCard tariff={selectedTariff} subscription />
            </StyledCol>
            )
          }
        </FacultiesWrap>
      </FacultyContainerWrapper>
    );
  }


  render() {
    return (
      <TariffsSchema>
        {StatefulView({
          renderOkState: this.renderSubscribtionTariffs,
          renderLoading: this.renderLoading,
        })}
      </TariffsSchema>
    );
  }
}

export default SubscriptionTariffsContainer;
