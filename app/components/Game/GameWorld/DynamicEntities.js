import P5Class from '../P5Class';

import GameEntity from '../GameEntity';

class DynamicEntities extends P5Class {
  className = 'DynamicEntities';

  constructor(parentArgs) {
    super(parentArgs);
    const {
      intersections, blockEntities, takeEntities, characterEntities,
      board, gameImages, renderSetting, removeElementFromBoardByIdentifier,
    } = this.props;
    const gameEntities = characterEntities
      ? characterEntities
        .map(entity => new GameEntity({
          p5: this.p5,
          props: {
            ...entity,
            blockEntities,
            takeEntities,
            characterEntities,
            board,
            gameImages,
            spriteCount: renderSetting.spriteCount,
            removeElementFromBoardByIdentifier,
            intersections,
          },
          convertParentPropsToProps(props) {
            const { entity: newEntity, ...otherProps } = props;
            return { ...newEntity, ...otherProps };
          },
        }))
      : [];
    this.addChildren(...gameEntities);
  }
}

export default DynamicEntities;
