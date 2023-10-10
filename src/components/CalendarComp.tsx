import React, { useState } from 'react';
import { Button, Box, Center, useDisclosure } from '@chakra-ui/react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/en-gb';
import ModalComponent from './modal/ModalComponent';

moment.locale('en-gb');

const localizer = momentLocalizer(moment);

const CalendarComp = () => {
  // Define the type for events
  const [events, setEvents] = useState<Event[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define the type for the Event object
  type Event = {
    title: string;
    start: Date;
    end: Date;
  };

  // Handle adding a new event
  const handleNewEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
    onClose(); // Close the modal after adding the new event
  };

  const handleConfirm = (eventTitle: string) => {
    const dateString = '15/10/2023'; // Assuming DD/MM/YYYY format


    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are zero-based (0-11)
    const year = parseInt(parts[2], 10);
    

    const start = new Date(year, month, day, 0, 0, 0); 
    const end = new Date(year, month, day, 23, 59, 59);

    const newEvent: Event = {
      title: eventTitle,
      start: new Date(start), // You can set the start date as needed
      end: new Date(end),   // You can set the end date as needed
    };
    console.log(newEvent)
    handleNewEvent(newEvent);
  };

  return (
    <Center>
      <Box maxW="800px" p="4">
        <Button colorScheme="teal" onClick={onOpen}>
          Create New Event
        </Button>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor={(event) => event.start} // Use accessor functions
          endAccessor={(event) => event.end} // Use accessor functions
          style={{ height: 500 }}
        />
        <ModalComponent
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleConfirm} // Pass the handleConfirm function
          title="Create New Event"
          placeholder="Event Title"
        />
      </Box>
    </Center>
  );
};

export default CalendarComp;
