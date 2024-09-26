import React from 'react';
import './Company.css';

function Company({ partners }) { // Accept partners as props
  return (
    <div className='company container'>
      {partners.map((partner, index) => ( // Map through the partners array
        <div className='company-img-container' key={index}>
          <img 
            src={partner.src} 
            alt={partner.alt} 
            className='trans company-img' 
          />
        </div>
      ))}
    </div>
  );
}

export default Company;
