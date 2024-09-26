import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Menu.css';

function Menu() {
  let [toggle, setToggle] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate hook

  let toggleMenu = () => {
    setToggle(toggle = !toggle);
  };

  // Function to handle navigation within the app
  const handleNavigation = (path) => {
    if (window.location.pathname !== '/') {
      navigate('/'); // Navigate to the home page if not already on it
    }
    setTimeout(() => {
      window.location.hash = path; // Scroll to the desired section after navigation
    }, 100); // Add a slight delay to ensure navigation before scrolling
  };

  return (
    <div className={`header__top`}>
      <div className='logo-container'>
        <a href="#home" className='logo text-lg' onClick={() => handleNavigation('#home')}>
          CloudVault
        </a> {/* Scroll to Home section */}
      </div>
      <nav className='navbar'>
        <a href="#" className='menu-toggle text-md' onClick={toggleMenu}>MENU</a>
        <ul className={`menu ${toggle && 'active'}`}>
          <li className='menu__item'>
            <a href="#home" className='menu__link text-md' onClick={() => handleNavigation('#home')}>
              Home
            </a>
          </li>
          <li className='menu__item'>
            <a href="#company" className='menu__link text-md' onClick={() => handleNavigation('#company')}>
              Company
            </a>
          </li>
          <li className='menu__item'>
            <a href="#services" className='menu__link text-md' onClick={() => handleNavigation('#services')}>
              Services
            </a>
          </li>
          <li className='menu__item'>
            <a href="#pricing" className='menu__link text-md' onClick={() => handleNavigation('#pricing')}>
              Pricing
            </a>
          </li>
          <li className='menu__item'>
            <a href="#software" className='menu__link text-md' onClick={() => handleNavigation('#software')}>
              Software
            </a>
          </li>
          <li className='menu__item'>
  <a className='menu__link text-md' onClick={() => navigate('/contact')}>
    Contact
  </a>
</li>

          <button className='btn-green-md menu-btn trans' onClick={() => navigate('/login')}>
            Get Started
          </button>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
