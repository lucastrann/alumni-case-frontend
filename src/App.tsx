import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import KeycloakService from './services/KeycloakService';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <button onClick={KeycloakService.doLogout}>Logout</button>
      <button onClick={KeycloakService.doLogin}>Login</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
