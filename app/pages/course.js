import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompact';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';

import { enrollUser } from 'actions';
import page from 'hocs/page';
import { CourseSchema } from 'schemas';
import { StatefulView, CourseHeader, Spinner } from 'components';

class Course extends Component {
  state = { loading: false };

  handleEnrollUserButtonClick = async () => {
    const {
      router: {
        query: { courseId },
      },
      auth,
      enrollUser: enrollUserFunc,
    } = this.props;

    this.setState({ loading: true });
    await enrollUserFunc(courseId, auth.user._id);
    this.setState({ loading: false });
  };

  renderLoadingCourseHeader = () => (
    <Spinner />
  )

  renderCourseHeader = ({ data: course }) => {
    const { loading } = this.state;
    const { t } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {`
          ${t('pages.course')} ${course.name || 'No name'} | ${t('pages.website')}
          `}
          </title>
        </Helmet>
        <CourseHeader
          course={course}
          buttonLoading={loading}
          onEnrollUserButtonClick={this.handleEnrollUserButtonClick}
        />
      </React.Fragment>
    );
  }

  render() {
    const {
      router: { query: { courseId } },
    } = this.props;
    return (
      <CourseSchema courseId={courseId}>
        {StatefulView({
          renderOkState: this.renderCourseHeader,
          renderLoading: this.renderLoadingCourseHeader,
        })}
      </CourseSchema>
    );
  }
}

Course.propTypes = {
  t: PropTypes.func.isRequired,
  enrollUser: PropTypes.func.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({ courseId: PropTypes.string }),
  }).isRequired,
  auth: PropTypes.shape({}).isRequired,
  enrollment: PropTypes.shape({
    status: PropTypes.bool,
    isEnrolled: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  enrollment: state.enrollment,
});

const withState = connect(
  mapStateToProps,
  { enrollUser }
);

const EnhancedCourse = compose(
  page,
  withState,
  withNamespaces(),
)(Course);

export default EnhancedCourse;
