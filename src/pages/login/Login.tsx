import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KeycloakService from '../../services/KeycloakService';
import './Login.css';
import { Box, Text } from '@chakra-ui/react';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated and redirect to home
    if (KeycloakService.isLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLoginClick = () => {
    KeycloakService.doLogin();
  };

  return (
    <Box className="container">
      <Text className="title">Welcome to our app</Text>
      <button className="login-keycloak-btn" onClick={handleLoginClick}>
        LOGIN
      </button>
    </Box>
  );
};

export default Login;
