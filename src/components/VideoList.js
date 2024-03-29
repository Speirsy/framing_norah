// VideoList.js
import React from 'react';
import './VideoList.css';

const VideoList = ({ videos }) => (
  <div className="video-list">
    {videos.map((videoItem, index) => (
      <div key={index} className="video-item">
        <h3>{videoItem.name}</h3>
        {videoItem.type === 'video' && (
          <video
            width="500"
            height="385"
            controls
            className="video-content"
            src={videoItem.url}
            title={videoItem.name}
          >
            Your browser does not support the video tag.
          </video>
        )}
        <div className="description">{videoItem.description}</div>
      </div>
    ))}
  </div>
);

export default VideoList;