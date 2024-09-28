import React, { useEffect, useState } from 'react';
import './Pricing.css';
import PricingBox from './box/PricingBox';
import { auth, db } from '../../../firebase'; // Import Firebase Auth and Firestore
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods for adding documents
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

function Pricing() {
  const [userEmail, setUserEmail] = useState(null); // To store the logged-in user's email
  const navigate = useNavigate(); // For navigation

  // UseEffect to get the logged-in user's email
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email); // Set the logged-in user's email
      } else {
        setUserEmail(null); // No user is logged in
      }
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Function to handle selecting a plan
  const handleSelectPlan = async (planName, price) => {
    if (!userEmail) {
      alert('You need to be logged in to select a plan.');
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }

    try {
      // Add a new document in Firestore for the selected plan under the 'userPlans' collection
      await addDoc(collection(db, 'userPlans'), {
        email: userEmail,
        planName: planName,
        price: price,
        timestamp: new Date(),
      });
      navigate(`/plan?name=${planName}&price=${price}`); // Navigate to the Plan page with selected plan details
    } catch (error) {
      console.error('Error saving the plan: ', error);
    }
  };

  // Pricing plan data
  const pricingPlans = [
    {
      planName: 'Basic Plan',
      price: 0,
      isFree: true,
      features: ['50 GB Bandwidth', '500 GB Storage', '$1.00 / GB Overages', 'Limited features'],
    },
    {
      planName: 'Pro Plan',
      price: 9.99,
      isFree: false,
      features: ['500 GB Bandwidth', '200 GB Storage', '$0.50 / GB Overages', 'Priority Support'],
    },
    {
      planName: 'Business Plan',
      price: 19.99,
      isFree: false,
      features: ['1 TB Bandwidth', '500 GB Storage', '$0.25 / GB Overages', '24/7 Support'],
    },
    {
      planName: 'Enterprise Plan',
      price: 49.99,
      isFree: false,
      features: ['Unlimited Bandwidth', '2 TB Storage', 'No Overage Charges', 'Dedicated Support'],
    },
  ];

  return (
    <div className='pricing'>
      <div className='pricing-title-container'>
        <h2 className='title-lg pricing-title'>Our Best Pricing</h2>
      </div>
      <div className='pricing-box-container'>
        {pricingPlans.map((plan, index) => (
          <PricingBox
            key={index}
            planName={plan.planName}
            price={plan.price}
            isFree={plan.isFree}
            features={plan.features}
            onSelectPlan={() => handleSelectPlan(plan.planName, plan.price)} // Pass the handleSelectPlan function
          />
        ))}
      </div>
    </div>
  );
}

export default Pricing;
