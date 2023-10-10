import React from 'react';
import '../Pages.css'
import CalendarComp from '../../components/CalendarComp';
import {Box, Text } from '@chakra-ui/react'

const Calendar = () => {
  return (
    <>
      <Box className='container'>
        <Text className='title'>Calendar page</Text>
        <CalendarComp/>
      </Box>
    </>
  );
};

export default Calendar;