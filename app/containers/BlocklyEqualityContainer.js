import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sizeMe from 'react-sizeme';
import { Blockly } from '../components';

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

class CodeOutputContainer extends Component {
  state = {
    code: '',
    status: '',
  };

  onBlocklyEdit = (code) => {
    this.setState({ code });
  };

  onRunClick = () => {
    if (this.state.code.replace(/\s/g, '') === this.props.lesson.solutionCode.replace(/\s/g, '')) {
      this.setState({ status: 'accepted' });
      this.props.makeNextButtonActive();
    } else {
      this.setState({ status: 'wrong answer' });
    }
  };

  render() {
    const { lesson } = this.props;
    const { width, height } = this.props.size;

    const blocklyWidth = (width / 3) * 2;
    const blocklyHeight = height - 56;

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
            <RunButton onClick={this.onRunClick}>Запустить</RunButton>
            <div>{this.state.status}</div>
          </ButtonsBar>
        </RightColumn>
      </Container>
    );
  }
}

CodeOutputContainer.propTypes = {
  lesson: PropTypes.shape({
    text: PropTypes.string,
    compilerId: PropTypes.number,
    solutionCode: PropTypes.string,
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
