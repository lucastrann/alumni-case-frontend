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
  useColorMode,
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
  const { colorMode, setColorMode } = useColorMode();

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
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            borderColor={colorMode === 'light' ? 'gray.600' : 'gray.600'}
            bg={colorMode === 'light' ? 'whiteAlpha.600' : 'gray.800'}
            padding={2}
            mb={4}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Input
            borderColor={colorMode === 'light' ? 'gray.600' : 'gray.600'}
            bg={colorMode === 'light' ? 'whiteAlpha.600' : 'gray.800'}
            padding={2}
            mb={4}
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
          <Checkbox
            borderColor={colorMode === 'light' ? 'gray.600' : 'gray.600'}
            bg={colorMode === 'light' ? 'whiteAlpha.600' : 'gray.800'}
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
