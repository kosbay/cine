import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompact';
import PropTypes from 'prop-types';
import { updateLessonLocally } from 'actions/lesson';
import { FileSubmit } from '../components';
import { FileSubmitMutation } from '../schemas';

class FileSubmitContainer extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      user: PropTypes.shape({
        _id: PropTypes.string,
      }),
    }).isRequired,
    lesson: PropTypes.shape({
      _id: PropTypes.string,
      wupai: PropTypes.number,
      fileURL: PropTypes.string,
      text: PropTypes.string.isRequired,
      status: PropTypes.string,
      feedback: PropTypes.string,
      result: PropTypes.number,
    }).isRequired,
    onDidFileSubmit: PropTypes.func.isRequired,
    updateLessonLocally: PropTypes.func.isRequired,
  };

  handleFileSubmit = mutate => async (fileURL, status = 'inReview') => {
    if (fileURL) {
      const { fileUrl, fileName } = fileURL;
      let params = {};
      switch (status) {
        case 'rejected':
          params = { status, feedback: 'denied' };
          break;
        case 'finished':
          params = { status, feedback: 'finished', result: 10 };
          break;
        case 'inReview':
          params = { status };
          break;
        default:
          break;
      }
      try {
        const {
          lesson,
          onDidFileSubmit: onDidFileSubmitFunc,
          updateLessonLocally: updateLessonLocallyFunc,
        } = this.props;
        const { auth: { user: { _id: userId } } } = this.props;
        await mutate({
          variables: {
            fileURL: fileUrl,
            fileName,
            lessonId: lesson._id,
            userId,
            ...params,
          },
        });
        const newLesson = {
          ...lesson,
          ...params,
        };

        updateLessonLocallyFunc(newLesson);
        onDidFileSubmitFunc();
      } catch (err) {
      /* eslint-disable-next-line */
      console.warn('Unhandled Error: LinkSubmitContainer ', err);
      }
    }
  };

  // TODO: handle mutate states
  renderFileSubmit = (mutate /* , { data, loading, error } */) => {
    const {
      lesson, auth: { user },
    } = this.props;
    const handleFileSubmit = this.handleFileSubmit(mutate);

    return (
      <FileSubmit
        lessonId={lesson._id}
        isAdmin={user && user.role === 'admin'}
        onFileSubmit={handleFileSubmit}
        text={lesson.text}
      />
    );
  }

  render() {
    return (
      <FileSubmitMutation>
        {this.renderFileSubmit}
      </FileSubmitMutation>
    );
  }
}


const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => ({
  updateLessonLocally: lesson => updateLessonLocally(lesson, dispatch),
});

const withState = connect(mapStateToProps, mapDispatchToProps);

const EnchantedFileSubmitContainer = compose(
  withState,
)(FileSubmitContainer);


export default EnchantedFileSubmitContainer;
