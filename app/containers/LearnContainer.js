import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ChapterWithProgressSchema, EnrollmentSchema } from '../schemas';
import { Learn, StatefulView, Spinner } from '../components';
import { saveChapterToRedux } from '../actions/chapters';
import { lesson } from '../store/models';

class LearnContainer extends React.PureComponent {
  static propTypes = {
    chapterId: PropTypes.string.isRequired,
    auth: PropTypes.shape({
      user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }),
    }).isRequired,
    onDidChapterFinish: PropTypes.func.isRequired,
    saveChapterToRedux: PropTypes.func.isRequired,
  };

  renderLoadingLearn = () => <Spinner />;

  renderLearn = ({ data: chapter }) => {
    const lessons = !chapter
      ? []
      : chapter.userModules
        .map(({ userLessons }) => userLessons)
        .reduce((acc, nextValue) => [...acc, ...nextValue], []);

    const handleChapterUpdate = (lessonWupai) => {
      const { saveChapterToRedux: saveChapterToReduxFunc } = this.props;
      const userWupai = chapter.userWupai ? chapter.userWupai + lessonWupai : lessonWupai;
      const newChapter = { ...chapter, userWupai };
      saveChapterToReduxFunc(newChapter);
    };
    const { onDidChapterFinish, auth } = this.props;
    return (
      <React.Fragment key={lesson._id}>
        <Learn
          updateChapter={handleChapterUpdate}
          onDidChapterFinish={onDidChapterFinish}
          chapter={chapter}
          lessons={lessons}
          auth={auth}
        />
      </React.Fragment>
    );
  };

  renderLoadingChapter = () => <Spinner />;

  renderChapterWithProgress = ({ data }) => {
    const {
      chapterId,
      auth: { user },
    } = this.props;
    if (!data.isEnrolled || !user || !user._id) {
      return null;
    }
    return (
      <ChapterWithProgressSchema chapterId={chapterId} userId={user._id}>
        {StatefulView({
          renderOkState: this.renderLearn,
          renderLoading: this.renderLoadingLearn,
        })}
      </ChapterWithProgressSchema>
    );
  };

  render() {
    const { chapterId } = this.props;
    return (
      <EnrollmentSchema chapterId={chapterId}>
        {StatefulView({
          renderOkState: this.renderChapterWithProgress,
          renderLoading: this.renderLoadingChapter,
        })}
      </EnrollmentSchema>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  saveChapterToRedux: chapter => saveChapterToRedux(chapter, dispatch),
});

const withState = connect(
  mapStateToProps,
  mapDispatchToProps
);
const EnhancedLearnContainer = withState(LearnContainer);

export default EnhancedLearnContainer;
