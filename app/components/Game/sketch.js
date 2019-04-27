import GameWorld from './GameWorld';
import GameImages from './GameImages';

const convertIntersections = intersections => intersections
  .map(({ identifier, objects }) => {
    const convertedObjects = objects
      .map(object => ({ [object.identifier]: object }))
      .reduce((acc, nextValue) => ({ ...acc, ...nextValue }), {});
    return { [identifier]: convertedObjects };
  }).reduce((acc, nextValue) => ({ ...acc, ...nextValue }), {});

const preload = p5Classes => () => {
  p5Classes.map(p5Class => p5Class.preload());
};

const setup = (p5, p5Classes, { renderSetting }) => () => {
  p5Classes.map(p5Class => p5Class.setup());
  p5.frameRate(renderSetting.frameCount);
};

const draw = (p5, p5Classes) => () => {
  p5.clear();
  p5Classes.map(p5Class => p5Class.draw());
};

/* eslint-disable no-param-reassign */
const sketch = (p5, {
  board,
  entities,
  renderSetting,
  images,
  intersections,
}) => {
  const blockTypeEntities = entities
    .filter(entity => entity.type === 'block');
  const takeTypeEntities = entities
    .filter(entity => entity.type === 'take');
  const characterTypeEntities = entities
    .filter(entity => entity.type === 'character');
  const defaultBackgroundTypeEntities = entities
    .filter(entity => entity.type === 'defaultBackground');

  const convertedIntersections = convertIntersections(intersections);

  const gameImages = new GameImages({ p5, props: { images } });
  const gameWorld = new GameWorld({
    p5,
    props: {
      blockEntities: blockTypeEntities,
      board,
      characterEntities: characterTypeEntities,
      defaultBackgroundEntities: defaultBackgroundTypeEntities,
      gameImages,
      intersections: convertedIntersections,
      renderSetting,
      takeEntities: takeTypeEntities,
    },
  });

  p5.preload = preload([gameImages, gameWorld]);
  p5.setup = setup(p5, [gameWorld], { renderSetting });
  p5.draw = draw(p5, [gameWorld]);
};
/* eslint-enable no-param-reassign */

export default sketch;
