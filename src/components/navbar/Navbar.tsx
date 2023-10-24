import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Spacer,
  Link,
  Heading,
  Button,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import KeycloakService from '../../services/KeycloakService';
import theme from '../chakraUI/chakra-theme';

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (

    <Box
      as="nav"
      bg={colorMode === 'dark' ? theme.colors.dark.navbarBg : theme.colors.light.navbarBg}
      py={3}
      px={4}
      boxShadow="md"
      borderBottom="1px solid"
      borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}
    >
      <Flex alignItems="center">
        <Heading
          size="md"
          color={colorMode === 'dark' ? 'white' : 'gray.800'}
          fontFamily="monospace"
          transition="transform 0.3s ease-in-out" // Added CSS transition
          _hover={{ transform: 'scale(1.03)' }} // Scale up on hover
        >
          Alumni
        </Heading>
        <Spacer />
        <Flex alignItems="center" justifyContent="center" >
          <Link
            as={RouterLink}
            to="/"
            color={colorMode === 'dark' ? 'white' : 'gray.800'}
            fontSize={20}
            mr={10}
            _hover={{
              color: colorMode === 'dark' ? 'teal.300' : 'teal.600',
              transform: 'scale(1.25)', // Scale up on hover
            }}
          >
            Home
          </Link>
          <Link
            as={RouterLink}
            to="/calendar"
            color={colorMode === 'dark' ? 'white' : 'gray.800'}
            fontSize={20}
            mr={10}
            _hover={{
              color: colorMode === 'dark' ? 'teal.300' : 'teal.600',
              transform: 'scale(1.25)', // Scale up on hover
            }}
          >
            Calendar
          </Link>
          <Link
            as={RouterLink}
            to="/group"
            color={colorMode === 'dark' ? 'white' : 'gray.800'}
            fontSize={20}
            mr={10}
            _hover={{
              color: colorMode === 'dark' ? 'teal.300' : 'teal.600',
              transform: 'scale(1.25)', // Scale up on hover
            }}
          >
            Groups
          </Link>
          <Link
            as={RouterLink}
            to="/profile"
            color={colorMode === 'dark' ? 'white' : 'gray.800'}
            fontSize={20}
            _hover={{
              color: colorMode === 'dark' ? 'teal.300' : 'teal.600',
              transform: 'scale(1.25)', 
            }}
          >
            Profile
          </Link>
        </Flex>
        <Spacer />
        {!KeycloakService.isLoggedIn() && (
          <Button
            variant="outline"
            borderColor={colorMode === 'dark' ? 'teal.300' : 'teal.600'}
          color={colorMode === 'dark' ? 'gray' : 'gray.800'}
    _hover={{
      bg: colorMode === 'dark' ? 'teal.300' : 'teal.600',
      color: 'white',
            }}
            ml={2}
            mr={2}
    onClick={KeycloakService.doLogin}
  >
    Login
  </Button>
)}

        
        <IconButton
          aria-label="Toggle Dark Mode"
          icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          color={colorMode === 'dark' ? 'white' : 'gray.800'}
          bg="transparent"
          _hover={{
            bg: 'transparent',
            color: colorMode === 'dark' ? 'teal.300' : 'teal.600',
          }}
          onClick={toggleColorMode}
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
