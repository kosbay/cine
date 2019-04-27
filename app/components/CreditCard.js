import '../styles/index.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px;
  max-width: 1024px;
  margin: auto;
  height: calc(100vh - 144px w- 64px);

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 24px;
  }
`;

const Title = styled.p`
  color: #606dc9;
  font-size: 32px;
  margin-bottom: 40px;
  text-align: center;
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const CreditCard = ({ userCreditCard }) => (
  <div style={{ marginLeft: '60px' }}>
    <Container>
      <div>
        <Title>Ваша карта</Title>
        {
          userCreditCard && Object.keys(userCreditCard).length > 0
            ? (
              <div className="credit-card">
                <div className="credit-card__logo">{userCreditCard && userCreditCard.cardType}</div>
                <div className="credit-card__number">
                  {userCreditCard && userCreditCard.cardFirstSix}
                  **  ****
                  {'  '}
                  {userCreditCard && userCreditCard.cardLastFour}
                </div>

                <div className="credit-card__info">
                  <div className="credit-card__info_name">
                    <div className="credit-card__info_label">Имя на карте</div>
                    <div>{userCreditCard && userCreditCard.name}</div>
                  </div>
                </div>
              </div>
            ) : <Title>У вас пока нет карт</Title>
        }

      </div>
    </Container>
  </div>
);

CreditCard.propTypes = {
  userCreditCard: PropTypes.shape({}).isRequired,
};

export default CreditCard;
