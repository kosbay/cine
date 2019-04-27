
import P5Class from './P5Class';

class GameImages extends P5Class {
  images = {};

  listeners = [];

  preload() {
    const { images } = this.props;
    (images || []).forEach(
      image => this.p5.loadImage(image.url, loadedImage => this.handleImageLoad(loadedImage, image))
    );
  }

  handleImageLoad = (image, { name }) => {
    this.images[name] = image;
    this.listeners.map(({ onImageLoad, keys }) => keys.includes(name)
        && onImageLoad({ name, image }));
  };

  subscibeOnImageLoad = (listener) => {
    this.listeners.push(listener);

    return () => this.listeners.filter(l => l !== listener);
  };

  getImage = (key) => {
    if (!key) return undefined;
    return this.images[key];
  };
}

export default GameImages;
