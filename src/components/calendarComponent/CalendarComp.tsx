import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Center,
  useDisclosure,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Flex
} from '@chakra-ui/react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/en-gb';
import ApiService from '../../services/ApiService';
import KeycloakService from '../../services/KeycloakService';
import Event from '../../types/Event';
import ModalCalendar from '../modal/ModalCalendar'; // Import your ModalCalendar component
import ModalViewEvent from '../modal/ModalViewEvent';
import CreateNewEvent from '../createevent/CreateNewEvent';

moment.locale('en-gb');

const localizer = momentLocalizer(moment);

const CalendarComp = () => {
  const apiService = new ApiService('https://alumni-web.azurewebsites.net/api/v1/', `${KeycloakService.getToken()}`);
  const [events, setEvents] = useState<Event[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Manage modal state
  const { colorMode, setColorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents: Event[] = await apiService.fetchEvents();

        const parsedEvents = fetchedEvents.map((event) => ({
          title: event.title,
          content: event.content,
          startsAt: new Date(event.startsAt),
          endsAt: new Date(event.endsAt),
        }));

        setEvents(parsedEvents);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    onOpen();
  };

  const handleModalClose = () => {
    setSelectedEvent(null);
    onClose();
  };

  const [viewEventModalIsOpen, setViewEventModalIsOpen] = useState(false);

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setViewEventModalIsOpen(true);
  };

  const handleViewEventModalClose = () => {
    setViewEventModalIsOpen(false);
  };

  return (
    <Box mt={20} maxW={['95%', '800px']} p={4} mx="auto">
      <CreateNewEvent />
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor={(event) => event.startsAt}
        endAccessor={(event) => event.endsAt}
        style={{ height: 600 }}
        getNow={() => new Date()}
        onSelectEvent={handleViewEvent} // Event click handler for viewing
      />
      <ModalViewEvent
        isOpen={viewEventModalIsOpen}
        onClose={handleViewEventModalClose}
        selectedEvent={selectedEvent}
      />
    </Box>
  );
};

export default CalendarComp;
