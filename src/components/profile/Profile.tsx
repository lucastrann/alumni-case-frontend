import React, { useState, useEffect } from 'react';
import KeycloakService from '../../services/KeycloakService';
import ApiService from '../../services/ApiService';
import '../css/Pages.css';
import { Button, Box, Text, Image, Flex, Input, Spinner, useColorMode } from '@chakra-ui/react'; // Added Spinner

const Profile = () => {
  const [hasRole, setRole] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState<{ name: string, picture: string, status: string, bio: string, funFact: string; } | null>(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const apiService = new ApiService('https://alumni-web.azurewebsites.net/api/v1/', `${KeycloakService.getToken()}`);
  const { colorMode, toggleColorMode } = useColorMode();

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

  console.log(KeycloakService.getToken())

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
      setLoading(true); // Start loading
      const data = await apiService.fetchUserData();
      setUserData(data);
      setLoading(false); // Loading is done
    } catch (error) {
      console.error(error);
      setLoading(false); // Loading finished with an error
    }
  };

  return (
    <Box className='container'
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      color={colorMode === 'light' ? 'gray.800' : 'white'}>
      {KeycloakService.isLoggedIn() ? (
        <>
          {loading ? (
            <Spinner size="xl" color="teal.500" /> // Show spinner while loading
          ) : (
              <Flex
                flexDir={['column', 'column', 'column', 'row']} // Change direction for mobile screens
                alignItems={['center', 'center', 'center', 'flex-start']} // Adjust alignment based on screen size
              >
                {/* Show the image at the top on mobile screens */}
                <Image
                  src={userData?.picture}
                  alt="User Profile"
                  boxSize={['120px', '120px', '120px', '200px']} // Adjust size for mobile screens
                  objectFit="cover"
                  borderRadius="full"
                  boxShadow="lg"
                  mb={['4', '4', '4', '0']}
                  mt={2}// Add margin bottom for spacing on mobile screens
                />
                <Box ml={['0', '0', '0', '10']}>
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
                          borderRadius={20}
                          bg={colorMode === 'light' ? 'light.buttonBg' : 'dark.buttonBg'}
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
          )}
          <Button
            borderRadius={20}
            mb={5}
            bg={colorMode === 'light' ? 'light.buttonBg' : 'dark.buttonBg'}
            onClick={handleEditClick}
          >
            Edit Settings
          </Button>
          <Button
            colorScheme='red'
            onClick={KeycloakService.doLogout}
          >
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
