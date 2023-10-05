import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import KeycloakRoute from './routes/KeycloakRoute';
import { ROLES } from './const/roles';


function App() {
  
  return (
    <BrowserRouter>
    <Navbar />
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Calendar />} />
        <Route
          path="/profile"
          element={
            <KeycloakRoute role={ROLES.User}>
              <Profile />
            </KeycloakRoute>
          }
        />
      </Routes>
    </main>
  </BrowserRouter>
);
}

export default App;
