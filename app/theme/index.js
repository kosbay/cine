// styled-components.ts
import * as styledComponents from 'styled-components';

import ColorMap from './Colors';
import FontMap from './Fonts';
import ImageMap from './Images';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents;

export {
  ColorMap,
  ImageMap,
  FontMap,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
};
export default styled;
