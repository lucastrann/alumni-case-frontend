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

  // Handle confirming the modal and extracting the event title
  const handleConfirm = (eventTitle: string) => {
    const newEvent: Event = {
      title: eventTitle,
      start: new Date('12-10-2023'), // You can set the start date as needed
      end: new Date('14-10-2023'),   // You can set the end date as needed
    };
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
