import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const SurveyComponent = dynamic({
  modules: () => {
    const components = {
      Survey: () => import('survey-react'),
    };

    return components;
  },

  render: (props, { Survey }) => {
    /* eslint-disable react/prop-types */
    const {
      clientId,
      onComplete,
      surveyJson,
    } = props;
    /* eslint-enable */

    const model = new Survey.Model(
      surveyJson, { clientId }
    );

    const defaultThemeColors = Survey.StylesManager.ThemeColors.default;
    defaultThemeColors['$main-color'] = '#606dc9';
    defaultThemeColors['$main-hover-color'] = '#ffd263';
    defaultThemeColors['$text-color'] = '#4a4a4a';
    defaultThemeColors['$header-color'] = '#606dc9';
    defaultThemeColors['$header-background-color'] = '#4a4a4a';
    defaultThemeColors['$body-container-background-color'] = '#f8f8f8';
    Survey.StylesManager.applyTheme();

    return (
      <Survey.Survey model={model} onComplete={onComplete} />
    );
  },
}, {
  ssr: false,
});


class Quiz extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<SurveyComponent {...this.props} />);
  }
}

Quiz.propTypes = {
  surveyJson: PropTypes.string,
  clientId: PropTypes.string,
  onComplete: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  clientId: null,
  surveyJson: null,
};

export default Quiz;
