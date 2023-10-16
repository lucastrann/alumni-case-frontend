import React, { useState } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import ModalComponent from '../modal/ModalComponent';
import { userData } from '../home/data';
import KeycloakService from '../../services/KeycloakService';

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const author = KeycloakService.getUsername()

  const handlePost = (postText: string) => {
    const newPost = {
      id: userData.posts.length + 1,
      author: author,
      text: postText,
      timestamp: new Date().toUTCString(),
      comments: [] // Initialize comments as an empty array
    };

    console.log(newPost);

    userData.posts = [newPost, ...userData.posts];

    onClose();
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
