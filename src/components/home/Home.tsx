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
        <Feed />
      </Box>
    </>
  );
};

export default Home;