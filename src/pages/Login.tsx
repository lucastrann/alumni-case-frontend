import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KeycloakService from '../services/KeycloakService';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated and redirect to home
    if (KeycloakService.isLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <div>Login Page</div>
      <button onClick={KeycloakService.doLogin}>LOGIN</button>
    </>
  );
};

export default Login;
