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
    <div className='container text-center'>
      <h1>Projects, Help, Ideas, Therapy, Musings...</h1>
      <h2>Blogs abouts framing, hanging and life</h2>
      <BlogList blogs={blogs} /> {/* Show the list of blogs with collapse and "More Blogs" button */}
    </div>

  );
};

export default Blog;