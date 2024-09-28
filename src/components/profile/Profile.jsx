import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // Assuming Firebase is being used for authentication and Firestore
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './profile.css';

function Profile() {
  const [userData, setUserData] = useState({
    fullName: '',
    membership: ''
  });

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        // Fetch user profile details from Firestore or another database if stored
        const userDoc = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          const userProfile = docSnapshot.data();
          setUserData({
            fullName: userProfile.fullName || 'User', // Ensure fullName field is being accessed correctly
            membership: userProfile.membership || 'Free' // Assuming membership is stored in Firestore
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate('/profile/edit'); // Navigate to the ProfileEdit page
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-username">Welcome, {userData.fullName}!</h1>
        <p className="profile-membership">Membership: {userData.membership}</p>
        
        <div className="profile-actions">
          <button className="btn edit-btn" onClick={handleEditProfile}>Edit Profile</button>
          <button className="btn contracts-btn">View Contracts</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
