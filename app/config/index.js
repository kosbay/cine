import getEndpoints from './endpoints';
import options from './instaFeed';

const getBackendUrl = () => {
  if (!process.browser) {
    return process.env.BACKEND_URL || 'https://wunder-server-stage.herokuapp.com';
  }
  return (window.env && window.env.BACKEND_URL)
    || 'https://wunder-server-stage.herokuapp.com';
};

// const getBackendUrl = () => 'http://localhost:5001';

const getChapterId = () => {
  if (!process.browser) {
    return process.env.CHAPTER_ID;
  }
  return (window.env && window.env.CHAPTER_ID);
};

const getNodeEnv = () => {
  if (!process.browser) {
    return process.env.NODE_ENV;
  }

  return (window.env && window.env.NODE_ENV);
};


const config = {
  getNodeEnv,
  getEndpoints,
  getBackendUrl,
  getChapterId,
  options,
};

export default config;
