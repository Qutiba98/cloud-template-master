import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import './contract.css';

function Contract() {
  const [contract, setContract] = useState(null); 
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);

  const fetchContract = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();

          if (userData.subscriptionPlan) {
            const address = userData.address || {}; // Access the address object

            setContract(userData.subscriptionPlan);
            setUserDetails({
              fullName: userData.fullName || 'N/A',
              email: userData.email || 'N/A',
              phoneNumber: userData.phoneNumber || 'N/A',
              address: {
                city: address.city || 'N/A',
                street: address.street || 'N/A',
                country: address.country || 'N/A',
                zip: address.zip || 'N/A',
              }, // Extract the parts of the address
            });
          } else {
            setError('No subscription plan found.');
          }
        } else {
          setError('User data not found.');
        }
      }
    } catch (err) {
      console.error('Error fetching contract:', err);
      setError('Failed to load contract. Please try again.');
    }
  };

  useEffect(() => {
    fetchContract();
  }, []);

  const handleContractDetails = () => {
    if (contract) {
      Swal.fire({
        title: `<strong>Contract Details for ${contract.planName}</strong>`,
        html: `
          <div style="text-align: left;">
            <p><strong>User Details:</strong></p>
            <p><strong>Full Name:</strong> ${userDetails.fullName}</p>
            <p><strong>Email:</strong> ${userDetails.email}</p>
            <p><strong>Phone Number:</strong> ${userDetails.phoneNumber}</p>
            <p><strong>Address:</strong></p>
            <p>Street: ${userDetails.address.street}</p>
            <p>City: ${userDetails.address.city}</p>
            <p>Country: ${userDetails.address.country}</p>
            <p>ZIP Code: ${userDetails.address.zip}</p>
            <hr>
            <p><strong>Subscription Details:</strong></p>
            <p><strong>Plan Name:</strong> ${contract.planName}</p>
            <p><strong>Cost:</strong> $${contract.price}</p>
            <p><strong>Status:</strong> ${contract.status}</p>
            <p><strong>Signing Date:</strong> ${contract.signingDate ? new Date(contract.signingDate.seconds * 1000).toDateString() : 'N/A'}</p>
            <p><strong>Expiration Date:</strong> ${contract.expirationDate ? new Date(contract.expirationDate.seconds * 1000).toDateString() : 'Not available'}</p>
          </div>
        `,
        confirmButtonText: 'Close',
        width: '600px',
        customClass: {
          popup: 'contract-popup',
        }
      });
    }
  };

  const handlePlanUpdate = async (newPlan, price, userDoc) => {
    const currentDate = new Date();
    const newExpirationDate = new Date();
    newExpirationDate.setMonth(newExpirationDate.getMonth() + 1); // Extend by 1 month

    await updateDoc(userDoc, {
      'subscriptionPlan.planName': newPlan,
      'subscriptionPlan.signingDate': currentDate,
      'subscriptionPlan.expirationDate': newExpirationDate,
      'subscriptionPlan.price': price,
    });

    Swal.fire('Plan Changed!', `Your plan has been changed to the ${newPlan} plan.`, 'success');
    fetchContract();
  };

  const handleAddSubscription = () => {
    const user = auth.currentUser;
    const userDoc = doc(db, 'users', user.uid);

    Swal.fire({
      title: 'Add New Subscription',
      input: 'select',
      inputOptions: {
        'basic': 'Basic Plan',
        'pro': 'Pro Plan',
        'business': 'Business Plan',
        'enterprise': 'Enterprise Plan',
      },
      inputPlaceholder: 'Select a plan',
      showCancelButton: true,
      confirmButtonText: 'Upgrade/Downgrade',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newPlan = result.value;
        let price;

        switch (newPlan) {
          case 'basic':
            price = 9.99;
            break;
          case 'pro':
            price = 19.99;
            break;
          case 'business':
            price = 29.99;
            break;
          case 'enterprise':
            price = 49.99;
            break;
          default:
            price = contract.price;
        }

        if (newPlan > contract.planName) {
          await handlePlanUpdate(newPlan, price, userDoc);
        } else {
          await updateDoc(userDoc, {
            'subscriptionPlan.planName': newPlan,
            'subscriptionPlan.price': price,
          });
          Swal.fire('Plan downgraded', `You have successfully downgraded to the ${newPlan} plan.`, 'success');
          fetchContract();
        }
      }
    });
  };

  const calculateCardColor = (expirationDate) => {
    if (!expirationDate) return '#00838d'; 

    const currentDate = new Date();
    const expiration = new Date(expirationDate.seconds * 1000); 
    const daysUntilExpiration = Math.floor((expiration - currentDate) / (1000 * 60 * 60 * 24)); 

    if (daysUntilExpiration <= 3) {
      return '#dc2626'; 
    } else if (daysUntilExpiration <= 10) {
      return '#ca8a04'; 
    } else {
      return '#15803d'; 
    }
  };

  if (contract && contract.expirationDate) {
    const expirationDate = new Date(contract.expirationDate.seconds * 1000);
    if (new Date() > expirationDate) {
      return <p>No active contract found.</p>;
    }
  }

  return (
    <div className="contracts-container">
      <button className="add-subscription-btn" onClick={handleAddSubscription}>
        Extend or Add New Subscription
      </button>

      <div className="contracts-content">
        {error && <p className="error">{error}</p>}

        {contract ? (
          <div className="card">
            <a
              className="card1"
              href="#"
              style={{
                '--card-color': calculateCardColor(contract.expirationDate),
              }}
            >
              <p>{contract.planName}</p>
              <p className="small">
                Signing Date: {contract.signingDate ? new Date(contract.signingDate.seconds * 1000).toDateString() : 'N/A'} <br />
                Expiration Date: {contract.expirationDate ? new Date(contract.expirationDate.seconds * 1000).toDateString() : 'Not available'} <br />
                Total Cost: ${contract.price}
              </p>
              <div className="go-corner" href="#">
                <div className="go-arrow">→</div>
              </div>
            </a>
            <div className="contract-actions">
              <button onClick={handleContractDetails}>Contract Details</button>
            </div>
          </div>
        ) : (
          <p>No active contract found.</p>
        )}

        <div className="animation-container2">
          <dotlottie-player
            src="https://lottie.host/5ab35772-2bc1-4996-9ec6-4cff4f91cecb/aFlejAnw1b.json"
            background="transparent"
            speed="1"
            style={{ width: '400px', height: '400px' }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contract;
