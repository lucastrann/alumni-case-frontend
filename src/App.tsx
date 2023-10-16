import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Calendar from './pages/calendar/Calendar';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import UrlNotFound from './pages/urlNotFound/UrlNotFound'
import KeycloakService from './services/KeycloakService';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from './components/chakraUI/chakra-theme';
import withKeycloak from './hoc/withKeycloak';
import Group from './pages/group/Group';

import ApiService from './services/ApiService'; // Import the ApiService

const apiService = new ApiService('http://localhost:8080/api/v1'); // Initialize the service with your API base URL

function App() {
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    // Use the ApiService to fetch user data by ID
    apiService.getUserById('9e8ae4c6-7901-4ce3-b562-395fc411e006').then((data) => {
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
              <Route path="/" element={<Home />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/group" element={<Group />} />
              <Route path="/*" element={<UrlNotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
                </Routes>
          )}
        </>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
