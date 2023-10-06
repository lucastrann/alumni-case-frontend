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
      <h1>hello</h1>
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
        <Login /> // Render the Login component when not authenticated
      )}
    </BrowserRouter>
  );
}

export default App;
