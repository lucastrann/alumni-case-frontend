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

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  placeholder: string;
}

const CreateGroup: React.FC<ModalComponentProps> = ({ isOpen, onClose, title, placeholder }) => {
  const apiService = new ApiService('http://localhost:8080/api/v1/'); // Adjust the API base URL

  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    color: '',
    private: true,
  });

  const handleConfirm = async () => {
    try {
      await apiService.createGroup(groupData); // Use the ApiService to create a group
      setGroupData({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            value={groupData.name}
            onChange={handleChange}
          />
          <Input
            name="description"
            placeholder="Description"
            value={groupData.description}
            onChange={handleChange}
          />
          <Input
            name="color"
            placeholder="Color"
            value={groupData.color}
            onChange={handleChange}
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

export default CreateGroup;
