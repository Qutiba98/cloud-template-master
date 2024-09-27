// src/components/plan/Plan.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function Plan() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planName = queryParams.get('name');
  const planPrice = queryParams.get('price');

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>{planName}</h1>
      <p>Price: ${planPrice}</p>
      <p>This is a filler page for the selected plan. Here you can display more details about the plan and the next steps, like payment.</p>
    </div>
  );
}

export default Plan;
