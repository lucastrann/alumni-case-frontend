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

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="nav" bg="blue.500" py={2} px={4} boxShadow="md">
      <Flex alignItems="center">
        <Heading size="md" color="white">
          Alumni
        </Heading>
        <Spacer />
        <Flex alignItems="center">
          <Link as={RouterLink} to="/" color="white" mr={20}>
            Home
          </Link>
          <Link as={RouterLink} to="/calendar" color="white" mr={20}>
            Calendar
          </Link>
          <Link as={RouterLink} to="/profile" color="white">
            Profile
          </Link>
        </Flex>
        <Spacer />
        <IconButton
          aria-label="Toggle Dark Mode"
          icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
          color="white"
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
