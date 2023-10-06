import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Calendar from './pages/calendar/Calendar';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import KeycloakService from './services/KeycloakService';

function App() {
  return (
    <BrowserRouter>
      {KeycloakService.isLoggedIn() ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
}

export default App;
