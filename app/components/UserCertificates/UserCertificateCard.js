import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';

import { Certificate } from 'components';
import withCurrentUser from 'hocs/withCurrentUser';
import Images from 'theme/Images';
import DefaultButton from '../DefaultButton';

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

class CourseCertificateCard extends React.PureComponent {
  state = {
    isCertificateModalVisible: false,
    currentCertificateUrl: '',
  };

  handleShowCertificateButtonClick = () => {
    this.setState({
      isCertificateModalVisible: true,
      currentCertificateUrl: this.props.userCertificate.certificate.imageUrl,
    });
  };

  handleCloseCertificateButtonClick = () => {
    this.setState({
      isCertificateModalVisible: false,
      currentCertificateUrl: '',
    });
  }

  render() {
    const { t, userCertificate } = this.props;
    return (
      <Container>
        <Modal
          title="Certificate"
          visible={this.state.isCertificateModalVisible}
          onCancel={this.handleCloseCertificateButtonClick}
          onOk={this.handleCloseCertificateButtonClick}
        >
          <Certificate
            destroyOnClose
            courseName={this.props.userCertificate.certificate.title}
            name={this.props.currentUser.name}
            imageUrl={this.state.currentCertificateUrl}
          />
        </Modal>
        <RightSide>
          <ProjectInfo>
            <TextWrap>
              <ProjectNumber>
                {`${t('userCourse.sertificate')}`}
              </ProjectNumber>
              <StyledTitle>{userCertificate.certificate.title || t('userCourse.noName') }</StyledTitle>
              <SmallFaculty>
                {userCertificate.certificate.description || t('userCourse.sertificateDesctiption')}
              </SmallFaculty>
            </TextWrap>
            <ButtonWrap>
              <DefaultButton onClick={this.handleShowCertificateButtonClick}>
                {t('userCourse.show')}
              </DefaultButton>
            </ButtonWrap>
          </ProjectInfo>
          <CardImage alt="example" src={ChapterImage} />
        </RightSide>
      </Container>
    );
  }
}

CourseCertificateCard.propTypes = {
  t: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  userCertificate: PropTypes.shape({
    certificate: PropTypes.shape({
      imageUrl: PropTypes.string,
      _id: PropTypes.string,
      title: PropTypes.string,
    }),
  }).isRequired,
};

CourseCertificateCard.defaultProps = {
};

export default withCurrentUser()(withNamespaces()(CourseCertificateCard));
