import styled from 'styled-components';

const ALDAR_DESTINATION_BUTTON_WIDTH = 130;
const ALDAR_DESTINATION_BUTTON_HEIGHT = 40;

const PRIMARY_COLOR = '#7a89ff';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #f0f2f5;
  justify-content: space-around;
  padding: 10px;
`;

const BlocklyGameButtonWrapper = styled.div`
  width: 100%;
`;

const BlocklyGameButton = styled.button`
  width: ${ALDAR_DESTINATION_BUTTON_WIDTH}px;
  height: ${ALDAR_DESTINATION_BUTTON_HEIGHT}px;
  background-color: ${PRIMARY_COLOR};
  outline: none;
  border-width: 0;
  border-radius: 4px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 24px;
`;

const BlocklyGameButtonText = styled.p`
  width: 80%;
  margin: 0;
`;

const BlocklyPlaygroundWrapper = styled.div`
  flex: 3;
  width: 50%;
  margin: 0 5px;
`;

const MazeWrapper = styled.div`
  flex: 1.8;
  margin: 0 5px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const BlocklyGameWrapper = styled.div`
  flex: 1;
`;

export {
  BlocklyGameButton,
  BlocklyGameButtonText,
  BlocklyGameButtonWrapper,
  BlocklyGameWrapper,
  BlocklyPlaygroundWrapper,
  Container,
  MazeWrapper,
};
