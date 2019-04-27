import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from 'antd';

const HiddenCanvas = styled.canvas`
  display: none;
`;

const CertificateImg = styled.img`
  width: 100%;
  height: auto;

  $ { p => p.hidden && 'display: none;'}
`;

class Certificate extends Component {
  state = {
    dataURL: '',
  }

  componentDidMount() {
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    const img = this.sourceImage;

    const { name } = this.props;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // name
      const deltaY = 30;
      const nameX = canvas.width / 2 - 300;
      const nameY = canvas.height / 2 + deltaY;
      ctx.font = '80px PingFang SC';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000000';
      ctx.fillText(name, nameX, nameY);

      // course
      // const courseX = nameX;
      // const courseY = nameY + 120;
      // ctx.font = '54px Helvetica-Light';
      // ctx.textAlign = 'center';
      // ctx.fillStyle = '#000000';
      // ctx.fillText('прошел -(ла) элективный курс на платформе ”Wunder”', courseX, courseY);

      // course name
      // const courseNameX = courseX;
      // const courseNameY = courseY + 150;
      // ctx.font = '54px Helvetica-Light';
      // ctx.textAlign = 'center';
      // ctx.fillStyle = '#000000';
      // ctx.fillText(courseName, courseNameX, courseNameY);

      const dataURL = canvas.toDataURL();
      this.setState({ dataURL });
    };
  }

  render() {
    return (
      <div>
        <HiddenCanvas ref={((r) => { this.canvas = r; })} />
        <CertificateImg hidden crossOrigin="anonymous" ref={((r) => { this.sourceImage = r; })} src={this.props.imageUrl} />
        <CertificateImg src={this.state.dataURL} crossOrigin="anonymous" />
        <a href={this.state.dataURL} download>
          <Button type="primary">Скачать</Button>
        </a>
      </div>
    );
  }
}

Certificate.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};


export default Certificate;
