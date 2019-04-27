import React from 'react';
import {
  DragSource,
} from 'react-dnd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Images from 'theme/Images';

const SkillImg = styled.div`
  width: 80px;
  height: 80px;
  background: url(${Images.skillBox.skill}) no-repeat;
  background-size: 80px auto;
  background-position: center center;
`;

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      alert(`You dropped ${item.name} into ${dropResult.name}!`);
    }
  },
};

class Skill extends React.Component {
  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(<div><SkillImg /></div>);
  }
}

Skill.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
};

export default DragSource(
  'treasure',
  boxSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Skill);
