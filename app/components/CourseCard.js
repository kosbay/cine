import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Tooltip } from 'antd';
import { connect } from 'react-redux';
import Link from 'next/link';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';
import DefaultButton from './DefaultButton';

const LoadingCoverContainer = styled.div`
  height: 231px;
  width: 288px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
`;
const LoadingCover = styled.div`
  width: 100%;
  height: 100%;
  background:
    linear-gradient(
      90deg,
      rgba(207, 216, 220, 0.2),
      rgba(207, 216, 220, 0.4),
      rgba(207, 216, 220, 0.2)
    );
  animation: card-loading 1.4s ease infinite;
  background-size: 600% 600%;
  border-radius: 2px;
`;

const CardImage = styled.img`
  height: 146px;
  width: 100%;
`;

const DescriptionContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #232424;
`;

const CourseContainer = styled.div`
  height: 430px;
  width: 288px;
  overflow: hidden;
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  box-shadow: 0 14px 22px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  :hover {
    box-shadow: none;
  }
`;

const SmallFaculty = styled.p`
  color: #77787a;
  font-size: 16px;
  height: 120px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const CourseCard = ({
  course, loading, auth, t, route,
}) => {
  if (loading) {
    return (
      <Card
        loading={loading}
        cover={(
          <LoadingCoverContainer>
            <LoadingCover />
          </LoadingCoverContainer>
        )}
      />
    );
  }

  const isAdmin = Boolean(auth.user && auth.user.role !== 'admin');
  const isDemo = Boolean(auth.user && auth.user.role !== 'demo');
  const hasAccess = isDemo
    ? Boolean(course.isFree) && Boolean(course.active) : Boolean(course.active) || isAdmin;
  const coursePath = route ? '/userCourse' : '/course';

  return (
    <CourseContainer>
      <CardImage
        alt={`${course.name} image`}
        src={course.imageURL || 'http://via.placeholder.com/600x400px'}
      />
      <DescriptionContainer>
        <TextWrap>
          <StyledTitle>{course.name || t('courses.noName')}</StyledTitle>
          <SmallFaculty>
            {course.shortDescription && course.shortDescription.length > 150 ? (
              <>
                <Tooltip placement="top" title={course.shortDescription}>
                  {course.shortDescription.substr(0, 150).trim()}
                  ...
                </Tooltip>
              </>
            ) : (
              course.shortDescription
            )}
          </SmallFaculty>
        </TextWrap>
        {!hasAccess ? (
          <Link href={{ pathname: coursePath, query: { courseId: course._id } }}>
            <a>
              <DefaultButton
                extraStyle={!course.active && isAdmin ? { borderColor: 'red', color: 'red' } : {}}
              >
                {t('courses.detailsLabel')}
              </DefaultButton>
            </a>
          </Link>
        ) : (
          <DefaultButton
            extraStyle={!course.active && isAdmin ? { borderColor: 'red', color: 'red' } : {}}
          >
            {t('courses.deniedButtonLabel')}
          </DefaultButton>
        )}
      </DescriptionContainer>
    </CourseContainer>
  );
};

CourseCard.propTypes = {
  t: PropTypes.func.isRequired,
  course: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    facultyName: PropTypes.string,
  }),
  loading: PropTypes.bool,
  auth: PropTypes.shape({}).isRequired,
  route: PropTypes.string,
};


CourseCard.defaultProps = {
  course: { shortDescription: '' },
  loading: false,
  route: null,
};

const mapStateToProps = ({ auth }) => ({ auth });

const withState = connect(
  mapStateToProps,
  null
);

export default compose(
  withState,
  withNamespaces()
)(CourseCard);
