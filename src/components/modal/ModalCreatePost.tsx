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
} from '@chakra-ui/react';

import ApiService from '../../services/ApiService';
import KeycloakService from '../../services/KeycloakService';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  placeholder: string;
}

const ModalCreatePost: React.FC<ModalComponentProps> = ({ isOpen, onClose, title, placeholder}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleConfirm = async () => {
    try {
      const apiService = new ApiService('https://alumni-web.azurewebsites.net/api/v1/', `${KeycloakService.getToken()}`);
      await apiService.createPost(formData);
      setFormData({
        title: '',
        content: '',
      });

      onClose();
    } catch (error) {
      // Handle error
      console.error('Failed to create a post:', error);
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
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Input
            name="content"
            placeholder={placeholder}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
