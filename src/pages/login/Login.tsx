import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KeycloakService from '../../services/KeycloakService';
import './Login.css';

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
    <div className="container">
      <h2 className="title">Welcome to our app</h2>
      <button className="login-keycloak-btn" onClick={handleLoginClick}>
        LOGIN
      </button>
    </div>
  );
};

export default Login;
