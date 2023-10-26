import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  Flex,
} from '@chakra-ui/react';
import Event from '../../types/Event';

interface ModalViewEventProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent: Event | null;
}

const ModalViewEvent: React.FC<ModalViewEventProps> = ({
  isOpen,
  onClose,
  selectedEvent,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody padding={5}>
          {selectedEvent && (
            <>
              <Flex flexDirection="column" mt="3">
                <Text>
                  <strong>Title:</strong> <br />
                  {selectedEvent.title}
                </Text>
                <Text>
                  <strong>Content:</strong> <br />
                  {selectedEvent.content}
                </Text>
              </Flex>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalViewEvent;
