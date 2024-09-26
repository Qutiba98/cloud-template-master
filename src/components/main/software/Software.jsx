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
                    title="Responsive Design" 
                    text="Our software adapts to any screen size, ensuring a seamless experience across all devices." 
                />
                <SoftwareBox 
                    title="Android App Development" 
                    text="Develop highly functional Android apps with our cloud-powered development tools." 
                />
                <SoftwareBox 
                    title="iOS App Development" 
                    text="Build robust iOS apps using our cloud solutions that streamline your app development workflow." 
                />
                <SoftwareBox 
                    title="UX/UI Design" 
                    text="Create intuitive and user-friendly designs to improve user engagement and satisfaction." 
                />
                <SoftwareBox 
                    title="Print-Ready Design" 
                    text="Design and export high-quality, print-ready materials directly from the cloud." 
                />
            </div>
        </div>
    </div>
  );
}

export default Software;
