import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import config from 'config';

class CodeCompileSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    validator: PropTypes.func,
  };

  static defaultProps = {
    validator: () => ({ status: '' }),
  };

  state = {
    data: null,
    loading: false,
    testAnswers: '',
    error: null,
    statusCode: null,
  };

  getSubmissionId = async ({
    code, compilerId, codeInput, isProblem, problemId,
  }) => {
    const { data: { id } } = await axios
      .post(`${config.getBackendUrl()}/api${isProblem ? '/problems' : ''}/compile`, {
        compilerId,
        source: code,
        input: codeInput,
        problemId,
      });
    return id;
  };

  getOutput = async (submissionId) => {
    const codeOutput = await axios.post(`${config.getBackendUrl()}/api/getOutput`, { submissionId });
    return codeOutput;
  };

  compileCode = async ({
    code, compilerId, codeInput, isProblem = false, problemId,
  }) => {
    const { validator } = this.props;
    try {
      await this.promiseSetState({
        data: null, loading: true, error: null, statusCode: 0, validator: { status: '' }, testAnswers: '',
      });
      const submissionId = await this.getSubmissionId({
        code, compilerId, codeInput, isProblem, problemId,
      });
      const { codeOutputLink, statusCode, testAnswers } = await
      this.checkStatus(submissionId, isProblem, problemId);

      const result = {
        data: {
          output: null,
        },
        loading: false,
        error: null,
        statusCode,
        testAnswers,
      };
      if (codeOutputLink && !isProblem) {
        const { data: output } = await this.getOutput(submissionId);
        result.data.output = output;
      }

      result.data.validatorResult = statusCode === 15
        ? validator({ code, output: result.data.output, isProblem })
        : { status: '' };

      await this.promiseSetState(result);
      return result;
    } catch (error) {
      // eslint-disable-next-line
      console.log('error: ', error);
      const result = {
        data: { validatorResult: { status: '' } }, loading: false, error, statusCode: null,
      };
      await this.promiseSetState(result);
      return result;
    }
  };

  checkStatus = async (submissionId, isProblem, problemId) => {
    try {
      const {
        data: {
          executing, result: {
            status: { code: statusCode }, streams: {
              output: codeOutputLink,
            }, testcases,
          },
        },
      } = await axios.post(`${config.getBackendUrl()}/api${isProblem ? '/problems' : ''}/checkStatus`, { submissionId, problemId });
      if (executing) {
        const { statusCode: prevStatusCode } = this.state;
        if (prevStatusCode !== statusCode) {
          await this.promiseSetState({ statusCode });
        }
        this.setState({ statusCode });
        return this.checkStatus(submissionId, isProblem, problemId);
      }

      await this.promiseSetState({ statusCode });
      let testAnswers = '';
      if (isProblem) {
        testAnswers = `${testcases.map(test => test.status.code !== 14).filter(test => test).length} \\ ${testcases.length}`;
      }
      return { codeOutputLink, statusCode, testAnswers };
    } catch (err) {
      // TODO: return an error object
      return { codeOutputLink: null };
    }
  };

  promiseSetState = state => new Promise(res => this.setState(state, res));

  render() {
    const {
      data,
      loading,
      error,
      statusCode,
      testAnswers,
    } = this.state;
    const { children } = this.props;
    return children(this.compileCode, {
      data,
      loading,
      error,
      statusCode,
      testAnswers,
    });
  }
}

export default CodeCompileSchema;
