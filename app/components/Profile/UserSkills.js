import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SkillsCard from '../SkillsCard';

const SkillsContainer = styled.div`
  background-color: #fff;
  width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
`;

const UserSkills = ({
  skills, apps, logics, knowledges,
}) => (
  <SkillsContainer>
    <SkillsCard
      skills={skills}
      apps={apps}
      logics={logics}
      knowledges={knowledges}
    />
  </SkillsContainer>
);

UserSkills.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  apps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  knowledges: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  logics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default UserSkills;
