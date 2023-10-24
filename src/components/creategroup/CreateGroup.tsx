import React from 'react';
import { Button, Box, Center, useDisclosure, useColorMode } from '@chakra-ui/react';
import ModalCreateGroup from '../modal/ModalCreateGroup';

const CreateGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Center>
      <Box maxW="800px" p="4">
        <Button bg={colorMode === 'light' ? 'light.buttonBg' : 'dark.buttonBg'} onClick={onOpen}>
          Create New Group
        </Button>
        <ModalCreateGroup isOpen={isOpen} onClose={onClose} title="Create New Group" placeholder="Group Name" />
      </Box>
    </Center>
  );
};

export default CreateGroup;
