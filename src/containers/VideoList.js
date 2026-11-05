import React from 'react';
import './VideoList.css';

const VideoList = ({ videos }) => (
  <div className="video-gallery">
    {videos?.map((videoItem, index) => (
      <figure className="video-gallery__item" key={videoItem.id || videoItem.url || index}>
        <video controls preload="metadata" src={videoItem.url} title={videoItem.name}>
          Your browser does not support the video tag.
        </video>
        {videoItem.name && <figcaption>{videoItem.name}</figcaption>}
      </figure>
    ))}
  </div>
);
export default VideoList;
