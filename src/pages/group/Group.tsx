import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';
import { Box, Text, SimpleGrid, VStack, Badge } from '@chakra-ui/react';
import '../../components/css/Pages.css'

const apiService = new ApiService('http://localhost:8080/api/v1/'); // Replace with your API base URL

const Group = () => {
  const [groups, setGroups] = useState<Array<{ id: number; name: string; description: string; color: string; private: boolean; }>>([]);

  useEffect(() => {
    // Fetch groups when the component mounts
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const data = await apiService.getAllGroups();
      setGroups(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box className='container'>
        <Text className='title'>Group page</Text>
        <SimpleGrid columns={2} spacing={4}>
          {groups.map((group) => (
            <VStack key={group.id} borderWidth="1px" borderRadius="lg" p={4}>
              <Text fontSize="xl">{group.name}</Text>
              <Text color="gray.500">{group.description}</Text>
              {group.private && <Badge colorScheme="pink">Private</Badge>}
            </VStack>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Group;
