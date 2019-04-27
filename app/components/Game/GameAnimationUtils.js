import Sprite from './Sprite';

const FRAME_COUNT = 3;

const isCrossBorder = (
  { position: { x, y }, size: { width, height }, board: { width: bWidth, height: bHeight } }
) => {
  const range = {
    minX: width / 2, maxX: bWidth - width / 2, minY: height / 2, maxY: bHeight - height / 2,
  };

  const isX2InRangeX1 = range.minX > x || x > range.maxX;
  const isY2InRangeY1 = range.minY > y || y > range.maxY;
  return isX2InRangeX1 || isY2InRangeY1;
};

const getProportionalSize = ({
  imageSize: { width, height }, frameCount, frameWidth,
}) => {
  const resizedWidth = width * frameWidth / (width / frameCount);
  const resizedHeight = resizedWidth / (width / height);
  return { width: resizedWidth, height: resizedHeight };
};

const isObjectsIntersect = (
  p5,
  {
    x: x1, y: y1, width: width1, height: height1,
  },
  {
    x: x2, y: y2, width: width2, height: height2,
  }
) => {
  const fromNegativeToZero = number => (number < 0 ? 0 : number);

  const range = {
    minX: fromNegativeToZero(x1 - width1 / 2),
    maxX: fromNegativeToZero(x1 + width1 / 2),
    minY: fromNegativeToZero(y1 - height1 / 2),
    maxY: fromNegativeToZero(y1 + height1 / 2),
  };
  const range2 = {
    minX: fromNegativeToZero(x2 - width2 / 2),
    maxX: fromNegativeToZero(x2 + width2 / 2),
    minY: fromNegativeToZero(y2 - height2 / 2),
    maxY: fromNegativeToZero(y2 + height2 / 2),
  };

  const isX2InRangeX1 = range.minX < x2 && x2 < range.maxX;
  const isY2InRangeY1 = range.minY < y2 && y2 < range.maxY;
  const isX2InRangeX2 = range2.minX < x1 && x1 < range2.maxX;
  const isY2InRangeY2 = range2.minY < y1 && y1 < range2.maxY;

  return (isX2InRangeX1 && isY2InRangeY1) || (isX2InRangeX2 && isY2InRangeY2);
};

const getIntersectObjects = (p5, {
  object: { size: { width: selfWidth, height: selfHeight }, position: selfPosition },
  otherObjects,
}) => otherObjects
  .map(entity => (isObjectsIntersect(
    p5,
    {
      ...selfPosition,
      width: selfWidth,
      height: selfHeight,
    },
    { ...entity, ...entity.position, ...entity.size },
  ) ? entity : null))
  .filter(f => f);

const calculateNextStepCoordinate = ({
  degree, position, p5, step,
}) => {
  const convertedDegree = degree > 360
    ? degree - 360 : degree;

  p5.angleMode(p5.DEGREES);
  const cosX = Math.round(p5.cos(convertedDegree) * 100) / 100;
  const sinX = Math.round(p5.sin(convertedDegree) * 100) / 100;
  // const dx = cosX === 6.123233995736766e-17 ? 0 : cosX;
  // const dy = sinX === 6.123233995736766e-17 ? 0 : sinX;
  p5.angleMode(p5.RADIANS);
  return { x: position.x - sinX * step, y: position.y + cosX * step };
};

const generateFrames = ({
  identifier, width, height, position,
}) => {
  const frames = Array.from(Array(FRAME_COUNT).keys())
    .map(index => ({
      name: `${identifier}-${index}`,
      position: {
        x: (index * width) + position.x,
        y: position.y,
        w: width,
        h: height,
      },
    }));

  return frames;
};

const generateAnimation = ({
  character: { degree, identifier, position: characterPosition },
  image: { size: { width, height }, position }, p5Image, p5,
}) => {
  const frames = generateFrames({
    identifier, width, height, position,
  });

  const animations = frames.map((frame) => {
    const pos = frame.position;
    const img = p5Image.get(pos.x, pos.y, pos.w, pos.h); // TODO: investigate into hack

    return img;
  });

  return new Sprite(animations, characterPosition.x, characterPosition.y, 0.3, degree || 0, p5);
};

const getCurrentFrame = ({ prevFrame, frameCount, animations }) => {
  const frameIndex = frameCount % 10 === 0
    ? frameCount / 10
    : prevFrame;
  return frameIndex >= animations.length
    ? 0 : frameIndex;
};

export {
  calculateNextStepCoordinate,
  FRAME_COUNT,
  generateAnimation,
  getCurrentFrame,
  getIntersectObjects,
  getProportionalSize,
  isCrossBorder,
  isObjectsIntersect,
};
