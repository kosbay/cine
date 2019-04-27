import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Images from 'theme/Images';
import Skill from './Skill';
import Treasure from './Treasure';

const DragContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArrowImg = styled.img`
  width: 150px;
  height: auto;
`;

const SkillToTreasure = ({ name }) => (
  <div>
    {`Поздравляем! Вы получили ${name}, перетащите его в сундук`}
    <DragContainer>
      <div style={{ overflow: 'hidden', clear: 'both', marginTop: 20 }}>
        <Skill name={name} />
      </div>
      <ArrowImg src={Images.skillBox.arrow} />
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Treasure />
      </div>
    </DragContainer>
  </div>
);

SkillToTreasure.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SkillToTreasure;
