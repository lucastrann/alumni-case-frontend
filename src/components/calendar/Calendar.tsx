import React from 'react';
import '../../components/css/Pages.css'
import CalendarComp from '../calendarComponent/CalendarComp';
import {Box, Text } from '@chakra-ui/react'

const Calendar = () => {
  return (
    <>
      <Box className='container'>
        <CalendarComp/>
      </Box>
    </>
  );
};

export default Calendar;