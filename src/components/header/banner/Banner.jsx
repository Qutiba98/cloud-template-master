import React from 'react';
import './Banner.css';

function Banner({ Ban }) {
  return (
    <div className='banner'>
      <div className='banner__img-container'>
        <img src={Ban} alt="Banner_Image" className='banner__img' />
      </div>
      <div className='banner__text-container'>
        <p className='text-md banner__text'>CLOUD STORAGE SOLUTIONS</p>
        <p className='title-lg banner__title'>Secure</p>
        <p className='title-lg banner__title'>Scalable</p>
        <p className='title-lg banner__title'>Cloud Storage</p>
        <p className='text-md banner__text'>Store and manage your data with confidence,</p>
        <p className='text-md banner__text'>leveraging cutting-edge security and scalability</p>
        <p className='text-md banner__text'>for businesses of all sizes.</p>
        <button className='btn-green-lg banner__btn'>Get Started</button>
      </div>
    </div>
  );
}

export default Banner;
