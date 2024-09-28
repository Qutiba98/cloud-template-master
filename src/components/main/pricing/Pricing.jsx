import React, { useEffect, useState } from 'react';
import './Pricing.css';
import PricingBox from './box/PricingBox';
import { auth } from '../../../firebase'; // Firebase Auth import only since Firestore is not needed for this change
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
  const handleSelectPlan = (planName, price) => {
    if (!userEmail) {
      // If the user is not logged in, navigate to the login page
      navigate('/login');
    } else {
      // Navigate to the plan page with the selected plan details
      navigate(`/plan?name=${planName}&price=${price}`);
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
