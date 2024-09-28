import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore'; // Update to getDoc for fetching a single document
import Swal from 'sweetalert2';
import './contract.css';

function Contract() {
  const [contract, setContract] = useState(null); // Single contract
  const [userDetails, setUserDetails] = useState({}); // To store user information
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Fetch user data from the 'users' collection
          const userDoc = doc(db, 'users', user.uid); // Fetch specific user document
          const docSnapshot = await getDoc(userDoc);

          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();

            // Check if the user has a subscription plan
            if (userData.subscriptionPlan) {
              setContract(userData.subscriptionPlan); // Set the contract to the user's subscription plan
              setUserDetails({
                fullName: userData.fullName || 'N/A',
                email: userData.email || 'N/A',
                phoneNumber: userData.phoneNumber || 'N/A',
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
        width: '600px', // Customize width to make it look more like a contract
        customClass: {
          popup: 'contract-popup' // Add more styling in CSS for the popup if needed
        }
      });
    }
  };

  const handleAddSubscription = () => {
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
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Plan Change Confirmed!', `You selected the ${result.value} plan.`, 'success');
        // Add logic here to handle the subscription change
      }
    });
  };

  const calculateCardColor = (expirationDate) => {
    if (!expirationDate) return '#00838d'; // Default color if no expiration date

    const currentDate = new Date();
    const expiration = new Date(expirationDate.seconds * 1000); // Convert timestamp to Date
    const daysUntilExpiration = Math.floor((expiration - currentDate) / (1000 * 60 * 60 * 24)); // Calculate days until expiration

    if (daysUntilExpiration <= 3) {
      return 'red'; // Red color when expiration is in 3 or fewer days
    } else if (daysUntilExpiration <= 10) {
      return 'yellow'; // Yellow color when expiration is in 10 or fewer days
    } else {
      return 'green'; // Default color for active contracts
    }
  };

  // Hide expired contracts for regular users, show only to admins
  if (contract && contract.expirationDate) {
    const expirationDate = new Date(contract.expirationDate.seconds * 1000);
    if (new Date() > expirationDate) {
      return <p>No active contract found.</p>;
    }
  }

  return (
    <div className="contracts-container">
      <button className="add-subscription-btn" onClick={handleAddSubscription}>
        Add New Subscription
      </button>

      <div className="contracts-content">
        {error && <p className="error">{error}</p>}

        {contract ? (
          <div className="card">
            <a
              className="card1"
              href="#"
              style={{
                '--card-color': calculateCardColor(contract.expirationDate), // Set color based on expiration
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
