import React, { useState, useEffect } from 'react';
import KeycloakService from '../../services/KeycloakService';
import '../Pages.css'

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
        <button onClick={KeycloakService.doLogout}>LOGOUT</button>
        {hasRole ? (
          <p>has role</p>
        ) : (<p>no role</p>)}
      </div>
    </>
  );
};

export default Profile;