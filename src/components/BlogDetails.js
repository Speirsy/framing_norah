// BlogDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogBySlug } from '../BlogRepository';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await getBlogBySlug(slug);
        if (fetchedBlog) {
          setBlog(fetchedBlog);
        } else {
          console.error(`Blog with slug ${slug} not found.`);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [slug]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <h3>By: {blog.author}</h3>
      <p>{blog.content}</p>
      {blog.mediaUrl && (
        <div>
          {/* You can reuse your renderMedia function here if needed */}
          <img src={blog.mediaUrl} alt={blog.title} style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default BlogDetails;