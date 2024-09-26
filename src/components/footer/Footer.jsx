import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
        <div className='container'>
            <div className='footer-container'>
                <div className='footer-menu'>
                    <h2 className='title-sm footer-title'>CloudVault</h2>
                    <p className='text-md footer-text'>Providing secure, scalable, and innovative cloud storage solutions to businesses and individuals worldwide. Empower your data with CloudVault.</p>
                    <div className='social-container'>
                        <i className="fa-brands fa-twitter social-icon"></i>
                        <i className="fa-brands fa-facebook-f social-icon"></i>
                        <i className="fa-brands fa-instagram social-icon"></i>
                    </div>
                </div>
                <div className='footer-menu'>
                    <h2 className='footer-title'>Useful Links</h2>
                    <a href="#" className='footer-link text-md'>About Us</a>
                    <a href="#" className='footer-link text-md'>Pricing</a>
                    <a href="#" className='footer-link text-md'>Leadership</a>
                    <a href="#" className='footer-link text-md'>Blog</a>
                    <a href="#" className='footer-link text-md'>Contact</a>
                </div>
                <div className='footer-menu'>
                    <h2 className='footer-title'>Navigation</h2>
                    <a href="#" className='footer-link text-md'>Join Us</a>
                    <a href="#" className='footer-link text-md'>Careers</a>
                    <a href="#" className='footer-link text-md'>Privacy & Policy</a>
                    <a href="#" className='footer-link text-md'>Terms & Conditions</a>
                </div>
                <div className='footer-menu'>
                    <h2 className='footer-title'>Office</h2>
                    <a href="#" className='footer-link text-md'>
                        <i className="fa-solid fa-location-dot address-icon"></i> 15 King Abdullah II St., Amman, Jordan
                    </a>
                    <a href="#" className='footer-link text-md'>
                        <i className="fa-solid fa-phone address-icon"></i> +962 6 123 4567
                    </a>
                    <a href="#" className='footer-link text-md'>
                        <i className="fa-solid fa-envelope address-icon"></i> support@cloudvault.jo
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer;
