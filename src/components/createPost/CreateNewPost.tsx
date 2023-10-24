import React from 'react';
import { Button, Box, Center, useDisclosure } from '@chakra-ui/react';
import ModalCreatePost from '../modal/ModalCreatePost';

const CreateGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center>
      <Box maxW="800px" p="4">
        <Button colorScheme="teal" onClick={onOpen}>
          Create New Post
        </Button>
        <ModalCreatePost isOpen={isOpen} onClose={onClose} title="Create a post" placeholder="helo" />
      </Box>
    </Center>
  );
};

export default CreateGroup;
