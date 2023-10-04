import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css'

function App() {

  return (
    <>
      <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
