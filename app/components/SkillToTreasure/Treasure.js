import React from 'react';
import {
  DropTarget,
} from 'react-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Images from 'theme/Images';

const Box = styled.div`
  width: 160px;
  height: 200px;
  background: url(${p => (p.isActive ? Images.skillBox.opened : Images.skillBox.closed)}) no-repeat;
  background-size: 160px auto;
  background-position: bottom center;
`;

const boxTarget = {
  drop() {
    return { name: 'Treasure' };
  },
};

class Treasure extends React.Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    return connectDropTarget(
      <div>
        <Box isActive={isActive} />
      </div>,
    );
  }
}

Treasure.propTypes = {
  canDrop: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget(
  'treasure',
  boxTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(Treasure);
