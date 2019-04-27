import React from "react";
import PropTypes from "prop-types";

import { Row } from "./MazeContent";
import MazeCell from "./MazeCell";

/* eslint-disable react/no-array-index-key */
const MazeRow = ({ row, index, rowCount, spriteSize }) => (
  <Row key={`row-${index}`} rowCount={rowCount}>
    {row.map((cell, cellIndex) => (
      <React.Fragment key={`cell-Fragment-${index}-${cellIndex}`}>
        <MazeCell
          cell={cell}
          index={cellIndex}
          columnCount={row.length}
          spriteSize={spriteSize}
        />
      </React.Fragment>
    ))}
  </Row>
);
/* eslint-enable react/no-array-index-key */

MazeRow.propTypes = {
  index: PropTypes.number.isRequired,
  row: PropTypes.arrayOf(
    PropTypes.oneOf([PropTypes.shape({}), PropTypes.string])
  ).isRequired,
  spriteSize: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default MazeRow;
