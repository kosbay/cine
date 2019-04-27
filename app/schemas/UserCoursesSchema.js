import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { saveCourseWithProgressToRedux } from '../actions/courses';
import { makeGetChapterSelector } from '../selectors';
import Querry from './Querry';

class UserCoursesSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    userCourses: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    saveCourseWithProgressToRedux: PropTypes.func.isRequired,
  };

  static defaultProps = {
    userCourses: null,
  };

  render() {
    const {
      userCourses,
      saveCourseWithProgressToRedux: saveCourseWithProgressToReduxFunc,
      children,
    } = this.props;
    return (
      <Querry
        normalizer={saveCourseWithProgressToReduxFunc}
        initialData={userCourses}
        endpoint="fetchUserCourses"
      >
        {children}
      </Querry>
    );
  }
}

const makeStateToProps = () => {
  const getChapter = makeGetChapterSelector();
  return (state, ownProps) => ({
    chapter: getChapter(state, ownProps),
  });
};

const mapDispatchToProps = dispatch => ({
  saveCourseWithProgressToRedux: chapter => saveCourseWithProgressToRedux(chapter, dispatch),
});

const withState = connect(
  makeStateToProps,
  mapDispatchToProps
);
const EnhancedUserCoursesSchema = compose(withState)(UserCoursesSchema);

export default EnhancedUserCoursesSchema;
