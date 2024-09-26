import React from 'react'
import './BlogBox.css'
import blog from '../../../../assets/images/image_1.jpg.webp'
function BlogBox() {
  return (
    <>
        <div className='blog-box'>
            <div className='blog-img-container'>
                <img src={blog} alt="Blog-Images" className='blog-img'/>
            </div>
            <div>
                <p className='text-md blog-box-text'>Everthing You Need to Know About Cloud Template</p>
            </div>
        </div>
    </>
  )
}

export default BlogBox