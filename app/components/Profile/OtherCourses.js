import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import OtherCourseCard from "./ProfileCourseCard";

const OtherCourseContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const OtherCourses = ({userCoursesNotInFaculties}) => (
  <div>
    {userCoursesNotInFaculties.length > 0 && "Другие курсы:"}
    <OtherCourseContent>
      {userCoursesNotInFaculties.map(course => (
        <OtherCourseCard course={course} />
      ))}
    </OtherCourseContent>
  </div>
);

OtherCourses.propTypes = {
  userCoursesNotInFaculties: PropTypes.arrayOf(PropTypes.shape({})),
};

OtherCourses.defaultProps = {
  userCoursesNotInFaculties: null
};

export default OtherCourses;
