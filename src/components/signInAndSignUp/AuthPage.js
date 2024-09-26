import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AuthPage.css';
import { auth } from '../../firebase'; // Firebase configuration
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      // Firebase login
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('Logged in as:', userCredential.user);
          navigate('/'); // Navigate to dashboard on successful login
        })
        .catch((err) => setError(err.message));
    } else {
      // Firebase sign up
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('Registered as:', userCredential.user);
          navigate('/'); // Navigate to dashboard on successful sign up
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <div className='auth-page'>
      <div className='auth-card'>
        <h2 className='auth-title'>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form className='auth-form' onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type='text'
              placeholder='Full Name'
              className='auth-input'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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
