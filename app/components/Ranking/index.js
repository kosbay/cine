import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu } from 'antd';
import { connect } from 'react-redux';

import { StudentsRankingSchema, SchoolsRankingSchema } from 'schemas';
import rankingTable from './rankingTable';
import SchoolCard from './SchoolCard';
import StudentCard from './StudentCard';

const ResponsiveWrapper = styled.div`
  margin: auto;
  margin-top: 20px;
  margin-bottom: 40px;
  max-width: 1024px;
  width: 90%;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 20px;
  }
`;

const RankingSidesWraper = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 700px) {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
  }
`;

const RatingTitle = styled.p`
  color: #606dc9;
  font-size: 48px;
  margin-bottom: 50px;
  height: 60px;
  width: 100%;
`;

const RatingListWrapped = styled.div`
  width: 100%;
`;

const RatingLeft = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const RatingRight = styled.div`
  display: block;
  width: 30%;
  margin-bottom: 20px;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

class RatingContainer extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    schoolId: PropTypes.string,
    auth: PropTypes.shape({}).isRequired,
    faculties: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    schoolId: '',
  };

  state = {
    currentTab: ['users'],
  };

  handleTabClick = ({ keyPath: currentTab }) => this.setState({ currentTab });

  handleGetFacultyColor = () => {
    const { faculties } = this.props;
    return Object.keys(faculties)
      .map(key => ({
        [key]: {
          color: faculties[key].color ? faculties[key].color : '#000',
          name: faculties[key].name,
        },
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  };

  render() {
    const {
      userId, schoolId, faculties, auth,
    } = this.props;
    const isTeacher = !!(auth.user && auth.user.role === 'teacher');
    const { currentTab } = this.state;
    let facultyColors = [];
    if (faculties) {
      facultyColors = this.handleGetFacultyColor();
    }
    return (
      <ResponsiveWrapper>
        <RatingTitle>Рейтинг</RatingTitle>
        <RankingSidesWraper>
          <RatingLeft>
            <Menu
              id="sider"
              onClick={this.handleTabClick}
              selectedKeys={currentTab}
              mode="horizontal"
            >
              <Menu.Item id="users" key="users">
                По ученикам
              </Menu.Item>
              <Menu.Item id="schools" key="schools">
                По школам
              </Menu.Item>
            </Menu>
            <RatingListWrapped isAuth={Boolean(userId)}>
              {currentTab[0] === 'users' && (
                <StudentsRankingSchema>{rankingTable(facultyColors)}</StudentsRankingSchema>
              )}
              {currentTab[0] === 'schools' && (
                <SchoolsRankingSchema>{rankingTable()}</SchoolsRankingSchema>
              )}
            </RatingListWrapped>
          </RatingLeft>
          <RatingRight>
            {currentTab[0] === 'users' && userId && !isTeacher && <StudentCard userId={userId} />}
            {currentTab[0] === 'schools' && schoolId && <SchoolCard schoolId={schoolId} />}
          </RatingRight>
        </RankingSidesWraper>
      </ResponsiveWrapper>
    );
  }
}
const mapStateToProps = ({ faculties, auth }) => ({
  faculties,
  auth,
});

export default connect(
  mapStateToProps,
  {
    /* fetchFaculties */
  }
)(RatingContainer);
