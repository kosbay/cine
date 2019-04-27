import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Progress, Icon } from 'antd';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'recompact';
import DefaultButton from './DefaultButton';
import Images from '../theme/Images';

const ChapterImage = Images.chapterImage;

const Container = styled.div`
  height: 326px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  height: 286px;
  width: 100%;
  box-shadow: 0 14px 22px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  :hover {
    box-shadow: none;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  height: 100%;
  width: 72px;
`;

const IndicatorWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 32px;
`;

const Indicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  max-height: 32px;
  min-width: 32px;
  max-width: 32px;
  border-radius: 50%;
  border: 1px solid;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
  width: 73%;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardImage = styled.img`
  height: 286px;
  width: 286px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectNumber = styled.p`
  font-size: 14px;
  color: #999a9c;
  text-align: left;
`;

const StyledTitle = styled.p`
  font-size: ${props => (props.children.length < 30 ? '20px' : '16px')};
  font-weight: 600;
  color: #232424;
  text-align: left;
`;

const SmallFaculty = styled.p`
  color: #77787a;
  font-size: ${props => (props.children.length > 200 ? '13px' : '16px')};
  display: flex;
  text-align: left;
`;

const CourseProjectCard = ({
  chapter, index, lastIndex, isPrevStarted, isNextStarted, t, auth, isPrefFinished,
}) => {
  const progress = parseInt(
    ((chapter.userWupai / chapter.wupai) * 100).toFixed(2),
    10
  );

  const showIndicator = (width1, width2) => {
    const { active } = chapter;

    if (progress === 0 || !active) {
      return (
        <IndicatorWrap>
          <Line style={{ backgroundColor: '#CCCDD0', width: width1 }} />
          <Indicator style={{ borderColor: '#CCCDD0', color: '#CCCDD0' }}>
            {index + 1}
          </Indicator>
          <Line style={{ backgroundColor: '#CCCDD0', width: width2 }} />
        </IndicatorWrap>
      );
    }
    if (progress >= 100) {
      return (
        <IndicatorWrap>
          <Line style={{ backgroundColor: '#7A89FF', width: width1 }} />
          <Indicator style={{ borderColor: '#7A89FF', color: '#7A89FF' }}>
            <Icon type="check" style={{ fontSize: 18 }} />
          </Indicator>
          <Line style={isNextStarted ? { backgroundColor: '#7A89FF', width: width2 } : { backgroundColor: '#CCCDD0', width: width2 }} />
        </IndicatorWrap>
      );
    }
    return (
      <IndicatorWrap>
        <Line style={!isPrevStarted ? { backgroundColor: '#CCCDD0', width: width1 } : { backgroundColor: '#7A89FF', width: width1 }} />
        <Indicator
          style={{
            borderColor: '#7A89FF',
            color: 'white',
            backgroundColor: '#7A89FF',
          }}
        >
          {index + 1}
        </Indicator>
        <Line style={!isNextStarted ? { backgroundColor: '#CCCDD0', width: width2 } : { backgroundColor: '#7A89FF', width: width2 }} />
      </IndicatorWrap>
    );
  };

  const showLine = () => {
    if (index === 0) {
      return showIndicator('0', '1px');
    } if (index === lastIndex) {
      return showIndicator('1px', '0');
    }
    return showIndicator('1px', '1px');
  };

  const href = { pathname: '/learn', query: { chapterId: chapter._id } };


  const showButton = (active, prefFinished) => {
    const { user } = auth;
    if (!active || !prefFinished) {
      if (user && user.role === 'admin') {
        return (
          <DefaultButton extraStyle={{ borderColor: 'red', color: 'red' }} type="dashed" to={href}>
            {t('userCourse.deniedButtonLabel')}
          </DefaultButton>
        );
      }
      return (
        <DefaultButton type="dashed">
          {t('userCourse.deniedButtonLabel')}
        </DefaultButton>
      );
    }
    switch (true) {
      case (progress === 0): return (
        <DefaultButton to={href}>
          {t('userCourse.start')}
        </DefaultButton>
      );
      case (progress >= 100): return (
        <DefaultButton to={href}>
          <Icon type="check" />
          {t('userCourse.done')}
        </DefaultButton>
      );
      default: return (
        <DefaultButton to={href}>
          {t('userCourse.continue')}
        </DefaultButton>
      );
    }
  };

  return (
    <Container>
      <LeftSide>{showLine()}</LeftSide>
      <RightSide>
        <ProjectInfo>
          <TextWrap>
            <ProjectNumber>
              {`${t('userCourse.projectLabel')} ${index + 1}`}
            </ProjectNumber>
            <StyledTitle>{chapter.name || t('userCourse.noName') }</StyledTitle>
            <SmallFaculty>{chapter.description || t('userCourse.noDescription')}</SmallFaculty>
          </TextWrap>
          <ButtonWrap>
            {showButton(chapter.active, isPrefFinished)}
            <Progress percent={progress} style={{ width: '65%' }} />
          </ButtonWrap>
        </ProjectInfo>
        <CardImage alt="example" src={chapter.imageURL || ChapterImage} />
      </RightSide>
    </Container>
  );
};

CourseProjectCard.propTypes = {
  t: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired,
  chapter: PropTypes.shape({}),
  isPrefFinished: PropTypes.bool.isRequired,
  isPrevStarted: PropTypes.bool.isRequired,
  isNextStarted: PropTypes.bool.isRequired,
  index: PropTypes.number,
  lastIndex: PropTypes.number,
};

CourseProjectCard.defaultProps = {
  chapter: {},
  index: 0,
  lastIndex: null,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const withState = connect(mapStateToProps);

const EnhancedCourseProjectCard = compose(withNamespaces(), withState)(CourseProjectCard);

export default EnhancedCourseProjectCard;
