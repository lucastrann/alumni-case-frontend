import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import KeycloakService from './services/KeycloakService';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from './components/chakraUI/chakra-theme';
import withKeycloak from './hoc/withKeycloak';
import ApiService from './services/ApiService'; // Import the ApiService
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import GroupPage from './pages/GroupPage';
import UrlNotFoundPage from './pages/UrlNotFoundPage';

const apiService = new ApiService('alumni-web.azurewebsites.net/api/v1', `${KeycloakService.getToken()}`);

function App() {
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    // Use the ApiService to fetch user data by ID
    apiService.getUserById('lucas').then((data) => {
      setUserData(data);
    });
  }, []);

  // Check if the user is logged in
  const userLoggedIn = KeycloakService.isLoggedIn();
  const AuthenticatedNavbar = withKeycloak(Navbar);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <>
          <AuthenticatedNavbar />
          {userLoggedIn ? (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/group" element={<GroupPage />} />
              <Route path="/*" element={<UrlNotFoundPage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          )}
        </>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
