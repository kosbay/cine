import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { saveCourseToRedux } from 'actions/courses';
import { makeGetCourseSelector } from 'selectors';
import Querry from './Querry';

class CourseSchema extends React.PureComponent {
  static propTypes = {
    courseId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    course: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    saveCourseToRedux: PropTypes.func.isRequired,
  }

  static defaultProps = {
    course: null,
  };

  render() {
    const {
      courseId, course, saveCourseToRedux: saveCourseToReduxFunc, children,
    } = this.props;
    return <Querry normalizer={saveCourseToReduxFunc} initialData={course} endpoint="fetchCourse" path={courseId}>{children}</Querry>;
  }
}

const makeStateToProps = () => {
  const getCourse = makeGetCourseSelector();
  return (state, ownProps) => ({
    course: getCourse(state, ownProps),
  });
};

const mapDispatchToProps = dispatch => ({
  saveCourseToRedux: course => saveCourseToRedux(course, dispatch),
});

const withState = connect(makeStateToProps, mapDispatchToProps);
const EnhancedCourseSchema = compose(withState)(CourseSchema);

export default EnhancedCourseSchema;
