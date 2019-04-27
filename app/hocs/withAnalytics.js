import React from 'react';

import { logPageView } from 'lib/ReactGA';

const withAnalytics = ComposedComponent => class WithAnalytics extends React.PureComponent {
  componentDidMount() {
    logPageView();
  }

  render() {
    return <ComposedComponent {...this.props} />;
  }
};

export default withAnalytics;
