import React from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';

class VideoPlayer extends React.Component {
  componentDidMount() {
    this.createPlayer();
  }

  componentDidUpdate() {
    const { sources } = this.props;
    if (this.player) {
      this.player.src(sources[0].src);
    } else {
      this.createPlayer();
    }
  }

  createPlayer = () => {
    const { makeNextButtonActive: makeNextButtonActiveFunc } = this.props;
    this.player = videojs(this.videoNode, this.props, () => {
    });

    this.player.on('ended', () => {
      makeNextButtonActiveFunc();
    });
  };

  render() {
    const { fullScreen } = this.props;
    return (
      <div data-vjs-player>
        <video
          ref={
            // eslint-disable-next-line no-return-assign
            node => (this.videoNode = node)
          }
          className={`video-js ${fullScreen ? 'full-screen' : ''}`}
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }
}
VideoPlayer.propTypes = {
  fullScreen: PropTypes.bool,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
  makeNextButtonActive: PropTypes.func,
};

VideoPlayer.defaultProps = {
  makeNextButtonActive: () => {},
  fullScreen: false,
};
export default VideoPlayer;
