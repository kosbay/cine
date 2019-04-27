import React from 'react';
import PropTypes from 'prop-types';

import {
  TEMPLATE,
  TEMPLATE_NUMBER,
  isCodeEqual,
  extractLinesWithTemplate,
  extractAnswers,
  replaceWithTemplateUserCode,
  replaceWithSolutionAnswersIds,
} from '../components/AldarDestination/AldarCodeEqualityUtils';
import BlocklyGame from '../components/BlocklyGame';

class BlocklyGameContainer extends React.PureComponent {
  static propTypes = {
    lesson: PropTypes.shape({
      board: PropTypes.shape({}).isRequired,
      customBlocks: PropTypes.arrayOf(PropTypes.string).isRequired,
      goal: PropTypes.shape({
        type: PropTypes.string,
        solutionCode: PropTypes.string,
        coinNumber: PropTypes.number,
      }).isRequired,
      name: PropTypes.string.isRequired,
      toolboxXML: PropTypes.string.isRequired,
      workspaceXML: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      blocklyGameImages: PropTypes.arrayOf(PropTypes.shape({})),
      blocklyGameIntersections: PropTypes.arrayOf(PropTypes.shape({})),
      blocklyGameObjects: PropTypes.arrayOf(PropTypes.shape({})),
      mazeObjectsFunctions: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
    makeNextButtonActive: PropTypes.func.isRequired,
  };

  validateResult = ({ result: { takeEntities } }) => {
    const { lesson } = this.props;
    switch (lesson.goal.type) {
      case 'CoinCollection':
        return takeEntities.length === 0;
      default:
        return false;
    }
  };

  handleEventsComplete = (...args) => {
    const isCodeValid = this.validateResult(...args);
    if (isCodeValid) this.handleAnswerCorrect();
  };

  handleAnswerCorrect = () => {
    const { makeNextButtonActive: makeNextButtonActiveFunc } = this.props;
    makeNextButtonActiveFunc();
  }

  handleCodeExecutionComplete = (userCode) => {
    // consider only AldarEqualty
    const { lesson: { goal: { solutionCode, type } } } = this.props;
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
    return null;
  };

  render() {
    const {
      lesson: {
        blocklyGameImages,
        blocklyGameIntersections,
        blocklyGameObjects,
        board,
        customBlocks,
        goal,
        mazeObjectsFunctions,
        name,
        text,
        toolboxXML,
        workspaceXML,
        makeNextButtonActive: makeNextButtonActiveFunc,
      },
    } = this.props;

    return (
      <React.Fragment key={name}>
        <BlocklyGame
          blocklyGameImages={blocklyGameImages}
          blocklyGameIntersections={blocklyGameIntersections}
          blocklyGameObjects={blocklyGameObjects}
          board={board}
          customBlocks={customBlocks}
          goal={goal}
          name={name}
          objectBlocks={mazeObjectsFunctions}
          onCodeExecutionComplete={this.handleCodeExecutionComplete}
          onEventsComplete={this.handleEventsComplete}
          onValidAnswer={makeNextButtonActiveFunc}
          text={text}
          toolboxXML={toolboxXML}
          workspaceXML={workspaceXML}
        />
      </React.Fragment>
    );
  }
}

export default BlocklyGameContainer;
