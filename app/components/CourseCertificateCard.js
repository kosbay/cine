import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'recompact';
import { ClaimCertificateMutatuion } from 'schemas';
import Router from 'next/router';

import DefaultButton from './DefaultButton';
import Images from '../theme/Images';

const ChapterImage = Images.sertificate;

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
  font-size: 20px;
  font-weight: 600;
  color: #232424;
  text-align: left;
`;

const SmallFaculty = styled.p`
  color: #77787a;
  font-size: 16px;
  display: flex;
  text-align: left;
`;

const CourseCertificateCard = ({
  chapter,
  index,
  courseName,
  t,
  auth,
  courseId,
  description,
  isPrefFinished,
  certificateId,
}) => {
  const showIndicator = (width1) => {
    if (isPrefFinished) {
      return (
        <IndicatorWrap>
          <Line style={{ backgroundColor: '#7A89FF', width: width1 }} />
          <Indicator style={{ borderColor: '#7A89FF', color: '#7A89FF' }}>
            <Icon type="check" style={{ fontSize: 18 }} />
          </Indicator>
          <Line style={{ width: 0 }} />
        </IndicatorWrap>
      );
    }
    return (
      <IndicatorWrap>
        <Line style={{ backgroundColor: '#CCCDD0', width: width1 }} />
        <Indicator style={{ borderColor: '#CCCDD0', color: '#CCCDD0' }}>{index + 1}</Indicator>
        <Line style={{ width: 0 }} />
      </IndicatorWrap>
    );
  };

  const showLine = () => showIndicator('1px', '0');

  const showButton = (handleClaimSertificate) => {
    const { user } = auth;
    if (isPrefFinished) {
      return (
        <DefaultButton onClick={handleClaimSertificate} type="primary">
          {t('userCourse.getSertificate')}
        </DefaultButton>
      );
    }
    if (user && user.role === 'admin') {
      return (
        <DefaultButton
          extraStyle={{ borderColor: 'red', color: 'red' }}
          type="dashed"
          onClick={handleClaimSertificate}
        >
          {t('userCourse.deniedButtonLabel')}
        </DefaultButton>
      );
    }
    return <DefaultButton type="dashed">{t('userCourse.deniedButtonLabel')}</DefaultButton>;
  };

  const renderButtonWrapper = (mutate) => {
    const userId = auth.user._id;
    const handleClaimSertificate = async () => {
      try {
        await mutate({
          variables: {
            user: userId,
            certificate: certificateId,
          },
        });
        Router.push('/userCertificates');
      } catch (err) {
        // eslint-disable-next-line
        console.log('err: ', err);
      }
    };
    return <ButtonWrap>{showButton(handleClaimSertificate)}</ButtonWrap>;
  };

  return (
    <Container>
      <LeftSide>{showLine()}</LeftSide>
      <RightSide>
        <ProjectInfo>
          <TextWrap>
            <ProjectNumber>{`${t('userCourse.sertificate')}`}</ProjectNumber>
            <StyledTitle>{courseName || t('userCourse.noName')}</StyledTitle>
            <SmallFaculty>
              {certificateId ? description : t('user_certificates.nocertificate')}
            </SmallFaculty>
          </TextWrap>
          {certificateId
          && (
          <ClaimCertificateMutatuion courseId={courseId} userId={auth.user._id}>
            { renderButtonWrapper }
          </ClaimCertificateMutatuion>
          )
          }
        </ProjectInfo>
        <CardImage alt="example" src={chapter.imageURL || ChapterImage} />
      </RightSide>
    </Container>
  );
};

CourseCertificateCard.propTypes = {
  t: PropTypes.func.isRequired,
  chapter: PropTypes.shape({}),
  isPrefFinished: PropTypes.bool.isRequired,
  courseId: PropTypes.string.isRequired,
  certificateId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  index: PropTypes.number,
  auth: PropTypes.shape({}).isRequired,
};

CourseCertificateCard.defaultProps = {
  chapter: {},
  index: 0,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const withState = connect(mapStateToProps);

const EnhancedCourseCertificateCard = compose(
  withNamespaces(),
  withState
)(CourseCertificateCard);

export default EnhancedCourseCertificateCard;
