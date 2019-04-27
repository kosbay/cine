import P5Class from '../P5Class';

import { getIntersectObjects } from '../GameAnimationUtils';

const DEFAULT_WORLD_SIZE = 256;

class DefaultBackground extends P5Class {
  className = 'DefaultBackground';

  defaultPositionMatrix = [];

  defaultBackground = {};

  preload() {
    const { defaultBackgroundEntities, gameImages } = this.props;
    const keys = defaultBackgroundEntities[0].images.map(image => image.name);

    this.regenerateDefaultPositionMatrix();
    gameImages.subscibeOnImageLoad({ onImageLoad: this.handleImageLoad, keys });
  }

  handleImageLoad = ({ image: imageLoaded }) => {
    const { defaultBackgroundEntities } = this.props;
    const defaultImage = defaultBackgroundEntities[0].images.find(image => image.identifier === 'default');
    const p5Image = imageLoaded
      .get(
        defaultImage.position.x, defaultImage.position.y,
        defaultImage.size.width, defaultImage.size.height
      );

    this.defaultBackground = { size: defaultImage.size, p5Image };
  };

  regenerateDefaultPositionMatrix = () => {
    const {
      defaultBackgroundEntities: [{ images, size }],
      entities,
      board: { width: propsWidth, height: propsHeight },
    } = this.props;

    const width = propsWidth || DEFAULT_WORLD_SIZE;
    const height = propsHeight || DEFAULT_WORLD_SIZE;

    this.defaultPositionMatrix = [];

    const defaultImage = images.find(image => image.identifier === 'default');
    const entitySize = { width: size.width, height: size.height };

    for (let yIndex = 0; yIndex < height; yIndex += defaultImage.size.height) {
      this.defaultPositionMatrix[yIndex] = [];
      for (let xIndex = 0; xIndex < width; xIndex += defaultImage.size.width) {
        const isIntersect = Boolean(getIntersectObjects(this.p5, {
          object: { position: { x: xIndex, y: yIndex }, size: entitySize },
          otherObjects: entities,
        }).length);
        this.defaultPositionMatrix[yIndex][xIndex] = !isIntersect;
      }
    }
  };

  draw() {
    if (this.defaultBackground) {
      const { size: { width, height }, p5Image } = this.defaultBackground;
      this.defaultPositionMatrix.forEach((row, yIndex) => row.forEach((column, xIndex) => {
        if (!column) return;
        this.p5.push();
        this.p5.translate(xIndex, yIndex);
        this.p5.imageMode(this.p5.CENTER);
        this.p5.image(p5Image, 0, 0, width, height);
        this.p5.pop();
      }));
    }
  }
}

export default DefaultBackground;
