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
  useColorMode
} from '@chakra-ui/react';

import ApiService from '../../services/ApiService';
import KeycloakService from '../../services/KeycloakService';
import ModalComponentProps from '../../interfaces/ModalComponentProps';
import { Navigate, useNavigate } from 'react-router-dom';

const ModalCreatePost: React.FC<ModalComponentProps> = ({ isOpen, onClose, title, placeholder}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const navigate = useNavigate();
  const { colorMode, setColorMode } = useColorMode();

  const handleConfirm = async () => {
    try {
      const apiService = new ApiService('https://alumni-web.azurewebsites.net/api/v1/', `${KeycloakService.getToken()}`);
      await apiService.createPost(formData);
      setFormData({
        title: '',
        content: '',
      }
      );

      onClose();
      navigate('/login')
    } catch (error) {
      // Handle error
      console.error('Failed to create a post:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === 'light'
          ? 'gray.200'
          : 'gray.700'}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            borderColor={colorMode === 'light' ? 'gray.600' : 'gray.600'}
            bg={colorMode === 'light' ? 'whiteAlpha.600' : 'gray.800'}
            padding={2}
            mb={4}
            name="title"
            placeholder="Title..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Textarea 
            borderColor={colorMode === 'light' ? 'gray.600' : 'gray.600'}
            bg={colorMode === 'light' ? 'whiteAlpha.600' : 'gray.800'}
            name="content"
            placeholder={placeholder}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            size="sm" 
          />
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

export default ModalCreatePost;
