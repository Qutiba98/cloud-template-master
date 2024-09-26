import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Import Firebase Auth and Firestore
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore query methods

function UserPlans() {
  const [userEmail, setUserEmail] = useState(null); // To store the logged-in user's email
  const [userPlans, setUserPlans] = useState([]); // To store the user's selected plans
  const [loading, setLoading] = useState(true); // Loading state for the query

  // Fetch the logged-in user's email
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email); // Set the logged-in user's email
      } else {
        setUserEmail(null); // No user is logged in
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch the user's selected plans from Firestore
  useEffect(() => {
    if (userEmail) {
      const fetchUserPlans = async () => {
        setLoading(true);
        try {
          // Query Firestore to get plans where email equals the logged-in user's email
          const q = query(collection(db, 'userPlans'), where('email', '==', userEmail));
          const querySnapshot = await getDocs(q);
          const plans = querySnapshot.docs.map((doc) => doc.data());
          setUserPlans(plans); // Store the plans in state
        } catch (error) {
          console.error('Error fetching user plans: ', error);
        }
        setLoading(false);
      };

      fetchUserPlans();
    }
  }, [userEmail]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userEmail) {
    return <p>Please log in to see your selected plans.</p>;
  }

  return (
    <div className="user-plans">
      <h2>Your Selected Plans</h2>
      {userPlans.length === 0 ? (
        <p>You haven't selected any plans yet.</p>
      ) : (
        <ul>
          {userPlans.map((plan, index) => (
            <li key={index}>
              <p><strong>Plan Name:</strong> {plan.planName}</p>
              <p><strong>Price:</strong> ${plan.price}</p>
              <p><strong>Selected On:</strong> {new Date(plan.timestamp.seconds * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserPlans;
