import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { compose } from 'recompact';

import DefaultButton from './DefaultButton';
import Images from '../theme/Images';

const facultySVG = Images.facultyPlaceholder;

const loadingStyles = `background: linear-gradient(
      90deg,
      rgba(207, 216, 220, 0.2),
      rgba(207, 216, 220, 0.4),
      rgba(207, 216, 220, 0.2)
    );
    animation: card-loading 1.4s ease infinite;
    background-size: 600% 600%;
    border-radius: 2px;
    `;

const ImageContainer = styled.div`
  height: 160px;
  width: 250px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  margin-bottom: -80px;
  margin-right: -60px;
  margin-top: 80px;

  @media screen and (max-width: 500px) {
    margin-bottom: -80px;
    margin-right: -29px;
    margin-top: 80px;
    margin-left: -30px;
  }
`;

const CardImage = styled.img`
  max-width: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 24px;
  ${p => p.loading && `margin-top: 120px; width: 144px; height: 40px; ${loadingStyles}`};
`;

const Container = styled.div`
  width: 460px;
  height: 376px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 14px 22px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  :hover {
    box-shadow: none;
  }

  @media screen and (max-width: 500px) {
    width: calc(100vw - 20px);
  }
`;

const SubContainer = styled.div`
  width: 99%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 28px;

  @media screen and (max-width: 500px) {
    width: calc(100vw - 20px);
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColoredLine = styled.div`
  width: 4px;
  height: 100%;
  background: ${p => p.color};
  ${p => p.loading && 'background: linear-gradient(90deg, rgba(207, 216, 220, 0.2), rgba(207, 216, 220, 0.4), rgba(207, 216, 220, 0.2)); animation: card-loading 1.4s ease infinite; background-size: 600% 600%;'};
`;

const DetailsDiv = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const CoursesDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
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
`;

const FacultyTitle = styled.p`
  color: #232424;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 0;
  ${p => p.loading && `width: 120px; height: 24px; ${loadingStyles}`};
`;

const FacultyName = styled.p`
  color: #232424;
  display: flex;
  align-items: center;
  font-size: 24px;
  margin: 8px 0 16px;
  ${p => p.loading && `width: 259px; height: 36px; ${loadingStyles}`};
`;

const FacultyDescription = styled.p`
  @media screen and (min-width: 768px) {
    color: #77787a;
    display: flex;
    align-items: center;
    font-size: 16px;
    margin: 0;
  }
`;

const LoadingContainer = styled.div`
  width: ${p => p.width && p.width}%;
  margin-bottom: 8px;
  height: 20px;
  ${loadingStyles};
`;

const FacultyCard = ({
  faculty, loading, auth, t, subscription,
}) => {
  function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  const getRightButtonStyle = (hasAccess, active) => {
    if (hasAccess) {
      if (!active) {
        return ({ borderColor: 'red', color: 'red' });
      }
      return {};
    }
    return ({ cursor: 'not-allowed', width: '144px', height: '40px' });
  };

  const getRandomWidth = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const {
    name, color, courses, active, tasksAmount, projectsAmount, shortDescription, imageURL,
  } = faculty;
  const isAdmin = auth.user && auth.user.role === 'admin';
  const hasAccess = active || isAdmin;
  return loading ? (
    <Container>
      <ColoredLine loading />
      <SubContainer>
        <TopContainer>
          <FacultyTitle loading />
          <FacultyName loading />
          <LoadingContainer width={getRandomWidth(50, 100)} />
          <LoadingContainer width={getRandomWidth(50, 90)} />
        </TopContainer>
        <BottomContainer>
          <DetailsContainer>
            <ButtonContainer loading />
          </DetailsContainer>
          <ImageContainer />
        </BottomContainer>
      </SubContainer>
    </Container>
  ) : (
    <Container>
      <ColoredLine color={isAdmin ? color || 'red' : color} />
      <SubContainer>
        <TopContainer>
          <FacultyTitle>{t('faculties.cardLabel')}</FacultyTitle>
          <FacultyName>{name || t('faculties.noName')}</FacultyName>
          <FacultyDescription>
            {shortDescription || t('faculties.noDescription')}
          </FacultyDescription>
        </TopContainer>
        <BottomContainer>
          <DetailsContainer>
            <DetailsDiv>
              <CoursesDiv>
                <DetailsNumber>{courses ? courses.length : 0}</DetailsNumber>
                <DetailsWord>
                  {declOfNum(courses ? courses.length : 0, [
                    t('faculties.oneCourse'),
                    t('faculties.fewCourses'),
                    t('faculties.afewCourses'),
                  ])}
                </DetailsWord>
              </CoursesDiv>
              <CoursesDiv>
                <DetailsNumber>{projectsAmount || 0}</DetailsNumber>
                <DetailsWord>
                  {declOfNum(projectsAmount || 0, [
                    t('faculties.oneProject'),
                    t('faculties.fewProjects'),
                    t('faculties.afewProjects'),
                  ])}
                </DetailsWord>
              </CoursesDiv>
              <CoursesDiv>
                <DetailsNumber>{tasksAmount || 0}</DetailsNumber>
                <DetailsWord>
                  {declOfNum(tasksAmount || 0, [
                    t('faculties.oneAssignment'),
                    t('faculties.fewAssignments'),
                    t('faculties.afewAssignments'),
                  ])}
                </DetailsWord>
              </CoursesDiv>
            </DetailsDiv>
            {
              !subscription
                ? (
                  <ButtonContainer>
                    <Link href={{ pathname: '/faculty', query: { facultyId: faculty._id } }}>
                      <a>
                        <DefaultButton
                          type={hasAccess ? 'primary' : 'dashed'}
                          extraStyle={getRightButtonStyle(hasAccess, active)}
                        >
                          {hasAccess ? t('faculties.learnMoreButtonLabel') : t('faculties.deniedButtonLabel')}
                        </DefaultButton>
                      </a>
                    </Link>
                  </ButtonContainer>
                ) : null
            }

          </DetailsContainer>
          <ImageContainer>
            <CardImage alt="example" src={imageURL || facultySVG} />
          </ImageContainer>
        </BottomContainer>
      </SubContainer>
    </Container>
  );
};

FacultyCard.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  t: PropTypes.func.isRequired,
  faculty: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    courses: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          chapters: PropTypes.arrayOf(
            PropTypes.shape({ lessons: PropTypes.shape({}) })
          ),
        })
      ),
      PropTypes.array,
    ]),
  }),
  loading: PropTypes.bool,
  subscription: PropTypes.bool,
};

FacultyCard.defaultProps = {
  faculty: {},
  loading: false,
};


const mapStateToProps = ({ auth }) => ({ auth });

const withState = connect(mapStateToProps);

export default compose(withState, withNamespaces())(FacultyCard);
