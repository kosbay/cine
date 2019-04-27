import React from 'react';
import styled from 'styled-components';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import page from 'hocs/page';
import { ContestsSchema } from 'schemas';
import DefaultButton from 'components/DefaultButton';
import { StatefulView, Spinner } from 'components';
import Images from 'theme/Images';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1024px;
  min-height: 100vh;
  margin: auto;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 20px;
  }
`;

const ContestsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  margin-bottom: 64px;
`;

const Contest = styled.div`
  width: 100%;
  position: relative;
  background-color: #fff;
  margin-bottom: 24px;
  min-width: 250px;
`;

const ContestSidesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media screen and (max-width: 550px) {
    flex-direction: column-reverse;
  }
`;


const Label = styled.div`
  font-size: 48px;
  margin-top: 80px;
  color: #606dc9;
`;

const ContestName = styled.div`
  line-height: 24px;
  font-weight: 800;
  margin-bottom: 16px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
`;

const ContestDate = styled.div`
  line-height: 16px;
  font-size: 14px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.85);
`;

const ContestImg = styled.img`
  max-width: 240px;
  width: 240px;
  display: block;
  margin: auto;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const ContestSideLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 32px;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const ContestSideRight = styled.div`
  width: 50%;
  margin: auto;
  display: block;
  margin-bottom: 0;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const Link = styled.a`
  margin-bottom: 0;
  margin-top: auto;
`;

const InactiveContestOverlay = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  mix-blend-mode: normal;
  left: 0;
  z-index: 10;
  opacity: 0.92;
  display: flex;
  flex-direction: center;
  align-items: center;
`;

const LockerIcon = styled.img`
  margin: auto;
  width: 45px;
  height: 56px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 0;
  margin-top: auto;

  p {
    margin: auto;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

class Contests extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  renderLoadingContests = () => (
    <Spinner />
  )

  renderContests = ({ data }) => {
    const { t } = this.props;
    return (
      <Container>
        <Helmet>
          <title>
            {`
          ${t('pages.contests')} | ${t('pages.website')}
          `}
          </title>
        </Helmet>
        <Label>
          {t('contests.titleLabel')}
        </Label>
        <ContestsWrapper>
          {data.map(({
            active, name, date, description, imageURL, contentURL,
          }) => (
            <Contest>
              {!active
                && (
                <InactiveContestOverlay>
                  <LockerIcon src={Images.locker} alt="locker" />
                </InactiveContestOverlay>
                )}
              <ContestSidesWrapper>
                <ContestSideLeft>
                  <ContestName>{name || t('contests.noName') }</ContestName>
                  <ContestDate>{description || t('contests.noDescription') }</ContestDate>
                  <ButtonWrapper>
                    <Link href={contentURL}>
                      <DefaultButton
                        extraStyle={{
                          width: '106px',
                          height: '32px',
                        }}
                        type="primary"
                      >
                        {t('contests.buttonLabel')}
                      </DefaultButton>
                    </Link>
                    <p>
                      {date || t('contests.noDate') }
                    </p>
                  </ButtonWrapper>
                </ContestSideLeft>
                <ContestSideRight>
                  <ContestImg src={imageURL} alt={name || t('contests.noName')} />
                </ContestSideRight>
              </ContestSidesWrapper>
            </Contest>
          ))}
        </ContestsWrapper>
      </Container>
    );
  }

  render() {
    return (
      <ContestsSchema>
        {StatefulView({
          renderOkState: this.renderContests,
          renderLoading: this.renderLoadingContests,
        })}
      </ContestsSchema>
    );
  }
}

const EnhancedContests = compose(
  page,
  withNamespaces()
)(Contests);

export default EnhancedContests;
