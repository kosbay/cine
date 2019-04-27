import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';

import { Spinner } from 'components';
import AceIDEHeader from './AceIDEHeader';

const DynamicAceEditorWithNoSSR = dynamic(
  import('./AceEditor'),
  { ssr: false, loading: () => <Spinner /> }
);

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const InputOutputContainer = styled.div`
  ${p => p.width && `max-width: ${p.width}px;`};
  display: flex;
  flex-direction: row;
`;

const Output = styled.div`
  flex: 1;
  background: #232424;
  color: #fff;
  height: 142px;
  padding: 24px 31px;
`;

const Column = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  width: 50%;
  padding: 24px;
`;

const RightColumn = styled.div`
  flex: 0 0 auto;
  width: 50%;
`;

const ButtonsBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  color: #fff;
  background: #0b0f2a;
`;

const RunButton = styled.div`
  height: 100%;
  background-color: #7a89ff;
  cursor: pointer;
  color: #fff;
  display: inline-flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  margin-right: 8px;
`;

class AceIDE extends React.PureComponent {
  static propTypes = {
    codeInput: PropTypes.string,
    testAnswers: PropTypes.string,
    t: PropTypes.func.isRequired,
    compilerId: PropTypes.number,
    initialCode: PropTypes.string,
    lessonId: PropTypes.string.isRequired,
    problemId: PropTypes.string.isRequired,
    isProblem: PropTypes.bool,
    lessonText: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    output: PropTypes.string,
    statusCode: PropTypes.number,
    onLaunchButtonClick: PropTypes.func.isRequired,
    validatorResult: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  };

  static defaultProps = {
    isProblem: false,
    codeInput: '',
    initialCode: '',
    testAnswers: '',
    output: '',
    validatorResult: '',
    statusCode: '',
    compilerId: 0,
    lessonText: '',
  };

  /* eslint-disable */ 
  state = {
    code: this.props.initialCode || '',
  };
  /* eslint-enable */

  handleCodeChange = (newValue) => {
    this.setState({ code: newValue });
  };

  handleLaunchButtonClick = (isProblem) => {
    const { code } = this.state;
    const {
      compilerId, codeInput, onLaunchButtonClick: onLaunchButtonClickFunc, problemId,
    } = this.props;
    onLaunchButtonClickFunc({
      isProblem,
      code,
      compilerId,
      codeInput,
      problemId,
    });
  };

  render() {
    const {
      lessonText, lessonId, compilerId, t,
      loading, output, statusCode, codeInput, isProblem,
      testAnswers, validatorResult: { status: codeValidationResult },
    } = this.props;
    const { code } = this.state;
    const statusMessage = `${t(`IDE.${statusCode || (statusCode === 0 ? 0 : 99)}`)} ${testAnswers}`;
    return (
      <Container>
        <Column>
          <AceIDEHeader text={lessonText} />
        </Column>
        <RightColumn key={`${lessonId}-code`}>
          <DynamicAceEditorWithNoSSR
            compilerId={compilerId}
            onChange={this.handleCodeChange}
            value={code}
          />
          <ButtonsBar>
            <React.Fragment>
              <RunButton onClick={() => this.handleLaunchButtonClick(false)} disabled={loading}>
                {t('IDE.startButtonLabel')}
              </RunButton>
              {isProblem && (
              <RunButton onClick={() => this.handleLaunchButtonClick(true)} disabled={loading}>
                {t('IDE.testButtonLabel')}
              </RunButton>
              )
            }
              <div>{`${statusMessage} ${codeValidationResult && `| ${codeValidationResult}`}`}</div>
            </React.Fragment>
          </ButtonsBar>
          <InputOutputContainer>
            <Output>{output || t('IDE.outputPlaceholder')}</Output>
            {codeInput && <Output>{codeInput}</Output>}
          </InputOutputContainer>
        </RightColumn>
      </Container>
    );
  }
}

export default withNamespaces()(AceIDE);
