import React, { useState } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import ModalComponent from '../modal/ModalComponent';
import { userData } from './data';

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPostText, setNewPostText] = useState('');

  const generateRandomName = () => {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  const handlePost = (postText: string) => {
    const randomAuthorName = generateRandomName();
    const newPost = {
      id: userData.posts.length + 1,
      author: randomAuthorName,
      text: postText,
      timestamp: new Date().toUTCString(),
      comments: [] // Initialize comments as an empty array
    };

    userData.posts = [newPost, ...userData.posts];

    console.log(`New Post by ${randomAuthorName}: ${postText}`);

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
