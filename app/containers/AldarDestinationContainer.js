import React from 'react';
import PropTypes from 'prop-types';

import AldarDestination from '../components/AldarDestination';

class AldarDestinationContainer extends React.PureComponent {
  static propTypes = {
    lesson: PropTypes.shape({
      aldar: PropTypes.shape({}).isRequired,
      board: PropTypes.shape({}).isRequired,
      customBlocks: PropTypes.arrayOf(PropTypes.string).isRequired,
      goal: PropTypes.shape({}).isRequired,
      name: PropTypes.string.isRequired,
      points: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      toolboxXML: PropTypes.string.isRequired,
      workspaceXML: PropTypes.string.isRequired,
      mazeObjectsFunctions: PropTypes.arrayOf(PropTypes.shape({})),
      text: PropTypes.string.isRequired,
    }).isRequired,
    makeNextButtonActive: PropTypes.func.isRequired,
  };

  // eslint-disable-next-line
  handleAnswerCorrect = () => this.props.makeNextButtonActive();

  render() {
    const {
      lesson: {
        aldar,
        board,
        customBlocks,
        goal,
        name,
        points,
        toolboxXML,
        workspaceXML,
        text,
        mazeObjectsFunctions,
      },
    } = this.props;

    return (
      <React.Fragment key={name}>
        <AldarDestination
          aldar={aldar}
          board={board}
          customBlocks={customBlocks}
          goal={goal}
          name={name}
          onAnswerCorrect={this.handleAnswerCorrect}
          points={points}
          toolboxXML={toolboxXML}
          workspaceXML={workspaceXML}
          objectBlocks={mazeObjectsFunctions}
          text={text}
        />
      </React.Fragment>
    );
  }
}

export default AldarDestinationContainer;
