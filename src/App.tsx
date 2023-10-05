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
      <h1>hello</h1>
      <button onClick={KeycloakService.doLogout}>LOGOUT</button>
      <button onClick={KeycloakService.doLogin}>LOGIN</button>
      <h1>VELKOMMEN {KeycloakService.getUsername()}</h1>
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
