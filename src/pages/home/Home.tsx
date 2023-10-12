import React from 'react';
import '../../components/css/Pages.css'
import CreatePost from '../../components/home/CreatePost';
import { Box, Text } from '@chakra-ui/react';
import KeycloakService from '../../services/KeycloakService';
import { userData } from '../../components/home/data';
import Feed from '../../components/home/Feed';

const Home = () => {
  return (
    <>
      <Box className='home-container'>
        <Text className='title'>Homepage</Text>
        {KeycloakService.isLoggedIn() ? (
                 <CreatePost />
        ) : (
            <p>You have to login to post</p>
        )}
          <Feed data={userData} />
      </Box>
    </>
  );
};

export default Home;