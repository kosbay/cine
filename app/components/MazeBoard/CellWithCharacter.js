import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import sizeMe from "react-sizeme";

import { DIRECTIONS } from "../../utils/MazeUtils";

import { CellWithObject } from "./MazeContent";

const SayCloud = styled.div`
  position: absolute;
  min-width: 150px;
  min-height: 50px;
  background-color: white;
  padding: 15px;
  margin: 1em 0 3em;
  border: 1px solid black;
  color: black;
  z-index: 10;
  ${({ spriteSize }) => `bottom: ${spriteSize - 20}px`};

  &:after {
    content: "";
    position: absolute;
    bottom: -20px;
    right: 110px;
    border-width: 0 0 20px 20px;
    border-style: solid;
    border-color: transparent #fff;
    display: block;
    width: 0;
  }
`;

const CellWithCharacterWrapper = styled.div`
  ${({ isComposed }) =>
    isComposed && "position: absolute;z-index: 1;top: 0;left: 0;"};
  ${({ backgroundImage }) => `background-image: url('${backgroundImage}')`};
  ${({ width }) => `background-size: ${width * 3}px ${width * 4}px`};
  ${({ direction, walkIndex, width }) =>
    `background-position: -${width * walkIndex || 0}px -${width *
      direction}px`};
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
`;

class CellWithCharacter extends React.PureComponent {
  static propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    direction: PropTypes.number.isRequired,
    walkIndex: PropTypes.number,
    spriteSize: PropTypes.number.isRequired,
    isTalking: PropTypes.bool,
    talkingMessage: PropTypes.string,
    backgroundObject: PropTypes.oneOf([PropTypes.shape({})]),
    mergedObject: PropTypes.shape({}),
    size: PropTypes.shape({ width: PropTypes.number })
  };

  static defaultProps = {
    walkIndex: 0
  };

  static defaultProps = {
    isTalking: false,
    talkingMessage: "",
    backgroundObject: null,
    size: { width: 0 },
    mergedObject: null
  };

  renderSayCloud = () => {
    const { talkingMessage, spriteSize } = this.props;

    return <SayCloud spriteSize={spriteSize}>{talkingMessage}</SayCloud>;
  };

  render() {
    const {
      backgroundImage,
      direction,
      walkIndex,
      spriteSize,
      isTalking,
      backgroundObject,
      mergedObject
    } = this.props;

    const cellWidth = Math.round(this.props.size.width);
    if (backgroundObject || mergedObject) {
      const backgroundDirectionIndex =
        backgroundObject && DIRECTIONS[backgroundObject.direction];
      const mergedDirectionIndex =
        mergedObject && DIRECTIONS[mergedObject.direction];

      return (
        <React.Fragment>
          {Boolean(backgroundObject) && (
            <CellWithObject
              backgroundImage={backgroundObject.backgroundImage}
              direction={backgroundDirectionIndex}
            />
          )}
          {Boolean(mergedObject) && (
            <CellWithObject
              backgroundImage={mergedObject.backgroundImage}
              direction={mergedDirectionIndex}
            />
          )}
          <CellWithCharacterWrapper
            isComposed
            backgroundImage={backgroundImage}
            direction={direction}
            walkIndex={walkIndex}
            spriteSize={spriteSize}
            width={cellWidth}
          />
          {isTalking && this.renderSayCloud()}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <CellWithCharacterWrapper
          backgroundImage={backgroundImage}
          direction={direction}
          walkIndex={walkIndex}
          spriteSize={spriteSize}
          width={cellWidth}
        />
        {isTalking && this.renderSayCloud()}
      </React.Fragment>
    );
  }
}

export default sizeMe()(CellWithCharacter);
