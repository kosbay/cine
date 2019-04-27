import React from 'react';
import { message, Spin } from 'antd';
import PropTypes from 'prop-types';
import {
  AldarDestination,
  AndroidLayoutPlaygroundContainer,
  PresentationContainer,
  VideoContainer,
  QuizContainer,
  TextContainer,
  CodeOutputContainer,
  CodeEqualityContainer,
  FileSubmitContainer,
  VideoTextContainer,
  CodeProblemContainer,
  LinkSubmitContainer,
} from 'containers';
import dynamic from 'next/dynamic';

message.config({
  duration: 2,
  maxCount: 1,
});

const BlocklyEqualityContainer = dynamic(import('../containers/BlocklyEqualityContainer'), {
  ssr: false,
  loading: () => <Spin />,
});

const SimpleBlocklyContainer = dynamic(import('../containers/SimpleBlocklyContainer'), {
  ssr: false,
  loading: () => <Spin />,
});

const BlocklyGameContainer = dynamic(import('../containers/BlocklyGameContainer'), {
  ssr: false,
  loading: () => <Spin />,
});

const BlocklyOutputContainer = dynamic(import('../containers/BlocklyOutputContainer'), {
  ssr: false,
  loading: () => <Spin />,
});

const showErrorMessage = () => {
  const hide = message.error('Возникла ошибка при проверке');
  setTimeout(hide, 2500);
};

class LessonType extends React.PureComponent {
  static propTypes = {
    saveProgressLoading: PropTypes.bool.isRequired,
    saveProgressError: PropTypes.shape({}),
    lesson: PropTypes.shape({}).isRequired,
    onDidLinkSubmit: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
  };

  static defaultProps = {
    saveProgressError: null,
  };

  componentDidUpdate() {
    const { saveProgressLoading, saveProgressError } = this.props;

    if (!saveProgressLoading) {
      message.destroy();
    }
    if (saveProgressLoading) {
      message.loading('Проверка..', 0);
    }
    if (saveProgressError) {
      showErrorMessage();
    }
  }

  render() {
    const { lesson, onFinish, onDidLinkSubmit } = this.props;

    switch (lesson.type) {
      case 'Text':
        return <TextContainer lesson={lesson} />;
      case 'Presentation':
        return <PresentationContainer lesson={lesson} />;
      case 'Video':
        return <VideoContainer lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'VideoText':
        return <VideoTextContainer lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'Quiz':
        return <QuizContainer lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'SimpleBlockly':
        return <SimpleBlocklyContainer lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'CodeOutput':
        return <CodeOutputContainer lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'CodeEquality':
        return <CodeEqualityContainer lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'FileSubmit':
        return (
          <FileSubmitContainer
            lesson={lesson}
            makeNextButtonActive={onFinish}
            onDidFileSubmit={onDidLinkSubmit}
          />
        );
      case 'AldarDestination':
        return <AldarDestination lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'BlocklyOutput':
        return <BlocklyOutputContainer lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'BlocklyEquality':
        return <BlocklyEqualityContainer lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'AndroidLayoutVisualizer':
        return <AndroidLayoutPlaygroundContainer lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'CodeProblem':
        return <CodeProblemContainer lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'LinkSubmit':
        return (
          <LinkSubmitContainer
            lesson={lesson}
            makeNextButtonActive={onFinish}
            onDidLinkSubmit={onDidLinkSubmit}
          />
        );
      case 'BlocklyGame':
        return <BlocklyGameContainer lesson={lesson} makeNextButtonActive={onFinish} />;
      case 'No Access':
        return <div>No Access</div>;
      default:
        return <div>No lesson type</div>;
    }
  }
}

export default LessonType;
