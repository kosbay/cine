import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Tooltip } from 'antd';
import { connect } from 'react-redux';
import Link from 'next/link';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';
import DefaultButton from './DefaultButton';

const LoadingCoverContainer = styled.div`
  height: 231px;
  width: 288px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
`;
const LoadingCover = styled.div`
  width: 100%;
  height: 100%;
  background:
    linear-gradient(
      90deg,
      rgba(207, 216, 220, 0.2),
      rgba(207, 216, 220, 0.4),
      rgba(207, 216, 220, 0.2)
    );
  animation: card-loading 1.4s ease infinite;
  background-size: 600% 600%;
  border-radius: 2px;
`;

const CardImage = styled.img`
  object-fit: contain;
  margin: 10% 30% 0 30%;
`;

const DescriptionContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPriceTitle = styled.p`
  font-size: 18px;
  color: #232424;
  text-align: center;
  margin-bottom: 15px;
`;

const StyledMainTitle = styled.p`
  color: #7a89ff;
  font-size: 22px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 5px;
`;

const TariffContainer = styled.div`
  width: 288px;
  overflow: hidden;
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  box-shadow: 0 14px 22px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  :hover {
    box-shadow: none;
  }
`;

const SmallFaculty = styled.p`
  color: #77787a;
  font-size: 16px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 5px;
`;

const StyledBoldTitle = styled.p`
  color: black;
  font-size: 16px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 5px;
  font-weight: bold
`;

const HorizantalLine = styled.div`
  border-bottom: 1px solid #77787a;
  margin-bottom: 15px;
`;

const TariffUl = styled.ul``;
const TariffLi = styled.li``;

const TariffCard = ({
  tariff, loading, t, subscription,
}) => {
  if (loading) {
    return (
      <Card
        loading={loading}
        cover={(
          <LoadingCoverContainer>
            <LoadingCover />
          </LoadingCoverContainer>
        )}
      />
    );
  }

  return (
    <TariffContainer>
      <CardImage
        alt={`${tariff.name} image`}
        src={tariff.imageURL || 'http://via.placeholder.com/600x400px'}
      />
      <DescriptionContainer>
        <TextWrap>
          <StyledMainTitle>{tariff.name || t('courses.noName')}</StyledMainTitle>
          <StyledPriceTitle>
            {tariff.price || t('courses.noName')}
            {' '}
            ₸
          </StyledPriceTitle>
          <HorizantalLine />
          <SmallFaculty>
            {tariff.description && tariff.description.length > 150 ? (
              <>
                <Tooltip placement="top" title={tariff.description}>
                  {tariff.description.substr(0, 150).trim()}
                  ...
                </Tooltip>
              </>
            ) : (
              tariff.description
            )}
          </SmallFaculty>
          <StyledBoldTitle>Включает: </StyledBoldTitle>
          <TariffUl>
            {
              tariff.features && tariff.features.map(feature => (
                <TariffLi key={feature}>{feature}</TariffLi>
              ))
            }
          </TariffUl>
        </TextWrap>
        {
          !subscription
            ? (
              <Link href={{ pathname: '/subscription' }}>
                <a>
                  <DefaultButton>
                    {t('tariffs.subscribe')}
                  </DefaultButton>
                </a>
              </Link>
            ) : null
        }

      </DescriptionContainer>
    </TariffContainer>
  );
};

TariffCard.propTypes = {
  t: PropTypes.func.isRequired,
  tariff: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    facultyName: PropTypes.string,
  }),
  loading: PropTypes.bool,
  subscription: PropTypes.bool,
  auth: PropTypes.shape({}).isRequired,
};


TariffCard.defaultProps = {
  tariff: { shortDescription: '' },
  loading: false,
  subscription: null,
};

const mapStateToProps = ({ auth }) => ({ auth });

const withState = connect(
  mapStateToProps,
  null
);

export default compose(
  withState,
  withNamespaces()
)(TariffCard);
