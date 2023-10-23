import React, { useState, useEffect } from 'react';
import KeycloakService from '../../services/KeycloakService';
import ApiService from '../../services/ApiService';
import '../css/Pages.css';
import { Button, Box, Text, Image, Flex, Input } from '@chakra-ui/react';


const Profile = () => {
  const [hasRole, setRole] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState<{ name: string, picture: string, status: string, bio: string, funFact: string; } | null>(null);
  const apiService = new ApiService('https://alumni-web.azurewebsites.net/api/v1/', `${KeycloakService.getToken()}`);

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
      apiService.updateUser(`users/${KeycloakService.getUserId()}`, {
        name: userData?.name,
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

  console.log(KeycloakService.getToken())


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
          <Flex alignItems="center"> {/* Center-align elements */}
            <Image
              src={userData?.picture} 
              alt="User Profile"
              boxSize="200px"
              objectFit="cover"
              borderRadius="full"
              boxShadow="lg" 
            />
            <Box ml={10}>
              <Text fontSize="2xl" fontWeight="bold">{userData?.name}</Text>
              {isEditMode ? (
                // Render editable fields when in edit mode
                <form onSubmit={handleSaveClick}>
                  <Box
                    p={4}  // Add padding for spacing inside the box
                    mb={4} // Add margin-bottom for spacing between the box and other elements
                    borderWidth="1px" // Set border width
                    borderColor={isEditMode ? 'teal.500' : 'gray.300'} // Change border color when in edit mode
                    borderRadius="md" // Add border radius for a rounded appearance
                  >
                    <Box mb={4}>
                      <label>Picture LINK:</label>
                      <Input
                        value={userData?.picture}
                        onChange={(e) => handleFieldChange('picture', e.target.value)}
                      />
                    </Box>
                    <Box mb={4}>
                      <label>Name:</label>
                      <Input
                        value={userData?.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                      />
                    </Box>
                    <Box mb={4}>
                      <label>Status:</label>
                      <Input
                        value={userData?.status}
                        onChange={(e) => handleFieldChange('status', e.target.value)}
                      />
                    </Box>
                    {/* Bio */}
                    <Box mb={4}>
                      <label>Bio:</label>
                      <Input
                        value={userData?.bio}
                        onChange={(e) => handleFieldChange('bio', e.target.value)}
                      />
                    </Box>
                    {/* Fun Fact */}
                    <Box mb={4}>
                      <label>Fun Fact:</label>
                      <Input
                        value={userData?.funFact}
                        onChange={(e) => handleFieldChange('funFact', e.target.value)}
                      />
                    </Box>
                  </Box>
                  <div>
                    <Button
                      colorScheme="teal"
                      mr={4}
                      mb={5}
                      onClick={handleSaveClick}
                    >
                      Save
                    </Button>
                    <Button
                      mb={5}
                      colorScheme="blue"
                      onClick={handleCancelClick}
                    >
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
          <Button colorScheme='red' onClick={KeycloakService.doLogout}>
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
