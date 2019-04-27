import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PDFObject from 'pdfobject';
import sizeMe from 'react-sizeme';

const PdfContainer = styled.div`
  width: fit-content;
  height: calc(100vh - 64px);
`;

class PresentationContainer extends Component {
  componentDidMount() {
    const { lesson: { url } } = this.props;
    this.handlePDFEmbed(url);
  }

  handlePDFEmbed = (url) => {
    PDFObject.embed(url, '#pdf-viewer', {
      width: 'calc(100vw - 80px)',
      height: 'calc(100vh - 68px)',
    });
  }

  render() {
    const { size: { width, height } } = this.props;
    return <PdfContainer id="pdf-viewer" width={width} height={height} />;
  }
}

PresentationContainer.propTypes = {
  lesson: PropTypes.shape({ url: PropTypes.string }).isRequired,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
};

export default sizeMe({ monitorHeight: true })(PresentationContainer);
