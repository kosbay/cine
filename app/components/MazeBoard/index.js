import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from 'antd';

import MazeRow from './MazeRow';
import { Background, MazeContentWrapper } from './MazeContent';
import MazeUtils, {
  DEFAULT_CELL_STATE,
  SAY_DELAY_TIME,
  BLOCKS_FUNCTIONS_NAMES,
  POINTS_TYPES,
  GOAL_TYPE,
  JUMP_STEP,
  ASK_INPUT_PLACEHOLDER,
  asynTimeout,
} from '../../utils/MazeUtils';

/**
 * ! DO NOT ADD A HARDCODED STRING OR INTEGER VALUES IN THE COMPONENT, ONLY VIA MazeUtils file
 * * State config
 */
const additionalInitialState = {
  isWaitForAnswer: false,
};

const additionalInitialStateToAldar = {
  walkIndex: 0,
  isTalking: false,
  talkingMessage: '',
};

const getStateFromProps = props => ({
  ...additionalInitialState,
  board: props.board,
  matrix: MazeUtils.getMatrix({
    size: {
      width: props.board.width,
      height: props.board.height,
    },
    aldar: props.aldar,
    points: props.points,
    goal: props.goal,
  }),
  aldar: { ...props.aldar, ...additionalInitialStateToAldar },
  points: [...props.points],
  goal: { ...props.goal },
  coinCount: 0,
});

const InputField = styled.div`
  display: flex;
  flex-direction: column;
`;

const WarningMessage = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

class MazeBoard extends React.Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    isRunButtonClick: PropTypes.bool.isRequired,
    getReference: PropTypes.func.isRequired,
    board: PropTypes.shape({}).isRequired,
    aldar: PropTypes.shape({}).isRequired,
    objectBlocks: PropTypes.arrayOf(PropTypes.shape({})),
    points: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    goal: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
    onPlayerWin: PropTypes.func.isRequired,
  };

  static defaultProps = {
    objectBlocks: [],
  };
  /* eslint-enable react/no-unused-prop-types */

  state = getStateFromProps(this.props);

  componentDidMount() {
    /** * export public functions for parent component * */
    this.props.getReference([
      { name: BLOCKS_FUNCTIONS_NAMES.moveForward, func: this.moveForward },
      { name: BLOCKS_FUNCTIONS_NAMES.turn, func: this.turn },
      { name: BLOCKS_FUNCTIONS_NAMES.say, func: this.say },
      { name: BLOCKS_FUNCTIONS_NAMES.ask, func: this.ask },
      {
        name: BLOCKS_FUNCTIONS_NAMES.moveForwardById,
        func: this.moveForwardById,
      },
      {
        name: BLOCKS_FUNCTIONS_NAMES.turnRightById,
        func: this.turnRightById,
      },
      {
        name: BLOCKS_FUNCTIONS_NAMES.turnLeftById,
        func: this.turnLeftById,
      },
      {
        name: BLOCKS_FUNCTIONS_NAMES.jump,
        func: this.jump,
      },
      // TODO: remove ById after refactor
      {
        name: `${BLOCKS_FUNCTIONS_NAMES.jump}ById`,
        func: this.jump,
      },
    ]);
  }

  componentWillReceiveProps(nextProps) {
    const { isRunButtonClick } = nextProps;
    const { isRunButtonClick: prevIsRunButtonClick } = this.props;
    if (isRunButtonClick !== prevIsRunButtonClick && isRunButtonClick) {
      this.setState(getStateFromProps(nextProps));
    }
  }

  /* eslint-disable no-return-assign */
  getAskInputRef = node => (this.askInputRef = node);
  /* eslint-enable no-return-assign */

  getWalkIndex = () => (this.state.aldar.walkIndex >= 2 ? 0 : this.state.aldar.walkIndex + 1);

  askInputRef = null;

  changeState = newState => new Promise((res) => {
    this.setState(newState, res);
  });

  /* MATRIX EXPORTED FUNCTIONS TO PARENT */
  /**
   * * moveForward move only main character ( Aldar )
   * @param step - get a number
   * if step is positive Aldar would move forward
   * else backward
   */
  moveForward = async (step) => {
    /* eslint-disable no-plusplus */
    await this.cleanAldarMessage();
    let currentPosition = { ...this.state.aldar.position };

    if (step > 0) {
      // move forward
      for (let i = 0; i < step; i++) {
        const nextPosition = MazeUtils.calculateNextPosition({
          step: 1,
          character: {
            direction: this.state.aldar.direction,
            position: currentPosition,
          },
        });
        /* eslint-disable no-await-in-loop */
        const isUpdated = await this.updatePersonPositon(
          nextPosition,
          currentPosition
        );
        if (!isUpdated) break;
        /* eslint-enable no-await-in-loop */
        currentPosition = { ...nextPosition };
      }
    } else {
      // move backward
      for (let i = 0; i > step; i--) {
        const nextPosition = MazeUtils.calculateNextPosition({
          step: -1,
          character: {
            direction: this.state.aldar.direction,
            position: currentPosition,
          },
        });

        /* eslint-disable no-await-in-loop */
        const isUpdated = await this.updatePersonPositon(
          nextPosition,
          currentPosition
        );
        if (!isUpdated) break;
        /* eslint-enable no-await-in-loop */
        currentPosition = { ...nextPosition };
      }
    }

    /* eslint-enable no-plusplus */
  };

  /**
   * * jump over one cell
   * @param identifier (optional) - identifier object on the board, if null it is Aldar
   */
  jump = async (identifier) => {
    // TODO: split function
    const isMergedObjectBlock = this.state.aldar.mergedObject
      && Boolean(identifier)
      && this.state.aldar.mergedObject.identifier === identifier;

    const character = identifier && !isMergedObjectBlock
      ? MazeUtils.getPointByIdentifier({
        identifier,
        points: this.state.points,
      })
      : this.state.aldar;
    const newPosition = MazeUtils.calculateNextPosition({
      step: JUMP_STEP,
      character,
    });

    if (!character) return null;

    const { position: oldPosition } = character;

    if (isMergedObjectBlock || !identifier) {
      return this.updatePersonPositon(newPosition, oldPosition);
    }

    return this.updateCharacterPositonById(newPosition, oldPosition, character);
  };

  moveForwardById = async (identifier, step) => {
    /* eslint-disable no-plusplus */
    await this.cleanAldarMessage();
    if (
      this.state.aldar.mergedObject
      && this.state.aldar.mergedObject.identifier === identifier
    ) {
      return this.moveForward(step);
    }
    const character = this.state.points.find(
      point => point.identifier === identifier
    );
    let currentPosition = { ...character.position };

    if (step > 0) {
      // move forward
      for (let i = 0; i < step; i++) {
        const nextPosition = MazeUtils.calculateNextPosition({
          step: 1,
          character: {
            direction: character.direction,
            position: currentPosition,
          },
        });
        /* eslint-disable no-await-in-loop */
        const isUpdated = await this.updateCharacterPositonById(
          nextPosition,
          currentPosition,
          character
        );
        if (!isUpdated) break;
        /* eslint-enable no-await-in-loop */
        currentPosition = { ...nextPosition };
      }
    } else {
      // move backward
      for (let i = 0; i > step; i--) {
        const nextPosition = MazeUtils.calculateNextPosition({
          step: -1,
          character: {
            direction: character.direction,
            position: currentPosition,
          },
        });

        /* eslint-disable no-await-in-loop */
        const isUpdated = await this.updateCharacterPositonById(
          nextPosition,
          currentPosition,
          character
        );
        if (!isUpdated) break;
        /* eslint-enable no-await-in-loop */
        currentPosition = { ...nextPosition };
      }
    }

    /* eslint-enable no-plusplus */
  };

  turn = async (direction) => {
    await this.cleanAldarMessage();
    const currentDirection = this.state.aldar.direction;
    const newDirection = MazeUtils.calculateDirection(
      currentDirection,
      direction
    );

    const newAldar = Object.assign(
      {},
      { ...this.state.aldar, direction: `${newDirection}` },
      this.state.aldar.mergedObject && {
        mergedObject: {
          ...this.state.aldar.mergedObject,
          direction: newDirection,
        },
      }
    );

    const newMatrix = this.updateWithNewCharacter(newAldar);
    return this.changeState({ aldar: newAldar, matrix: newMatrix });
  };

  turnRightById = async (identifier) => {
    const direction = 'right';
    if (this.state.aldar.mergedObject) {
      return this.turn(direction);
    }
    await this.cleanAldarMessage();
    let character = this.state.points.find(
      point => point.identifier === identifier
    );
    const currentDirection = character.direction;
    const newDirection = MazeUtils.calculateDirection(
      currentDirection,
      direction
    );

    character = { ...character, direction: `${newDirection}` };

    const index = this.state.points.findIndex(
      ({ identifier: pointIdentifier }) => pointIdentifier === character.identifier
    );

    const newMatrix = this.updateWithNewCharacter(character);
    const newPoints = [...this.state.points];
    newPoints[index] = character;
    const aldarUpdates = this.state.aldar.mergedObject
      && this.state.aldar.mergedObject.identifier === identifier
      ? this.turn(direction)
      : new Promise(res => res());

    const characterUpdate = this.changeState(
      Object.assign({
        points: newPoints,
      }),
      !this.state.aldar.mergedObject && { matrix: newMatrix }
    );

    return Promise.all([characterUpdate, aldarUpdates]);
  };

  turnLeftById = async (identifier) => {
    try {
      const direction = 'left';
      if (this.state.aldar.mergedObject) {
        return this.turn(direction);
      }
      await this.cleanAldarMessage();
      let character = this.state.points.find(
        point => point.identifier === identifier
      );

      const currentDirection = character.direction;
      const newDirection = MazeUtils.calculateDirection(
        currentDirection,
        direction
      );

      character = { ...character, direction: `${newDirection}` };

      const index = this.state.points.findIndex(
        ({ identifier: pointIdentifier }) => pointIdentifier === character.identifier
      );

      const newMatrix = this.updateWithNewCharacter(character);
      const newPoints = [...this.state.points];
      newPoints[index] = character;

      const aldarUpdates = this.state.aldar.mergedObject
        && this.state.aldar.mergedObject.identifier === identifier
        ? this.turn(direction)
        : new Promise(res => res());

      const characterUpdate = this.changeState(
        Object.assign({
          points: newPoints,
        }),
        !this.state.aldar.mergedObject && { matrix: newMatrix }
      );

      return Promise.all([characterUpdate, aldarUpdates]);
    } catch (err) {
      console.warn(err);
    }
  };

  say = async (message) => {
    const aldarWithTalkMessage = {
      ...this.state.aldar,
      isTalking: true,
      talkingMessage: message,
    };
    const newMatrixWithTalkMessage = this.updateWithNewCharacter(
      aldarWithTalkMessage
    );
    await this.changeState({
      aldar: aldarWithTalkMessage,
      matrix: newMatrixWithTalkMessage,
    });

    await asynTimeout(SAY_DELAY_TIME);
  };

  ask = async () => {
    await this.changeState({
      isWaitForAnswer: true,
    });

    const answer = await new Promise((res) => {
      this.askInputRef.input.onkeypress = ({ target, key }) => {
        if (`${key}`.localeCompare('Enter') !== 0) return null;
        res(target.value);
        return null;
      };
    });

    await this.changeState({
      isWaitForAnswer: false,
    });

    return answer;
  };

  /* MATRIX UPDATE FUNCTIONS START */
  updateCharacterPositonById = async (
    { x: newX, y: newY },
    currentPosition,
    character
  ) => {
    if (
      this.state.aldar.mergedObject
      && this.state.aldar.mergedObject.identifier === character.identifier
    ) {
      return this.updatePersonPositon({ x: newX, y: newY }, currentPosition);
    }
    const { x: oldX, y: oldY } = currentPosition;
    const isNextStepValidForMatrix = MazeUtils.isNextStepValid({
      newX,
      newY,
      size: this.state.board,
      matrix: this.state.matrix,
      points: this.state.points,
    });
    const characterFunctions = this.props.objectBlocks.find(
      ({ identifier: objectIdentifier }) => objectIdentifier === character.identifier
    );

    const isNextStepDestinationPoint = this.props.goal.type === GOAL_TYPE.Destination
      && MazeUtils.isNextStepDestinationPoint(
        { x: newX, y: newY },
        this.state.goal.destination
      );

    const isNextStepCoin = this.props.goal.type === GOAL_TYPE.CoinCollection
      && this.isPlayerGetCoin({ newX, newY });

    const characterCanPassTypes = newX < this.state.board.width
      && newY < this.state.board.height
      && typeof this.state.matrix[newY][newX] === 'object'
      && characterFunctions.canPassObjectsByTypes
      && characterFunctions.canPassObjectsByTypes.map(
        type => type === this.state.matrix[newY][newX]
      );

    const characterCanPassIdentifiers = newX < this.state.board.width
      && newY < this.state.board.height
      && typeof this.state.matrix[newY][newX] === 'object'
      && characterFunctions.canPassObjectsByIdentifiers
      && characterFunctions.canPassObjectsByIdentifiers.map(
        identifier => identifier === this.state.matrix[newY][newX]
      );

    if (
      !isNextStepValidForMatrix
      && (!isNextStepDestinationPoint
        && !isNextStepCoin
        && (!characterCanPassTypes || !characterCanPassTypes.length)
        && (!characterCanPassIdentifiers || !characterCanPassIdentifiers.length))
    ) { return null; }

    const newMatrix = [...this.state.matrix];

    newMatrix[oldY][oldX] = newMatrix[oldY][oldX].backgroundObject
      ? { ...newMatrix[oldY][oldX].backgroundObject }
      : DEFAULT_CELL_STATE;

    const newPoint = Object.assign(
      {
        ...character,
        position: {
          x: newX,
          y: newY,
        },
        walkIndex: this.getWalkIndex(),
      },
      typeof newMatrix[newY][newX] === 'object'
        ? {
          backgroundObject: {
            ...newMatrix[newY][newX],
          },
        }
        : {
          backgroundObject: null,
        }
    );

    newMatrix[newY][newX] = newPoint;

    const index = this.state.points.findIndex(
      ({ identifier: pointIdentifier }) => pointIdentifier === newPoint.identifier
    );

    const newPoints = [...this.state.points];
    newPoints[index] = newPoint;

    const stateUpdatePromise = this.changeState({
      matrix: newMatrix,
      points: newPoints,
    });

    return Promise.all([stateUpdatePromise, asynTimeout()]);
  };

  updatePersonPositon = async ({ x: newX, y: newY }, currentPosition) => {
    const { x: oldX, y: oldY } = currentPosition;

    const isNextStepValidForMatrix = MazeUtils.isNextStepValid({
      newX,
      newY,
      size: this.state.board,
      matrix: this.state.matrix,
      points: this.state.points,
    });
    // validation
    const isNextStepDestinationPoint = this.props.goal.type === GOAL_TYPE.Destination
      && MazeUtils.isNextStepDestinationPoint(
        { x: newX, y: newY },
        this.state.goal.destination
      );
    const isNextStepCoin = this.props.goal.type === GOAL_TYPE.CoinCollection
      && this.isPlayerGetCoin({ newX, newY });

    const characterIdentifier = this.state.aldar.mergedObject && this.state.aldar.mergedObject.identifier;

    const characterFunctions = characterIdentifier
      && this.props.objectBlocks.find(
        ({ identifier: objectIdentifier }) => objectIdentifier === characterIdentifier
      );

    const isCharacterCanPassThisTypeObject = newX < this.state.board.width
      && newY < this.state.board.height
      && typeof this.state.matrix[newY][newX] === 'object'
      && characterFunctions
      && characterFunctions.canPassObjectsByTypes
      && characterFunctions.canPassObjectsByTypes
        .map(type => type === this.state.matrix[newY][newX].type)
        .find(s => s);

    const isCharacterCanPassThisObjectIdentifier = newX < this.state.board.width
      && newY < this.state.board.height
      && typeof this.state.matrix[newY][newX] === 'object'
      && characterFunctions
      && characterFunctions.canPassObjectsByIdentifiers
      && characterFunctions.canPassObjectsByIdentifiers
        .map(
          identifier => identifier === this.state.matrix[newY][newX].identifier
        )
        .find(s => s);

    if (
      !isNextStepValidForMatrix
      && !isNextStepDestinationPoint
      && !isNextStepCoin
      && !(
        isCharacterCanPassThisTypeObject
        || isCharacterCanPassThisObjectIdentifier
      )
    ) { return null; }

    const newMatrix = [...this.state.matrix];

    newMatrix[oldY][oldX] = this.state.aldar.backgroundObject
      ? { ...this.state.aldar.backgroundObject }
      : DEFAULT_CELL_STATE;

    const newAldar = Object.assign(
      {
        ...this.state.aldar,
        position: {
          x: newX,
          y: newY,
        },
        walkIndex: this.getWalkIndex(),
      },
      typeof newMatrix[newY][newX] === 'object'
      && newMatrix[newY][newX].type === POINTS_TYPES.pass
        ? {
          backgroundObject: {
            ...newMatrix[newY][newX],
          },
        }
        : {
          backgroundObject: null,
        },
      typeof newMatrix[newY][newX] === 'object'
        && newMatrix[newY][newX].type === POINTS_TYPES.merge && {
        mergedObject: {
          ...newMatrix[newY][newX],
          direction: this.state.aldar.direction,
          position: {
            x: newX,
            y: newY,
          },
        },
      },
      this.state.aldar.mergedObject && {
        mergedObject: {
          ...this.state.aldar.mergedObject,
          direction: this.state.aldar.direction,
          position: {
            x: newX,
            y: newY,
          },
        },
      },
      isCharacterCanPassThisObjectIdentifier && {
        backgroundObject: { ...this.state.matrix[newY][newX] },
      },
      isCharacterCanPassThisTypeObject && {
        backgroundObject: { ...this.state.matrix[newY][newX] },
      }
    );

    let newPoints = null;

    if (
      typeof newMatrix[newY][newX] === 'object'
      && newMatrix[newY][newX].type === POINTS_TYPES.merge
    ) {
      // update character on matrix
      const index = this.state.points.findIndex(
        ({ identifier: pointIdentifier }) => pointIdentifier === newMatrix[newY][newX].identifier
      );

      const newCharacter = {
        ...newMatrix[newY][newX],
        direction: this.state.aldar.direction,
        position: {
          x: newX,
          y: newY,
        },
      };

      newPoints = [...this.state.points];
      newPoints[index] = newCharacter;
    }

    if (this.state.aldar.mergedObject) {
      // update character on matrix
      const index = this.state.points.findIndex(
        ({ identifier: pointIdentifier }) => pointIdentifier === this.state.aldar.mergedObject.identifier
      );

      const newCharacter = {
        ...this.state.aldar.mergedObject,
        direction: this.state.aldar.direction,
        position: {
          x: newX,
          y: newY,
        },
      };

      newPoints = [...this.state.points];
      newPoints[index] = newCharacter;
    }

    newMatrix[newY][newX] = newAldar;

    const stateUpdatePromise = this.changeState(
      Object.assign(
        {},
        {
          matrix: newMatrix,
          aldar: newAldar,
        },
        newPoints && { points: newPoints }
      )
    );

    return Promise.all([stateUpdatePromise, asynTimeout()]);
  };

  updateWithNewCharacter = (newCharacter) => {
    const newMatrix = [...this.state.matrix];
    const {
      position: { x, y },
    } = newCharacter;
    newMatrix[y][x] = { ...newCharacter };
    return newMatrix;
  };

  cleanAldarMessage = () => this.changeState({
    aldar: {
      ...this.state.aldar,
      isTalking: false,
      talkingMessage: '',
    },
  });
  /* MATRIX UPDATE FUNCTIONS END */

  checkPlayerState = () => new Promise((res) => {
    if (!this.state.aldar) return res();
    if (
      MazeUtils.isPlayerWin({
        newX: this.state.aldar.position.x,
        newY: this.state.aldar.position.y,
        goal: this.state.goal,
        coinCount: this.state.coinCount,
      })
    ) {
      this.props.onPlayerWin();
      return res();
    }
    return res();
  });

  isPlayerGetCoin = ({ newX, newY }) => {
    const coin = MazeUtils.isPlayerGetCoin({
      nextCharacterPosition: { x: newX, y: newY },
      coins: this.state.points.filter(({ type }) => type === POINTS_TYPES.coin),
    });

    if (!coin) return false;

    return this.changeState({
      points: this.state.points.filter(
        ({ position: { x, y } }) => !(x === coin.position.x && y === coin.position.y)
      ),
      coinCount: this.state.coinCount + 1,
    });
  };

  /* MATRIX RENDER FUNCTIONS START */
  /* eslint-disable react/no-array-index-key */
  renderBoard = matrix => matrix.map((row, index) => (
    <React.Fragment key={`row-Fragment-${index}`}>
      <MazeRow
        rowCount={matrix.length}
        row={row}
        index={index}
        spriteSize={this.state.aldar.spriteSize}
      />
    </React.Fragment>
  ));
  /* eslint-enable react/no-array-index-key */

  render() {
    this.checkPlayerState();
    const { backgroundImage, width, height } = this.state.board;
    const { spriteSize } = this.state.aldar;

    return (
      <Background
        rowCount={height}
        spriteSize={spriteSize}
        columnCount={width}
        background={backgroundImage}
      >
        <MazeContentWrapper>
          {this.renderBoard(this.state.matrix)}
          {this.state.isWaitForAnswer && (
            <InputField>
              <Input
                style={{
                  marginTop: '21px', width: '50%', height: '40px', marginLeft: '10px',
                }}
                autoFocus
                placeholder={ASK_INPUT_PLACEHOLDER}
                ref={this.getAskInputRef}
              />
              <WarningMessage>После ввода нажмите Enter</WarningMessage>
            </InputField>
          )}
        </MazeContentWrapper>
      </Background>
    );
  }
  /* MATRIX RENDER FUNCTIONS END */
}

export default MazeBoard;
