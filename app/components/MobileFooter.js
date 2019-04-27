import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { connect } from 'react-redux';

import Images from '../theme/Images';

const logoSVG = Images.logotype;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2a3057;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const SubDiv = styled.div`
  max-width: 1024px;
  width: 100%;
  display: flex;
  margin: 20px 0;
`;

const Logo = styled.img`
  max-height: 40px;
  width: 180px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
`;

const MobileFooter = ({ auth }) => (
  <Container>
    <SubDiv>
      {auth.user && auth.user.role === 'teacher' ? (
        <Links>
          <Row>
            <Link href="/school">
              <Logo src={logoSVG} />
            </Link>
          </Row>
        </Links>
      ) : (
        <Links>
          <Row>
            <Link href="/">
              <Logo src={logoSVG} />
            </Link>
          </Row>
        </Links>
      )}
    </SubDiv>
  </Container>
);

MobileFooter.propTypes = {
  auth: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  null
)(MobileFooter);
