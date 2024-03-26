// MediaList.js
import React from 'react';
import './MediaList.css';

const MediaList = ({ media }) => (
  <div className="media-list">
    {media.map((mediaItem, index) => (
      <div key={index} className="media-item">
        <h3>{mediaItem.name}</h3>
        {mediaItem.type === 'video' ? (
          <video
            width="500"
            height="385"
            controls
            className="media-content"
            src={mediaItem.url}
            title={mediaItem.name}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={mediaItem.url} alt={mediaItem.name} className="media-content" />
        )}
        <div className="description">{mediaItem.description}</div>
      </div>
    ))}
  </div>
);

export default MediaList;