import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KeycloakService from '../../services/KeycloakService';
import './Login.css';
import { Box, Text } from '@chakra-ui/react';
import '../../components/css/Pages.css'

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
    <Box className="login container">
      <div className="background-image">
        <Text className="title">Welcome to Alumni</Text>
        <Text className="subtitle">Connect with fellow alumni</Text>
        <button className="login-keycloak-btn" onClick={handleLoginClick}>
          LOGIN
        </button>
      </div>
    </Box>
  ); 
};

export default Login;
