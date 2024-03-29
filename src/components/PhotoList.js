// PhotoList.js
import React from 'react';
import './PhotoList.css';

const PhotoList = ({ photos }) => (
  <div className="photo-list">
    {photos.map((photoItem, index) => (
      <div key={index} className="photo-item">
        <h3>{photoItem.name}</h3>
        {/* Apply hover effect and pop-up text box to the photo */}
        <div className="photo-wrapper">
          <img src={photoItem.url} alt={photoItem.name} className="photo-content" />
          {/* Description box */}
          <div className="description-box">{photoItem.description}</div>
        </div>
      </div>
    ))}
  </div>
);

export default PhotoList;