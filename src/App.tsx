import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Calendar from './pages/calendar/Calendar';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import KeycloakService from './services/KeycloakService';
import { ChakraProvider, CSSReset  } from '@chakra-ui/react'
import theme from './components/chakraUI/chakra-theme';
import withKeycloak from './hoc/withKeycloak';

const AuthenticatedCalendar = withKeycloak(Calendar);
const AuthenticatedProfile = withKeycloak(Profile);


function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <>
          <Navbar />
          <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
            </Routes>
        </>
        </BrowserRouter>

      </ChakraProvider>
  );
}

export default App;
