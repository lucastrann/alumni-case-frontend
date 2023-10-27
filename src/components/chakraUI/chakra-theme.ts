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
      tertiary: '#27ae60',
      quaternary: '#f1c40f',
      navbarBg: 'linear-gradient(45deg, rgba(146, 197, 226, 0.5), rgba(147, 225, 216, 0.5))',
      replyBg: 'rgba(250, 250, 254, 0.66)',
      buttonBg: 'rgba(146, 197, 226, 0.5)',
      calendarBg: 'linear-gradient(180deg, rgba(146, 197, 226, 0.5), rgba(147, 225, 216, 0.2))'
    },
    dark: {
      primary: '#2980b9',
      secondary: '#c0392b',
      tertiary: '#f39c12',
      quaternary: '#9b59b6',
      navbarBg: 'linear-gradient(45deg, rgba(51, 90, 103, 0.6), rgba(16, 13, 52, 0.76), rgba(120, 89, 182, 0.9))',
      replyBg: 'rgba(52, 152, 219, 0.5)',
      buttonBg: 'rgba(120, 89, 182, 0.3)',
      calendarBg: 'linear-gradient(180deg, rgba(51, 90, 103, 0.6), rgba(16, 13, 52, 0.76), rgba(120, 89, 182, 0.9))'
    },
  },
  components: {
    Link: {
      baseStyle: (props: any) => ({
        color: props.colorMode === 'dark' ? 'light.primary' : 'light.secondary',
        _hover: {
          color: 'light.tertiary',
        },
      }),
    },
  },
});

export default theme;
