import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { compose } from 'recompact';

const ErrorWrapper = styled.div`
  width: 100%;
  height: -fit-content;
  max-width: 800px;
  display: block;
  background-color: #fff;
  box-shadow: 0 14px 22px 3px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin: 20px auto 20px auto;
`;

const ErrorMessage = styled.div`
  color: black;
  font-size: 20px;
`;

const ErrorCode = styled.div`
  font-size: 16px;
  width: 30%;
`;

const ErrorDetails = styled.div`
  display: flex;
  width: 70%;
  font-size: 16px;
  flex-direction: column;
`;

const ErrorBottom = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const ErrorButton = styled.button`
  width: 200px;
  margin: auto;
  display: block;
  border: 0 solid black;
`;

class ErrorComponent extends React.PureComponent {
  state = {
    full: false,
  };

  render() {
    const { auth, t, error } = this.props;
    return (
      <ErrorWrapper>
        <ErrorMessage>{t('errorHandling.errorLabel')}</ErrorMessage>
        {this.state.full ? (
          <>
            {t('errorHandling.errorHiddenLabel')}
            <ErrorBottom>
              <ErrorCode>
                {`${t('errorHandling.errorDetails')} ${
                  error.response ? error.response.status : '0'
                }`}
              </ErrorCode>
              <ErrorDetails>
                {t('errorHandling.errorDetails')}
                {error.endpoint && <div>{`endpoint: ${error.endpoint}`}</div>}
                {error.response && <div>{`response: ${error.response.statusText}`}</div>}
                {auth.user && <div>{`userId: ${auth.user._id}`}</div>}
                <div>{`url: ${window.location.href}`}</div>
              </ErrorDetails>
            </ErrorBottom>
          </>
        ) : (
          <ErrorButton
            onClick={() => {
              this.setState({ full: true });
            }}
          >
            {t('errorHandling.openBottomLabel')}
          </ErrorButton>
        )}
      </ErrorWrapper>
    );
  }
}

ErrorComponent.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  t: PropTypes.func.isRequired,
  error: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const withState = connect(
  mapStateToProps,
  null
);

export default compose(
  withState,
  withNamespaces()
)(ErrorComponent);
