import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'light' ? 'white' : 'gray.900', // Background color
        color: props.colorMode === 'light' ? 'gray.800' : 'white', // Text color
      },
    }),
  },
  colors: {
    light: {
      primary: '#3498db', // Your primary color
      secondary: '#e74c3c', // Your secondary color
    },
    dark: {
      primary: '#2980b9', // Dark mode primary color
      secondary: '#c0392b', // Dark mode secondary color
    },
  },
  components: {
    Link: {
      baseStyle: (props: any) => ({
        color: props.colorMode === 'dark' ? 'light.primary' : 'light.secondary',
      }),
    },
  },
});

export default theme;
