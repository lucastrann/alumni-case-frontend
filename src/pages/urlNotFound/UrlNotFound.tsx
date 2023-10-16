import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/css/Pages.css'
import { Box, Text, Button, useColorMode } from '@chakra-ui/react';


function Error404() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box className='container'>
      <Text className='title'>404 - Not Found</Text>
      <p>The page you are looking for does not exist.</p>
      <Button
        variant="outline"
        borderColor={colorMode === 'dark' ? 'teal.300' : 'teal.600'}
        color={colorMode === 'dark' ? 'white' : 'gray.800'}
        _hover={{
          bg: colorMode === 'dark' ? 'teal.300' : 'teal.600',
          color: 'white',
        }}
        onClick={goHome}>Go to Home</Button>
    </Box>
  );
}

export default Error404;
