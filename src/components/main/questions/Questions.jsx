import React, { useState } from 'react';
import './Questions.css';
import question from '../../../assets/images/about-2.jpg.webp';

function Questions() {
  let data = [
    {
      title: 'How To Create an Account?',
      text1: 'Click on the "Sign Up" button on the homepage.',
      text2: 'Fill in the required details, such as your name, email, and password.',
      text3: 'Verify your email by clicking the link sent to your inbox.',
      text4: 'Once verified, log in with your credentials.',
      text5: 'Enjoy full access to our cloud services.',
    },
    {
      title: 'How to Manage Your Dashboard?',
      text1: 'After logging in, navigate to your dashboard via the menu.',
      text2: 'View your recent activities, storage usage, and file uploads.',
      text3: 'Customize your dashboard by dragging and rearranging widgets.',
      text4: 'Manage your files by creating folders and uploading new documents.',
      text5: 'Easily share files or folders with colleagues or clients.',
    },
    {
      title: 'How to Grow Your Cloud Storage?',
      text1: 'Upgrade your account to a higher plan for more storage.',
      text2: 'Check the available plans under the "Pricing" section.',
      text3: 'Choose the plan that suits your needs and proceed with payment.',
      text4: 'Your storage will automatically expand after a successful upgrade.',
      text5: 'Monitor your storage usage regularly from the dashboard.',
    },
    {
      title: 'What Are the Requirements for Businesses?',
      text1: 'Businesses need to provide a company name and valid tax ID.',
      text2: 'Select the "Business Plan" during sign-up for additional features.',
      text3: 'Ensure your team members also sign up with the business email domain.',
      text4: 'Admins can manage access levels for employees from the "Admin Console".',
      text5: 'Enjoy enhanced security features and customer support with the business plan.',
    },
  ];

  let [selected, setSelected] = useState(null);

  let toggle = (index) => {
    if (selected === index) {
      return setSelected(null);
    }
    setSelected(index);
  };

  return (
    <div className='questions'>
      <div className='questions-container container'>
        <div className='questions-img-container'>
          <img src={question} alt="Questions-Image" className='questions-img' />
        </div>
        <div className='questions-title-container'>
          <h2 className='title-md questions-title'>Frequently Asked Questions</h2>
          <p className='text-md questions-text'>Find answers to the most common questions about our cloud services and features.</p>

          {
            data.map((item, index) => (
              <div className='accordion text-lg' onClick={() => toggle(index)} key={index}>
                <div className='accordion-title-container'>
                  {item.title}
                  <i className={`fa-solid ${selected === index ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
                </div>
                <div className={`accordion-content ${selected === index ? 'accordion-active' : ''}`}>
                  <ol className='accordion-list text-md'>
                    <li className='accordion-item text-md'>{item.text1}</li>
                    <li className='accordion-item text-md'>{item.text2}</li>
                    <li className='accordion-item text-md'>{item.text3}</li>
                    <li className='accordion-item text-md'>{item.text4}</li>
                    <li className='accordion-item text-md'>{item.text5}</li>
                  </ol>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  );
}

export default Questions;
