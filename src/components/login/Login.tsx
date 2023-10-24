import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KeycloakService from '../../services/KeycloakService';
import './Login.css';
import { Box, Text } from '@chakra-ui/react';
import '../../components/css/Pages.css'
import ApiService from '../../services/ApiService';

const Login = () => {
  const navigate = useNavigate();

  const apiService = new ApiService('https://alumni-web.azurewebsites.net/api/v1/', `${KeycloakService.getToken()}`);

  useEffect(() => {
    if (KeycloakService.isLoggedIn()) {
      apiService.addNewUser();
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
