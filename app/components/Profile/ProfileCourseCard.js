import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Card, Progress, Icon } from 'antd';
import DefaultButton from '../DefaultButton';

const LoadingCoverContainer = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
`;

const ImageContainer = styled.img`
  width: 100%;
  height: 122px;
  background-color: #aeaeae;
`;

const LoadingCover = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, rgba(207, 216, 220, 0.2), rgba(207, 216, 220, 0.4), rgba(207, 216, 220, 0.2));
  -webkit-animation: card-loading 1.4s ease infinite;
  animation: card-loading 1.4s ease infinite;
  background-size: 600% 600%;
  border-radius: 2px;
`;

const Container = styled.div`
  width: 244px;
  height: 336px;
  display: block;
  overflow: hidden;
  margin-top: 24px;
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }

  box-shadow: 0 14px 22px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  :hover {
    box-shadow: none;
  }
`;

const SubContainer = styled.div`
  width: 100%;
  height: 214px;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 16px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: raw;
  justify-content: space-between;
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

const ProfileCourseCard = ({ course, loading }) => {
  const courseProgress = parseInt(
    ((course.finishedChapters / course.numberOfChapters) * 100).toFixed(2),
    10
  );

  const userCourseHref = { pathname: '/userCourse', query: { courseId: course._id } };

  return loading ? (
    <Card
      loading={loading}
      cover={(
        <LoadingCoverContainer>
          <LoadingCover />
        </LoadingCoverContainer>
)}
    />
  ) : (
    <Container>
      <ImageContainer alt="Image" src={course.imageURL} />
      <SubContainer>
        <TopContainer>
          <CourseText>Курс</CourseText>
          <FacultyName>{course.name}</FacultyName>
        </TopContainer>
        <BottomContainer style={{ marginTop: '30px' }}>
          {course.active && (
            <Progress
              type="circle"
              format={() => `${course.finishedChapters}/${course.numberOfChapters}`
              }
              percent={courseProgress}
              width={48}
            />
          )}
          {course.active ? (
            <Link href={userCourseHref}>
              <DefaultButton type="default" extraStyle={{ marginTop: '14px', width: '143px', height: '32px' }}>
                {course.finished && <Icon type="check" />}
                {// eslint-disable-next-line no-nested-ternary
                course.finished
                  ? 'Курс пройден'
                  : courseProgress === 0
                    ? 'Начать курс'
                    : 'Продолжить'}
              </DefaultButton>
            </Link>
          ) : (
            <DefaultButton
              type="dashed"
              extraStyle={{ marginTop: '14px', width: '143px', height: '32px' }}
            >
              Недоступно
            </DefaultButton>
          )}
        </BottomContainer>
      </SubContainer>
    </Container>
  );
};
ProfileCourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

ProfileCourseCard.defaultProps = {
  course: {},
  loading: false,
};

export default ProfileCourseCard;
