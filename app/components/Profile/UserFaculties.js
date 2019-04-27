import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import arrayChunk from 'utils/helpers';
import { StatefulView } from 'components';
import { FacultiesWithProgressSchema } from 'schemas';
import { withNamespaces } from 'react-i18next';
import FacultyCard from './ProfileFacultyCard';
import FacultyCourseCard from './ProfileFacultyCourseCard';

const chunkedLoadingFaculty = arrayChunk([1], 1);

const FacultiesContainer = styled.div`
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  font-size: 16px;
  justify-content: center;
  margin-bottom: 80px;

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


class UserFaculties extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
  };

  renderCourse = userFaculty => (course) => {
    const { isCurrentUser } = this.props;
    return (
      course
      && (
      <FacultyCourseCard
        key={course.name}
        course={course}
        color={userFaculty.color}
        isCurrentUser={isCurrentUser}
      />
      )
    );
  }

  renderUserFaculties = ({ data: userFaculties }) => (userFaculties.length > 0 ? (
    <FacultiesContainer>
      { /*eslint-disable*/
        this.props.t('profile.userFaculties')
        /* eslint-enable */
      }
      { userFaculties.map((faculty, index) => this.renderUserFaculty({ faculty, index }))}
    </FacultiesContainer>
  )
    : (
      <FacultiesContainer />
    ))
  ;

  renderUserFaculty = ({ faculty, index }) => {
    if (!faculty.userCourses || faculty.userCourses.length < 1) {
      return null;
    }
    return (
      <LineContainer key={`userFaculty:${faculty.name + index}`}>
        <FacultiesContent>
          <LeftContainer>
            <FacultyCard faculty={faculty} loading={false} />
          </LeftContainer>
          <RightContainer>
            { faculty.userCourses.map(this.renderCourse(faculty))}
          </RightContainer>
        </FacultiesContent>
        <HorizontalLine />
      </LineContainer>
    );
  }

  renderUserFacultiesLoading = () => (
    <FacultiesContainer>
      {chunkedLoadingFaculty.map((chunk, index) => (
        <LineContainer key={`line${chunk * index}`}>
          <FacultiesContent>
            <LeftContainer>
              <FacultyCard loading />
            </LeftContainer>
          </FacultiesContent>
          {index < chunkedLoadingFaculty.length - 1 && (
          <HorizontalLine />
          )}
        </LineContainer>
      ))}
    </FacultiesContainer>
  );

  // renderError = () => {
  //   const { t } = this.props;
  //   return (<div>{t('profile.userFacultiesError')}</div>);
  // }

  render() {
    const { userId } = this.props;
    return (
      <FacultiesWithProgressSchema userId={userId}>
        {StatefulView({
          renderOkState: this.renderUserFaculties,
          renderLoading: this.renderUserFacultiesLoading,
        })}
      </FacultiesWithProgressSchema>
    );
  }
}

export default withNamespaces()(UserFaculties);
