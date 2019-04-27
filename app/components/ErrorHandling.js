import Router from 'next/router';


const ErrorHandling = ({ errorCode, link, actions }) => {
  /* eslint-disable-next-line */
  switch (errorCode) {
    case 401: {
      actions.saveURLBeforLogin(link);
      Router.push('/login');
      break;
    }
    default:
      break;
  }
};

export default ErrorHandling;
