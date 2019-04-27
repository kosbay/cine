import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { VideoPlayer, YoutubePlayer } from "../components";

const VideoWrapper = styled.div`
  width: 60%;
  max-width: 60%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const videoJsOptions = {
  autoplay: false,
  controls: true,
  fluid: true,
  playbackRates: [0.5, 1, 1.5, 2],
  sources: [
    {
      src: "",
      type: "video/mp4"
    }
  ]
};

const PlayerCache = {};

const WrappedVideoPlayer = ({ url, makeNextButtonActive }) => {
  videoJsOptions.sources[0].src = url;
  return (
    <VideoPlayer
      {...videoJsOptions}
      makeNextButtonActive={makeNextButtonActive}
    />
  );
};

const WrappedYouTubePlayer = ({ url, makeNextButtonActive }) => (
  <YoutubePlayer
    url={url}
    makeNextButtonActive={makeNextButtonActive}
    responsive
  />
);

const WrappedPlayer = ({ isYouTubePlayer, url, makeNextButtonActive }) => {
  const playerRenderFunction = PlayerCache[`${isYouTubePlayer}${url}`];

  if (!playerRenderFunction) {
    PlayerCache[`${isYouTubePlayer}${url}`] = isYouTubePlayer ? (
      <WrappedYouTubePlayer
        url={url}
        makeNextButtonActive={makeNextButtonActive}
      />
    ) : (
      <WrappedVideoPlayer
        url={url}
        makeNextButtonActive={makeNextButtonActive}
      />
    );
  }

  return PlayerCache[`${isYouTubePlayer}${url}`];
};

const VideoContainer = ({ lesson, makeNextButtonActive }) => {
  const { isYouTubePlayer, url } = lesson;

  return (
    <VideoWrapper key={lesson._id}>
      <WrappedPlayer
        isYouTubePlayer={isYouTubePlayer}
        url={url}
        makeNextButtonActive={makeNextButtonActive}
      />
    </VideoWrapper>
  );
};

WrappedPlayer.propTypes = {
  url: PropTypes.string,
  makeNextButtonActive: PropTypes.func.isRequired,
  isYouTubePlayer: PropTypes.bool
};

WrappedPlayer.defaultProps = {
  url: '',
  isYouTubePlayer: false
}

WrappedVideoPlayer.defaultProps = {
  url: '',
  isYouTubePlayer: false
}

WrappedYouTubePlayer.defaultProps = {
  url: '',
}

WrappedVideoPlayer.propTypes = {
  url: PropTypes.string,
  makeNextButtonActive: PropTypes.func.isRequired,
  isYouTubePlayer: PropTypes.bool
};
WrappedYouTubePlayer.propTypes =  {
  url: PropTypes.string,
  makeNextButtonActive: PropTypes.func.isRequired
};;

VideoContainer.propTypes = {
  lesson: PropTypes.shape({
    url: PropTypes.string,
    isYouTubePlayer: PropTypes.bool
  }).isRequired,
  makeNextButtonActive: PropTypes.func.isRequired
};

export default VideoContainer;
