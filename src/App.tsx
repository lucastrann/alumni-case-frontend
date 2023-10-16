import React from 'react';
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

function App() {
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
