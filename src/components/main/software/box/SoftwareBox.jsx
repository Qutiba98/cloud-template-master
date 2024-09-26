import React from 'react';
import './SoftwareBox.css';

function SoftwareBox({ title, text }) {
  return (
    <>
      <div className='software-box'>
        <div className='software-icon-box'>
          <i className="fa-solid fa-database software-icon"></i>
        </div>
        <div className='software-text-box'>
          <h3 className='title-sm software-box-title'>{title}</h3>
          <p className='text-md software-text'>{text}</p>
        </div>
      </div>
    </>
  );
}

export default SoftwareBox;
