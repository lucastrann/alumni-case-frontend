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
  Checkbox,
} from '@chakra-ui/react';

import ApiService from '../../services/ApiService';
import KeycloakService from '../../services/KeycloakService';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  placeholder: string;
}

const ModalCreateGroup: React.FC<ModalComponentProps> = ({ isOpen, onClose, title, placeholder }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '',
    private: true,
  });

  const handleConfirm = async () => {
    try {
      // Make the API call to create a group with formData
      const apiService = new ApiService('https://alumni-web.azurewebsites.net/api/v1/', `${KeycloakService.getToken()}`);
      await apiService.createGroup(formData);

      // Reset the formData
      setFormData({
        name: '',
        description: '',
        color: '',
        private: true,
      });

      onClose();
    } catch (error) {
      // Handle error
      console.error('Failed to create a group:', error);
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
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Input
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
          <Checkbox
            isChecked={formData.private}
            onChange={(e) => setFormData({ ...formData, private: e.target.checked })}
          >
            Private
          </Checkbox>
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

export default ModalCreateGroup;
