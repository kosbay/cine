import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';
import { CourseCard } from '../components';
import arrayChunk from '../utils/helpers';

const StyledCol = styled.div`
  margin: 26px;
  margin-bottom: 64px;
  width: 288px;
  height: 410px;

  @media screen and (max-width: 500px) {
    margin-bottom: 20px;
  }
`;

const StyledP = styled.p`
  color: #606dc9;
  font-size: 48px;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 14px;
  max-width: 1024px;

  @media screen and (max-width: 768px) {
    margin-top: 50px;
    margin-bottom: 30px;
  }
`;

const Courses = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 100px;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1024px;
  width: calc(((100vh - 112px) / 340px) * 340px);
  justify-content: flex-start;
`;

const CoursesContainer = ({
  courses, loading, t, route,
}) => {
  const chunkedCourses = arrayChunk(courses, 3);
  const chunkedLoading = arrayChunk([1, 2, 3, 4, 5, 6], 3);
  return (
    <div>
      <StyledP>{t('courses.coursesLabel')}</StyledP>
      <Courses>
        {loading
          ? chunkedLoading.map(chunk => chunk.map(chunkIndex => (
            <StyledCol key={chunkIndex}>
              <CourseCard loading />
            </StyledCol>
          )))
          : chunkedCourses.map(chunk => chunk.map(course => (
            <StyledCol key={course._id}>
              <CourseCard course={course} route={route} />
            </StyledCol>
          )))}
      </Courses>
    </div>
  );
};

CoursesContainer.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  t: PropTypes.func.isRequired,
  route: PropTypes.string,
};

CoursesContainer.defaultProps = {
  courses: [],
  loading: false,
  route: null,
};

export default withNamespaces()(CoursesContainer);
