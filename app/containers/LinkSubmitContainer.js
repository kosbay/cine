import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLessonLocally } from 'actions/lesson';
import { compose } from 'recompact';
import { LinkSubmit } from '../components';
import { LinkSubmitMutation } from '../schemas';

class LinkSubmitContainer extends Component {
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
    }),
    onDidLinkSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    lesson: null,
  };

  handleLinkSubmit = mutate => async (fileURL, status = 'inReview') => {
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
        auth: { user: { _id: userId } },
        lesson,
        onDidLinkSubmit: onDidLinkSubmitFunc,
        updateLessonLocally: updateLessonLocallyFunc,
      } = this.props;
      await mutate({
        variables: {
          fileURL,
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
      onDidLinkSubmitFunc();
    } catch (err) {
      /* eslint-disable-next-line */
      console.warn('Unhandled Error: LinkSubmitContainer ', err);
    }
  };

  renderLinkSubmit = (mutate) => {
    const {
      auth: { user },
      lesson,
    } = this.props;
    const handleLinkSubmit = this.handleLinkSubmit(mutate);
    return (
      <LinkSubmit
        lessonId={lesson._id}
        isAdmin={user && user.role === 'admin'}
        text={lesson.text}
        onLinkSubmit={handleLinkSubmit}
      />
    );
  }

  render() {
    return (
      <LinkSubmitMutation>
        {this.renderLinkSubmit}
      </LinkSubmitMutation>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => ({
  updateLessonLocally: lesson => updateLessonLocally(lesson, dispatch),
});

const withState = connect(mapStateToProps, mapDispatchToProps);

const EnchantedLinkSubmitContainer = compose(
  withState,
)(LinkSubmitContainer);


export default EnchantedLinkSubmitContainer;
