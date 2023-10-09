import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Calendar from '../../pages/calendar/Calendar';
import Profile from '../../pages/Profile';
import Login from '../../pages/login/Login';
import './Navbar.css'; 

const Navbar: React.FC = () => {
  return (

    <>
    <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
        </nav>
      </>
  );
};

export default Navbar;
