import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'light' ? 'white' : 'gray.900',
        color: props.colorMode === 'light' ? 'gray.800' : 'white',
      },
    }),
  },
  colors: {
    light: {
      primary: '#3498db',
      secondary: '#e74c3c',
      tertiary: '#27ae60', // Custom tertiary color
      quaternary: '#f1c40f', // Custom quaternary color
    },
    dark: {
      primary: '#2980b9',
      secondary: '#c0392b',
      tertiary: '#f39c12', // Custom tertiary color for dark mode
      quaternary: '#9b59b6', // Custom quaternary color for dark mode
    },
  },
  components: {
    Link: {
      baseStyle: (props: any) => ({
        color: props.colorMode === 'dark' ? 'light.primary' : 'light.secondary',
        _hover: {
          color: 'light.tertiary', // Color on hover
        },
      }),
    },
    Box: {
      baseStyle: (props: any) => ({
        bg: props.colorMode === 'light' ? 'gray.100' : 'gray.700',
        color: props.colorMode === 'light' ? 'gray.800' : 'white',
      }),
    },
    Input: {
      baseStyle: (props: any) => ({
        bg: props.colorMode === 'light' ? 'white' : 'gray.800',
        color: props.colorMode === 'light' ? 'gray.800' : 'white',
        border: '1px solid',
        borderColor: props.colorMode === 'light' ? 'gray.200' : 'gray.600',
      }),
    },
    Image: {
      baseStyle: (props: any) => ({
        border: '1px solid',
        borderColor: props.colorMode === 'light' ? 'gray.200' : 'gray.600',
      }),
    },
    Text: {
      baseStyle: (props: any) => ({
        color: props.colorMode === 'light' ? 'gray.800' : 'white',
      }),
    },
    Spinner: {
      baseStyle: (props: any) => ({
        color: props.colorMode === 'light' ? 'teal.500' : 'gray.400',
      }),
    },
  },
});

export default theme;
