import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { saveLessonToRedux } from 'actions/lesson';
import { makeGetUserLessonSelector } from 'selectors';
import Querry from './Querry';

class LessonSchema extends React.PureComponent {
    static propTypes = {
      lessonId: PropTypes.string.isRequired,
      children: PropTypes.func.isRequired,
      lesson: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
      saveLessonToRedux: PropTypes.func.isRequired,
    }

    static defaultProps = {
      lesson: null,
    };

    render() {
      const {
        lessonId, children, lesson, saveLessonToRedux: saveLessonToReduxFunc,
      } = this.props;
      const variables = { lessonId };
      const initialData = (lesson && lesson.full)
        ? lesson
        : null;
      return (
        <Querry
          normalizer={saveLessonToReduxFunc}
          initialData={initialData}
          endpoint="fetchUserLesson"
          variables={variables}
        >
          {children}
        </Querry>
      );
    }
}

const makeStateToProps = () => {
  const getLesson = makeGetUserLessonSelector();
  return (state, ownProps) => ({
    lesson: getLesson(state, ownProps),
  });
};

const mapDispatchToProps = dispatch => ({
  saveLessonToRedux: lesson => saveLessonToRedux(lesson, dispatch),
});


const withState = connect(makeStateToProps, mapDispatchToProps);
const EnhancedLessonSchema = compose(withState)(LessonSchema);

export default EnhancedLessonSchema;
