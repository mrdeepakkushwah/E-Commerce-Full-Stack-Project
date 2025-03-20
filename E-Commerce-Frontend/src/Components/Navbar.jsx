import React from 'react';
import './navbar.css';
import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <div className="nav-container">
      <nav className="navbar">
        {/* <div className="navbar-brand"><img src="" alt="" /></div> */}
        <div className="navbar-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className="navbar-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/">Products</NavLink></li>
          <li className="dropdown">
            <NavLink to="#category" className="dropbtn">Category</NavLink>
            <div className="dropdown-content">
              <NavLink to="/Electronics">Electronics</NavLink>
              <NavLink to="/fashion">Fashion</NavLink>
              <NavLink to="/more">More Categories</NavLink>
            </div>
          </li>
          <li><NavLink to="/">Contact</NavLink></li>
      </ul>

        <ul className='navbar-links'>
          <li>
            <NavLink to="/logout">Logout</NavLink></li>
          <li>
            <NavLink to="/cart">
            <i class="fa-light fa-cart-shopping"></i>
            </NavLink>

          </li>
          <li>
            <NavLink to="/profile">My Profile</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
