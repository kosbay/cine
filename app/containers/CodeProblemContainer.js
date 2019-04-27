import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import AceIDEContainer from './AceIDEContainer';

class CodeProblemContainer extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    lesson: PropTypes.shape({
      _id: PropTypes.string,
      text: PropTypes.string,
      name: PropTypes.string,
      compilerId: PropTypes.number,
      codeInput: PropTypes.string,
      startCode: PropTypes.string,
      solutionCode: PropTypes.string,
      codeOutput: PropTypes.string,
    }).isRequired,
    makeNextButtonActive: PropTypes.func.isRequired,
  };

  handleCodeCompileSuccess = ({ isProblem }) => {
    const { makeNextButtonActive: makeNextButtonActiveFunc, t } = this.props;
    if (isProblem) {
      makeNextButtonActiveFunc();

      return { status: t('IDE.statusDone') };
    }
    return { status: t('IDE.statusNotRight') };
  };

  render() {
    const {
      lesson: {
        _id: lessonId,
        name: lessonName,
        text: lessonText,
        compilerId,
        startCode: initialCode,
        codeInput,
        problemId,
      },
    } = this.props;
    return (
      <AceIDEContainer
        isProblem
        lessonId={lessonId}
        problemId={problemId}
        lessonName={lessonName}
        lessonText={lessonText}
        compilerId={compilerId}
        initialCode={initialCode}
        codeInput={codeInput}
        validator={this.handleCodeCompileSuccess}
      />
    );
  }
}

export default withNamespaces()(CodeProblemContainer);
