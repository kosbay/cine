import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Link from 'next/link';
import { withNamespaces } from 'react-i18next';
import { compose } from 'recompact';

import Images from '../theme/Images';

const logoSVG = Images.logotype;

const Container = styled.div`
  width: 100%;
  height: 144px;
  background-color: #2a3057;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SubDiv = styled.div`
  max-width: 1024px;
  width: 100%;
  display: flex;
`;

const Logo = styled.img`
  max-height: 40px;
  width: 152px;
  width: auto;
`;

const Links = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-left: 120px;
`;

const LinkLabel = styled.div`
  cursor: pointer;
  color: #fff;
  margin-right: 56px;
`;

const Footer = ({ auth, t }) => (
  <Container>
    <SubDiv>
      <Link href="/school">
        <Logo src={logoSVG} />
      </Link>
      {auth.user && auth.user.role === 'teacher' ? (
        <Links>
          <Link href="/rating">
            <a>
              <LinkLabel>{t('footer.faculties')}</LinkLabel>
            </a>
          </Link>
          <Link href="/contacts">
            <a>
              <LinkLabel>{t('footer.contacts')}</LinkLabel>
            </a>
          </Link>
        </Links>
      ) : (
        <Links>
          <Link href="/faculties">
            <a>
              <LinkLabel>{t('footer.faculties')}</LinkLabel>
            </a>
          </Link>
          <Link href="/courses">
            <a>
              <LinkLabel>{t('footer.courses')}</LinkLabel>
            </a>
          </Link>
          <Link href="/rating">
            <a>
              <LinkLabel>{t('footer.raiting')}</LinkLabel>
            </a>
          </Link>
          <Link href="/contacts">
            <a>
              <LinkLabel>{t('footer.contacts')}</LinkLabel>
            </a>
          </Link>
        </Links>
      )}
    </SubDiv>
  </Container>
);

Footer.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });


const withState = connect(
  mapStateToProps,
  null
);

const EnchantedFooter = compose(
  withState,
  withNamespaces(),
)(Footer);

export default EnchantedFooter;
