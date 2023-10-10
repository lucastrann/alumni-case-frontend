// chakra-theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Set the initial color mode to light
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.100' : 'gray.800', // Set background color for light and dark mode
        color: props.colorMode === 'light' ? 'black' : 'white', // Set text color for light and dark mode
      },
    }),
  },
});

export default theme;
