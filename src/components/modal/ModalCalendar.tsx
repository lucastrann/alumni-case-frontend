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
      navigate('/calendar');
    } catch (error) {
      // Handle error
      console.error('Failed to create an event:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            name="title"
            placeholder="Title..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Textarea
            name="content"
            placeholder={placeholder}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            size="sm"
          />
          <Flex justify="space-between">
            <Box>
              <label>Start Date</label>
              <Input
                type="datetime-local"
                name="startsAt"
                value={formData.startsAt.toISOString().slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, startsAt: new Date(e.target.value) })}
              />
            </Box>
            <Box>
              <label>End Date</label>
              <Input
                type="datetime-local"
                name="endsAt"
                value={formData.endsAt.toISOString().slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, endsAt: new Date(e.target.value) })}
              />
            </Box>
          </Flex>
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
