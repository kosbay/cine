import styled from "styled-components";

import { DIRECTIONS } from "../../utils/MazeUtils";

const Background = styled.div`
  ${({ background }) => background && `background-image: url(${background})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  padding-bottom: 100%;
  border: 1px solid black;
  position: relative;
`;

const MazeContentWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  ${({ rowCount }) => `height: calc(100%/${rowCount})`};
`;

const Cell = styled.div`
  position: relative;
  ${({ columnCount }) => `width: calc(100%/${columnCount})`};
  height: 100%;
`;

const CellWithObject = styled.div`
  ${({ backgroundImage }) =>
    backgroundImage && `background-image: url('${backgroundImage}')`};
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${({ backgroundImage }) =>
    backgroundImage.includes(".svg") ? "" : "contain"};
  ${({ direction }) => {
    switch (direction) {
      case DIRECTIONS.up:
        return "transform: rotate(0deg)";
      case DIRECTIONS.down:
        return "transform: rotate(180deg)";
      case DIRECTIONS.right:
        return "transform: rotate(90deg)";
      case DIRECTIONS.left:
        return "transform: rotate(270deg)";
      default:
        return "transform: rotate(0deg)";
    }
  }};
`;

export { Background, Row, Cell, CellWithObject, MazeContentWrapper };
