import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { FacultiesSchema } from 'schemas';
import {
  StatefulView, Spinner, FacultyCard,
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


class SubscriptionFacultiesContainer extends React.PureComponent {
  static propTypes = {
    onFacultyChange: PropTypes.func.isRequired,
    onFacultyChoosed: PropTypes.func.isRequired,
  };

  state = {
    selectedFaculty: null,
  }

  handleChange = (value) => {
    this.setState({
      selectedFaculty: value,
    });
    const facultyId = value._id;
    this.props.onFacultyChange(facultyId);
    this.props.onFacultyChoosed();
  }

  renderLoading = () => (
    <Spinner />
  )

  renderSubscribtionFaculties = ({ data: faculties }) => {
    const { selectedFaculty } = this.state;
    return (
      <FacultyContainerWrapper id="FacultyContainerWrapper">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Выберите Факультет"
          optionFilterProp="children"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          filterOption={
            (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          value={selectedFaculty && selectedFaculty.name ? selectedFaculty.name : 'Выберите Факультет'}
        >
          {
          faculties && faculties.map(faculty => (
            <Option key={faculty._id} value={faculty}>
              {faculty.name}
            </Option>
          ))
        }
        </Select>
        <FacultiesWrap>
          {
            selectedFaculty && (
            <StyledCol>
              <FacultyCard faculty={selectedFaculty} subscription />
            </StyledCol>
            )
          }
        </FacultiesWrap>
      </FacultyContainerWrapper>
    );
  }


  render() {
    return (
      <FacultiesSchema>
        {StatefulView({
          renderOkState: this.renderSubscribtionFaculties,
          renderLoading: this.renderLoading,
        })}
      </FacultiesSchema>
    );
  }
}

export default SubscriptionFacultiesContainer;
