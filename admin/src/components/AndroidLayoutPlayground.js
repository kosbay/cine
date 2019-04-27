import React from "react";
import PropTypes from "prop-types";

const androidLayoutSource =
  process.env.NODE_ENV === "development"
    ? `http://localhost:5001/androidLayout/`
    : `${window.location.origin}/androidLayout/`;

const IframeContainerStyle = {
  position: "relative",
  padding: "50%",
  overflow: "hidden",
  width: "90%"
};

const IframeStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  border: "0"
};

class AndroidLayoutPlayground extends React.PureComponent {
  componentDidMount() {
    // save identifier to iframe
    this.iframeRef.addEventListener("load", this.handleIframeLoad);
    window.addEventListener(
      "message",
      this.handleAndroidLayoutCodeChange,
      false
    );
  }

  componentWillUnmount() {
    this.iframeRef = null;
    window.removeEventListener(
      "message",
      this.handleAndroidLayoutCodeChange,
      false
    );
  }

  getIframeRef = node => {
    this.iframeRef = node;
  };
  iframeRef = null;
  identifier = null;

  handleIframeLoad = () => {
    this.identifier = { id: this.props.innerKey || `${Date.now()}` };
    const identifierStringified = JSON.stringify(this.identifier);
    this.iframeRef.contentWindow.postMessage(identifierStringified, "*");

    if (this.props.layoutCode) {
      const layoutCodeObj = {
        layoutCode: this.props.layoutCode,
        identifier: this.identifier
      };
      const layoutCodeObjStringified = JSON.stringify(layoutCodeObj);
      this.iframeRef.contentWindow.postMessage(layoutCodeObjStringified, "*");
    }
  };

  handleAndroidLayoutCodeChange = event => {
    if (
      !~event.origin.indexOf("http://localhost:5001") &&
      !~event.origin.indexOf("https://www.wunder.kz")
    ) {
      return;
    }

    const eventData = JSON.parse(event.data);

    if (eventData.code === this.props.layoutCode) {
      return;
    }

    if (!this.identifier || eventData.identifier !== this.identifier.id) {
      return;
    }

    this.props.onLayoutCodeChange(eventData.code, this.props.innerKey);
  };

  render() {
    return (
      <div key={this.props.innerKey} style={IframeContainerStyle}>
        <iframe
          key={`androidLayoutIframe-${this.props.innerKey}`}
          ref={this.getIframeRef}
          title={`androidLayoutIframe-${this.props.innerKey}`}
          style={IframeStyle}
          allowFullScreen
          src={androidLayoutSource}
        />
      </div>
    );
  }
}

AndroidLayoutPlayground.propTypes = {
  innerKey: PropTypes.string.isRequired,
  layoutCode: PropTypes.string,
  onLayoutCodeChange: PropTypes.func.isRequired
};

AndroidLayoutPlayground.defaultProps = {
  layoutCode: null
};

export default AndroidLayoutPlayground;
