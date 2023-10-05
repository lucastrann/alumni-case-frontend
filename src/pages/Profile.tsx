import React from 'react';
import KeycloakService from '../services/KeycloakService';

const Profile = () => {
  return <><div>Profile Page</div><button onClick={KeycloakService.doLogout}>LOGOUT</button></>
};

export default Profile;