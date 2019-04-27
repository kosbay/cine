import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Progress, Icon } from 'antd';
import { withNamespaces } from 'react-i18next';
import DefaultButton from '../DefaultButton';

const Container = styled.div`
  width: 232px;
  height: 248px;
  display: block;
  overflow: hidden;
  margin-right: 24px;
  margin-bottom: 24px;
  box-shadow: 0 14px 22px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  :hover {
    box-shadow: none;
  }
`;

const SubContainer = styled.div`
  width: 100%;
  height: 245px;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: space-between;
  padding: 16px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 200px;
  justify-content: space-between;
`;

const ColoredLine = styled.div`
  width: 100%;
  height: 3px;
  background: ${p => p.color};
`;

const FacultyName = styled.p`
  color: #232424;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const CourseText = styled.p`
  color: #77787a;
  font-size: 14px;
`;

const getButtonLabel = (
  active, finished, courseProgress, t
) => {
  if (finished) {
    return `${<Icon type="check" />} ${t('profile.userFacultyCourseDoneLabel')}`;
  }
  if (courseProgress === 0) {
    return t('profile.userFacultyCourseStartLabel');
  }
  return t('profile.userFacultyCourseContinueLabel');
};

const ProfileFacultyCourseCard = ({
  course, color, isCurrentUser, t,
}) => {
  const finishedChapters = course.finishedChapters ? course.finishedChapters : 0;

  const courseProgress = parseInt(
    ((course.finishedChapters / course.numberOfChapters) * 100).toFixed(2),
    10
  );

  const userCourseHref = { pathname: '/userCourse', query: { courseId: course._id } };

  return (
    <Container>
      <ColoredLine color={color} />
      <SubContainer>
        <TopContainer>
          <CourseText>{t('profile.userFacultyCourseLabel')}</CourseText>
          <FacultyName>{course.name}</FacultyName>
        </TopContainer>
        <BottomContainer>
          {course.active && (
            <Progress
              style={{ marginTop: '60px' }}
              type="circle"
              strokeColor={color}
              format={() => `${finishedChapters}/${course.numberOfChapters}`
              }
              percent={courseProgress}
              width={48}
            />
          )}
          {isCurrentUser && (
          <DefaultButton
            to={userCourseHref}
            type="default"
            extraStyle={{
              marginTop: '76px',
              width: '143px',
              height: '32px',
            }}
          >
            { getButtonLabel(course.active, course.finished, courseProgress, t)}
          </DefaultButton>
          )
          }
        </BottomContainer>
      </SubContainer>
    </Container>
  );
};

ProfileFacultyCourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
  }),
  isCurrentUser: PropTypes.bool,
  t: PropTypes.func.isRequired,
  color: PropTypes.string,
};

ProfileFacultyCourseCard.defaultProps = {
  course: {},
  color: '',
  isCurrentUser: false,
};

export default withNamespaces()(ProfileFacultyCourseCard);
