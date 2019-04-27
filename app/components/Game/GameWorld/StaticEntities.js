import P5Class from '../P5Class';

class StaticBackground extends P5Class {
  className = 'StaticBackground';

  preload() {
    const { takeEntities, blockEntities, gameImages } = this.props;

    const takeKeys = takeEntities
      .reduce((acc, entity) => [...acc, ...entity.images.map(({ name }) => name)], []);
    const blockKeys = blockEntities
      .reduce((acc, entity) => [...acc, ...entity.images.map(({ name }) => name)], []);
    gameImages.subscibeOnImageLoad({ onImageLoad: this.handleTakeImageLoad, keys: takeKeys });
    gameImages.subscibeOnImageLoad({ onImageLoad: this.handleBlockImageLoad, keys: blockKeys });
  }

  updateImages = ({ image: imageLoaded, name: loadedImageName }) => (entity) => {
    const { images, p5Images: entityP5Images } = entity;
    if (entityP5Images && entityP5Images.length > 0) return;

    const p5Images = images.map(({
      position: { x, y }, size: { width, height }, identifier, name,
    }) => {
      if (name !== loadedImageName) return null;
      const p5Image = imageLoaded.get(x, y, width, height);
      return { p5Image, identifier, size: { width, height } };
    }).filter(f => f);
    /* eslint-disable no-param-reassign */
    entity.p5Images = p5Images;
    entity.currentImageIdentifier = 'default';
    /* eslint-enable no-param-reassign */
  }

  handleTakeImageLoad = (...args) => this.props.takeEntities.forEach(this.updateImages(...args));

  handleBlockImageLoad = (...args) => this.props.blockEntities.forEach(this.updateImages(...args));

  drawEntity = ({
    degree, position, size, p5Images, currentImageIdentifier,
  }) => {
    if (!p5Images) return;
    const image = p5Images.find(p5Image => `${p5Image.identifier}`.localeCompare(`${currentImageIdentifier}`) === 0);
    if (!image) return;
    const convertedDegree = degree > 360 ? degree - 360 : degree;
    this.p5.push();
    this.p5.translate(position.x, position.y);
    this.p5.rotate(convertedDegree);
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(image.p5Image, 0, 0, size.width, size.height);
    this.p5.pop();
  }

  draw() {
    this.p5.angleMode(this.p5.DEGREES);
    this.props.blockEntities.forEach(this.drawEntity);
    this.props.takeEntities.forEach(this.drawEntity);
    this.p5.angleMode(this.p5.RADIANS);
  }
}

export default StaticBackground;
