import React from 'react';
import PropTypes from 'prop-types';
import { TariffCard } from 'components';
import styled from 'styled-components';
import arrayChunk from '../utils/helpers';

const StyledCol = styled.div`
  margin: 26px;
  margin-bottom: 64px;
  width: 288px;
  height: 410px;

  @media screen and (max-width: 500px) {
    margin-bottom: 20px;
  }
`;


const Tariffs = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 100px;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1024px;
  width: calc(((100vh - 112px) / 340px) * 340px);
  justify-content: flex-start;
`;
class TariffContainer extends React.PureComponent {
  static propTypes = {
    tariffs: PropTypes.arrayOf(PropTypes.any),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    tariffs: null,
    loading: null,
  };

  render() {
    const { tariffs, loading } = this.props;
    const chunkedLoading = arrayChunk([1, 2, 3, 4, 5, 6], 3);
    return (
      <Tariffs>
        {loading
          ? chunkedLoading.map(chunk => chunk.map(chunkIndex => (
            <StyledCol key={chunkIndex}>
              <TariffCard loading />
            </StyledCol>
          )))
          : tariffs.map(tariff => (
            <StyledCol key={tariff.name}>
              <TariffCard tariff={tariff} />
            </StyledCol>
          ))
        }
      </Tariffs>
    );
  }
}

export default TariffContainer;
