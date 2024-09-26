import React from 'react';
import './Services.css';
import ServicesBox from './box/ServicesBox';

function Services() {
  return (
    <div className='services'>
      <h2 className='title-lg service-title'>Cloud Services</h2>
      <div className='container services-container'>
        <ServicesBox 
          title="Cloud Databases" 
          text="Easily store and manage your data on scalable cloud-based databases, offering high performance and availability." 
        />
        <ServicesBox 
          title="Website Hosting" 
          text="Host your websites with us for fast, secure, and reliable hosting solutions, perfect for any size business." 
        />
        <ServicesBox 
          title="File Storage" 
          text="Securely store and access your files from anywhere with our advanced cloud storage solutions designed for scalability." 
        />
        <ServicesBox 
          title="Forex Trading" 
          text="Leverage powerful cloud platforms designed to support real-time trading with enhanced security and minimal latency." 
        />
        <ServicesBox 
          title="File Backups" 
          text="Automated cloud backup services to ensure your data is safe, secure, and recoverable in case of unexpected events." 
        />
        <ServicesBox 
          title="Remote Desktop" 
          text="Access your desktop and files remotely from any device, providing flexibility for remote working and collaboration." 
        />
      </div>
    </div>
  );
}

export default Services;
