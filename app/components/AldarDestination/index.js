import React from 'react';
import PropTypes from 'prop-types';

import Images from 'theme/Images';
import MazeBoard from '../MazeBoard';
import BlocklyPlayground from './BlocklyPlayground';

import AldarTask from './AldarTask';
import {
  TEMPLATE,
  TEMPLATE_NUMBER,
  isCodeEqual,
  extractLinesWithTemplate,
  extractAnswers,
  replaceWithTemplateUserCode,
  replaceWithSolutionAnswersIds,
} from './AldarCodeEqualityUtils';
import {
  AldarDestinationButton,
  AldarDestinationButtonText,
  BlocklyPlaygroundWrapper,
  Container,
  MazeWrapper,
} from './AldarDestinationCommon';

class AldarDestination extends React.PureComponent {
  static propTypes = {
    customBlocks: PropTypes.arrayOf(PropTypes.string).isRequired,
    goal: PropTypes.shape({
      type: PropTypes.string,
      solutionCode: PropTypes.string,
    }).isRequired,
    aldar: PropTypes.shape({}).isRequired,
    points: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    board: PropTypes.shape({}).isRequired,
    onAnswerCorrect: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    toolboxXML: PropTypes.string.isRequired,
    workspaceXML: PropTypes.string.isRequired,
    objectBlocks: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    objectBlocks: [],
  };

  state = {
    isRunButtonClick: false,
  };

  /* eslint-disable array-callback-return */
  getReference = functions => functions.map(({ name, func }) => {
    this[name] = func;
  });

  handleRunButtonClick = () => this.setState({ isRunButtonClick: true });

  handlePlayerWin = () => {
    const { onAnswerCorrect: onAnswerCorrectFunc } = this.props;
    onAnswerCorrectFunc();
  };

  handleExecutionComplete = (userCode) => {
    // consider only AldarEqualty
    const { goal: { solutionCode, type } } = this.props;
    if (type === 'AldarEquality') {
      const userAnswers = extractAnswers(userCode);
      const solutionAnswers = extractAnswers(solutionCode);

      const newUserCode = replaceWithSolutionAnswersIds({
        userAnswers, solutionAnswers, userCode,
      });

      if (isCodeEqual({ userCode: newUserCode, solutionCode })) return this.handleAnswerCorrect();

      if (solutionCode.includes(TEMPLATE) || solutionCode.includes(`${TEMPLATE_NUMBER}`)) {
        const solutionLinesWithTemplate = extractLinesWithTemplate(
          { solutionCode, template: TEMPLATE }
        );
        const userCodeWithTemplate = replaceWithTemplateUserCode({
          userCode: newUserCode, solutionLinesWithTemplate, template: TEMPLATE,
        });
        const solutionLinesWithTemplateNumber = extractLinesWithTemplate({ solutionCode, template: `${TEMPLATE_NUMBER}` });
        const userCodeWithTemplateNumber = replaceWithTemplateUserCode({
          userCode: userCodeWithTemplate, solutionLinesWithTemplate: solutionLinesWithTemplateNumber, template: `${TEMPLATE_NUMBER}`,
        });

        if (isCodeEqual(
          { userCode: userCodeWithTemplateNumber, solutionCode }
        )) return this.handleAnswerCorrect();
      }
    }

    return this.setState({ isRunButtonClick: false });
  };

  handleAnswerCorrect = () => {
    this.setState({ isRunButtonClick: false });
    const { onAnswerCorrect: onAnswerCorrectFunc } = this.props;
    onAnswerCorrectFunc();
  };

  handleSetFunctions = () => {
    const { customBlocks, objectBlocks } = this.props;
    try {
      const aldarCustomFunctions = customBlocks
        .map((functionName) => {
          if (!this[functionName]) return null;
          return { [functionName]: this[functionName] };
        })
        .filter(f => f)
        .reduce((acc, nextValue) => ({ ...acc, ...nextValue }));
      let charactersCustomFunctions = objectBlocks
        && objectBlocks
          .map((mazeObjectFunction) => {
            let characterFunctions = mazeObjectFunction.functions.map(
              (characterFunction) => {
                if (!this[`${characterFunction}ById`]) return null;
                return {
                  [`${characterFunction}ById`]: this[`${characterFunction}ById`],
                };
              }
            );

            characterFunctions = characterFunctions.length
              ? characterFunctions.reduce((acc, nextValue) => ({
                ...acc,
                ...nextValue,
              }))
              : characterFunctions;
            return characterFunctions;
          })
          .filter(f => f);

      charactersCustomFunctions = charactersCustomFunctions.length
        ? charactersCustomFunctions.reduce((acc, nextValue) => ({
          ...acc,
          ...nextValue,
        }))
        : charactersCustomFunctions;

      return { ...aldarCustomFunctions, ...charactersCustomFunctions };
    } catch (err) {
      console.warn('Unhandled error: ', err);
      return null;
    }
  };
  /* eslint-enable array-callback-return */

  render() {
    const {
      board,
      aldar,
      points,
      goal,
      objectBlocks,
      text,
      toolboxXML,
      workspaceXML,
      customBlocks,
    } = this.props;
    const { isRunButtonClick } = this.state;

    return (
      <Container>
        <MazeWrapper>
          <MazeBoard
            isRunButtonClick={isRunButtonClick}
            onPlayerWin={this.handlePlayerWin}
            getReference={this.getReference}
            board={board}
            aldar={aldar}
            points={points}
            goal={goal}
            objectBlocks={objectBlocks}
          />
          <AldarDestinationButton
            disabled={isRunButtonClick}
            onClick={this.handleRunButtonClick}
          >
            <img src={Images.playIcon} alt="play icon" />
            <AldarDestinationButtonText>Run</AldarDestinationButtonText>
          </AldarDestinationButton>
        </MazeWrapper>
        <BlocklyPlaygroundWrapper>
          <AldarTask text={text} />
          <BlocklyPlayground
            toolboxXML={toolboxXML}
            workspaceXML={workspaceXML}
            executionComplete={this.handleExecutionComplete}
            isRunButtonClick={isRunButtonClick}
            customBlocks={customBlocks}
            objectBlocks={objectBlocks}
            setFunctions={this.handleSetFunctions}
          />
        </BlocklyPlaygroundWrapper>
      </Container>
    );
  }
}

export default AldarDestination;
