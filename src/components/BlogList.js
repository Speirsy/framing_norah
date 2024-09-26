import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ".//BlogList.css";

const BlogList = ({ blogs }) => {
  const [visibleBlogs, setVisibleBlogs] = useState(5); // Number of blogs to show initially
  const [expandedBlogs, setExpandedBlogs] = useState([0]); // Top blog expanded by default
  const [hasMore, setHasMore] = useState(false); // To check if more blogs are available

  // Update `hasMore` whenever `blogs` or `visibleBlogs` change
  useEffect(() => {
    setHasMore(blogs.length > visibleBlogs);
  }, [blogs, visibleBlogs]);

  // Function to load more blogs
  const loadMoreBlogs = () => {
    setVisibleBlogs((prev) => prev + 5);
  };

  // Function to handle expand/collapse for individual blogs
  const toggleExpandBlog = (index) => {
    setExpandedBlogs((prevExpanded) =>
      prevExpanded.includes(index)
        ? prevExpanded.filter((i) => i !== index) // Remove index to collapse
        : [...prevExpanded, index] // Add index to expand
    );
  };

  // Function to detect and render media types
  const getYouTubeEmbedUrl = (mediaUrl) => {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = mediaUrl.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  };

  const renderMedia = (mediaUrl) => {
    if (!mediaUrl) return null;

    console.log("Rendering media for:", mediaUrl);

    const youtubeEmbedUrl = getYouTubeEmbedUrl(mediaUrl);
    if (youtubeEmbedUrl) {
      return (
        <iframe
          width="400"
          height="285"
          className="video-item"
          src={youtubeEmbedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    }

    // Log the image URL to confirm it's reaching this point
    if (mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) || (mediaUrl.includes("firebasestorage") && !mediaUrl.includes(".mp4"))) {
      console.log("Rendering image:", mediaUrl);
      return (
        <img
          src={mediaUrl}
          alt="blog media"
          className="blog-media"
          style={{ maxWidth: "50%", height: "auto" }}
        />
      );
    }

    // Check for MP4 or video URLs, including Firebase storage URLs
    if (mediaUrl.match(/\.(mp4|webm|ogg)$/) || (mediaUrl.includes("firebasestorage") && mediaUrl.includes(".mp4"))) {
      console.log("Rendering video:", mediaUrl);
      return (
        <video width="400" height="285" controls>
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (mediaUrl.match(/\.(mp3|wav)$/)) {
      console.log("Rendering audio:", mediaUrl);
      return (
        <audio controls>
          <source src={mediaUrl} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      );
    }

    // If no match, return the media URL as a clickable link
    console.log("Unknown media type, returning as a link");
    return (
      <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
        {mediaUrl}
      </a>
    );
  };

  return (
    <div>
      <ul>
        {blogs.slice(0, visibleBlogs).map((blog, index) => (
          <li key={blog.id} style={{ marginBottom: "20px" }}>
            <h2
              onClick={() => toggleExpandBlog(index)}
              style={{
                cursor: "pointer",
                color: expandedBlogs.includes(index) ? "blue" : "black",
              }}
            >
              <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
            </h2>

            {/* Render media using renderMedia function */}
            {expandedBlogs.includes(index) ? (
              <>
                <p>{blog.content}</p>
                {renderMedia(blog.mediaUrl)}
              </>
            ) : (
              <p>{blog.content.substring(0, 100)}...</p>
            )}

            <button onClick={() => toggleExpandBlog(index)}>
              {expandedBlogs.includes(index) ? "Collapse" : "Read More"}
            </button>
          </li>
        ))}
      </ul>

      {hasMore && <button onClick={loadMoreBlogs}>More Blogs</button>}
    </div>
  );
};

export default BlogList;

