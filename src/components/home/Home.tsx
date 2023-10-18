import React from 'react';
import '../../components/css/Pages.css'
//import CreatePost from '../createPost/CreatePost';
import { Box, Text } from '@chakra-ui/react';
import KeycloakService from '../../services/KeycloakService';
import Feed from '../feed/Feed';

const Home = () => {


  console.log()
  return (
    <>
      <Box className='home-container'>
        <Text className='title'>Homepage</Text>
        {KeycloakService.isLoggedIn() ? (
          <p>helo</p>
        ) : (
            <p>You have to login to post</p>
        )}
        <Feed />
      </Box>
    </>
  );
};

export default Home;