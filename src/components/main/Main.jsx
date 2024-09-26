import React from 'react';
import './Main.css';
import Company from './companies/Company';
import Services from './services/Services';
import Software from './software/Software';
import Users from './users/Users';
import Pricing from './pricing/Pricing';
import Blog from './blog/Blog';
import Questions from './questions/Questions';

// Import partner images
import partner1 from '../../assets/images/partner-1.png.webp';
import partner2 from '../../assets/images/partner-2.png.webp';
import partner3 from '../../assets/images/partner-3.png.webp';
import partner4 from '../../assets/images/partner-4.png.webp';
import partner5 from '../../assets/images/partner-5.png.webp';

// Array of partner images
const partners = [
  { src: partner1, alt: "Microsoft" },
  { src: partner2, alt: "Google" },
  { src: partner3, alt: "Apple" },
  { src: partner4, alt: "Amazon" },
  { src: partner5, alt: "Facebook" },
];

function Main() {
  return (
    <main className='main'>
      <Company partners={partners} />
      <Services />
      <Software />
      <Users />
      <Questions />
      <Pricing />
      <Blog />
    </main>
  );
}

export default Main;
