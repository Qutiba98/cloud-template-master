import React, { useState, useEffect } from 'react';
import './payment.css';
import { db, auth } from '../../firebase'; // Ensure auth is imported
import { collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import '@dotlottie/player-component';

function Payment() {
  const [creditCard, setCreditCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });

  const [amount, setAmount] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch the authenticated user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setError('Please log in to make a payment.');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({ ...creditCard, [name]: value });
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const isValidCreditCard = (number) => {
    const regex = /^\d{16}$/;
    return regex.test(number.replace(/\s/g, ''));
  };

  const isValidExpiry = (expiry) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    return regex.test(expiry);
  };

  const isValidCVV = (cvv) => {
    const regex = /^\d{3}$/;
    return regex.test(cvv);
  };

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

    setPaymentSuccess(true);

    try {
      await addDoc(collection(db, 'payments'), {
        userId: user.uid, // Ensure user is logged in and uid is available
        amount,
        date: new Date(),
        expiry: creditCard.expiry,
      });
      Swal.fire('Payment Success', 'Thank you! Your payment was successful.', 'success')
        .then(() => {
          // Redirect to profile page after successful payment
          window.location.href = '/profile';
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
          <div>
            <label>Amount</label>
            <input
              type="text"
              name="amount"
              placeholder="Amount to Pay"
              value={amount}
              onChange={handleAmountChange}
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
