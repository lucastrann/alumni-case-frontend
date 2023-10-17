import React, { useState, useEffect } from 'react';
import KeycloakService from '../../services/KeycloakService';
import ApiService from '../../services/ApiService'; // Import the ApiService
import '../css/Pages.css';
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react';

const apiService = new ApiService('http://localhost:8080/api/v1'); // Replace with your API base URL

const Profile = () => {
  const [hasRole, setRole] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState<{ name: string, picture: string, status: string, bio: string, funFact: string; } | null>(null);

  const handleEditClick = () => {
  setIsEditMode(true);
  };
  
  const handleFieldChange = (fieldName: string, value: string) => {
    setUserData((prevData) => ({
      ...prevData as { name: string, picture: string, status: string, bio: string, funFact: string },
      [fieldName]: value,
    }));
  };
  
  
  
  const handleSaveClick = () => {
    console.log('handleSaveClick called');
    try { 
      apiService.updateUser("user/lucas", {
        picture: userData?.picture,
        status: userData?.status,
        bio: userData?.bio,
        funFact: userData?.funFact,
      });
      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };
  
  const handleCancelClick = () => {
    fetchUserData();
    setIsEditMode(false);
  };
  

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
  };
  
  return (
    <Box className='container'>
      {KeycloakService.isLoggedIn() ? (
        <>
          <Text className='title'>Your Profile</Text>
          <p>{ KeycloakService.getToken()}</p>
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
  {isEditMode ? (
    // Render editable fields when in edit mode
                <form onSubmit={handleSaveClick}>
                  
                  <div>
                                        <label>Picture LINK:</label>
                    <input
          type="text"
          value={userData?.picture}
          onChange={(e) => handleFieldChange('picture', e.target.value)}
        />
                  </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          value={userData?.status}
          onChange={(e) => handleFieldChange('status', e.target.value)}
        />
      </div>
      <div>
        <label>Bio:</label>
        <input
          type="text"
          value={userData?.bio}
          onChange={(e) => handleFieldChange('bio', e.target.value)}
        />
      </div>
      <div>
        <label>Fun Fact:</label>
        <input
          type="text"
          value={userData?.funFact}
          onChange={(e) => handleFieldChange('funFact', e.target.value)}
        />
      </div>
      <div>
        <Button type="submit" onClick={handleSaveClick}>Save</Button>
        <Button type="button" onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
    </form>
  ) : (
    // Render user data when not in edit mode
    <>
      <Text fontSize="xl" color="gray.500">
        {userData?.status}
      </Text>
      <Text fontSize="lg" color="gray.600">
        {userData?.bio}
      </Text>
      <Text fontSize="lg" fontStyle="italic" mt={2}>
        {userData?.funFact}
      </Text>
    </>
  )}
</Box>

          </Flex>
          <Button
            mb={5}
            colorScheme="teal" onClick={handleEditClick}>
  Edit Settings
</Button>
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

export default React.memo(Profile);
