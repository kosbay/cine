import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';
import Images from '../../theme/Images';

const NavigationBar = styled.div`
  background-color: #f0f2f5;
  width: calc(100% - 80px);
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  position: fixed;
  left: 80px;
`;

const LessonNameContainer = styled.div`
  font-size: 16px;
  color: #000;
`;

const CoinButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Coin = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 8px;
`;

const NextLessonButton = styled(Button)`
  margin-left: 32px;
  box-shadow: ${p => (p.disabled ? 'none' : '0 4px 2px -1px rgba(95, 95, 95, 0.15)')};
  border-radius: 4px;
  transition: all 0.5s ease-in-out;
`;

class LearnHeader extends React.PureComponent {
    static propTypes = {
      onNextLessonButtonClick: PropTypes.func.isRequired,
      onFinishModuleButtonClick: PropTypes.func.isRequired,
      isFinished: PropTypes.bool.isRequired,
      isFinishedBefore: PropTypes.bool.isRequired,
      isLastTaskInModule: PropTypes.bool.isRequired,
      t: PropTypes.func.isRequired,
      wupai: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    };

    renderFinishModule = () => {
      const {
        isFinished, isFinishedBefore, onFinishModuleButtonClick, t,
      } = this.props;
      const isDisabled = !(isFinished || isFinishedBefore);

      return (
        <NextLessonButton
          type="primary"
          disabled={isDisabled}
          onClick={onFinishModuleButtonClick}
        >
          {t('learn.finishModule')}
        </NextLessonButton>
      );
    };

    renderFinishLesson = () => {
      const {
        isFinished, isFinishedBefore, onNextLessonButtonClick, t,
      } = this.props;
      const isDisabled = !(isFinished || isFinishedBefore);

      return (
        <NextLessonButton
          type="primary"
          disabled={isDisabled}
          onClick={onNextLessonButtonClick}
        >
          {t('learn.nextLesson')}
        </NextLessonButton>
      );
    };

    renderWupai = (wupai = 1) => (
      <span>
        {`+ ${wupai}`}
        <Coin src={Images.wupai.gif} alt="Успех :)" />
      </span>
    );

    render() {
      const {
        isFinished, isFinishedBefore, isLastTaskInModule, name, wupai,
      } = this.props;
      return (
        <NavigationBar>
          <LessonNameContainer>{name}</LessonNameContainer>
          <CoinButtonContainer>
            {isFinished && !isFinishedBefore && this.renderWupai(wupai)}
            {
              isLastTaskInModule
                ? this.renderFinishModule()
                : this.renderFinishLesson()
              }
          </CoinButtonContainer>
        </NavigationBar>
      );
    }
}

export default withNamespaces()(LearnHeader);
