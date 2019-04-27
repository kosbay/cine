// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Horse Spritesheet from
// https://opengameart.org/content/2d-platformer-art-assets-from-horse-of-spring

// Animated Sprite
// https://youtu.be/3noMeuufLZY

class Sprite {
  constructor(animation, x, y, speed, degree, p5) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.w = this.animation[0].width;
    this.len = this.animation.length;
    this.speed = speed;
    this.index = 0;
    this.p5 = p5;
    this.degree = degree || 0;
  }

  setDegree = ({ degree }) => {
    this.degree = degree;
  };

  updatePosition = ({ x, y }) => {
    this.x = x;
    this.y = y;
  }

  show() {
    const index = this.p5.floor(this.index) % this.len;
    this.p5.push();
    this.p5.angleMode(this.p5.DEGREES);
    const convertedDegree = this.degree > 360
      ? this.degree - 360 : this.degree;
    this.p5.translate(this.x, this.y);
    this.p5.rotate(convertedDegree);
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.animation[index], 0, 0, this.w, this.h);
    this.p5.angleMode(this.p5.RADIANS);
    this.p5.pop();
    this.p5.translate(0, 0);
  }

  setIndex = () => {
    this.index = 0;
  }

  getIndex = () => this.index;

  animate() {
    this.index += this.speed;
  }
}

export default Sprite;
