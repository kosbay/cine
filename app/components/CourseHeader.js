import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Collapse, Skeleton } from 'antd';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { compose } from 'recompact';
import Link from 'next/link';
import { VideoPlayer, StatefulView } from '.';
import { ChapterSchema, EnrollmentSchema } from '../schemas';
import DefaultButton from './DefaultButton';

const { Panel } = Collapse;

const TYPE_HELPER = {
  Text: 'file-text',
  Video: 'video-camera',
  Presentation: 'file-ppt',
  SimpleBlockly: 'appstore-o',
  Quiz: 'bulb',
  CodeEquality: 'code-o',
  CodeOutput: 'code-o',
};

const Container = styled.div`
  display: flex;
  max-width: 1024px;
  margin: auto;
  margin-top: 80px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 426px;
  height: 216px;
  border-radius: 6px;
  margin-bottom: 56px;
`;

const RightCol = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SmallFaculty = styled.p`
  color: #000;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  color: #606dc9;
  font-size: 48px;
  margin: 0;
  text-align: center;

  @media screen and (max-width: 500px) {
    font-size: 32px;
  }
`;

const DescriptionCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 32px;
  margin-top: 80px;
  max-width: 728px;
  width: 100%;

  @media screen and (max-width: 728px) {
    margin: 15px;
    width: calc(100% - 30px);
  }
`;

const VideoDiv = styled.div`
  max-height: 412px;
  max-width: 728px;
  margin-top: 80px;
  width: 100%;

  @media screen and (max-width: 728px) {
    margin: 15px;
    width: calc(100% - 30px);
  }
`;

const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding-top: 32px;
  margin-top: 80px;
  margin-bottom: 100px;
  max-width: 728px;
  width: 100%;

  @media screen and (max-width: 728px) {
    margin: 15px;
    margin-bottom: 100px;
    width: calc(100% - 30px);
  }
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
`;

const StyledCollapse = styled(Collapse)`
  & > div {
    :last-child {
      border-bottom: none;
    }
  }
`;

const StyledIcon = styled(Icon)`
  margin-left: 10px;
  width: 16px;
  height: 16px;
`;

const renderLoadingPanel = () => {
  const titleLength = Math.floor(Math.random() * 100) + 20;
  return <Skeleton active avatar paragraph={{ rows: 0 }} title={{ width: `${titleLength}%` }} />;
};

const renderChapterPanel = panelProps => ({ data: chapter }) => (
  <Panel {...panelProps} header={chapter ? chapter.name : ''} key={chapter._id}>
    {chapter.modules
      && chapter.modules.map(module => (
        <ul key={module._id}>
          {module.lessons.map(lesson => (
            <Link
              href={{
                pathname: '/learn',
                query: { chapterId: chapter._id, lessonId: lesson._id },
              }}
            >
              <a>
                <li key={lesson._id}>
                  {lesson.name}
                  <StyledIcon type={TYPE_HELPER[lesson.type]} />
                </li>
              </a>
            </Link>
          ))}
        </ul>
      ))}
  </Panel>
);

const ChapterSchemaWithPanel = ({ chapterId, ...panelProps }) => (
  <ChapterSchema chapterId={chapterId}>
    {StatefulView({
      renderOkState: renderChapterPanel(panelProps),
      renderLoading: renderLoadingPanel,
    })}
  </ChapterSchema>
);

const renderEnrollmentButtonContainer = (
  { data, loading, error },
  courseId,
  auth,
  buttonLoading,
  t
) => {
  if (loading || buttonLoading || error) {
    return (
      <ButtonContainer>
        <DefaultButton loading={error ? false : loading} size="large">
          {error ? t('courses.error') : t('courses.loading')}
        </DefaultButton>
      </ButtonContainer>
    );
  }
  const { isEnrolled } = data;

  return (
    <ButtonContainer>
      {isEnrolled ? (
        <Link href={{ pathname: '/userCourse', query: { courseId } }}>
          <a>
            <DefaultButton size="large" type="primary">
              {t('courses.continueLabel')}
            </DefaultButton>
          </a>
        </Link>
      ) : (
        <DefaultButton size="large" type="primary">
          {t('courses.deniedButtonLabel')}
        </DefaultButton>
      )}
    </ButtonContainer>
  );
};

const CourseHeader = ({
  course, buttonLoading, auth, t,
}) => {
  const {
    name, description, imageURL, videoURL, chapters,
  } = course || { name: '' };

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
  return (
    <Container>
      <Helmet>
        <title>
          {`
          ${t('courses.titleCourse')} ${name || t('courses.noDescription')} | Wunder.kz
          `}
        </title>
      </Helmet>
      <RightCol>
        <Image src={imageURL} />
        <SmallFaculty>{t('courses.titleCourse')}</SmallFaculty>
        <Title>{name || t('courses.noName')}</Title>
        {auth.user ? (
          course
          && course._id && (
            <EnrollmentSchema courseId={course._id}>
              {options => renderEnrollmentButtonContainer(
                options, course._id, auth, buttonLoading, t
              )
              }
            </EnrollmentSchema>
          )
        ) : (
          <Link href={{ pathname: '/login' }}>
            <a>
              <DefaultButton type="primary" size="large">
                {t('courses.loginButtonLabel')}
              </DefaultButton>
            </a>
          </Link>
        )}
        <DescriptionCard>
          <h2>{t('courses.descriptionLabel')}</h2>
          {description || t('courses.noDescription')}
        </DescriptionCard>
        {videoURL ? (
          <VideoDiv>
            <VideoPlayer {...videoJsOptions} />
          </VideoDiv>
        ) : null}
        <CoursesContainer>
          <h2 style={{ marginLeft: '32px' }}>{t('courses.contentLabel')}</h2>
          <StyledCollapse bordered={false}>
            {chapters
              && chapters.length
              && chapters.map(chapterId => (
                <ChapterSchemaWithPanel key={chapterId} chapterId={chapterId} />
              ))}
          </StyledCollapse>
        </CoursesContainer>
      </RightCol>
    </Container>
  );
};

CourseHeader.propTypes = {
  t: PropTypes.func.isRequired,
  buttonLoading: PropTypes.bool.isRequired,
  course: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  auth: PropTypes.shape({}).isRequired,
  isEnrolled: PropTypes.bool,
  enrollmentStatus: PropTypes.bool,
};

renderChapterPanel.propTypes = {
  data: PropTypes.string.isRequired,
};

renderEnrollmentButtonContainer.propTypes = {
  data: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

ChapterSchemaWithPanel.propTypes = {
  chapterId: PropTypes.string.isRequired,
};

CourseHeader.defaultProps = {
  isEnrolled: false,
  course: null,
  enrollmentStatus: false,
};

const mapStateToProps = ({ auth }) => ({ auth });

const withState = connect(
  mapStateToProps,
  null
);

export default compose(
  withState,
  withNamespaces()
)(CourseHeader);
