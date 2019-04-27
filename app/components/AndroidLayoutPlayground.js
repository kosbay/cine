import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import config from 'config';

const backendUrl = config.getBackendUrl();

const TaskDesctiption = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
`;

const AndroidLayoutPlaygroundWrapper = styled.div`
  width: 100%;
  background-color: #eee;
`;


const Iframe = styled.iframe`
  height: 1024px;
  position: relative;
  width: calc(100vw - 95px);
  box-sizing: border-box;
  border: 0;

  html {
    overflow: hidden;
    background-color: red;
  }
`;

class AndroidLayoutPlayground extends React.PureComponent {
  androidLayoutSource =
  `${window && window.location.origin}/AndroidLayout/`;

  iframeRef = null;

  identifier = null;


  componentDidMount() {
    // save identifier to iframe
    this.iframeRef.addEventListener('load', this.handleIframeLoad);
    window.addEventListener(
      'message',
      this.handleAndroidLayoutCodeChange,
      false
    );
  }

  componentWillUnmount() {
    this.iframeRef = null;
    window.removeEventListener(
      'message',
      this.handleAndroidLayoutCodeChange,
      false
    );
  }


  getIframeRef = (node) => {
    this.iframeRef = node;
  };


  handleIframeLoad = () => {
    const { innerKey, layoutCode } = this.props;
    this.identifier = { id: innerKey || `${Date.now()}` };
    const identifierStringified = JSON.stringify(this.identifier);
    this.iframeRef.contentWindow.postMessage(identifierStringified, '*');

    if (layoutCode) {
      const layoutCodeObj = {
        layoutCode,
        identifier: this.identifier,
      };
      const layoutCodeObjStringified = JSON.stringify(layoutCodeObj);
      this.iframeRef.contentWindow.postMessage(layoutCodeObjStringified, '*');
    }
  };

  handleAndroidLayoutCodeChange = (event) => {
    const { layoutCode, onLayoutCodeChange: onLayoutCodeChangeFunc, innerKey } = this.props;
    if (
      /* eslint-disable */
      !~event.origin.indexOf(backendUrl)
      /* eslint-enable */
    ) {
      return;
    }

    const eventData = JSON.parse(event.data);

    if (eventData.code === layoutCode) {
      return;
    }

    if (!this.identifier || eventData.identifier !== this.identifier.id) {
      return;
    }

    onLayoutCodeChangeFunc(eventData.code, innerKey);
  };

  render() {
    const { innerKey, description } = this.props;
    return (
      <AndroidLayoutPlaygroundWrapper key={innerKey}>
        <TaskDesctiption>{description}</TaskDesctiption>
        <Iframe
          key={`androidLayoutIframe-${innerKey}`}
          ref={this.getIframeRef}
          title={`androidLayoutIframe-${innerKey}`}
          allowFullScreen
          src={this.androidLayoutSource}
        />
      </AndroidLayoutPlaygroundWrapper>
    );
  }
}

AndroidLayoutPlayground.propTypes = {
  innerKey: PropTypes.string.isRequired,
  layoutCode: PropTypes.string,
  description: PropTypes.string,
  onLayoutCodeChange: PropTypes.func.isRequired,
};

AndroidLayoutPlayground.defaultProps = {
  layoutCode: null,
  description: 'No description',
};

export default AndroidLayoutPlayground;
