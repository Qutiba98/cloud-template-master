import React, { useEffect, useState } from 'react';
import './plan.css';
import PricingBox from '../main/pricing/box/PricingBox';
import { auth, db } from '../../firebase'; // Import Firebase Auth and Firestore
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods for adding documents
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

function Plan() {
  const [userEmail, setUserEmail] = useState(null); // To store the logged-in user's email
  const navigate = useNavigate(); // For navigation

  // UseEffect to get the logged-in user's email
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email); // Set the logged-in user's email
      } else {
        setUserEmail(null); // No user is logged in
        navigate('/login'); // Redirect to login page if not logged in
      }
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, [navigate]);

  // Function to handle selecting a plan and navigating to the payment page
  const handleSelectPlan = async (planName, price) => {
    if (!userEmail) {
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
      navigate(`/payment?planName=${planName}&price=${price}`); // Navigate to the Payment page with selected plan details
    } catch (error) {
      console.error('Error saving the plan: ', error);
    }
  };

  // Pricing plan data (you can replace this with data from your backend)
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
    <div className='plan'>
      <div className='plan-title-container'>
        <h2 className='title-lg plan-title'>Choose Your Plan</h2>
      </div>
      <div className='plan-box-container'>
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

export default Plan;
