import React from 'react';
import PropTypes from 'prop-types';
import P5 from 'p5/lib/p5.min';
import 'p5/lib/addons/p5.dom.min';

class P5Wrapper extends React.PureComponent {
  static propTypes = {
    sketch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { sketch } = this.props;
    this.canvas = new P5(sketch, this.wrapper);

    if (this.canvas.myCustomRedrawAccordingToNewPropsHandler) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    }
  }

  componentWillReceiveProps(newprops) {
    const { sketch } = this.props;
    if (sketch !== newprops.sketch) {
      this.wrapper.removeChild(this.wrapper.childNodes[0]);
      this.canvas = new P5(newprops.sketch, this.wrapper);
    }
    if (this.canvas.myCustomRedrawAccordingToNewPropsHandler) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }

  handleRef = (wrapper) => { this.wrapper = wrapper; };

  render() {
    return <div ref={this.handleRef} />;
  }
}

export default P5Wrapper;
