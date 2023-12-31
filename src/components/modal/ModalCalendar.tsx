import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  Box,
  Flex,
  Stack,
  useColorMode,
} from '@chakra-ui/react';

import ApiService from '../../services/ApiService';
import KeycloakService from '../../services/KeycloakService';
import ModalComponentProps from '../../interfaces/ModalComponentProps';
import { Navigate, useNavigate } from 'react-router-dom';

const ModalCalendar: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  title,
  placeholder,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    startsAt: new Date(),
    endsAt: new Date(),
    isEvent: true
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const apiService = new ApiService(
        'https://alumni-web.azurewebsites.net/api/v1/',
        `${KeycloakService.getToken()}`
      );

      await apiService.createEvent(formData);
      setFormData({
        title: '',
        content: '',
        startsAt: new Date(),
        endsAt: new Date(),
        isEvent: true
      });

      onClose();
      navigate('/login');
    } catch (error) {
      // Handle error
      console.error('Failed to create an event:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === 'light'
          ? 'gray.200'
          : 'gray.700'}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            borderWidth="1px"
            borderRadius="5px"
            borderColor={colorMode === 'light' ? 'gray.600' : 'gray.600'}
            bg={colorMode === 'light' ? 'whiteAlpha.600' : 'gray.800'}
            mb={4}
            name="title"
            placeholder="Title..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Textarea
            borderWidth="1px"
            borderRadius="5px"
            borderColor={colorMode === 'light' ? 'gray.600' : 'gray.600'}
            bg={colorMode === 'light' ? 'whiteAlpha.600' : 'gray.800'}
            name="content"
            placeholder={placeholder}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            size="sm"
          />
          <Stack
            direction={['column']} // On phone, stack vertically; on tablet and larger, display side by side
            spacing={4} // Adjust spacing as needed
          >
            <Box>
              <label>Start Date</label>
              <Input
                borderWidth="1px"
                borderRadius="5px"
                borderColor={colorMode === 'light' ? 'gray.600' : 'gray.600'}
                bg={colorMode === 'light' ? 'whiteAlpha.600' : 'gray.800'}
                type="datetime-local"
                name="startsAt"
                value={formData.startsAt.toISOString().slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, startsAt: new Date(e.target.value) })}
              />
            </Box>
            <Box>
              <label>End Date</label>
              <Input
                borderWidth="1px"
                borderRadius="5px"
                borderColor={colorMode === 'light' ? 'gray.600' : 'gray.600'}
                bg={colorMode === 'light' ? 'whiteAlpha.600' : 'gray.800'}
                type="datetime-local"
                name="endsAt"
                value={formData.endsAt.toISOString().slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, endsAt: new Date(e.target.value) })}
              />
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCalendar;
