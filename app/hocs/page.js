import { compose } from 'recompact';

import '../styles/index.css';
import '../styles/theme.less';

import { withRouter } from 'next/router';
import withAnalytics from './withAnalytics';
import withData from './withData';
import withLayout from './withLayout';
import withNotification from './withNotification';
import withTheming from './withTheming';

const page = compose(
  withData,
  withRouter,
  withLayout,
  withAnalytics,
  withTheming,
  withNotification
);

export default page;
