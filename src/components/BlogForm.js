import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { saveBlog, getBlogBySlug } from '../../BlogRepository'; // Ensure correct path to BlogRepository
import { slugify } from '../utils/slugify';
import { saveBlog, getBlogBySlug } from '../BlogRepository';


const BlogForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    mediaUrl: '',
    mediaUrlToo: ''
  });

  // Handle form field changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Generate a slug from the title
    let slug = slugify(formData.title);

    try {
      // Check if a blog with the same slug already exists
      const existingBlog = await getBlogBySlug(slug);

      // If the slug already exists, append a unique identifier (e.g., a timestamp or random string)
      if (existingBlog) {
        slug = `${slug}-${Date.now()}`; // Append timestamp for uniqueness
      }

      // Add the slug to the form data
      const newBlog = { ...formData, slug };

      // Save the blog to Firestore
      const savedBlog = await saveBlog(newBlog);

      console.log('Blog saved successfully:', savedBlog); // Debugging

      // Redirect to the main blog list page or specific blog details page
      navigate(`/blog/${savedBlog.slug}`); // Redirect to the details page using the slug

    } catch (error) {
      console.error("Error saving blog:", error); // Detailed error handling
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>
      <label>
        Content:
        <textarea name="content" value={formData.content} onChange={handleChange} required />
      </label>
      <label>
        Author:
        <input type="text" name="author" value={formData.author} onChange={handleChange} required />
      </label>
      <label>
        Media URL (Image/Video):
        <input type="text" name="mediaUrl" value={formData.mediaUrl} onChange={handleChange} />
      </label>
      <label>
        Media URL 2(Image/Video):
        <input type="text" name="mediaUrlToo" value={formData.mediaUrlToo} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogForm;