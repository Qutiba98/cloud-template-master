import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'; // Import SweetAlert2

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(''); // Date of birth
  const [phone, setPhone] = useState(''); // Phone number
  const [street, setStreet] = useState(''); // Street address
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState(''); // ZIP/Postal code
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      // Firebase login
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userId = userCredential.user.uid;
          console.log('Logged in as:', userId);

          // Display success popup
          Swal.fire({
            icon: 'success',
            title: 'Logged in successfully!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            navigate('/profile'); // Navigate to profile on successful login
          });
        })
        .catch((err) => setError(err.message));
    } else {
      // Firebase sign up
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const userId = userCredential.user.uid;
          console.log('Registered as:', userId);

          // Store additional user info in Firestore
          await setDoc(doc(db, 'users', userId), {
            fullName: fullName,
            email: email,
            dateOfBirth: dob,
            phoneNumber: phone,
            address: {
              street: street,
              city: city,
              state: state,
              country: country,
              zip: zip,
            },
            createdAt: new Date(),
          });

          // Display success popup
          Swal.fire({
            icon: 'success',
            title: 'Registration successful!',
            text: 'Please log in to access your account.',
            showConfirmButton: true,
            confirmButtonText: 'Go to Profile',
          }).then(() => {
            navigate('/profile'); // Navigate to profile page after sign up
          });
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <div className='auth-page'>
      <div className='auth-card'>
        <h2 className='auth-title'>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form className={`auth-form ${!isLogin ? 'signup-form' : ''}`} onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type='text'
                placeholder='Full Name'
                className='auth-input'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type='date'
                placeholder='Date of Birth'
                className='auth-input'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
              <input
                type='tel'
                placeholder='Phone Number'
                className='auth-input'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type='text'
                placeholder='Street Address'
                className='auth-input'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
              <input
                type='text'
                placeholder='City'
                className='auth-input'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type='text'
                placeholder='State'
                className='auth-input'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
              <input
                type='text'
                placeholder='Country'
                className='auth-input'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <input
                type='text'
                placeholder='ZIP/Postal Code'
                className='auth-input'
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </>
          )}
          <input
            type='email'
            placeholder='Email'
            className='auth-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            className='auth-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="auth-error">{error}</p>}
          
          <button type='submit' className='auth-btn'>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className='auth-toggle'>
          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} className='auth-link'>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
