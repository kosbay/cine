import React from 'react';
import styled from 'styled-components';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import page from 'hocs/page';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  min-height: calc(100vh - 208px);

  @media screen and (max-width: 768px) {
    height: calc(100vh - 144px);
    justify-content: center;
  }
`;

const Title = styled.p`
  font-size: 30px;
  margin-top: 50px;
  color: black;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
`;

const Text = styled.p`
  font-size: 20px;
  margin: 20px 0 0 0;

  @media screen and (max-width: 768px) {
    font-size: 26px;
  }
`;

const Label = styled.p`
  font-size: 16px;
  margin: 10px 0 0 0;
  font-weight: 300;
  color: black;

  @media screen and (max-width: 768px) {
    font-size: 26px;
  }
`;

const Contacts = ({ t }) => (
  <Container>
    <Helmet>
      <title>
        {`
          ${t('pages.contacts')} | ${t('pages.website')}
          `}
      </title>
    </Helmet>
    <Title>{t('contacts.title')}</Title>
    <Text>{t('contacts.phoneLabel')}</Text>
    <Label>{t('contacts.phoneNumber')}</Label>
    <Text>{t('contacts.emailLabel')}</Text>
    <Label>{t('contacts.emailText')}</Label>
  </Container>
);

Contacts.propTypes = {
  t: PropTypes.func.isRequired,
};

const EnhancedContacts = compose(
  page,
  withNamespaces(),
)(Contacts);

export default EnhancedContacts;
