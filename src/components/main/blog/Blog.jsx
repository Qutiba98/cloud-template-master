import React from 'react';
import './Blog.css';
import BlogBox from './box/BlogBox';
import blog1 from '../../../assets/images/image_1.jpg.webp';
import blog2 from '../../../assets/images/image_2.jpg.webp';
import blog3 from '../../../assets/images/image_3.jpg.webp';

function Blog() {
  const blogs = [
    {
      image: blog1,
      title: 'Everything You Need to Know About Cloud Storage Security',
    },
    {
      image: blog2,
      title: 'The Future of Cloud Computing and Its Impact on Businesses',
    },
    {
      image: blog3,
      title: 'How to Optimize Your Cloud Infrastructure for Efficiency',
    }
  ];

  return (
    <div className='blog'>
      <div className='blog-container container'>
        <div className='blog-title-container'>
          <h2 className='title-lg blog-title'>Recent Blog</h2>
          <p className='text-md blog-text'>Learn more about the latest trends in cloud technology and best practices for securing your data.</p>
        </div>
        <div className='blog-container-box'>
          {blogs.map((blog, index) => (
            <BlogBox key={index} image={blog.image} title={blog.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
