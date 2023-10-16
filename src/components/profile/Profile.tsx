import React, { useState, useEffect } from 'react';
import KeycloakService from '../../services/KeycloakService';
import ApiService from '../../services/ApiService'; // Import the ApiService
import '../css/Pages.css';
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react';

const apiService = new ApiService('http://localhost:8080/api/v1/'); // Replace with your API base URL

const Profile = () => {
  const [hasRole, setRole] = useState(false);
  const [userData, setUserData] = useState<{ name: string, picture: string, status: string, bio: string, funFact: string; } | null>(null);


  useEffect(() => {
    const userHasRole = KeycloakService.hasRole(["User"]);
    setRole(userHasRole);

    if (KeycloakService.isLoggedIn()) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await apiService.fetchUserData();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };return (
    <Box className='container'>
      {KeycloakService.isLoggedIn() ? (
        <>
          <Text className='title'>Your Profile</Text>
          <Flex alignItems="center"> {/* Center-align elements */}
            <Image
              src={userData?.picture} // Use the picture from userData
              alt="User Profile"
              boxSize="200px" // Set the image size
              objectFit="cover" // Crop image to fit the box
              borderRadius="full" // Apply circular border-radius
              boxShadow="lg" // Add a shadow for a modern look
            />
<Box ml={10}>
  <Text fontSize="3xl" fontWeight="bold">{KeycloakService.getName()}</Text>
  <Text fontSize="xl" color="gray.500">{userData?.status}</Text>
  <Text fontSize="lg" color="gray.600">{userData?.bio}</Text>
  <Text fontSize="lg" fontStyle="italic" mt={2}>{userData?.funFact}</Text>
</Box>

          </Flex>
          <Button colorScheme='blue' onClick={KeycloakService.doLogout}>
            Logout
          </Button>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </Box>
  );
};
export default Profile;
