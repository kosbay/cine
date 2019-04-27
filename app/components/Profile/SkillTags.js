import React from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';

const UserRightWrap = styled.div`
  display: flex;
  margin-top: 80px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-top: 50px;
  }
`;

const SkillTags = ({ data, loading }) => loading === false && (
  <UserRightWrap>
    <Tag color="blue">
      {
        data.map(skill => skill.skillId.name)
      }
    </Tag>
  </UserRightWrap>

);

export default SkillTags;
