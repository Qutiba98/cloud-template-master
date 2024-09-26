import React from 'react';
import './Users.css';

function Users() {
  return (
    <div className='users'>
      <div className='users-container container'>    
        <div>
          <h2 className='title-md user-title'>
            We Always Strive to Meet Our Users' Expectations
          </h2>
        </div>
        <div className='user-info-container'>
          <div>
            <p className='title-lg user-number'>112</p>
            <span className='text-md user-download'>Active Users</span>
          </div>
          <div>
            <p className='title-lg user-number'>14</p>
            <span className='text-md user-download'>Projects Hosted</span>
          </div>
          <div>
            <p className='title-lg user-number'>352</p>
            <span className='text-md user-download'>Contributors</span>
          </div>
          <div>
            <p className='title-lg user-number'>1482</p>
            <span className='text-md user-download'>Satisfied Customers</span>
          </div>
        </div>
        <div className='user-card'>
          <div className='user-card-container'>
            <h2 className='title-md user-card-title'>Have Any Questions About Us?</h2>
            <p className='text-md user-card-text'>At CloudVault, we provide secure, scalable, and reliable cloud solutions. Our team is dedicated to ensuring your data is always safe and accessible, empowering you to focus on growing your business.</p>
          </div>
          <button className='btn-pink-lg user-card-btn'>Get in Touch</button>
        </div>
      </div>
    </div>
  )
}

export default Users;
