import P5Class from '../P5Class';
import EventEmitter from '../EventEmitter';

import DefaultBackground from './DefaultBackground';
import StaticEntities from './StaticEntities';
import DynamicEntities from './DynamicEntities';

const DEFAULT_WORLD_SIZE = 256;

class GameWorld extends P5Class {
  className = 'GameWorld';

  constructor(parentArgs) {
    super(parentArgs);

    EventEmitter.subscibeToNextEvent(this.handleNextEventChange.bind(this));
    EventEmitter.subscibeToEventsFinish(this.handleEventsFinish.bind(this));

    const {
      blockEntities,
      board,
      characterEntities,
      defaultBackgroundEntities,
      gameImages,
      intersections,
      renderSetting,
      takeEntities,
    } = parentArgs.props;
    this.setState({
      blockEntities: [...blockEntities],
      characterEntities: [...characterEntities],
      takeEntities: [...takeEntities],
    });
    const defaultBackground = new DefaultBackground({
      p5: this.p5,
      props: {
        defaultBackgroundEntities,
        gameImages,
        entities: this.state.blockEntities,
        board,
      },
      convertStateToProps(
        { blockEntities: newBlockEntities }
      ) { return { entities: newBlockEntities }; },
    });
    const staticEntities = new StaticEntities({
      p5: this.p5,
      props: {
        blockEntities: this.state.blockEntities,
        takeEntities: this.state.takeEntities,
        gameImages,
      },
      convertStateToProps({ blockEntities: newBlockEntities, takeEntities: newTakeEntities }) {
        return { blockEntities: newBlockEntities, takeEntities: newTakeEntities };
      },
    });
    const dynamicEntities = new DynamicEntities({
      p5: this.p5,
      props: {
        blockEntities: this.state.blockEntities,
        takeEntities: this.state.takeEntities,
        characterEntities: this.state.characterEntities,
        intersections,
        board,
        gameImages,
        renderSetting,
        removeElementFromBoardByIdentifier: this.removeElementFromBoardByIdentifier,
      },
      convertStateToProps(
        {
          blockEntities: newBlockEntities,
          takeEntities: newTakeEntities,
          characterEntities: newCharacterEntities,
        }
      ) {
        return {
          blockEntities: newBlockEntities,
          takeEntities: newTakeEntities,
          characterEntities: newCharacterEntities,
        };
      },
    });

    this.addChildren(defaultBackground, staticEntities, dynamicEntities);
  }

  handleEventsFinish() {
    return { takeEntities: this.state.takeEntities };
  }

  async handleNextEventChange({ type, params: { identifier } }) {
    if (`${type}`.localeCompare('reset') !== 0 || `${identifier}`.localeCompare('worldBoard') !== 0) return;
    await this.reset();
    EventEmitter.pop();
  }

  onReset() {
    const {
      blockEntities,
      characterEntities,
      takeEntities,
    } = this.props;
    return this.setState({
      blockEntities: [...blockEntities],
      characterEntities: [...characterEntities],
      takeEntities: [...takeEntities],
    });
  }

  filterEntitiesByIdentifier = identifier => entity => `${entity.identifier}`.localeCompare(`${identifier}`) !== 0

  removeElementFromBoardByIdentifier = (identifier) => {
    const { blockEntitiesS, takeEntitiesS, characterEntitiesS } = this.state;
    const blockEntities = blockEntitiesS.filter(this.filterEntitiesByIdentifier(identifier));
    const takeEntities = takeEntitiesS.filter(this.filterEntitiesByIdentifier(identifier));
    const characterEntities = characterEntitiesS.filter(this.filterEntitiesByIdentifier(identifier));
    this.setState({ blockEntities, characterEntities, takeEntities });
  };

  setup() {
    const { width: propsWidth, height: propsHeight } = this.props.board;
    const width = propsWidth || DEFAULT_WORLD_SIZE;
    const height = propsHeight || DEFAULT_WORLD_SIZE;
    this.p5.createCanvas(width, height);
  }
}

export default GameWorld;
