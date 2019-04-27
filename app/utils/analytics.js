import { trackCustomEvent } from 'lib/ReactGA';

const TRACK_FLOW = 'Flow tracking';

const trackNextButtonClick = ({ pageData }) => {
  trackCustomEvent(TRACK_FLOW, `Clicked after: ${pageData}`);
};

const trackHaveSeenVideo = ({ pageData }) => {
  trackCustomEvent(TRACK_FLOW, `Have seen video: ${pageData}`);
};

export { trackNextButtonClick, trackHaveSeenVideo };
