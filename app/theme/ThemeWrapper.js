import React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider, ColorMap, FontMap, ImageMap, createGlobalStyle,
} from '.';

/* eslint-disable */
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  .fill-height {
    height: 100%;
  }

  .sayCloud {
    position: absolute;
    min-width: 150px;
    min-height: 50px;
    background-color: white;
    padding: 15px;
    margin: 1em 0 3em;
    border: 1px solid black;
    color: black;
    z-index: 10;
  }

  .sayCloud::after {
    content: "";
    position: absolute;
    bottom: -20px;
    right: 110px;
    border-width: 0 0 20px 20px;
    border-style: solid;
    border-color: transparent #fff;
    display: block;
    width: 0;
  }
`;
/* eslint-enable */

const theme = {
  colors: { ...ColorMap },
  fonts: { ...FontMap },
  images: { ...ImageMap },
};

class ThemeWrapper extends React.PureComponent {
  static propTypes =
  {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle />
          {children}
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default ThemeWrapper;

export {
  GlobalStyle,
};
