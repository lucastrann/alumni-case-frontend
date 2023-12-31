import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';
import { Box, Text, SimpleGrid, VStack, Badge } from '@chakra-ui/react';
import CreateGroup from '../creategroup/CreateGroup';
import Groups from './Groups';

const Group = () => {

  return (
    <>
      <Box className='container'
        mt={5}>
        <CreateGroup />
        <Groups />
      </Box>
    </>
  );
};

export default Group;
