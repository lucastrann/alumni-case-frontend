import React from 'react';
import { Button, Box, Center, useDisclosure, useColorMode } from '@chakra-ui/react';
import ModalCalendar from '../modal/ModalCalendar';

const CreateNewEvent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Center>
      <Box maxW="800px" p="4">
        <Button
          borderRadius={20}
          bg={colorMode === 'light' ? 'light.buttonBg' : 'dark.buttonBg'}
          onClick={onOpen}>
          Create New Event
        </Button>
        <ModalCalendar isOpen={isOpen} onClose={onClose} title="Create an event" placeholder="Write your content here..." />
      </Box>
    </Center>
  );
};

export default CreateNewEvent;