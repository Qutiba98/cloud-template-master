import React, { useState, useEffect } from 'react';
import './payment.css';
import { db, auth } from '../../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; // Import Firestore functions
import Swal from 'sweetalert2';
import '@dotlottie/player-component';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Payment() {
  const [creditCard, setCreditCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });
  const [subscription, setSubscription] = useState(null); // State for subscription plan details
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch the authenticated user and subscription plan from Firestore
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);

        try {
          // Query Firestore to find the user's selected plan by email
          const planQuery = query(collection(db, 'userPlans'), where('email', '==', user.email));
          const planSnapshot = await getDocs(planQuery);

          if (!planSnapshot.empty) {
            const planDoc = planSnapshot.docs[0]; // Assuming there's only one plan per user
            setSubscription(planDoc.data()); // Store the plan details in state
          } else {
            setError('No subscription plan found. Please select a plan first.');
          }
        } catch (err) {
          console.error('Error fetching subscription plan:', err);
          setError('Error fetching subscription plan.');
        }
      } else {
        setUser(null);
        setError('Please log in to make a payment.');
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle input changes for credit card details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({ ...creditCard, [name]: value });
  };

  // Validate credit card number
  const isValidCreditCard = (number) => {
    const regex = /^\d{16}$/;
    return regex.test(number.replace(/\s/g, ''));
  };

  // Validate expiry date (MM/YY format)
  const isValidExpiry = (expiry) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regex.test(expiry);
  };

  // Validate CVV
  const isValidCVV = (cvv) => {
    const regex = /^\d{3}$/;
    return regex.test(cvv);
  };

  // Handle payment form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('Please log in to complete the payment.');
      return;
    }

    if (!isValidCreditCard(creditCard.number)) {
      setError('Invalid credit card number');
      return;
    }
    if (!isValidExpiry(creditCard.expiry)) {
      setError('Invalid expiry date');
      return;
    }
    if (!isValidCVV(creditCard.cvv)) {
      setError('Invalid CVV');
      return;
    }

    if (!subscription) {
      setError('No subscription plan found. Please select a plan first.');
      return;
    }

    setPaymentSuccess(true);

    try {
      // Record the payment details in the "payments" collection
      await addDoc(collection(db, 'payments'), {
        userId: user.uid,
        planName: subscription.planName, // Use the planName from the subscription
        amount: subscription.price, // Use the price from the subscription
        date: new Date(),
        cardNumber: creditCard.number,
        expiry: creditCard.expiry,
      });

      // Show a success message and redirect the user to the profile page
      Swal.fire('Payment Success', 'Thank you! Your payment was successful.', 'success')
        .then(() => {
          navigate('/profile'); // Use navigate to redirect to the profile page
        });
    } catch (err) {
      console.error('Error recording payment:', err);
      setError('Failed to record payment. Please try again.');
      Swal.fire('Payment Failed', 'There was an issue processing your payment. Please try again.', 'error');
    }
  };

  return (
    <div className="payment-container">
      <h1>Credit Card Payment</h1>
      <div className="payment-content">
        <form onSubmit={handleSubmit} className="payment-form">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label>Card Number</label>
            <input
              type="text"
              name="number"
              placeholder="1234 5678 9012 3456"
              value={creditCard.number}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={creditCard.expiry}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              placeholder="123"
              value={creditCard.cvv}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Pay Now</button>
        </form>

        <div className="animation-container">
          <dotlottie-player
            src="https://lottie.host/bd37a1b7-959a-4278-a639-6a5061809339/FUeTSflzCi.json"
            background="transparent"
            speed="0.2"
            style={{ width: '400px', height: '400px' }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  );
}

export default Payment;
