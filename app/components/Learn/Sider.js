import {
  Layout, Menu, Icon, Popconfirm, Button,
} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { compose } from 'recompact';
import { DeleteLessonProgressMutation } from 'schemas';
import withCurrentUser from 'hocs/withCurrentUser';
import { withNamespaces } from 'react-i18next';

const { Sider: SiderAntd } = Layout;
const { SubMenu } = Menu;

const TYPE_HELPER = {
  Text: 'file-text',
  Video: 'video-camera',
  Presentation: 'file-ppt',
  SimpleBlockly: 'appstore-o',
  Quiz: 'bulb',
  CodeEquality: 'code-o',
  FileSubmit: 'solution',
  LinkSubmit: 'solution',
  CodeOutput: 'code-o',
  VideoText: 'video-camera',
  AldarDestination: 'robot',
  AndroidLayoutVisualizer: 'android',
  BlocklyGame: 'block',
};

const StyledIcon = styled(Icon)`
  color:
    ${// eslint-disable-next-line no-nested-ternary
  p => (p.isfinished ? '#5AC724' : p.isinreview ? '#FFD263' : p.isrejected ? 'red' : '#fff')};
`;

const FixedSider = styled(SiderAntd)`
  overflow: auto;
  height: calc(100vh - 64px);
  position: fixed;
  left: 0;
  z-index: 21;
`;

const NavigationContainer = styled.div`
  background: #4f5aa6;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BackIcon = styled(Icon)`
  padding: 16px 16px 16px 20px;
  color: #fff;
  font-size: 32px;

  :hover {
    cursor: pointer;
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSubMenu = styled(SubMenu)`
  ${p => p.iscurrent && 'background-color: #40487d !important'};

  ul {
    border-radius: 0 !important;
  }
`;

const ChapterName = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
`;

const TriggerContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 16px;
`;

const HideMenuIcon = styled(Icon)`
  font-size: 16px;
  margin-right: 8px;
`;

const BottomPadding = styled.div`
  min-height: 64px;
`;

const MenuItem = styled(Menu.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 !important;
  height: 50px !important;
  padding: 8px 16px 8px 16px !important;
  background-color: ${p => (
    p.selected ? '#40487d !important;' : '#2a3057 !important')
}
`;

const DeleteButton = styled(Button)`
  margin: auto 0 auto auto;
  color: white;
`;

class Sider extends React.PureComponent {
  goBack = () => {
    const { back } = this.props;
    back();
  };

  handleSubmenuTitleClick = (obj) => {
    const { target } = obj.domEvent;
    if (target.getAttribute('aria-expanded')) {
      const { offsetTop } = target;
      const parentHeight = obj.domEvent.target.parentNode.parentNode.parentNode.offsetHeight;
      if (parentHeight - offsetTop < 68) {
        setTimeout(() => {
          document.querySelector('.ant-layout-sider').scrollTop = 20000;
        }, 200);
      }
    }
  }

  renderModule = (userModule, index, modules) => {
    const { currentUserLesson } = this.props;
    const isCurrent = userModule._id === currentUserLesson.moduleId ? 1 : 0;
    const moduleFinished = userModule.userLessons.filter(l => !l.finished).length === 0;

    return (
      <StyledSubMenu
        onTitleClick={this.handleSubmenuTitleClick}
        key={userModule._id}
        iscurrent={isCurrent}
        title={(
          <span>
            <StyledIcon type="book" isfinished={moduleFinished ? 1 : 0} />
            <span>
              Модуль
              {' '}
              {index + 1}
              {': '}
              {userModule.name}
            </span>
          </span>
        )}
      >
        {userModule.userLessons.map(
          (lesson, idx) => this.renderLesson(
            lesson, idx, userModule, modules, index
          )
        )}
      </StyledSubMenu>
    );
  }

  renderButton = (mutate, { props: { lessonId } }) => {
    const { currentUser: { _id: userId } } = this.props;
    const handleDeleteLesson = (e) => {
      e.stopPropagation();
      mutate({
        path: `?userId=${userId}&lessonId=${lessonId}`,
      });
    };
    return (
      <Popconfirm
        title="Are you sure?"
        onConfirm={handleDeleteLesson}
        onCancel={e => e.stopPropagation()}
        okText="Delete"
        cancelText="Leave"
        style={{ left: 0 }}
      >
        <DeleteButton onClick={e => e.stopPropagation()}>
        Delete
        </DeleteButton>
      </Popconfirm>
    );
  }

  renderLesson = (lesson, lessonIdx, currentModule, modules, moduleIdx) => {
    const { currentUser: { role }, collapsed } = this.props;
    const isPreviousLessonFinished = lessonIdx === 0
      ? true
      : currentModule.userLessons[lessonIdx - 1].finished;
    const isPreviousModuleFinished = moduleIdx === 0
      ? true
      : modules[moduleIdx - 1].userLessons.filter(l => !l.finished).length === 0;
    const isAvailable = (isPreviousLessonFinished && isPreviousModuleFinished) || role === 'admin';

    const handleLessonClick = () => {
      const { onLessonClick } = this.props;
      onLessonClick(lesson);
    };

    return (
      <MenuItem
        key={lesson._id}
        selected={lesson._id === this.props.currentUserLesson._id}
        onClick={isAvailable && handleLessonClick}
        disabled={!isAvailable}
      >
        <span>
          <StyledIcon
            isfinished={lesson.finished ? 1 : 0}
            isinreview={lesson.status === 'inReview' ? 1 : 0}
            isrejected={lesson.status === 'rejected' ? 1 : 0}
            type={TYPE_HELPER[lesson.type] || 'close-circle'}
          />
          {`${lesson.name}`}
        </span>
        {
          role === 'admin' && !collapsed
          && (
          <DeleteLessonProgressMutation lessonId={lesson._id}>
            {this.renderButton}
          </DeleteLessonProgressMutation>
          )
        }
      </MenuItem>
    );
  };

  render() {
    const {
      chapterName,
      userModules,
      currentUserLesson,
      collapsed,
      onSidebarCollapsedStateChange,
      t,
    } = this.props;
    const selectedKeys = currentUserLesson ? [currentUserLesson._id] : [];
    return (
      <FixedSider
        collapsible
        collapsed={collapsed}
        onCollapse={onSidebarCollapsedStateChange}
        width={480}
        trigger={
          collapsed ? (
            <HideMenuIcon type="menu-unfold" />
          ) : (
            <TriggerContainer>
              <HideMenuIcon type="menu-fold" />
              {t('learn.hideSiderButtonLabel')}
            </TriggerContainer>
          )
        }
      >
        <NavigationContainer>
          <BackIcon type="left" theme="outlined" onClick={this.goBack} />
          {!collapsed && (
            <NameContainer>
              <ChapterName>{chapterName}</ChapterName>
            </NameContainer>
          )}
        </NavigationContainer>
        {userModules
          && (
            <Menu
              selectedKeys={selectedKeys}
              mode="inline"
              theme="dark"
            >
              {userModules.map(
                (oneModule, index, modules) => this.renderModule(oneModule, index, modules)
              )}
            </Menu>
          )}
        <BottomPadding />
      </FixedSider>
    );
  }
}

Sider.propTypes = {
  t: PropTypes.func.isRequired,
  onLessonClick: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  currentUserLesson: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
    moduleId: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  userModules: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSidebarCollapsedStateChange: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  chapterName: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({ role: PropTypes.string }).isRequired,
};

const EnchantedSider = compose(
  withNamespaces(),
  withCurrentUser(),
)(Sider);

export default EnchantedSider;
