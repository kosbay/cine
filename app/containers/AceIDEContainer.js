import React from 'react';
import PropTypes from 'prop-types';
import { AceIDE } from 'components';
import { CodeCompileSchema } from 'schemas';

class AceIDEContainer extends React.PureComponent {
  static propTypes = {
    codeInput: PropTypes.string,
    isProblem: PropTypes.bool,
    compilerId: PropTypes.number,
    initialCode: PropTypes.string,
    problemId: PropTypes.string,
    lessonId: PropTypes.string.isRequired,
    lessonName: PropTypes.string.isRequired,
    lessonText: PropTypes.string,
    validator: PropTypes.func,
  };

  static defaultProps = {
    isProblem: false,
    validator: () => ({ status: '' }),
    codeInput: '',
    problemId: '',
    initialCode: '',
    compilerId: 0,
    lessonText: '',
  };

  handleLaunchButtonClick = compileCode => async ({
    code, compilerId, codeInput, isProblem, problemId,
  }) => {
    try {
      await compileCode({
        code, compilerId, codeInput, isProblem, problemId,
      });
    } catch (error) {
      // eslint-disable-next-line
      console.warn('Unhandled error AceIDEContainer: ', error);
    }
  };

  renderAceIDE = (compileCode, {
    data,
    loading,
    statusCode,
    testAnswers,
  }) => {
    const handleLaunchButtonClick = this.handleLaunchButtonClick(compileCode);
    const {
      codeInput,
      isProblem,
      compilerId,
      initialCode,
      lessonId,
      lessonName,
      lessonText,
      problemId,
    } = this.props;
    const { output, validatorResult } = data || { output: '', validatorResult: { status: '' } };
    return (
      <AceIDE
        validatorResult={validatorResult}
        loading={loading}
        statusCode={statusCode}
        output={output}
        testAnswers={testAnswers}
        problemId={problemId}
        isProblem={isProblem}
        onLaunchButtonClick={handleLaunchButtonClick}
        codeInput={codeInput}
        compilerId={compilerId}
        initialCode={initialCode}
        lessonId={lessonId}
        lessonName={lessonName}
        lessonText={lessonText}
      />
    );
  }

  render() {
    const { validator } = this.props;
    return (
      <CodeCompileSchema validator={validator}>
        {this.renderAceIDE}
      </CodeCompileSchema>
    );
  }
}

export default AceIDEContainer;
