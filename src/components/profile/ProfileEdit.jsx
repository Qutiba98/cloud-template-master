import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // Assuming Firebase is being used for authentication and Firestore
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './profileEdit.css';

function ProfileEdit() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    membership: '',
    dateOfBirth: '',
    address: {
      city: '',
      country: '',
      state: '',
      street: '',
      zip: ''
    }
  });

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          const userProfile = docSnapshot.data();
          setFormData({
            fullName: userProfile.fullName || '',
            email: user.email, // Email from Firebase Auth
            phoneNumber: userProfile.phoneNumber || '',
            membership: userProfile.membership || 'Free',
            dateOfBirth: userProfile.dateOfBirth || '',
            address: {
              city: userProfile.address?.city || '',
              country: userProfile.address?.country || '',
              state: userProfile.address?.state || '',
              street: userProfile.address?.street || '',
              zip: userProfile.address?.zip || ''
            }
          });
        }
      }
    };

    fetchUserData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle form submission
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      try {
        await updateDoc(userDoc, {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          membership: formData.membership,
          dateOfBirth: formData.dateOfBirth,
          address: formData.address
        });
        alert('Profile updated successfully!');
        navigate('/profile'); // Redirect to the profile page after success
      } catch (error) {
        console.error("Error updating profile: ", error);
        alert('Error updating profile.');
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Edit Profile</h1>
        <form onSubmit={handleSaveChanges} className="profile-form">
  <div className="form-group">
    <label htmlFor="fullName">Full Name:</label>
    <input
      type="text"
      id="fullName"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      disabled
    />
  </div>
  <div className="form-group">
    <label htmlFor="phoneNumber">Phone Number:</label>
    <input
      type="text"
      id="phoneNumber"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="membership">Membership:</label>
    <input
      type="text"
      id="membership"
      name="membership"
      value={formData.membership}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="dateOfBirth">Date of Birth:</label>
    <input
      type="date"
      id="dateOfBirth"
      name="dateOfBirth"
      value={formData.dateOfBirth}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="address.city">City:</label>
    <input
      type="text"
      id="address.city"
      name="address.city"
      value={formData.address.city}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="address.state">State:</label>
    <input
      type="text"
      id="address.state"
      name="address.state"
      value={formData.address.state}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="address.street">Street:</label>
    <input
      type="text"
      id="address.street"
      name="address.street"
      value={formData.address.street}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="address.zip">Zip:</label>
    <input
      type="text"
      id="address.zip"
      name="address.zip"
      value={formData.address.zip}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="address.country">Country:</label>
    <input
      type="text"
      id="address.country"
      name="address.country"
      value={formData.address.country}
      onChange={handleChange}
    />
  </div>
  <button type="submit" className="btn save-btn">Save Changes</button>
</form>

      </div>
    </div>
  );
}

export default ProfileEdit;
