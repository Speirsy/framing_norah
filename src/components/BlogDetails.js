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
    <div className="container">
      <h1 className="text-center">{blog.title}</h1>
      <h3>By: {blog.author}</h3>

      {/* Render mediaUrl above the content */}
      {blog.mediaUrl && (
        <div className="media-container">
          {renderMedia(blog.mediaUrl)}
        </div>
      )}

      <p className="blog-content">{blog.content}</p>

      {/* Render mediaUrlToo below the content */}
      {blog.mediaUrlToo && (
        <div className="media-container">
          {renderMedia(blog.mediaUrlToo)}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;


