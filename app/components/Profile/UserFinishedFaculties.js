import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import FacultyCard from './ProfileFacultyCard';
import FacultyCourseCard from './ProfileFacultyCourseCard';

const FacultiesContainer = styled.div`
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  font-size: 16px;
  justify-content: center;

  @media screen and (max-width: 768px) {
    margin-top: 50px;
  }
`;

const FacultiesContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftContainer = styled.div`
  width: 100%;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const HorizontalLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: #dedede;
  margin-top: 50px;
`;

class UserFinishedFaculties extends React.PureComponent {
  static propTypes = {
    isCurrentUser: PropTypes.bool.isRequired,
    userFaculties: PropTypes.shape({}).isRequired,
  };

  render() {
    const { userFaculties, isCurrentUser } = this.props;
    if (userFaculties) {
      const finishedFaculties = Object.values(userFaculties).filter(faculty => faculty.finished);
      if (!finishedFaculties.length) return null;
      return (
        <FacultiesContainer>
        Пройденные факультеты:
          {finishedFaculties.map((faculty, index) => (
            <LineContainer>
              <FacultiesContent>
                <LeftContainer>
                  <FacultyCard faculty={faculty} />
                </LeftContainer>
                <RightContainer>
                  {faculty.userCourses.map(course => (
                    <FacultyCourseCard
                      course={course}
                      color={faculty.color}
                      isCurrentUser={isCurrentUser}
                    />
                  ))}
                </RightContainer>
              </FacultiesContent>
              {index < finishedFaculties.length - 1 && (
              <HorizontalLine />
              )}
            </LineContainer>
          ))}
        </FacultiesContainer>
      );
    } return null;
  }
}

const mapStateToProps = ({ userFaculties }) => ({ userFaculties });

const withState = connect(mapStateToProps, null);

export default compose(withState, withNamespaces())(UserFinishedFaculties);
