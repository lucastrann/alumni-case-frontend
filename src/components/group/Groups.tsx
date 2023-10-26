import React, { useState, useEffect } from 'react';
import {
  SimpleGrid,
  VStack,
  Text,
  Badge,
  Box,
  Button,
  Collapse,
  Spinner,
  useColorMode, // Import the Spinner component
} from "@chakra-ui/react";
import ApiService from "../../services/ApiService";
import KeycloakService from "../../services/KeycloakService";
import UsersGroupModal from '../modal/UsersGroupModal';

const Groups = () => {
  const [groups, setGroups] = useState<Array<{
    isLoading: any; id: number; name: string; description: string; color: string; private: boolean; 
}>>([]);
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const [groupUsers, setGroupUsers] = useState<{ id: string; name: string }[]>([]);
  const apiService = new ApiService('https://alumni-web.azurewebsites.net/api/v1/', `${KeycloakService.getToken()}`);
  const { colorMode, toggleColorMode } = useColorMode();
  const [userListVisible, setUserListVisible] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const data = await apiService.getAllGroups();
      setGroups(data);
      setLoading(false); 
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGroupUsers = async (groupId: number) => {
    try {
      const data = await apiService.getGroupUsers(groupId);
      setGroupUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGroupClick = (groupId: number) => {
    if (groupId === activeGroupId) {
      setActiveGroupId(null);
      setUserListVisible(false);
    } else {
      setActiveGroupId(groupId);
      fetchGroupUsers(groupId); 
      setUserListVisible(true);
    }
  };

  return (
    <Box p={2} maxW={['95%', '800px']} position="relative">
      {loading ? (
        // Display a spinner while loading data
        <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" />
      ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
            {groups.map((group) => (
              <Box key={group.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                width="250px"
                maxW="xl"
                bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                color={colorMode === 'light' ? 'gray.800' : 'white'}
              >
                <VStack
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  onClick={() => handleGroupClick(group.id)}
                  _hover={{ cursor: "pointer" }}
                >
                  <Text fontSize="xl">{group.name}</Text>
                  <Text color="gray.500">{group.description}</Text>
                  {group.private && <Badge colorScheme={group.color}>Color</Badge>}
                </VStack>
                <UsersGroupModal
                  isOpen={userListVisible && group.id === activeGroupId}
                  onClose={() => setUserListVisible(false)}
                  groupUsers={groupUsers}
                />
              </Box>
            ))}
          </SimpleGrid>
      )}
    </Box>
  );
};

export default Groups;
