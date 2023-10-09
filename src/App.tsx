import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Calendar from './pages/calendar/Calendar';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import KeycloakService from './services/KeycloakService';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
        <>
          <Navbar />
        </>
      </BrowserRouter>
      </ChakraProvider>
  );
}

export default App;
