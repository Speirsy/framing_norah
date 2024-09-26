export const renderMedia = (mediaUrl) => {
    if (!mediaUrl) return null;
  
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
  
    // Check for images (JPG, PNG, GIF) or Firebase image links
    if (mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) || (mediaUrl.includes("firebasestorage") && !mediaUrl.includes(".mp4"))) {
      return (
        <img
          src={mediaUrl}
          alt="blog media"
          className="blog-media"
          style={{ maxWidth: "50%", height: "auto" }}
        />
      );
    }
  
    // Check for MP4, WebM, OGG videos, including Firebase-hosted videos
    if (mediaUrl.match(/\.(mp4|webm|ogg)$/) || (mediaUrl.includes("firebasestorage") && mediaUrl.includes(".mp4"))) {
      console.log("Rendering video:", mediaUrl); // Debugging log
      return (
        <video width="400" height="285" controls>
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  
    // Check for audio (MP3, WAV)
    if (mediaUrl.match(/\.(mp3|wav)$/)) {
      return (
        <audio controls>
          <source src={mediaUrl} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      );
    }
  
    // If no media type is recognized, return a clickable link
    console.log("Unknown media type, returning as a link:", mediaUrl);
    return (
      <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
        {mediaUrl}
      </a>
    );
  };
  
  // Helper function for detecting YouTube links
  const getYouTubeEmbedUrl = (mediaUrl) => {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = mediaUrl.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  };
  
  