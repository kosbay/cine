import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { VideoPlayer, YoutubePlayer } from '../components';

const videoJsOptions = {
  autoplay: false,
  controls: true,
  fluid: true,
  playbackRates: [0.5, 1, 1.5, 2],
  sources: [
    {
      src: '',
      type: 'video/mp4',
    },
  ],
};

const PlayerCache = {};

const WrappedVideoPlayer = ({ url, makeNextButtonActive }) => {
  videoJsOptions.sources[0].src = url;
  return <VideoPlayer {...videoJsOptions} makeNextButtonActive={makeNextButtonActive} />;
};

const WrappedYouTubePlayer = ({ url, makeNextButtonActive }) => (
  <YoutubePlayer responsive url={url} makeNextButtonActive={makeNextButtonActive} />
);

const WrappedPlayer = ({ isYouTubePlayer, url, makeNextButtonActive }) => {
  const playerRenderFunction = PlayerCache[`${isYouTubePlayer}${url}`];

  if (!playerRenderFunction) {
    PlayerCache[`${isYouTubePlayer}${url}`] = isYouTubePlayer ? (
      <WrappedYouTubePlayer url={url} makeNextButtonActive={makeNextButtonActive} />
    ) : (
      <WrappedVideoPlayer url={url} makeNextButtonActive={makeNextButtonActive} />
    );
  }

  return PlayerCache[`${isYouTubePlayer}${url}`];
};
// max-width: 640px;
const TextContainer = styled.div`
  width: 60%;
  max-width: 60%;
  margin-top: 20px;
  margin-bottom: 20px;

  & > * > code {
    background: #efefef;
    padding: 2px 4px;
  }

  & > pre {
    background: #161a36;
    color: #fff;
    padding: 16px;
  }
`;

const VideoDiv = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
`;

const VideoTextContainer = ({ makeNextButtonActive, lesson }) => {
  const { isYouTubePlayer, url, _id } = lesson;

  return (
    <React.Fragment key={_id}>
      <TextContainer>
        <VideoDiv>
          <WrappedPlayer
            isYouTubePlayer={isYouTubePlayer}
            url={url}
            makeNextButtonActive={makeNextButtonActive}
          />
        </VideoDiv>
        {lesson.text && (
          <div
            className="ql-editor"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: lesson.text,
            }}
          />
        )}
      </TextContainer>
    </React.Fragment>
  );
};

const WrappedPlayerPropTypes = {
  url: PropTypes.string.isRequired,
  makeNextButtonActive: PropTypes.func.isRequired,
};

WrappedVideoPlayer.propTypes = WrappedPlayerPropTypes;
WrappedYouTubePlayer.propTypes = WrappedPlayerPropTypes;
WrappedPlayer.propTypes = {
  ...WrappedPlayerPropTypes,
  isYouTubePlayer: PropTypes.bool,
};

VideoTextContainer.propTypes = {
  lesson: PropTypes.shape({ url: PropTypes.string, text: PropTypes.string }).isRequired,
  makeNextButtonActive: PropTypes.func.isRequired,
};

export default VideoTextContainer;
