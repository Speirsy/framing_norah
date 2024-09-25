// src/utils/mediaUtils.js

export const renderMedia = (mediaUrl) => {
    if (!mediaUrl) return null;
  
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = mediaUrl.match(youtubeRegex);
    
    if (match && match[1]) {
      return (
        <iframe
          width="400"
          height="285"
          className="video-item"
          src={`https://www.youtube.com/embed/${match[1]}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    }
  
    if (mediaUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
      return (
        <img
          src={mediaUrl}
          alt="blog media"
          className="blog-media"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    }
  
    if (mediaUrl.match(/\.(mp4|webm|ogg)$/)) {
      return (
        <video width="400" height="285" controls>
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  
    if (mediaUrl.match(/\.(mp3|wav)$/)) {
      return (
        <audio controls>
          <source src={mediaUrl} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      );
    }
  
    return (
      <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
        {mediaUrl}
      </a>
    );
  };
  