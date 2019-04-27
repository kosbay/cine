import React from "react";
import PropTypes from "prop-types";
import YouTube from "@u-wave/react-youtube";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  ${({ responsive }) => (responsive ? "padding-top: 56.25%" : "height: 100%")};
  position: relative;
`;

const Video = styled(YouTube)`
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
`;

const YoutubePlayer = ({ url, makeNextButtonActive, responsive }) => (
  <Container responsive={responsive}>
    <Video
      autoplay
      video={url}
      showRelatedVideos={false}
      showInfo={false}
      annotations={false}
      onEnd={makeNextButtonActive}
    />
  </Container>
);

YoutubePlayer.propTypes = {
  url: PropTypes.string.isRequired,
  makeNextButtonActive: PropTypes.func.isRequired,
  responsive: PropTypes.bool
};

YoutubePlayer.defaultProps = {
  responsive: false
};

export default YoutubePlayer;
