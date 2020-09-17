import { theme } from '@chakra-ui/core';

export const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    red: {
      ...theme.colors['red'],
      400: '#a21b2b',
    },
    blue: {
      ...theme.colors['blue'],
      400: '#1a1b2a',
    },
  },
};
