// PostCreate.js
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState('');

  const handlePost = () => {
    console.log(`HER ER INNLEGGET DITT: ${postText}`);
    setPostText('');
    onClose();
  };

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen}>
        Create Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>What's on your mind?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder='HVA SKAL DU SKRIVE?'
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={handlePost}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
