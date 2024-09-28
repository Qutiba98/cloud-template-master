import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import { auth, db } from '../../../firebase'; // Ensure you import db for Firestore access
import { doc, getDoc } from 'firebase/firestore';

function Menu() {
  let [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(null); // Manage user session state
  const [userName, setUserName] = useState(''); // Manage user's name
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to user authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user); // Set the user object

        // Check if the displayName is available in the Firebase Auth user object
        if (user.displayName) {
          setUserName(user.displayName); // Set the displayName from the user object
        } else {
          // If no displayName, fetch the name from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const docSnapshot = await getDoc(userDocRef);

          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setUserName(userData.fullName || user.email); // Use fullName from Firestore or fall back to email
          }
        }
      } else {
        setUser(null);
        navigate('/login'); // Redirect to login if no user is logged in
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

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
              <button className="dropbtn">{userName}</button> {/* Display user's name */}
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
