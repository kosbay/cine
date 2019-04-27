import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Button } from 'antd';
import { StatefulView } from 'components';
import { FetchEventsSchema } from 'schemas';

const Container = styled.div`
  z-index: 0;
  position: fixed;
  bottom: 0;
  transform: ${p => (p.loading ? 'translateY(112px)' : 'translateY(0)')};
  transition: 0.2s transform ease-out;
  min-height: 112px;
  justify-content: center;
  width: 100%;
  color: #fff;
  background-image: linear-gradient(to right, rgb(102, 112, 217), rgb(181, 105, 227));
  margin-left: 112px;
  @media screen and (max-width: 1068px) {
    padding: 24px;
  }

  @media screen and (max-width: 560px) {
    padding: 16px;
  }
  display: ${p => (p.hide ? 'none' : 'flex')} 
`;

const InnerContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  max-width: 1024px;

  @media screen and (max-width: 560px) {
    padding: 0;
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 560px) {
    align-items: flex-start;
  }
`;

const Name = styled.div`
  line-height: 32px;
  font-size: 26px;

  @media screen and (max-width: 1024px) {
    font-size: 18px;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }

  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: center;
`;

const Image = styled.img`
  display: block;
  max-height: 112px;
  width: auto;
  height: auto;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  @media screen and (max-width: 560px) {
    align-items: center;
  }
`;

const StyledButton = styled(Button)`
  width: fit-content;
  height: 40px;
  margin-bottom: 10px;
`;

class EventBar extends PureComponent {
  state = { isHide: false };


  componentDidMount() {
    window.addEventListener('scroll', this.hideBar);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideBar);
  }

  hideBar = () => {
    const { isHide } = this.state;

    window.scrollY > this.prev
      ? !isHide && this.setState({ isHide: true })
      : isHide && this.setState({ isHide: false });

    this.prev = window.scrollY;
  }

  renderEvent = ({ data: { item } }) => (item ? (
    <Container hide={this.state.isHide}>
      <InnerContainer>
        <Left>
          <Name>{item.name || ''}</Name>
        </Left>
        <Center>
          <Image src={item.imageURL || ''} />
        </Center>
        <Right>
          <Link href={item.contentURL || ''} as={item.contentURL || ''} prefetch>
            <a target="_blank">
              <StyledButton type="primary">Подробнее о событии</StyledButton>
            </a>
          </Link>
          <span>{item.date || ''}</span>
        </Right>
      </InnerContainer>
    </Container>
  ) : null)


  render() {
    return (
      <FetchEventsSchema>
        {StatefulView({ renderOkState: this.renderEvent })}
      </FetchEventsSchema>
    );
  }
}

export default EventBar;
