import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
} from "@chakra-ui/react";
import UsersGroupModalProps from '../../types/UsersGroupModalProps';

const UsersGroupModal: React.FC<UsersGroupModalProps> = ({ isOpen, onClose, groupUsers }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Users in this Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {groupUsers.map((user) => (
              <Text key={user.id} fontSize="lg">
                {user.name}
              </Text>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UsersGroupModal;
