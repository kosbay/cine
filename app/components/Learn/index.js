import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'antd';
import { withNamespaces } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Router, { withRouter } from 'next/router';
import { compose } from 'recompact';
import LessonContainer from 'containers/LessonContainer';
import Sider from './Sider';
import LearnHeader from './LearnHeader';

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

const Container = styled.div`
  overflow: scroll;
  overflow: auto;
  width: calc(100% - 80px);
  margin-left: 80px;
  margin-top: 64px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
`;

const setNewUrl = (asPath, id) => {
  if (!asPath.includes('lessonId')) {
    Router.replace(`${asPath}&lessonId=${id}`, `${asPath}&lessonId=${id}`, { shallow: true });
    return;
  }
  const chapterPath = asPath.split('&lessonId')[0];
  Router.replace(`${chapterPath}&lessonId=${id}`, `${chapterPath}&lessonId=${id}`, { shallow: true });
};

const getCurrentLesson = (lessons, router, auth) => {
  const { query } = router;
  if (query && query.lessonId) {
    const urlLesson = lessons.find(lesson => lesson._id === query.lessonId);
    const prevIndex = lessons.findIndex(lesson => lesson._id === urlLesson._id) - 1;
    const isAdmin = auth.user && auth.user.role && auth.user.role === 'admin';
    if (
      isAdmin
      || prevIndex > 0
      || (urlLesson && (lessons[prevIndex] && lessons[prevIndex].finished))
    ) {
      return urlLesson;
    }
  }
  const lastProgress = lessons.find(lesson => !lesson.finished) || lessons[0];
  setNewUrl(router.asPath, lastProgress._id);
  return lastProgress;
};

const getIsLastTaskInModule = (lessons, currentLesson) => {
  const lastLesson = lessons[lessons.length - 1];
  return `${lastLesson._id}`.localeCompare(`${currentLesson._id}`) === 0;
};

class Learn extends React.PureComponent {
  static propTypes = {
    lessons: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    t: PropTypes.func.isRequired,
    chapter: PropTypes.shape({}).isRequired,
    onDidChapterFinish: PropTypes.func.isRequired,
    auth: PropTypes.shape({}).isRequired,
    updateChapter: PropTypes.func.isRequired,
    router: PropTypes.shape({
      asPath: PropTypes.string,
      back: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    currentLesson: getCurrentLesson(this.props.lessons, this.props.router, this.props.auth),
    collapsed: false,
  };

  componentDidMount() {
    setNewUrl(this.props.router.asPath, this.state.currentLesson._id);
  }

  handleDidLessonFinish = ({ message }) => {
    const {
      currentLesson: { wupai },
    } = this.state;
    const { updateChapter: updateChapterFunc } = this.props;
    updateChapterFunc(wupai);
    this.updateCurrentLessonLocally();
    if (message) this.showPopUp(message);
  };

  handleDidLinkSubmit = () => {
    // Ahtung! Мы здесь добавляем локально wupai,
    // чтобы загорелась только кнопка Следующий урок
    const { currentLesson } = this.state;
    const { updateChapter: updateChapterFunc } = this.props;
    this.setState({
      currentLesson: {
        ...currentLesson,
        userWupai: currentLesson ? currentLesson.wupai : 0,
      },
    });
    updateChapterFunc(currentLesson.wupai);
  };

  handleNextLessonButtonClick = () => {
    const {
      currentLesson: { _id: currentLessonId },
    } = this.state;
    const {
      lessons,
      router: { asPath },
    } = this.props;
    const nextLessonIndex = lessons.findIndex(
      ({ _id: lessonId }) => `${lessonId}`.localeCompare(`${currentLessonId}`) === 0
    ) + 1;
    const newCurrentLesson = lessons[nextLessonIndex];
    setNewUrl(asPath, newCurrentLesson._id);
    this.setState(prevState => ({
      ...prevState,
      collapsed: true,
      currentLesson: newCurrentLesson,
    }));
  };

  showPopUp = message => Modal.success({
    title: this.props.t('learn.showPopUpLabel'),
    content: message,
  });

  handleFinishModuleButtonClick = () => this.props.onDidChapterFinish();

  goBack = () => { this.props.router.back(); };

  handleLessonClick = (lesson) => {
    setNewUrl(this.props.router.asPath, lesson._id);
    this.setState({ currentLesson: lesson, collapsed: true });
  };

  handleSidebarCollapsedStateChange = () => {
    this.setState(prevstate => ({ collapsed: !prevstate.collapsed }));
  };

  updateCurrentLessonLocally = () => this.setState({
      currentLesson: { ...this.state.currentLesson, finished: true }, //eslint-disable-line
  });

  render() {
    const { collapsed, currentLesson } = this.state;
    const { lessons, chapter, t } = this.props;
    const isLastTaskInModule = getIsLastTaskInModule(lessons, currentLesson);

    return (
      <React.Fragment>
        <Helmet>
          <title>
            {`
          ${currentLesson.name || 'No name'} | ${t('pages.website')}
          `}
          </title>
        </Helmet>
        <LearnHeader
          onNextLessonButtonClick={this.handleNextLessonButtonClick}
          onFinishModuleButtonClick={this.handleFinishModuleButtonClick}
          isFinished={currentLesson.finished}
          isFinishedBefore={Boolean(currentLesson.userWupai)}
          isLastTaskInModule={isLastTaskInModule}
          wupai={currentLesson.wupai}
          name={currentLesson.name}
        />
        <Sider
          key={currentLesson._id}
          collapsed={collapsed}
          back={this.goBack}
          onSidebarCollapsedStateChange={this.handleSidebarCollapsedStateChange}
          onLessonClick={this.handleLessonClick}
          currentUserLesson={currentLesson}
          chapterName={chapter.name}
          userModules={chapter.userModules}
        />
        {!collapsed && <Overlay onClick={this.handleSidebarCollapsedStateChange} />}
        <Container
          key={`${currentLesson._id}-LessonContainer`}
          isVideo={currentLesson.type === 'Video'}
          isAldar={
            currentLesson.type === 'AldarDestination' || currentLesson.type === 'AldarEquality'
          }
        >
          <LessonContainer
            lessonId={currentLesson._id}
            onDidFinish={this.handleDidLessonFinish}
            onDidLinkSubmit={this.handleDidLinkSubmit}
          />
        </Container>
      </React.Fragment>
    );
  }
}

Learn.propTypes = {
  chapter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    userModules: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

export default compose(
  withNamespaces(),
  withRouter
)(Learn);
