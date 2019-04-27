import React from "react";
import PropTypes from "prop-types";

import { DIRECTIONS, POINTS_TYPES } from "../../utils/MazeUtils";
import { CellWithObject, Cell } from "./MazeContent";
import CellWithCharacter from "./CellWithCharacter";

class MazeCell extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    cell: PropTypes.oneOf([PropTypes.number, PropTypes.shape({})]).isRequired,
    spriteSize: PropTypes.number.isRequired,
    columnCount: PropTypes.number.isRequired
  };

  shouldComponentUpdate(nextProps) {
    const { cell, index } = nextProps;
    const { cell: prevCell, index: prevIndex } = this.props;
    if (typeof cell === "number") {
      return index !== prevIndex || cell !== prevCell;
    }

    if (cell.identifier) {
      return (
        cell.identifier !== prevCell.identifier ||
        cell.direction.localeCompare(prevCell.direction) !== 0 ||
        cell.type.localeCompare(prevCell.type) !== 0 ||
        cell.backgroundImage.localeCompare(prevCell.backgroundImage) !== 0
      );
    }

    return (
      cell.direction.localeCompare(prevCell.direction) !== 0 ||
      cell.spriteImage.localeCompare(prevCell.spriteImage) !== 0 ||
      cell.spriteSize !== prevCell.spriteSize ||
      cell.isTalking !== prevCell.isTalking ||
      cell.talkingMessage !== prevCell.talkingMessage
    );
  }

  renderCell = cellInfo => {
    if (!cellInfo) {
      return <div />;
    }

    if (cellInfo.backgroundImage && cellInfo.type !== POINTS_TYPES.merge) {
      const directionIndex = DIRECTIONS[cellInfo.direction];

      return (
        <CellWithObject
          backgroundImage={cellInfo.backgroundImage}
          direction={directionIndex}
        />
      );
    }
    // if (!cellInfo.spriteImage) {
    //   return <div />;
    // }

    const {
      spriteImage,
      direction,
      walkIndex,
      isTalking,
      talkingMessage,
      backgroundObject,
      backgroundImage,
      mergedObjects
    } = cellInfo;
    const directionIndex = DIRECTIONS[direction];

    return (
      <CellWithCharacter
        backgroundImage={spriteImage || backgroundImage}
        direction={directionIndex}
        walkIndex={walkIndex}
        spriteSize={this.props.spriteSize}
        isTalking={isTalking}
        talkingMessage={talkingMessage}
        columnCount={this.props.columnCount}
        backgroundObject={backgroundObject}
        mergedObjects={mergedObjects}
      />
    );
  };

  render() {
    const { cell, index, columnCount } = this.props;

    return (
      <Cell key={`cell-${index}`} columnCount={columnCount}>
        {this.renderCell(cell)}
      </Cell>
    );
  }
}

export default MazeCell;
