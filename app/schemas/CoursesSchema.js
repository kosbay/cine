import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { getCoursesSelector } from 'selectors/courses';
import { saveCoursesToRedux } from 'actions/courses';
import Querry from './Querry';

class CoursesSchema extends React.PureComponent {
    static propTypes = {
      saveCoursesToRedux: PropTypes.func.isRequired,
      courses: PropTypes.shape({}).isRequired,
      children: PropTypes.func.isRequired,
    }

    render() {
      const { courses, children, saveCoursesToRedux: saveCoursesToReduxFunc } = this.props;
      const initialData = courses.length ? courses : null;
      return (
        <Querry
          normalizer={saveCoursesToReduxFunc}
          initialData={initialData}
          endpoint="fetchCourses"
          variables={{ populate: true }}
        >
          {children}
        </Querry>
      );
    }
}

const makeStateToProps = state => ({ courses: getCoursesSelector(state) });
const mapDispatchToProps = dispatch => ({
  saveCoursesToRedux: courses => saveCoursesToRedux(courses, dispatch),
});

const withState = connect(makeStateToProps, mapDispatchToProps);
const EnhancedFacultiesSchema = compose(withState)(CoursesSchema);

export default EnhancedFacultiesSchema;
