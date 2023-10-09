import React, { useState, useEffect } from 'react';
import KeycloakService from '../../services/KeycloakService';
import '../Pages.css'
import { Button } from '@chakra-ui/react'

const Profile = () => {
  const [hasRole, setRole] = useState(false);

  useEffect(() => {
    // You can check the user's roles and update the state here
    const userHasRole = KeycloakService.hasRole(["User"]);
    setRole(userHasRole);
  }, []);

  return (
    <>
      <div className='container'>
      <div className='title'>Your Profile</div>
      <h1>{KeycloakService.getUsername()}</h1>
      <Button colorScheme='blue' onClick={KeycloakService.doLogout}>
              Post
            </Button>
      </div>
    </>
  );
};

export default Profile;