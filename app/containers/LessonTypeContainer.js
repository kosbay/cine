import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import { updateUserCoins } from 'actions';
import { LessonType } from '../components';
import { LessonFinishMutation } from '../schemas';
import { updateLessonLocally } from '../actions/lesson';

const lectureLessons = ['Text', 'Presentation'];

let mutateFuncionCalledForLecture = '';

class LessonTypeContainer extends React.PureComponent {
  static propTypes = {
    updateUserCoins: PropTypes.func.isRequired,
    lesson: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      wupai: PropTypes.number,
      userWupai: PropTypes.number.isRequired,
      full: PropTypes.bool.isRequired,
    }).isRequired,
    onDidFinish: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }),
    }).isRequired,
    updateLessonLocally: PropTypes.func.isRequired,
    onDidLinkSubmit: PropTypes.func.isRequired,
  };

  onFinishLesson = null;

  componentDidMount() {
    this.finishLessonOnLecture();
  }

  componentDidUpdate() {
    this.finishLessonOnLecture();
  }

  finishLessonOnLecture = () => {
    const { lesson } = this.props;

    if (lectureLessons.includes(lesson.type)
      && !lesson.finished
      && `${mutateFuncionCalledForLecture}`.localeCompare(`${lesson._id}`) !== 0
      && this.onFinishLesson
    ) {
      mutateFuncionCalledForLecture = lesson._id;

      this.onFinishLesson();
    }
  };

  handleFinishLesson = mutate => async () => {
    try {
      const {
        lesson: { _id: lessonId },
        auth: { user: { _id: userId } },
        onDidFinish: onDidFinishFunc,
      } = this.props;
      const { data: result } = await mutate({
        variables: { userId, lessonId },
      });

      onDidFinishFunc(result);

      this.updateUserLessonLocally();
    } catch (err) {
      /* eslint-disable-next-line */
      console.warn('Unhandled error LessonTypeContainer: ', err);
    }
  };

  updateUserLessonLocally = () => {
    try {
      const {
        lesson,
        updateLessonLocally: updateLessonLocallyFunc,
        updateUserCoins: updateUserCoinsFunc,
      } = this.props;
      const newLesson = {
        ...lesson,
        finished: true,
        userWupai: lesson.wupai,
      };
      updateUserCoinsFunc(lesson.wupai);
      updateLessonLocallyFunc(newLesson);
    } catch (err) {
      console.warn('Update coin error: ', err);
    }
  };

  render() {
    const { lesson: { _id, type, full } } = this.props;
    const key = `${_id}-${type}-${full}-LessonTypeContainer`;

    return (
      <React.Fragment key={key}>
        <LessonFinishMutation>
          {(mutate, { loading, error }) => {
            this.onFinishLesson = this.handleFinishLesson(mutate);
            const handleFinishLesson = this.handleFinishLesson(mutate);
            const { lesson, onDidLinkSubmit } = this.props;

            return (
              <LessonType
                onDidLinkSubmit={onDidLinkSubmit}
                saveProgressLoading={loading}
                saveProgressError={error}
                lesson={lesson}
                onFinish={handleFinishLesson}
              />
            );
          }}
        </LessonFinishMutation>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => ({
  updateUserCoins: coins => updateUserCoins(coins, dispatch),
  updateLessonLocally: newLesson => updateLessonLocally(newLesson, dispatch),
});

const withState = connect(mapStateToProps, mapDispatchToProps);
const EnhancedLessonTypeContainer = compose(withState)(LessonTypeContainer);

export default EnhancedLessonTypeContainer;
