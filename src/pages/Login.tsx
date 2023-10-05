import React from 'react';
import KeycloakService from '../services/KeycloakService';

const Login = () => {
  return <><div>Login Page</div><button onClick={KeycloakService.doLogin}></button></>;
};

export default Login;