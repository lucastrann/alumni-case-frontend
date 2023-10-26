import React from 'react';
import { Button, Box, Center, useDisclosure, useColorMode } from '@chakra-ui/react';
import ModalCreatePost from '../modal/ModalCreatePost';

const CreateGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Center>
      <Box maxW="800px" p="4">
        <Button
          borderRadius={20}
          bg={colorMode === 'light' ? 'light.buttonBg' : 'dark.buttonBg'}
          onClick={onOpen}>
          Create New Post
        </Button>
        <ModalCreatePost isOpen={isOpen} onClose={onClose} title="Create a post" placeholder="Write your post here..." />
      </Box>
    </Center>
  );
};

export default CreateGroup;
