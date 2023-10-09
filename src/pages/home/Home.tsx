import React from 'react';
import '../Pages.css'
import CreatePost from '../../components/CreatePost';
import { Box, Text } from '@chakra-ui/react';

const Home = () => {
  return (
    <>
      <Box className='container'>
        <Text className='title'>Homepage</Text>
        <CreatePost/>
      </Box>
    </>
  );
};

export default Home;