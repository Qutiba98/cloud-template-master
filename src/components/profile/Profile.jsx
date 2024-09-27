import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // Assuming Firebase is being used for authentication and Firestore
import { doc, getDoc } from 'firebase/firestore';
import './profile.css';

function Profile() {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    createdAt: '',
    lastLogin: '',
    membership: '',
    accountId: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        // Fetch user profile details from Firestore or other database if stored
        const userDoc = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          const userProfile = docSnapshot.data();
          setUserData({
            fullName: userProfile.fullName || 'N/A',
            email: user.email,
            phoneNumber: userProfile.phoneNumber || 'N/A',
            createdAt: user.metadata.creationTime,
            lastLogin: user.metadata.lastSignInTime,
            membership: userProfile.membership || 'Free', // Assuming membership is stored in Firestore
            accountId: userProfile.username || user.uid // Either a username or fallback to user ID
          });
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <h1>Welcome to your Profile, {userData.fullName}!</h1>
      <div className="profile-details">
        <p><strong>Full Name:</strong> {userData.fullName}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
        <p><strong>Account Created At:</strong> {userData.createdAt}</p>
        <p><strong>Last Login:</strong> {userData.lastLogin}</p>
        <p><strong>Membership Type:</strong> {userData.membership}</p>
        <p><strong>Account ID/Username:</strong> {userData.accountId}</p>
      </div>
    </div>
  );
}

export default Profile;
