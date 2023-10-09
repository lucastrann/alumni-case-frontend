import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/en-gb';

moment.locale('en-gb');

const localizer = momentLocalizer(moment);

const events = [
  // Your events data from the database with format DD/MM/YYYY
  {
    title: 'test event 213',
    start: new Date('2023-10-10'),
    end: new Date('2023-10-11'),
  },
  {
    title: 'test event 123123',
    start: new Date('2023-10-15'),
    end: new Date('2023-10-16'),
  },
  // Add more events as needed
];

const CalendarComp = () => {
  return (
    <Center>
      <Box maxW="800px" p="4">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Box>
    </Center>
  );
};

export default CalendarComp;
