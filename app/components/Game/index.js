import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import EventEmitter from './EventEmitter';
import P5Wrapper from './P5Wrapper';
import sketch from './sketch';

const GameWorldWrapper = styled.div`
  margin-top: 10px;
  position: relative;
  ${({ height }) => `height: ${height + 20}px`};
  ${({ width }) => `width: ${width + 20}px`};
`;

const renderSetting = {
  frameCount: 30,
  spriteCount: 3,
};

class GameWorld extends React.PureComponent {
  static propTypes = {
    onFinish: PropTypes.func.isRequired,
    board: PropTypes.shape({}).isRequired,
    objects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    intersections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  componentDidMount() {
    this.unsubscribe = EventEmitter.subscibe(this.handleEventsFinish);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleEventsFinish = ({ isLastEvent, ...other }) => {
    if (!isLastEvent) return;
    const { onFinish } = this.props;
    onFinish(other);
  };

  handleSketchInit = p5 => sketch(p5, {
    board: this.props.board,
    entities: this.props.objects,
    renderSetting,
    images: this.props.images,
    intersections: this.props.intersections,
  });

  render() {
    const { board } = this.props;
    return (
      <GameWorldWrapper width={board.width} height={board.height}>
        <P5Wrapper sketch={this.handleSketchInit} />
      </GameWorldWrapper>
    );
  }
}

export default GameWorld;
