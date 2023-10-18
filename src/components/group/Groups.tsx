import { SimpleGrid, VStack, Text, Badge, Box, Button, Collapse } from "@chakra-ui/react";
import ApiService from "../../services/ApiService";
import React, { useState, useEffect } from "react";

const apiService = new ApiService('http://localhost:8080/api/v1/'); // Replace with your API base URL

const Groups = () => {
  const [groups, setGroups] = useState<Array<{ id: number; name: string; description: string; color: string; private: boolean; }>>([]);
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const [groupUsers, setGroupUsers] = useState<{ id: string; name: string }[]>([]);

  const [userListVisible, setUserListVisible] = useState(false);

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
      fetchGroupUsers(groupId); // Fetch users for the selected group
      setUserListVisible(true);
    }
  };

  return (
    <>
      <SimpleGrid columns={2} spacing={4}>
        {groups.map((group) => (
          <Box key={group.id}>
            <VStack
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              onClick={() => handleGroupClick(group.id)}
              _hover={{ cursor: "pointer" }}
            >
              <Text fontSize="xl">{group.name}</Text>
              <Text color="gray.500">{group.description}</Text>
              {group.private && <Badge colorScheme="pink">Private</Badge>}
            </VStack>
            <Collapse in={userListVisible && group.id === activeGroupId}>
              <VStack borderWidth="1px" borderRadius="lg" p={4}>
                <Text fontSize="lg" fontWeight="bold">Users in this Group:</Text>
                {groupUsers.map((user) => (
                  <Text key={user.id} fontSize="md">{user.name}</Text>
                ))}
              </VStack>
            </Collapse>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Groups;
