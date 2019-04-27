
import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { Spin } from 'antd';
import Images from '../../theme/Images';
import {
  BlocklyGameButton,
  BlocklyGameButtonText,
  BlocklyPlaygroundWrapper,
  Container,
  MazeWrapper,
} from './BlocklyGameCommon';
import BlocklyTaskDescription from './BlocklyTaskDescription';

const Game = dynamic(
  import('../Game'),
  { ssr: false, loading: () => <Spin /> }
);

const BlocklyPlayground = dynamic(
  import('../BlocklyPlayground'),
  { ssr: false, loading: () => <Spin /> }
);


class BlocklyGame extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    board: PropTypes.shape({}).isRequired,
    blocklyGameImages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    blocklyGameIntersections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    blocklyGameObjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onEventsComplete: PropTypes.func.isRequired,
    onCodeExecutionComplete: PropTypes.func.isRequired,
    toolboxXML: PropTypes.string.isRequired,
    workspaceXML: PropTypes.string.isRequired,
    customBlocks: PropTypes.arrayOf(PropTypes.string).isRequired,
    objectBlocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  state = { isRunButtonClick: false };

  handleRunButtonClick = () => this.setState({ isRunButtonClick: true });

  handleEventsComplete = (...args) => {
    const { onEventsComplete } = this.props;
    onEventsComplete(...args);
    this.setState({ isRunButtonClick: false });
  }

  handleExecutionComplete = (...args) => {
    this.setState({ isRunButtonClick: false });
    const { onCodeExecutionComplete } = this.props;
    onCodeExecutionComplete(...args);
  };

  render() {
    const {
      blocklyGameObjects,
      blocklyGameImages,
      blocklyGameIntersections,
      text,
      board,
      toolboxXML,
      workspaceXML,
      customBlocks,
      objectBlocks,
    } = this.props;
    const { isRunButtonClick } = this.state;
    return (
      <Container>
        <MazeWrapper>
          <Game
            onFinish={this.handleEventsComplete}
            board={board}
            objects={blocklyGameObjects}
            images={blocklyGameImages}
            intersections={blocklyGameIntersections}
          />
          <BlocklyGameButton
            disabled={isRunButtonClick}
            onClick={this.handleRunButtonClick}
          >
            <img src={Images.playIcon} alt="play icon" />
            <BlocklyGameButtonText>Run</BlocklyGameButtonText>
          </BlocklyGameButton>
        </MazeWrapper>
        <BlocklyPlaygroundWrapper>
          <BlocklyTaskDescription text={text} />
          <BlocklyPlayground
            toolboxXML={toolboxXML}
            workspaceXML={workspaceXML}
            executionComplete={this.handleExecutionComplete}
            isRunButtonClick={isRunButtonClick}
            customBlocks={customBlocks}
            objectBlocks={objectBlocks}
          />
        </BlocklyPlaygroundWrapper>
      </Container>
    );
  }
}

export default BlocklyGame;
