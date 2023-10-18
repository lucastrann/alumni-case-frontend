import React from 'react';
import { Button, Box, Center, useDisclosure } from '@chakra-ui/react';
import ModalCreateGroup from '../modal/ModalCreateGroup';

const CreateGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center>
      <Box maxW="800px" p="4">
        <Button colorScheme="teal" onClick={onOpen}>
          Create New Group
        </Button>
        <ModalCreateGroup isOpen={isOpen} onClose={onClose} title="Create New Group" placeholder="Group Name" />
      </Box>
    </Center>
  );
};

export default CreateGroup;
