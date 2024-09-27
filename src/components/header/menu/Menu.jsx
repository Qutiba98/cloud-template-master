import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import { auth } from '../../../firebase';


function Menu() {
  let [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(null); // Manage user session state
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to user authentication state changes (assuming you're using Firebase auth)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set user if logged in, otherwise set to null
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setToggle(toggle = !toggle);
  };

  const handleNavigation = (path) => {
    if (window.location.pathname !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      window.location.hash = path; // Scroll to the desired section after navigation
    }, 100); // Add a slight delay to ensure navigation before scrolling
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/'); // Redirect to home after logout
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div className={`header__top`}>
      <div className='logo-container'>
        <a href="#home" className='logo text-lg' onClick={() => handleNavigation('#home')}>
          CloudVault
        </a>
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

          {/* Conditionally render either Sign Up button or user dropdown */}
          {!user ? (
            <button className='btn-green-md menu-btn trans' onClick={() => navigate('/login')}>
              Register
            </button>
          ) : (
            <div className="dropdown">
              <button className="dropbtn">{user.displayName || user.email}</button>
              <div className="dropdown-content">
                <a onClick={() => navigate('/profile')}>Profile</a>
                <a onClick={handleLogout}>Logout</a>
              </div>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
