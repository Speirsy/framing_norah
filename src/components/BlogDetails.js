// src/components/BlogDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogBySlug } from '../BlogRepository';
import { renderMedia } from '../utils/mediaUtils'; // Import the utility function

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
    <div className='container'>
          
      <h1 className="text-center">{blog.title}</h1>
      <h3>By: {blog.author}</h3>
      <p>{blog.content}</p>
      {/* {blog.mediaUrl && ( */}
        {/* <div> */}
        {/* {console.log('Media URL:', blog.mediaUrl)} Log the media URL */}
        {/* {renderMedia(blog.mediaUrl)} */}
      {/* </div> */}
      {/* )} */}
              {/* Warning mediaRender is working in blogsList but not here so I'm rendering directly  */}
      {blog.mediaUrl && (
  <div>
    <img
      src={blog.mediaUrl}
      alt="blog media"
      style={{ maxWidth: '50%', height: 'auto' }}
    />
  </div>
)}
    </div>
  );
};

export default BlogDetails;
