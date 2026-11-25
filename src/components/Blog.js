import React, { useState, useEffect } from 'react';
import { getBlogs } from '../BlogRepository'; // Ensure correct path to BlogRepository
import BlogList from './BlogList';


const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from Firestore
  const fetchBlogs = async () => {
    const blogList = await getBlogs();
    setBlogs(blogList);
  };

  // Fetch blogs when component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='site-page'>
      <h1>Picture hanging advice</h1>
      <p>Thirty years of putting things on walls, written down so you don't have to learn it the hard way.</p>
      <BlogList blogs={blogs} /> {/* Show the list of blogs with collapse and "More Blogs" button */}
    </div>

  );
};

export default Blog;