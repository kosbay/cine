import React from 'react';
import PropTypes from 'prop-types';

import Mutation from './Mutation';

class DeleteLessonProgressMutation extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    lessonId: PropTypes.string.isRequired,
  };

  render() {
    const { children, lessonId } = this.props;
    return <Mutation lessonId={lessonId} endpoint="deleteLesson">{children}</Mutation>;
  }
}

export default DeleteLessonProgressMutation;
