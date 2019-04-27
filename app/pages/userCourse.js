import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Progress } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';

import page from 'hocs/page';
import Loading from 'components/Loading';
import { getUserCourseFromState } from 'store/models';
import {
  CourseProjectCard, CourseCertificateCard, StatefulView, Spinner,
} from 'components';
import { CourseWithProgressSchema, EnrollmentSchema } from 'schemas';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1024px;
  margin: auto;
  width: 100%;
`;

const CourseProgressWrap = styled.div`
  height: 72px;
  display: flex;
  align-items: center;
  background-color: #fafafa;
  justify-content: center;
  position: fixed;
  z-index: 10;
  width: calc(100% - 126px);
  left: 112px;
`;

const FixedProgressWrap = styled.div`
  height: 100%;
  width: 100vw;
  padding: 0 20px 0 20px;
  max-width: 1024px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProgressWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #77787a;
  font-size: 16px;
`;

const CourseName = styled.p`
  color: black;
  font-size: 16px;
  text-align: left;
  margin: 0;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 64px;
  margin-bottom: 100px;
  padding: 20px;
`;

class UserCourse extends Component {
  calculateNextStarted = (chaptersWithProgress, index) => {
    if (chaptersWithProgress[index + 1]) {
      return chaptersWithProgress[index + 1].userWupai > 0;
    }
    if (chaptersWithProgress.length === index + 1) {
      return true;
    }
    return false;
  };

  renderCourse = ({ data }) => {
    const {
      router: {
        query: { courseId },
      },
      auth,
    } = this.props;

    if (data && data.isEnrolled) {
      return (
        <CourseWithProgressSchema courseId={courseId} userId={auth.user._id}>
          {StatefulView({
            renderOkState: this.renderCourseCards,
            renderLoading: this.renderLoadingCourseCards,
          })}
        </CourseWithProgressSchema>
      );
    }

    return <Redirect to={`/course/${courseId}`} />;
  }

  renderLoadingCourse = () => (
    <Loading />
  )

  renderCourseCards = ({ data }) => {
    if (data && data.chaptersWithProgress) {
      return data.chaptersWithProgress.map((chapter, index, arr) => (
        <React.Fragment key={chapter._id}>
          <CourseProjectCard
            key={chapter._id}
            isPrefFinished={arr[index - 1] ? arr[index - 1].finished : true}
            isPrevStarted={arr[index - 1] ? arr[index - 1].userWupai > 0 : false}
            isNextStarted={this.calculateNextStarted(arr, index)}
            chapter={chapter}
            index={index}
            lastIndex={arr.length}
          />
          {index === arr.length - 1 && (
            <CourseCertificateCard
              certificateId={
                this.props.course.certificate ? this.props.course.certificate._id : null
              }
              key={`${this.props.router.query.courseId}-certificate`}
              courseId={
                this.props.course.certificate
                  ? this.props.course.certificate._id
                  : this.props.course._id
              }
              isPrefFinished={arr[index].finished}
              description={
                this.props.course.certificate ? this.props.course.certificate.description : ''
              }
              courseName={this.props.course.name}
              isPrevStarted={arr[index - 1] ? arr[index - 1].userWupai > 0 : false}
              index={index + 1}
              lastIndex={arr.length}
            />
          )}
        </React.Fragment>
      ));
    }
    return null;
  };

  renderLoadingCourseCards = () => <Spinner />;

  render() {
    const {
      course,
      router: {
        query: { courseId },
      },
      auth,
      t,
    } = this.props;
    const courseProgress = parseInt(((course.userWupai / course.wupai) * 100).toFixed(2), 10);
    if (!auth || !auth.user || !auth.user._id) return null;
    return (
      <Container>
        <CourseProgressWrap>
          <FixedProgressWrap>
            <CourseName>{course.name || t('userCourse.noName')}</CourseName>
            <ProgressWrap>
              {t('userCourse.progress')}
              <Progress
                style={{ marginLeft: '16px' }}
                type="circle"
                percent={courseProgress}
                format={() => `${course.finishedChapters || 0}/${course.numberOfChapters || 0}`}
                width={48}
              />
            </ProgressWrap>
          </FixedProgressWrap>
        </CourseProgressWrap>
        <CardsContainer>
          <EnrollmentSchema courseId={courseId}>
            {
            StatefulView({
              renderOkState: this.renderCourse,
              renderLoading: this.renderLoadingCourse,
            })
          }
          </EnrollmentSchema>
        </CardsContainer>
      </Container>
    );
  }
}

UserCourse.propTypes = {
  t: PropTypes.func.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({ courseId: PropTypes.string }),
  }).isRequired,
  auth: PropTypes.shape({ user: PropTypes.shape({ _id: PropTypes.any }) }).isRequired,
  course: PropTypes.shape({
    certificate: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    name: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }),
};

UserCourse.defaultProps = {
  course: {},
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  course: getUserCourseFromState(ownProps.router.query.courseId, state),
});

const withState = connect(mapStateToProps);

const EnhancedUserCourse = compose(
  page,
  withNamespaces(),
  withState
)(UserCourse);

export default EnhancedUserCourse;
