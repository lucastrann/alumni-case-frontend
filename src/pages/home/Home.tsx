import React from 'react';
import '../Pages.css'
import CreatePost from '../../components/CreatePost';
import { Box, Text } from '@chakra-ui/react';
import KeycloakService from '../../services/KeycloakService';

const Home = () => {
  return (
    <>
      <Box className='container'>
        <Text className='title'>Homepage</Text>
        {KeycloakService.isLoggedIn() ? (
          <CreatePost />
        ) : ( 
            <p>Login to post 
            </p>
        )}
      </Box>
    </>
  );
};

export default Home;