import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import sizeMe from 'react-sizeme';
import axios from 'axios';
import { Icon } from 'antd';

import { Blockly } from 'components';
import config from 'config';

const backendUrl = config.getBackendUrl();

const PulseAnimation = keyframes`
    0% {
      color: transparent;
    }

    50% {
      color: #ffd263;
    }

    100% {
      color: transparent;
    }
  `;

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const Column = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 24px;
`;

const LessonName = styled.div`
  font-size: 20px;
  font-weight: 550;
  margin-bottom: 16px;
`;

const Text = styled.div`
  & > * > code {
    background: #efefef;
    padding: 2px 4px;
  }

  & > pre {
    background: #161a36;
    color: #fff;
    padding: 16px;
  }
`;

const RightColumn = styled.div`
  flex: 0 0 auto;
`;

const ButtonsBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  color: #fff;
  background: #0b0f2a;
`;

const RunButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  height: 100%;
  background-color: #7a89ff;
  color: #fff;
  display: inline-flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 20px;
  font-size: 16px;
  transition: all 0.25s ease-in-out;

  :hover {
    cursor: pointer;
    background-color: #6674e6;
  }

  :disabled {
    cursor: not-allowed;
    background-color: #909090;
  }

  :focus {
    outline: 0;
  }
`;

const PlayIcon = styled(Icon)`
  color: #ffd263;
  margin-right: 8px;
`;

const StatusContainer = styled.div`
  margin-left: 16px;
  font-size: 16px;
`;

const CodeIcon = styled(Icon)`
  color: #ffd263;
  margin-right: 8px;
  ${p => !p.iserror && `animation: ${PulseAnimation} 0.8s ease-in-out infinite alternate;`};
`;

const Output = styled.div`
  background: #232424;
  color: #fff;
  height: 142px;
  padding: 24px 31px;
`;

class CodeOutputContainer extends Component {
  state = {
    code: '',
    status: '',
    output: '// Здесь будет Ваш вывод',
    disabled: false,
  };

  onBlocklyEdit = (code) => {
    this.setState({ code });
  };

  onRunClick = () => {
    this.setState({ disabled: true });
    const { code } = this.state;
    const codeForCompile = code.replace(/window.alert/g, 'print');

    axios
      .post(`${backendUrl}/api/compile`, {
        compilerId: 112,
        source: codeForCompile,
      })
      .then((response) => {
        this.setState({ status: 'В очереди' });
        const { id } = response.data;
        this.checkStatus(id);
      });

    // eslint-disable-next-line no-eval
    eval(code);
  };

  getOutput = (id) => {
    const { lesson, makeNextButtonActive: makeNextButtonActiveFunc } = this.props;
    axios
      .post(`${backendUrl}/api/getOutput`, {
        submissionId: id,
      })
      .then((response) => {
        if (response.data.toString().replace(/\s/g, '') === lesson.codeOutput.replace(/\s/g, '')) {
          makeNextButtonActiveFunc();
        }

        this.setState({ output: response.data, disabled: false });
      });
  };

  checkStatus = (id) => {
    axios
      .post(`${backendUrl}/api/checkStatus`, {
        submissionId: id,
      })
      .then((response) => {
        if (response.data.executing === true) {
          this.setState({ status: 'Запускаем' });
          this.checkStatus(id);
        } else if (response.data.executing === false) {
          this.setState({ status: 'Получаем результат' });
          if (response.data.result.status.name === 'accepted') {
            this.getOutput(id);
          } else {
            this.setState({ status: 'Ошибка', disabled: false });
          }
        }
      });
  };

  render() {
    const {
      lesson,
      size: { width, height },
    } = this.props;
    const { status, disabled, output } = this.state;

    const blocklyWidth = (width / 3) * 2;
    const blocklyHeight = height - 142 - 56;

    const iserror = status === 'Ошибка';
    return (
      <Container>
        <Column>
          <LessonName>{lesson.name}</LessonName>
          <Text
            className="ql-editor"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: lesson.text,
            }}
          />
        </Column>
        <RightColumn>
          <div style={{ width: blocklyWidth, height: blocklyHeight }}>
            <Blockly
              injectOptions={{ toolboxXML: lesson.toolboxXML }}
              workspaceXML={lesson.workspaceXML}
              onEdit={this.onBlocklyEdit}
            />
          </div>

          <ButtonsBar>
            <RunButton onClick={this.onRunClick} disabled={disabled}>
              <PlayIcon type="caret-right" />
              Запустить
            </RunButton>
            {status !== '' && (
              <StatusContainer>
                <CodeIcon iserror={iserror} type={iserror ? 'warning' : 'code'} />
                {status}
              </StatusContainer>
            )}
          </ButtonsBar>

          <Output>{output}</Output>
        </RightColumn>
      </Container>
    );
  }
}

CodeOutputContainer.propTypes = {
  lesson: PropTypes.shape({
    text: PropTypes.string,
    compilerId: PropTypes.number,
    codeOutput: PropTypes.string,
    startCode: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,

  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  makeNextButtonActive: PropTypes.func.isRequired,
};

export default sizeMe({ monitorHeight: true })(CodeOutputContainer);
