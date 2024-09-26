import React from 'react';
import './BlogBox.css';

function BlogBox({ image, title }) {
  return (
    <>
      <div className='blog-box'>
        <div className='blog-img-container'>
          <img src={image} alt="Blog-Images" className='blog-img'/>
        </div>
        <div>
          <p className='text-md blog-box-text'>{title}</p>
        </div>
      </div>
    </>
  );
}

export default BlogBox;
