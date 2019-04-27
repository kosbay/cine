/**
 * ! CONSTANTS NAMES SHOULD BE WITH UPPERCASE
 */

const ONE_SEC = 1000;
const DEFAULT_DELAY_TIME = 0.5 * ONE_SEC;
const SAY_DELAY_TIME = 3 * ONE_SEC;

const BLOCKS_FUNCTIONS_NAMES = {
  moveForward: 'moveForward',
  turn: 'turn',
  say: 'say',
  ask: 'ask',
  moveForwardById: 'moveForwardById',
  turnRightById: 'turnRightById',
  turnLeftById: 'turnLeftById',
  jump: 'jump',
};

const POINTS_TYPES = {
  coin: 'coin',
  pass: 'pass',
  merge: 'merge',
};

const GOAL_TYPE = {
  Destination: 'Destination',
  CoinCollection: 'CoinCollection',
};

const ASK_INPUT_PLACEHOLDER = 'Введите ответ';

const DIRECTIONS = {
  up: 0,
  down: 1,
  right: 2,
  left: 3,
};
// ordered with respect this list [ up, right, down, left ]
const DIRECTION_INDEX = [0, 2, 1, 3];
const DEFAULT_CELL_STATE = 0;
const JUMP_STEP = 2;

const MazeUtils = {
  getMatrix: ({ size: { width, height }, aldar, points }) => {
    const matrix = [];
    /* eslint-disable no-plusplus */
    for (let rowIndex = 0; rowIndex < width; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < height; columnIndex++) {
        row.push(DEFAULT_CELL_STATE);
      }
      matrix.push(row);
    }
    /* eslint-enable no-plusplus */
    matrix[aldar.position.y][aldar.position.x] = aldar;
    /* eslint-disable array-callback-return */
    points.map((point) => {
      matrix[point.position.y][point.position.x] = point;
    });
    /* eslint-disable array-callback-return */

    return matrix;
  },
  calculateNextPosition: ({ step, character }) => {
    const {
      direction,
      position: { x, y },
    } = character;
    const directionIndex = DIRECTIONS[direction];
    const isMoveforward = step > 0;
    switch (directionIndex) {
      case DIRECTIONS.up:
        return { x, y: isMoveforward ? y - step : y + Math.abs(step) };
      case DIRECTIONS.down:
        return { x, y: isMoveforward ? y + step : y + Math.abs(step) };
      case DIRECTIONS.left:
        return { x: isMoveforward ? x - step : x + Math.abs(step), y };
      case DIRECTIONS.right:
        return { x: isMoveforward ? x + step : x - Math.abs(step), y };
      default:
        return { x, y };
    }
  },
  isNextStepValid: ({
    newX, newY, size: { width, height }, matrix,
  }) => {
    if (
      newX < width
      && newY < height
      && newX >= 0
      && newY >= 0
      && matrix[newY][newX] === 0
    ) {
      return true;
    }
    if (
      typeof matrix[newY][newX] === 'object'
      && (`${matrix[newY][newX].type}`.localeCompare('pass') === 0
        || `${matrix[newY][newX].type}`.localeCompare('merge') === 0)
    ) {
      return true;
    }

    return false;
  },
  isNextStepDestinationPoint: (
    { x: newX, y: newY },
    { x: destinationX, y: destinationY }
  ) => newX === destinationX && newY === destinationY,
  isPlayerWin: ({
    newX, newY, goal, coinCount,
  }) => {
    switch (goal.type) {
      case 'Destination':
        return MazeUtils.isNextStepDestinationPoint(
          { x: newX, y: newY },
          goal.destination
        );
      case 'CoinCollection':
        return coinCount === goal.coinNumber;
      default:
        return false;
    }
  },
  isPlayerGetCoin: ({ nextCharacterPosition: { x, y }, coins }) => {
    /* eslint-disable no-plusplus */
    for (let index = 0; index < coins.length; index++) {
      if (coins[index].position.x === x && coins[index].position.y === y) {
        return coins[index];
      }
    }
    /* eslint-enable no-plusplus */
    return false;
  },
  isDirectionValid: direction => direction === DIRECTIONS.up
    || direction === DIRECTIONS.down
    || direction === DIRECTIONS.left
    || direction === DIRECTIONS.right,
  getWalkIndex: (currentIndex, maxIndex) => (currentIndex > maxIndex ? 0 : currentIndex + 1),
  calculateDirection: (cD, nD) => {
    const currentDirection = DIRECTIONS[cD];
    const newDirection = DIRECTIONS[nD];
    const currentDirectionIndex = DIRECTION_INDEX.map(
      (direction, index) => (direction === currentDirection ? index : null)
    ).filter(i => i || i === 0)[0];
    let newDirectionIndex = 0;
    if (newDirection === DIRECTIONS.left) {
      newDirectionIndex = currentDirectionIndex - 1;
    }

    if (newDirection === DIRECTIONS.right) {
      newDirectionIndex = currentDirectionIndex + 1;
    }

    if (newDirection === DIRECTIONS.up) {
      newDirectionIndex = 0;
    }

    if (newDirection === DIRECTIONS.down) {
      newDirectionIndex = 2;
    }

    if (newDirectionIndex < 0) {
      newDirectionIndex = DIRECTION_INDEX.length - 1;
    }

    if (newDirectionIndex >= DIRECTION_INDEX.length) {
      newDirectionIndex = 0;
    }
    const newDirectionKey = Object.keys(DIRECTIONS)
      .map(
        key => (DIRECTIONS[key] === DIRECTION_INDEX[newDirectionIndex] ? key : null)
      )
      .filter(d => d)[0];

    return newDirectionKey;
  },
  getPointByIdentifier: ({ identifier, points }) => points.find(point => point.identifier === identifier),
};

const asynTimeout = time => new Promise(resolve => setTimeout(() => resolve(), time || DEFAULT_DELAY_TIME));

export {
  DIRECTIONS,
  DEFAULT_CELL_STATE,
  DEFAULT_DELAY_TIME,
  SAY_DELAY_TIME,
  BLOCKS_FUNCTIONS_NAMES,
  POINTS_TYPES,
  GOAL_TYPE,
  ASK_INPUT_PLACEHOLDER,
  JUMP_STEP,
  asynTimeout,
};

export default MazeUtils;
