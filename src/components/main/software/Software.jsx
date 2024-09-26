import React from 'react';
import './Software.css';
import SoftwareBox from './box/SoftwareBox';
import zaid from '../../../assets/images/undraw_referral_4ki4.svg';

function Software() {
  return (
    <div className='software'>
        <h2 className='software-title title-md'>What Our Software Can Do For You</h2>
        <div className='container software-item-container'>
            <div className='software-img-container'>
                <img src={zaid} alt="Software-Image" className='software-img'/>
            </div>
            <div className='software-box-container'>
            <SoftwareBox 
              title="Secure File Storage" 
              text="Store your files safely with end-to-end encryption and secure access control to ensure your data is protected at all times." 
            />
            <SoftwareBox 
              title="File Sharing and Collaboration" 
              text="Easily share files and collaborate with team members and clients in real-time using our cloud-based platform." 
            />
            <SoftwareBox 
              title="Automated Backups" 
              text="Never lose your data again with our automatic, scheduled backups to ensure your files are safe and accessible." 
            />
            <SoftwareBox 
              title="Scalable Storage" 
              text="Scale your storage needs as your business grows. Our cloud solution can handle everything from small projects to enterprise-level data." 
            />
            <SoftwareBox 
              title="Cross-Platform Access" 
              text="Access your files on any device, whether it's a desktop, tablet, or mobile, ensuring flexibility and efficiency in your workflow." 
            />
            </div>
        </div>
    </div>
  );
}

export default Software;
