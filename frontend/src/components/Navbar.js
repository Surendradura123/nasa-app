import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Optional: external CSS if you want to modularize

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🚀 NASA Explorer</Link>
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/mars' ? 'active' : ''}>
          <Link to="/mars">Mars Rover</Link>
        </li>
        <li className={location.pathname === '/epic' ? 'active' : ''}>
          <Link to="/epic">EPIC</Link>
        </li>
        <li className={location.pathname === '/neo' ? 'active' : ''}>
          <Link to="/neo">NEO</Link>
        </li>
        <li className={location.pathname === '/library' ? 'active' : ''}>
          <Link to="/library">Media Library</Link>
        </li>
       

      </ul>
    </nav>
  );
};

export default Navbar;
