import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import { getUserCoursesFromState } from 'store/models';
import { saveCoursesWithProgressToRedux } from '../actions/courses';
import Querry from './Querry';

class CoursesWithProgressSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    course: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    saveCoursesWithProgressToRedux: PropTypes.func.isRequired,
    auth: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    course: null,
  };

  render() {
    const {
      course,
      children,
      saveCoursesWithProgressToRedux: saveCoursesWithProgressToReduxFunc,
      auth,
    } = this.props;
    return (
      <Querry
        normalizer={saveCoursesWithProgressToReduxFunc}
        initialData={course}
        endpoint="getCoursesWithProgress"
        variables={{ userId: auth.user ? auth.user._id : null }}
      >
        {children}
      </Querry>
    );
  }
}

const makeStateToProps = state => ({
  userCourses: getUserCoursesFromState(state),
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  saveCoursesWithProgressToRedux: progress => saveCoursesWithProgressToRedux(progress, dispatch),
});

const withState = connect(
  makeStateToProps,
  mapDispatchToProps
);
const EnhancedCoursesWithProgressSchema = compose(withState)(CoursesWithProgressSchema);

export default EnhancedCoursesWithProgressSchema;
