import { Component } from 'react';
import PropTypes from 'prop-types';

// Scroll restoration based on https://reacttraining.com/react-router/web/guides/scroll-restoration.
class ScrollToTopWithoutRouter extends Component {
  static propTypes ={
    location: PropTypes.string.isRequired,
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

ScrollToTopWithoutRouter.propTypes = {
};

export default ScrollToTopWithoutRouter;
