import React from 'react';
import './PricingBox.css';

function PricingBox({ planName, price, features, isFree }) {
  return (
    <div className='pricing-box'>
      <p className='text-md price-text'>{planName}</p>
      <span className='title-xl price-number'>
        <sup className='sup-sub'>$</sup>{price}<sub className='sup-sub'>/mo</sub>
      </span>
      <p className='text-md price-text'>{isFree ? '100% free. Forever' : 'Billed monthly'}</p>
      <p className='text-md enjoy'>ENJOY ALL THE FEATURES</p>
      {features.map((feature, index) => (
        <p key={index} className='text-md price-text'><span className='price-number'>{feature}</span></p>
      ))}
      <button className='btn-pink-lg pricing-btn'>Choose Plan</button>
    </div>
  );
}

export default PricingBox;
