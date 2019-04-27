import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import AceIDEContainer from './AceIDEContainer';
import ValidationUtils from '../utils/ValidationUtils';

class CodeEqualityContainer extends React.PureComponent {
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

  handleCodeCompileSuccess = ({ output }) => {
    const { makeNextButtonActive: makeNextButtonActiveFunc, lesson, t } = this.props;
    if (ValidationUtils.isStringContentEqual(output, lesson.codeOutput)) {
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
      },
    } = this.props;
    return (
      <AceIDEContainer
        lessonId={lessonId}
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

export default withNamespaces()(CodeEqualityContainer);
