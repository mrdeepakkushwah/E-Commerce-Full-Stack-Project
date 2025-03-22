import { useState } from 'react';
import { ShoppingCart, UserRoundPen, AlignJustify } from 'lucide-react';
import './navbar.css';
import { NavLink } from "react-router-dom";
import ContactPage from './ContactPage';
import Profile from './Profile';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Updated state name for clarity

  const handleToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen); // Toggle profile visibility
  };

  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="navbar-toggle" id="mobile-menu" onClick={handleToggle}>
          <AlignJustify />
        </div>
        <div className="navbar-brand">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGVRHUJ8XCvEh6I-Rhc5x0_v8Pi2GdCOP4RxGMpsil3pbiBt_Ps7Kn-vT5pgcS7JkCVs&usqp=CAU"
            alt=""
          />
        </div>
        <ul className={`navbar-links ${isMobileMenuOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/">Products</NavLink>
          </li>
          <li className="dropdown">
            <NavLink to="#category" className="dropbtn">
              Category
            </NavLink>
            <div className="dropdown-content">
              <NavLink to="/Electronics">Electronics</NavLink>
              <NavLink to="/fashion">Fashion</NavLink>
              <NavLink to="/more">More Categories</NavLink>
            </div>
          </li>
          <li>
            <NavLink to="/Contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
      <nav className="navbar-2">
        <ul className="navbar-links-right">
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              <ShoppingCart size={30} />
            </NavLink>
          </li>
          <li>
            <div onClick={toggleProfile} className="profile-icon">
              <UserRoundPen size={30} />
            </div>
            {isProfileOpen && <Profile />} </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

