import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // To navigate if needed

function UserPlans() {
  const [userEmail, setUserEmail] = useState(null);
  const [userPlans, setUserPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the logged-in user's email
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email.toLowerCase()); // Normalize email for consistent querying
      } else {
        setUserEmail(null);
        setError('Please log in to view your plans.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch the user's selected plans from Firestore
  useEffect(() => {
    if (userEmail) {
      const fetchUserPlans = async () => {
        setLoading(true);
        setError(null);
        try {
          const q = query(collection(db, 'userPlans'), where('email', '==', userEmail));
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            setError('No plans found for this user.');
          } else {
            const plans = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUserPlans(plans); // Store the plans in state
          }
        } catch (error) {
          console.error('Error fetching user plans: ', error);
          setError('Error fetching your plans.');
        }
        setLoading(false);
      };

      fetchUserPlans();
    }
  }, [userEmail]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userEmail) {
    return <p>Please log in to see your selected plans.</p>;
  }

  return (
    <div className="user-plans">
      <h2>Your Selected Plans</h2>
      {userPlans.length === 0 ? (
        <p>You haven't selected any plans yet. <a href="/plans">Browse available plans</a></p>
      ) : (
        <ul>
          {userPlans.map((plan) => (
            <li key={plan.id}>
              <p><strong>Plan Name:</strong> {plan.planName}</p>
              <p><strong>Price:</strong> ${plan.price}</p>
              <p><strong>Status:</strong> {plan.status || 'Pending'}</p>
              <p><strong>Selected On:</strong> 
                {plan.timestamp ? new Date(plan.timestamp.seconds * 1000).toLocaleString() : 'N/A'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserPlans;
