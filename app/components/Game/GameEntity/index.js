import EventEmitter from '../EventEmitter';
import P5Class from '../P5Class';

import GameEntityImage from './GameEntityImage';
import GameEnityMovement from './GameEnityMovement';
import GameEntitySay from './GameEntitySay';

class GameEntity extends P5Class {
  className = 'GameEntity';

  constructor(parentArgs) {
    super(parentArgs);

    EventEmitter.subscibeToNextEvent(this.handleNextEventChange.bind(this));
    EventEmitter.subscibeToEventsFinish(this.handleEventsFinish.bind(this));

    this.setState({ size: parentArgs.props.size });

    this.animation = new GameEntityImage({ p5: parentArgs.p5, props: parentArgs.props });
    this.movement = new GameEnityMovement({
      p5: parentArgs.p5,
      props: {
        degree: parentArgs.props.degree,
        position: parentArgs.props.position,
        size: parentArgs.props.size,
        board: parentArgs.props.board,
        takeEntities: parentArgs.props.takeEntities,
        blockEntities: parentArgs.props.blockEntities,
        characterEntities: parentArgs.props.characterEntities,
        identifier: parentArgs.props.identifier,
        onEntityStop: this.handleEntityStop,
        onPostionChange: this.handlePositionChange,
        onIntersectWithObjects: this.handleIntersectWithObjects,
      },
      convertStateToProps({ size }) { return { size }; },
    });
    this.sayClass = new GameEntitySay({ p5: parentArgs.p5 });
    this.addChildren(this.animation, this.movement, this.sayClass);
  }

  handleEntityStop = () => {
    this.animation.setAnimate(false);
    EventEmitter.pop();
  };

  handleNextEventChange({ type, params: allParams }) {
    if (!allParams) return;
    const { identifier, ...params } = allParams;

    if (this[type] && `${this.props.identifier}`.localeCompare(`${identifier}`) === 0) {
      this[type](params);
    }
  }

  onReset() {
    this.mergedIdentifier = null;
  }

  handleEventsFinish() {
    const position = this.movement.getPosition();
    return { character: { position } };
  }

  jump = () => {
    this.movement.jump();
  }

  moveForward = ({ step }) => {
    // TODO: calculate actual steps
    this.animation.setAnimate(true);
    this.movement.setMoveStep({ step });
  }

  handlePositionChange = (position) => {
    this.animation.setPositionForSprite(position);
  };

  handleIntersectWithObjects = objects => objects.map((object) => {
    const intersection = this.props.intersections[object.identifier];

    if (!intersection) {
      return { isMovementBlocked: object.type === 'block' };
    }

    if (!intersection[this.props.identifier]) {
      return { isMovementBlocked: object.type === 'block' };
    }

    const { shouldStopMovement, action } = intersection[this.props.identifier];
    if (this.mergedIdentifier && action.type !== 'take') {
      const {
        shouldStopMovement: mergedShouldStopMovement, action: mergedAction,
      } = intersection[this.props.identifier];

      return {
        isMovementBlocked: mergedShouldStopMovement, freezeTime: mergedAction.animation.frameCount,
      };
    }

    switch (action.type) {
      case 'take':
        this.props.removeElementFromBoardByIdentifier(object.identifier);
        this.animation.setIntersectionAnimation(action.animation);
        return { isMovementBlocked: shouldStopMovement, freezeTime: action.animation.frameCount };
      case 'merge':
        this.props.removeElementFromBoardByIdentifier(object.identifier);
        this.setState({ size: object.size });
        this.mergedIdentifier = object.identifier;
        this.animation.setCurrentIdentifier(action.animation);
        return { isMovementBlocked: shouldStopMovement, freezeTime: action.animation.frameCount };
      default:
        return { isMovementBlocked: shouldStopMovement, freezeTime: action.animation.frameCount };
    }
  }).filter(f => f);

  turnLeft = () => this.turn({ degree: 270 });

  turnRight = () => this.turn({ degree: 90 });

  turn = ({ degree }) => {
    this.animation.setDegree({ degree });
    this.movement.setDegree({ degree });
    EventEmitter.pop();
  }

  say = ({ text }) => {
    const position = this.movement.getPosition();
    this.sayClass.displayCloud({ text, position, sayCloudFinish: this.sayCloudFinish });
  };

  sayCloudFinish = () => EventEmitter.pop();;
}

export default GameEntity;
