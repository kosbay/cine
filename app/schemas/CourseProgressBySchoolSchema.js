import React from 'react';
import PropTypes from 'prop-types';

import Querry from './Querry';

class CourseProgressBySchoolSchema extends React.PureComponent {
    static propTypes = {
      courseId: PropTypes.string.isRequired,
      schoolId: PropTypes.string.isRequired,
      children: PropTypes.func.isRequired,
    }

    render() {
      const { courseId, schoolId } = this.props;
      return <Querry endpoint="courseProgressBySchool" variables={{ schoolId, courseId }}>{this.props.children}</Querry>;
    }
}

export default CourseProgressBySchoolSchema;
