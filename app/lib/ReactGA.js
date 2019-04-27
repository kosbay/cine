import ReactGA from 'react-ga';

const dev = process.env.NODE_ENV !== 'production';

/* eslint-disable */ 
let initGA = () => {};
let logPageView = () => {};
/* eslint-enable */

initGA = () => {
  if (!dev) {
    if (!window.ga) {
      console.log('GA is inited');
      ReactGA.initialize('UA-73008937-8', {
        debug: dev,
      });
    }
  }
};


logPageView = (
  pageName = window.location.pathname + window.location.search
) => {
  ReactGA.set({ page: pageName });
  ReactGA.pageview(pageName);
};

export { initGA, logPageView };
