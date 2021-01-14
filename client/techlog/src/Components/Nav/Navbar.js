import React from 'react';

import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({admin, logout, toggleMode}) => {
  return (
    <nav>
      <div className="navbar__banner">
        <i className="fas fa-cogs fa-3x"></i>
        <h1 className="navbar__title">TechLog</h1>
      </div>
      <div className="navbar__links">
        <Link to='/search'>Search</Link>
        <Link to='/new'>New</Link>
        {admin ? <Link to='/edit'>Edit</Link> : null}
        <Link to="/logout" onClick={logout}>Logout</Link>
        <button className="navbar__mode-switch" onClick={toggleMode}>Mode</button>
      </div>
    </nav>
  )
}

export default Navbar;