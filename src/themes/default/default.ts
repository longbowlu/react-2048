import { Palette, Theme } from '../types';

export const defaultPalette: Palette = {
  transparent: 'transparent',
  black: '#000000',
  white: '#ffffff',
  primary: '#485058',
  secondary: '#92c0ec',
  tertiary: '#f2f2f2',
  foreground: '#ffffff',
  background: '#ffffff',
  backdrop: '#6fbcf0',
  tile2: '#f7ffff',
  tile4: '#daf7f7',
  tile8: '#bde8f2',
  tile16: '#83d9ee',
  tile32: '#62c8ef',
  tile64: '#3eb4f1',
  tile128: '#41a8e8',
  tile256: '#2b8cd6',
  tile512: '#327fe3',
  tile1024: '#256fcf',
  tile2048: '#2d61e3',
};

const theme: Theme = {
  borderRadius: '3px',
  palette: defaultPalette,
};

export default theme;
