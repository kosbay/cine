
import React from 'react';
import PropTypes from 'prop-types';

import { LessonSchema } from '../schemas';
import LessonTypeContainer from './LessonTypeContainer';
import { StatefulView, Spinner } from '../components';

class LessonContainer extends React.Component {
  static propTypes = {
    onDidFinish: PropTypes.func.isRequired,
    onDidLinkSubmit: PropTypes.func.isRequired,
    lessonId: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { lessonId } = nextProps;
    const { lessonId: prevLessonId } = this.props;
    return `${lessonId}`.localeCompare(`${prevLessonId}`) !== 0;
  }

  renderLesson = ({ data: lesson }) => {
    const currentLesson = lesson || {};
    const { onDidFinish, onDidLinkSubmit } = this.props;
    return (
      <LessonTypeContainer
        lesson={currentLesson}
        onDidFinish={onDidFinish}
        onDidLinkSubmit={onDidLinkSubmit}
      />
    );
  };

  renderLoading = () => <Spinner />

  render() {
    const { lessonId } = this.props;
    return (
      <LessonSchema lessonId={lessonId}>
        {StatefulView({
          renderLoading: this.renderLoading,
          renderOkState: this.renderLesson,
        })}
      </LessonSchema>
    );
  }
}

export default LessonContainer;
