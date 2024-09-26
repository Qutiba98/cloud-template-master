import React, { useEffect, useState } from 'react';
import './Banner.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase Auth import

function Banner({ Ban }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  // Check the user's authentication status when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is signed in
      } else {
        setIsLoggedIn(false); // No user is signed in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/profile'); // Redirect to profile page if logged in
    } else {
      navigate('/login'); // Redirect to login page if not logged in
    }
  };

  return (
    <div className='banner'>
      <div className='banner__img-container'>
        <img src={Ban} alt="Banner_Image" className='banner__img' />
      </div>
      <div className='banner__text-container'>
        <p className='text-md banner__text'>CLOUD STORAGE SOLUTIONS</p>
        <p className='title-lg banner__title'>Secure</p>
        <p className='title-lg banner__title'>Scalable</p>
        <p className='title-lg banner__title'>Cloud Storage</p>
        <p className='text-md banner__text'>Store and manage your data with confidence,</p>
        <p className='text-md banner__text'>leveraging cutting-edge security and scalability</p>
        <p className='text-md banner__text'>for businesses of all sizes.</p>
        <button className='btn-green-lg banner__btn' onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Banner;
