import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BlogList.css"; // Ensure correct path

const BlogList = ({ blogs }) => {
  const [visibleBlogs, setVisibleBlogs] = useState(5); // Blogs to show initially
  const [expandedBlogs, setExpandedBlogs] = useState([0]); // Top blog expanded by default
  const [hasMore, setHasMore] = useState(false); // Flag for additional blogs

  // Update hasMore whenever blogs or visibleBlogs change
  useEffect(() => {
    setHasMore(blogs.length > visibleBlogs);
  }, [blogs, visibleBlogs]);

  // Load more blogs by increasing the limit
  const loadMoreBlogs = () => setVisibleBlogs((prev) => prev + 5);

  // Toggle expand/collapse state for individual blogs
  const toggleExpandBlog = (index) => {
    setExpandedBlogs((prevExpanded) =>
      prevExpanded.includes(index)
        ? prevExpanded.filter((i) => i !== index) // Collapse
        : [...prevExpanded, index] // Expand
    );
  };

  // Detect and render media types
  const renderMedia = (mediaUrl) => {
    if (!mediaUrl) return null;
  
    console.log("Processing Media URL:", mediaUrl);
  
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  
    // Check for YouTube videos
    if (youtubeRegex.test(mediaUrl)) {
      const match = mediaUrl.match(youtubeRegex);
      return (
        <iframe
          key={mediaUrl}
          width="400"
          height="285"
          className="video-item"
          src={`https://www.youtube.com/embed/${match[1]}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
  
    // Check for Firebase storage image URLs or other common image formats
    if (
      mediaUrl.match(/\.(jpeg|jpg|gif|png)$/i) ||
      (mediaUrl.includes("firebasestorage") && mediaUrl.includes("alt=media"))
    ) {
      console.log("Rendering image for URL:", mediaUrl);
      return (
        <img
          key={mediaUrl}
          src={mediaUrl}
          alt="blog media"
          className="blog-media"
          style={{ maxWidth: "50%", height: "auto" }}
        />
      );
    }
  
    // Check for Firebase storage video URLs or common video formats
    if (
      mediaUrl.match(/\.(mp4|webm|ogg)$/i) ||
      (mediaUrl.includes("firebasestorage") && mediaUrl.includes(".mp4"))
    ) {
      console.log("Rendering video for URL:", mediaUrl);
      return (
        <video key={mediaUrl} width="400" height="285" controls>
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  
    console.error("Unknown media type or malformed URL:", mediaUrl);
    return (
      <a key={mediaUrl} href={mediaUrl} target="_blank" rel="noopener noreferrer">
        {mediaUrl}
      </a>
    );
  };
  

  return (
    <div className="blog-list">
      <ul>
        {blogs.slice(0, visibleBlogs).map((blog, index) => (
          <li key={blog.id} className="blog-item" style={{ marginBottom: "20px" }}>
            <h2
              onClick={() => toggleExpandBlog(index)}
              style={{
                cursor: "pointer",
                color: expandedBlogs.includes(index) ? "blue" : "black",
              }}
            >
              <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
            </h2>

            {/* Expanded content */}
            {expandedBlogs.includes(index) ? (
              <div>
                {/* Media above text */}
                {renderMedia(blog.mediaUrl)}
                
                {/* Render full HTML content */}
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />

                {/* Media below text */}
                {renderMedia(blog.mediaUrlToo)}
              </div>
            ) : (
              // Truncated plain-text preview for collapsed view
              <p>{blog.content.replace(/<[^>]+>/g, '').substring(0, 100)}...</p>
            )}


            <button onClick={() => toggleExpandBlog(index)}>
              {expandedBlogs.includes(index) ? "Collapse" : "Read More"}
            </button>
          </li>
        ))}
      </ul>

      {/* "Load More" button if additional blogs are available */}
      {hasMore && (
        <button className="load-more" onClick={loadMoreBlogs}>
          More Blogs
        </button>
      )}
    </div>
  );
};

export default BlogList;




