import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import styled from 'styled-components';

import { CourseProgressBySchoolSchema, FacultiesBySchool, SchoolRankingSchema } from 'schemas';
import { StatefulView } from '..';
import SchoolHeader from './SchoolHeader';
import SchoolSiderMenu from './SchoolSiderMenu';
import StudentsProgress from './StudentsProgress';

const menuStyle = {
  minWidth: '250px',
  width: '250px',
  marginRight: '40px',
  height: 'fit-content',
};

const FacultiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: black;
  font-weight: 400;
  margin-bottom: 80px;
`;

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
`;

const MenuWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

class School extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
  };

  state = {
    selectedKeys: [],
    selectedNames: [],
  };

  handleCourseClick = ({ key }) => {
    const [courseKey, courseName] = key.split('-');
    this.setState({ selectedKeys: [courseKey], selectedNames: [courseName] });
  };

  renderSchoolFacultiesSider = ({ data: faculties }) => {
    const courseId = this.state.selectedKeys.length > 0
      ? this.state.selectedKeys[0]
      : faculties[0].courses[0]._id;
    const courseName = this.state.selectedNames[0] || '';
    const key = `${this.props.user.school._id}-${courseId}`;
    return (
      <MenuWrapper key={key}>
        <Menu
          onClick={this.handleCourseClick}
          mode="inline"
          selectedKeys={this.state.selectedKeys}
          style={menuStyle}
        >
          {SchoolSiderMenu({ faculties })}
        </Menu>
        <CourseProgressBySchoolSchema
          key={key}
          schoolId={
            this.props.user.school._id ? this.props.user.school._id : this.props.user.school
          }
          courseId={courseId}
        >
          {props => <StudentsProgress courseName={courseName} {...props} />}
        </CourseProgressBySchoolSchema>
      </MenuWrapper>
    );
  };

  render() {
    const { user } = this.props;
    return (
      <Wrapper>
        <SchoolRankingSchema schoolId={user.school._id ? user.school._id : user.school}>
          {StatefulView({
            renderOkState: SchoolHeader,
          })}
        </SchoolRankingSchema>
        <FacultiesWrapper>
          Факультеты
          <FacultiesBySchool schoolId={user.school._id ? user.school._id : user.school}>
            {StatefulView({
              renderOkState: this.renderSchoolFacultiesSider,
            })}
          </FacultiesBySchool>
        </FacultiesWrapper>
      </Wrapper>
    );
  }
}

export default School;
