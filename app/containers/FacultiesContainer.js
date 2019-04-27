import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col } from 'antd';
import { withNamespaces } from 'react-i18next';

import { FacultyCard } from '../components';
import arrayChunk from '../utils/helpers';

const FacultyContainerWrapper = styled.div`
  width: 90%;
  display: flex;
  max-width: 1024px;
  justify-content: center;
  flex-direction: column;
  margin: auto;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 20px;
  }
`;

const StyledCol = styled(Col)`
  margin-bottom: 64px;
  max-width: 484px;
  height: 376px;

  @media screen and (max-width: 500px) {
    margin-right: 0;
    margin-bottom: 20px;
    justify-content: center;
  }
`;

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const StyledP = styled.p`
  color: #606dc9;
  font-size: 48px;
  margin-top: 40px;
  margin-bottom: 40px;

  @media screen and (max-width: 500px) {
    font-size: 32px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const FacultiesWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: column;
  margin-bottom: 100px;
`;

const FacultiesContainer = ({ faculties, loading, t }) => {
  const chunkedFaculties = arrayChunk(faculties, 2);
  const chunkedLoading = arrayChunk([1, 2, 3, 4], 2);

  return (
    <FacultyContainerWrapper id="FacultyContainerWrapper">
      <StyledP>{t('faculties.title')}</StyledP>
      <FacultiesWrap>
        {loading
          ? chunkedLoading.map((chunk, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <StyledRow key={index}>
              {chunk.map(chunkIndex => (
                // eslint-disable-next-line react/no-array-index-key
                <StyledCol key={`${index}${chunkIndex}`}>
                  <FacultyCard loading />
                </StyledCol>
              ))}
            </StyledRow>
          ))
          : chunkedFaculties.map((chunk, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <StyledRow key={index}>
              {chunk.map(faculty => (
                <StyledCol key={faculty._id}>
                  <FacultyCard faculty={faculty} />
                </StyledCol>
              ))}
            </StyledRow>
          ))}
      </FacultiesWrap>
    </FacultyContainerWrapper>
  );
};

FacultiesContainer.propTypes = {
  t: PropTypes.func.isRequired,
  faculties: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};

FacultiesContainer.defaultProps = {
  faculties: [],
  loading: false,
};

export default withNamespaces()(FacultiesContainer);
