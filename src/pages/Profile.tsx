import React, { useState, useEffect } from 'react';
import KeycloakService from '../services/KeycloakService';

const Profile = () => {
  const [hasRole, setRole] = useState(false);

  useEffect(() => {
    // You can check the user's roles and update the state here
    const userHasRole = KeycloakService.hasRole(["Admin"]);
    setRole(userHasRole);
  }, []);

  return (
    <>
      <h1>VELKOMMEN {KeycloakService.getFirstName()}</h1>
      {hasRole ? (
        <p>User has the 'User' role</p>
      ) : (
        <p>User does not have the 'admin' role</p>
      )}
      <div>Profile Page</div>
      <button onClick={KeycloakService.doLogout}>LOGOUT</button>
    </>
  );
};

export default Profile;