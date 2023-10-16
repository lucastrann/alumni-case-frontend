import React, { useState, useEffect } from 'react';
import KeycloakService from '../../services/KeycloakService';
import '../../components/css/Pages.css'
import { Button, Box, Text } from '@chakra-ui/react'

const Profile = () => {
  const [hasRole, setRole] = useState(false);

  useEffect(() => {
    // You can check the user's roles and update the state here
    const userHasRole = KeycloakService.hasRole(["User"]);
    setRole(userHasRole);
  }, []);

  return (
    <>
      <Box className='container'>
        {KeycloakService.isLoggedIn() ? (
          <>
          <Text className='title'>Your Profile</Text>
        <h1>{KeycloakService.getName()}</h1>
      <Button colorScheme='blue' onClick={KeycloakService.doLogout}>
              Logout
            </Button>
          </>
        ) : (
            <p> not logged in </p>
            )}
      </Box>
    </>
  );
};

export default Profile;