import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { compose } from 'recompact';
import { Quiz } from '../components';


class QuizContainer extends Component {
  state = {
    quizResult: null,
    correctAnswers: 0,
    inCorrectAnswers: 0,
    // eslint-disable-next-line
    finished: this.props.lesson.finished,
  };

  sendDataToServer = (survey) => {
    const { lesson: { surveyJson }, makeNextButtonActive } = this.props;

    survey.sendResult(surveyJson);

    const correctAnswers = survey.getCorrectedAnswerCount();
    const inCorrectAnswers = survey.getInCorrectedAnswerCount();
    const result = (
      (correctAnswers / (correctAnswers + inCorrectAnswers))
      * 100
    ).toFixed(0);
    this.setState({
      quizResult: result,
      correctAnswers,
      inCorrectAnswers,
      finished: true,
    });
    makeNextButtonActive();
  };

  render() {
    const { lesson, auth, t } = this.props;
    const {
      isSingleTry, surveyJson,
    } = lesson;
    const clientId = isSingleTry ? auth._id : null;
    const {
      quizResult, correctAnswers, inCorrectAnswers, finished,
    } = this.state;
    if (finished) {
      return (
        <div style={{ height: 40, fontSize: 20, marginTop: 20 }}>
          {t('quiz.taskCompleted')}
          {
            quizResult
            && (
            <div>
              {`${t('quiz.result')} ${correctAnswers} ${t('quiz.from')} ${correctAnswers + inCorrectAnswers} (${quizResult}%) `}
            </div>
            )
        }
        </div>
      );
    }
    return (
      <Quiz
        onComplete={this.sendDataToServer}
        clientId={clientId}
        surveyJson={surveyJson}
      />
    );
  }
}

QuizContainer.propTypes = {
  t: PropTypes.func.isRequired,
  makeNextButtonActive: PropTypes.func.isRequired,
  lesson: PropTypes.shape({
    surveyJson: PropTypes.string,
  }).isRequired,
  auth: PropTypes.shape({ _id: PropTypes.string }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const withState = connect(
  mapStateToProps,
);

export default compose(withState, withNamespaces())(QuizContainer);
