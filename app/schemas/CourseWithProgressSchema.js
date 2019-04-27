import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { saveCourseWithProgressToRedux } from '../actions/courses';
import { makeGetUserCourseSelector } from '../selectors';
import Querry from './Querry';

class CourseWithProgressSchema extends React.PureComponent {
    static propTypes = {
      courseId: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      children: PropTypes.func.isRequired,
      course: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
      saveCourseWithProgressToRedux: PropTypes.func.isRequired,
    }

    static defaultProps = {
      course: {},
    };

    render() {
      const {
        courseId,
        course,
        children,
        saveCourseWithProgressToRedux: saveCourseWithProgressToReduxFunc,
        userId,
      } = this.props;
      const userCourse = typeof course === 'string' ? null : course || null;
      return <Querry normalizer={saveCourseWithProgressToReduxFunc} initialData={userCourse} endpoint="fetchCourseWithProgress" variables={{ userId, courseId }}>{children}</Querry>;
    }
}

const makeStateToProps = () => {
  const getCourse = makeGetUserCourseSelector();
  return (state, ownProps) => ({
    course: getCourse(state, ownProps),
  });
};

const mapDispatchToProps = dispatch => ({
  saveCourseWithProgressToRedux:
    progress => saveCourseWithProgressToRedux(progress, dispatch),
});

const withState = connect(makeStateToProps, mapDispatchToProps);
const EnhancedCourseWithProgressSchema = compose(withState)(CourseWithProgressSchema);

export default EnhancedCourseWithProgressSchema;
