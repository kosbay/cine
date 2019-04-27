import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Card, Skeleton } from 'antd';
import { withNamespaces } from 'react-i18next';

const StyledCard = styled(Card)`
  width: 100%;
  height: 110px;
  margin-top: 24px;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DetailsContainer = styled.div`
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 16px;
  line-height: 27px;
  color: #000;

  @media screen and (max-width: 400px) {
    font-size: 14px;
  }
`;

const DetailsNumber = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 32px;
  margin: 0;
  font-weight: 500;

  @media screen and (max-width: 500px) {
    font-size: 18px;
  }

  @media screen and (max-width: 400px) {
    font-size: 14px;
  }
`;

const FacultyName = styled.p`
  color: #232424;
  display: flex;
  align-items: center;
  font-size: 24px;
  margin: 0;

  @media screen and (max-width: 500px) {
    font-size: 18px;
  }

  @media screen and (max-width: 400px) {
    font-size: 14px;
  }
`;

const AllCourseDiv = styled.p`
  color: #cfd2d3;
  display: flex;
  align-items: center;
  font-size: 32px;
  margin: 0;
  font-weight: 500;

  @media screen and (max-width: 500px) {
    font-size: 18px;
  }

  @media screen and (max-width: 400px) {
    font-size: 14px;
  }
`;

const ProfileFacultyCard = ({ faculty, loading, t }) => (loading ? (
  <StyledCard>
    <Skeleton active />
  </StyledCard>
) : (
  <Link href={{ pathname: '/faculty', query: { facultyId: faculty._id } }}>
    <Container>
      <FacultyName>{faculty.name}</FacultyName>
      <DetailsContainer>
        {t('profile.userFacultyCoursesDoneLabel')}
        <DetailsNumber style={{ color: faculty.color }}>
          {faculty.finishedCourses}
          <AllCourseDiv>{`/${faculty.numberOfCourses}`}</AllCourseDiv>
        </DetailsNumber>
      </DetailsContainer>
    </Container>
  </Link>
));

ProfileFacultyCard.propTypes = {
  t: PropTypes.func.isRequired,
  faculty: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    courses: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  loading: PropTypes.bool,
};

ProfileFacultyCard.defaultProps = {
  faculty: { courses: [] },
  loading: false,
};

export default withNamespaces()(ProfileFacultyCard);
