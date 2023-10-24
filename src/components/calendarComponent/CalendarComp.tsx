// CalendarComp.tsx
import React, { useState } from 'react';
import { Button, Box, Center, useDisclosure, useColorMode } from '@chakra-ui/react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/en-gb';
import ModalCalendar from '../modal/ModalCalendar';

moment.locale('en-gb');

const localizer = momentLocalizer(moment);

const CalendarComp = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, setColorMode } = useColorMode();

  type Event = {
    title: string;
    start: Date;
    end: Date;
  };

  const handleNewEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
    onClose();
  };

  const handleConfirm = (eventTitle: string, startDate: string, endDate: string) => {
    const partsStart = startDate.split('/');
    const dayStart = parseInt(partsStart[0], 10);
    const monthStart = parseInt(partsStart[1], 10) - 1;
    const yearStart = parseInt(partsStart[2], 10);

    const partsEnd = endDate.split('/');
    const dayEnd = parseInt(partsEnd[0], 10);
    const monthEnd = parseInt(partsEnd[1], 10) - 1;
    const yearEnd = parseInt(partsEnd[2], 10);

    const start = new Date(yearStart, monthStart, dayStart, 0, 0, 0);
    const end = new Date(yearEnd, monthEnd, dayEnd, 23, 59, 59);

    const newEvent: Event = {
      title: eventTitle,
      start: new Date(start),
      end: new Date(end),
    };

    handleNewEvent(newEvent);
  };

  return (
    <Center>
      <Box maxW="800px" p="4">
        <Button bg={colorMode === 'light' ? 'light.buttonBg' : 'dark.buttonBg'} onClick={onOpen}>
          Create New Event
        </Button>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor={(event) => event.start}
          endAccessor={(event) => event.end}
          style={{ height: 600 }}
          getNow={() => new Date()}
        />
        <ModalCalendar
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleConfirm}
          title="Create New Event"
          placeholder="Event Title"
        />
      </Box>
    </Center>
  );
};

export default CalendarComp;
