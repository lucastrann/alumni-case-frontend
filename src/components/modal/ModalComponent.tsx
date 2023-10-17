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

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (text: string) => void;
  title: string;
  placeholder: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, onConfirm, title, placeholder }) => {
  const [text, setText] = useState('');

  const handleConfirm = () => {
    onConfirm(text);
    setText('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder={placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
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

export default ModalComponent;
