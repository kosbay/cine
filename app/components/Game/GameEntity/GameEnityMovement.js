import P5Class from '../P5Class';
import {
  calculateNextStepCoordinate,
  getIntersectObjects,
  isCrossBorder,
} from '../GameAnimationUtils';

class GameEntityMovement extends P5Class {
  className = 'GameEntityMovement';

  moveStep = 0;

  freezeTime = 0;

  speed = 5;

  degree = 0;

  preload() {
    this.degree = this.props.degree;
    this.degree = this.props.degree || 0;
    this.position = this.props.position || { x: 0, y: 0 };
  }

  onReset() {
    this.moveStep = 0;
    this.freezeTime = 0;
    this.speed = 5;
    this.degree = this.props.degree || 0;
    this.position = this.props.position || { x: 0, y: 0 };
  }

  updateMoveStep = () => {
    this.moveStep = this.moveStep < 0 ? this.moveStep + this.speed : this.moveStep - this.speed;
  };

  jump = () => {
    this.updatePosition();
    this.updatePosition();
    this.updatePosition();
  };

  updatePosition = () => {
    const currentPosition = this.position || this.props.position || { x: 0, y: 0 };

    const newPosition = calculateNextStepCoordinate({
      p5: this.p5,
      degree: this.degree,
      position: currentPosition,
      step: this.moveStep > 0
        ? this.speed : -this.speed,
    });

    const isCrossBoard = isCrossBorder({ position: newPosition, size: this.props.size, board: this.props.board });
    if (isCrossBoard) {
      this.moveStep = 0;
      return;
    }

    const intersectObjects = getIntersectObjects(this.p5, {
      object: { ...this.props, position: newPosition },
      otherObjects: [
        ...this.props.blockEntities,
        ...this.props.takeEntities,
        ...this.props.characterEntities.filter(e => `${e.identifier}`.localeCompare(this.props.identifier) !== 0),
      ],
    });
    if (intersectObjects.length !== 0) {
      const { freezeTime, isMovementBlocked } = this.props.onIntersectWithObjects(intersectObjects)
        .reduce((acc, { isMovementBlocked: iBlockMovement, freezeTime: freezeT }) => ({
          isMovementBlocked: acc.isMovementBlocked || iBlockMovement,
          freezeTime: (freezeT || 0) + acc.freezeTime,
        }), { isMovementBlocked: false, freezeTime: 0 });

      this.freezeTime = freezeTime;
      if (isMovementBlocked) {
        this.moveStep = 5;
        this.props.onEntityStop();
        return;
      }
    }

    this.position = newPosition;

    this.props.onPostionChange(this.position);
  };

  setDegree = ({ degree }) => { this.degree += degree; }

  setMoveStep = ({ step }) => { this.moveStep = step * this.speed; }

  getPosition = () => this.position || this.props.position || { x: 0, y: 0 };

  draw = () => {
    if (this.freezeTime > 0) {
      this.freezeTime -= 1;
      return;
    }
    if (this.moveStep === 0) return;

    if (this.moveStep === this.speed || this.moveStep === -this.speed) {
      // character stop
      this.props.onEntityStop();
    }

    this.updatePosition();
    this.updateMoveStep();
  };
}

export default GameEntityMovement;
