import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* eslint-disable-next-line */
import { SideMenuContainer, MenuContainer } from 'containers';
import i18n from '../i18n';
import Events from './Events';
import LocaleDropdown from './LocaleDropdown';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

/* stylelint-disable */
const ContentContainer = styled.div`
  width: 100%;
  width: -moz-available;          /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
  width: fill-available;
  margin-left: 112px;
`;
/* stylelint-enable */

const LocaleButton = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 112;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

const Layout = ({ children, router: { pathname }, auth }) => {
  const isLearn = pathname.indexOf('/learn') >= 0;
  const isAdmin = auth.user && auth.user.role === 'admin';
  const notLoggedIn = (auth.user && auth.user._id);

  return (
    <Container>
      <ContentWrapper>
        {(!isLearn && notLoggedIn) && <SideMenuContainer auth={auth} pathname={pathname} />}
        <ContentContainer maxWidth={!isLearn}>{children}</ContentContainer>
      </ContentWrapper>
      {!isLearn && <Events />}
      {isAdmin && (
        <LocaleButton>
          <LocaleDropdown onClick={changeLanguage} />
        </LocaleButton>
      )}
    </Container>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

Layout.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

Layout.defaultProps = {
  router: {
    pathname: '',
  },
};

export default connect(mapStateToProps)(Layout);
