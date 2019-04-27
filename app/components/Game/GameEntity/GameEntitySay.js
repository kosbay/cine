import P5Class from '../P5Class';

class GameEntitySay extends P5Class {
  div = null;

  displayCloud = ({ text, position, sayCloudFinish }) => {
    const newPosition = { x: position.x + 10, y: position.y - 100 };
    const div = this.p5.createDiv(text).addClass('sayCloud').position(newPosition.x, newPosition.y);
    setTimeout(() => {
      div.remove();
      sayCloudFinish();
    }, 3000);
  }
}

export default GameEntitySay;
