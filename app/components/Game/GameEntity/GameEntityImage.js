import P5Class from '../P5Class';

import { generateAnimation } from '../GameAnimationUtils';

class GameEntityImage extends P5Class {
  className = 'GameEntityImage';

  degree = 0;

  shouldAnimate = false;

  p5Images = [];

  currentImageIdentifier = 'default';

  intersectionAnimationFrameCount = 0;

  defaultImage = 'default';

  preload() {
    this.degree = this.props.degree;
    const keys = this.props.images.map(({ name }) => name);
    this.props.gameImages.subscibeOnImageLoad({ onImageLoad: this.handleImageLoad, keys });
  }

  handleImageLoad = ({ image: imageLoaded, name: loadedImageName }) => {
    const {
      props: { images, degree, position },
      p5,
    } = this;
    this.p5Images = images.map(({
      position: { x, y }, size: { width, height }, identifier, name,
    }, index) => {
      if (`${name}`.localeCompare(`${loadedImageName}`) !== 0) return this.p5Images[index];
      const p5Image = imageLoaded.get(x, y, width, height);
      const animation = generateAnimation({
        character: { degree, identifier, position },
        image: { position: { x, y }, size: { width, height } },
        p5Image: imageLoaded,
        p5,
      });
      return {
        p5Image, identifier, size: { width, height }, animation,
      };
    });
  }

  onReset() {
    this.currentImageIdentifier = 'default';
    this.defaultImage = 'default';
  }

  setPositionForSprite = position => this.p5Images
    .map(p5Image => p5Image.animation && p5Image.animation.updatePosition(position));

  setIntersectionAnimation = ({ frameCount, spriteKey }) => {
    if (!spriteKey) return;
    this.shouldAnimate = true;
    this.intersectionAnimationFrameCount = frameCount;
    this.currentImageIdentifier = spriteKey;
  };

  setDegree = ({ degree }) => {
    this.degree += degree;
    this.p5Images
      .map(p5Image => p5Image.animation && p5Image.animation.setDegree({ degree: this.degree }));
  }

  setAnimate = (shouldAnimate) => {
    this.shouldAnimate = shouldAnimate;
  }

  setCurrentIdentifier = ({ spriteKey }) => {
    if (!spriteKey) return;
    this.currentImageIdentifier = spriteKey;
    this.defaultImage = spriteKey;
  };

  draw() {
    if (this.intersectionAnimationFrameCount !== 0) {
      this.intersectionAnimationFrameCount -= 1;
    }

    this.p5Images.forEach((p5Image) => {
      if (!p5Image.animation) return;
      if (`${p5Image.identifier}`.localeCompare(`${this.currentImageIdentifier}`) !== 0) return;

      p5Image.animation.show();
      if (!this.shouldAnimate) {
        if (p5Image.animation.getIndex() !== 0) {
          p5Image.animation.setIndex(0);
        }
        return;
      }
      p5Image.animation.animate();
    });

    if (this.intersectionAnimationFrameCount === 0
      && `${this.currentImageIdentifier}`.localeCompare(this.defaultImage) !== 0) {
      this.currentImageIdentifier = this.defaultImage;
    }
  }
}

export default GameEntityImage;
