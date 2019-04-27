import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';

import { CourseCard, StatefulView } from 'components';
import arrayChunk from '../../utils/helpers';

import UserCertificateCard from './UserCertificateCard';

const StyledCol = styled.div`
  margin: 10px;
  margin-bottom: 64px;
  width: 288px;
  height: 410px;

  @media screen and (max-width: 500px) {
    margin-bottom: 20px;
  }
`;

const UserCertificatesWrapper = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 100px;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  max-width: 1024px;
  justify-content: space-around;

  @media screen and (max-width: 1024px) {
    width: 90%;
    padding: 20px;
  }
`;

const UserCertificatesError = () => <div>Certificates Error</div>;

const UserCertificatesLoading = () => {
  const chunkedLoading = arrayChunk([1, 2, 3, 4, 5, 6], 3);
  return (
    <div>
      <UserCertificatesWrapper>
        {chunkedLoading.map(chunk => chunk.map(chunkIndex => (
          <StyledCol key={chunkIndex}>
            <CourseCard loading />
          </StyledCol>
        )))}
      </UserCertificatesWrapper>
    </div>
  );
};

const EmptyUserCertificates = ({ t }) => <div>{t('user_certificates.empty')}</div>;
EmptyUserCertificates.propTypes = { t: PropTypes.func.isRequired };

const UserCertificates = ({ data: userCertificates }) => {
  if (userCertificates.length === 0) {
    return withNamespaces()(EmptyUserCertificates);
  }

  return (
    <UserCertificatesWrapper>
      {userCertificates.map(userCertificate => (userCertificate.certificate ? (
        <UserCertificateCard key={userCertificate._id} userCertificate={userCertificate} />
      ) : null))}
    </UserCertificatesWrapper>
  );
};

const UserCertificatesState = StatefulView({
  renderLoading: UserCertificatesLoading,
  renderOkState: UserCertificates,
  renderError: UserCertificatesError,
});

UserCertificatesState.propTypes = {
  userCertificates: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

UserCertificates.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

UserCertificatesState.defaultProps = {
  userCertificates: [],
  loading: false,
};

export default UserCertificatesState;
