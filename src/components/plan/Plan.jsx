import React, { useEffect, useState } from 'react';
import './plan.css';
import PricingBox from '../main/pricing/box/PricingBox';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Import getDoc for fetching user data and updateDoc for updating user's document
import { useNavigate } from 'react-router-dom';

function Plan() {
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null); // To store user's ID for document update
  const [currentPlan, setCurrentPlan] = useState(null); // To store the current user's plan
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserEmail(user.email);
        setUserId(user.uid); // Set userId for document update

        // Fetch the user's subscription plan from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          if (userData.subscriptionPlan) {
            setCurrentPlan(userData.subscriptionPlan.planName); // Set the current plan
          }
        }
      } else {
        setUserEmail(null);
        navigate('/login'); // Redirect to login page if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSelectPlan = async (planName, price) => {
    if (!userEmail || !userId) {
      navigate('/login');
      return;
    }

    // If the user already has a subscription other than the "Basic Plan", redirect to the contracts page
    if (currentPlan && currentPlan !== 'Basic Plan') {
      navigate('/profile/contract'); // Redirect to the contracts page
      return;
    }

    try {
      // Update the user's document in the 'users' collection
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        subscriptionPlan: {
          planName: planName,
          price: price,
          status: 'Pending',
          timestamp: new Date(),
        },
      });

      navigate(`/payment?planName=${planName}&price=${price}`);
    } catch (error) {
      console.error('Error updating the plan: ', error);
    }
  };

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
            onSelectPlan={() => handleSelectPlan(plan.planName, plan.price)}
          />
        ))}
      </div>
    </div>
  );
}

export default Plan;
