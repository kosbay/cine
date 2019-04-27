import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Link from 'next/link';
import { withNamespaces } from 'react-i18next';
import { compose } from 'recompact';

import { VideoPlayer, CourseCard } from '.';
import DefaultButton from './DefaultButton';

import Images from '../theme/Images';

const facultySVG = Images.facultyPlaceholder;
const backgroundSVG = Images.facultyBackgroundPlaceholder;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 1024px;
  align-items: center;
`;

const FacultyTopWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px;
  position: relative;
  width: calc(100vw - 16px);
  background: url("${backgroundSVG}") center center;

  @media screen and (max-width: 500px) {
    padding: 20px;
  }
`;

const SmallFaculty = styled.p`
  color: #77787a;
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  color: #606dc9;
  font-size: 32px;
  font-weight: 600;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 48px;
  }
`;

const DescriptionWrap = styled.p`
  color: #77787a;
  font-size: 16px;
`;

const DetailsDiv = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  z-index: 2;
`;

const CoursesDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  margin-left: 30px;
  align-items: center;
`;

const DetailsNumber = styled.p`
  color: #4f5aa6;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 40px;
  margin: 0;
`;

const DetailsWord = styled.p`
  color: #4f5aa6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

const DescriptionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 100px;
`;

const VideoDiv = styled.div`
  max-width: 730px;
  width: 100%;
  margin-top: 80px;
`;

const CoursesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: raw;
  margin-top: 40px;
  flex-wrap: wrap;
  margin-bottom: 80px;
  justify-content: space-around;
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const ProjectsRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 60px;

  @media screen and (max-width: 500px) {
    margin-bottom: 20px;
  }
`;

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 6px;
  margin-right: 6px;
`;

const ProjectImg = styled.img`
  height: 176px;
  width: 176px;
  overflow: hidden;
`;

const ProjectName = styled.div`
  margin-top: 16px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.85);
`;

const ProjectHeader = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #232424;
  margin-bottom: 40px;
`;

const CoursesHeader = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #232424;
  margin-top: 100px;
`;

const CourseRow = styled.div`
  margin: 20px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 50px;
  margin-top: 40px;
`;

const ImageContainer = styled.img`
  overflow: hidden;
  position: relative;
  max-height: 356px;
  max-width: 450px;
  width: 50%;
  height: 50%;
  z-index: 1;
  margin-top: -10%;
`;

const renderButton = ({
  isEnrolled, auth, buttonLoading, t,
}) => {
  if (isEnrolled || (auth.user && auth.user.role === 'admin')) {
    return (
      <Link href={{ pathname: '/profile', query: { userId: auth.user._id } }}>
        <a>
          <DefaultButton
            type="primary"
            size="large"
          >
            {t('faculties.continueLabel')}
          </DefaultButton>
        </a>
      </Link>
    );
  } if (!auth.user) {
    return (
      <Link href="/login">
        <a>
          <DefaultButton
            type="primary"
            size="large"
          >
            {t('loginPage.loginButtonLabel')}
          </DefaultButton>
        </a>
      </Link>
    );
  }
  return (
    <DefaultButton
      type="primary"
      size="large"
      loading={buttonLoading}
    >
      {t('faculties.deniedButtonLabel') }
    </DefaultButton>
  );
};

const FacultyHeader = ({
  faculty: {
    name,
    shortDescription,
    description,
    projects,
    projectsAmount,
    tasksAmount,
    imageURL,
    videoURL,
    courses,
  },
  isEnrolled,
  auth,
  handleEnrollUserButtonClick,
  requestSent,
  buttonLoading,
  t,
}) => {
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
    sources: [
      {
        src: videoURL,
        type: 'video/mp4',
      },
    ],
  };

  function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }
  return (
    <Container>
      <FacultyTopWrap>
        <SmallFaculty>
          {t('faculties.cardLabel')}
        </SmallFaculty>
        <Title>
          {name || t('faculties.noName')}
        </Title>
        <DescriptionWrap>
          {shortDescription || t('faculties.noDescription')}
        </DescriptionWrap>
        <ButtonContainer>
          { renderButton({
            isEnrolled, auth, handleEnrollUserButtonClick, requestSent, buttonLoading, t,
          })}
        </ButtonContainer>
        <DetailsDiv>
          <CoursesDiv>
            <DetailsNumber>{courses ? courses.length : 0}</DetailsNumber>
            <DetailsWord>
              {declOfNum(courses ? courses.length : 0, [
                t('faculties.oneCourse'),
                t('faculties.fewCourses'),
                t('faculties.afewCourses')])}
            </DetailsWord>
          </CoursesDiv>
          <CoursesDiv>
            <DetailsNumber>{projectsAmount || 0}</DetailsNumber>
            <DetailsWord>
              {declOfNum(projectsAmount, [
                t('faculties.oneProject'),
                t('faculties.fewProjects'),
                t('faculties.afewProjects')])}
            </DetailsWord>
          </CoursesDiv>
          <CoursesDiv>
            <DetailsNumber>{tasksAmount || 0}</DetailsNumber>
            <DetailsWord>
              {declOfNum(tasksAmount, [
                t('faculties.oneAssignment'),
                t('faculties.fewAssignments'),
                t('faculties.afewAssignments')])}
            </DetailsWord>
          </CoursesDiv>
        </DetailsDiv>
      </FacultyTopWrap>
      <ImageContainer alt="example" src={imageURL || facultySVG} />
      <DescriptionCard>
        <h2>{t('faculties.facultyDecriptionLabel')}</h2>
        {description || t('faculties.noDescription')}
      </DescriptionCard>
      {videoURL && (
        <VideoDiv>
          <VideoPlayer {...videoJsOptions} />
        </VideoDiv>
      )}
      <CoursesHeader>{t('faculties.coursesLabel')}</CoursesHeader>
      {courses && courses.length > 0
        ? (
          <CoursesContainer>
            {courses.filter(course => course).map(course => (
              <CourseRow key={course._id}>
                <CourseCard course={course} />
              </CourseRow>
            ))}
          </CoursesContainer>
        )
        : (
          <CoursesContainer>
            {t('faculties.noCourses')}
          </CoursesContainer>
        )

        }
      {projects && projects.length > 0 && (
        <ProjectsContainer>
          <ProjectHeader>
            {t('faculties.tasksWillDone')}
          </ProjectHeader>
          {projects.map(project => (
            <ProjectsRow id={project._id}>
              <ProjectCard>
                <ProjectImg alt="ProjectImage" src={project.imageURL} />
                <ProjectName>{project.name}</ProjectName>
              </ProjectCard>
            </ProjectsRow>
          ))}
        </ProjectsContainer>
      )}
    </Container>
  );
};

renderButton.propTypes = {
  t: PropTypes.func.isRequired,
  isEnrolled: PropTypes.bool.isRequired,
  buttonLoading: PropTypes.bool.isRequired,
  auth: PropTypes.shape({}).isRequired,
};

FacultyHeader.propTypes = {
  t: PropTypes.func.isRequired,
  faculty: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
  auth: PropTypes.shape({}).isRequired,
};

FacultyHeader.defaultProps = {
  faculty: {},
};

const mapStateToProps = ({ auth }) => ({ auth });

const withState = connect(mapStateToProps, null);
export default compose(withState, withNamespaces())(FacultyHeader);
