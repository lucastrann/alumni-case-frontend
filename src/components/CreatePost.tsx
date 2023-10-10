import React, { useState } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import ModalComponent from './modal/ModalComponent';

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePost = (postText: string) => { // Add explicit type 'string'
    console.log(`HER ER INNLEGGET DITT: ${postText}`);
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Create Post
      </Button>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handlePost}
        title="What's on your mind?"
        placeholder="HVA SKAL DU SKRIVE?"
      />
    </>
  );
};

export default CreatePost;
