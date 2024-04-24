
// PhotoList.js
import React from 'react';
import './PhotoList.css';

const PhotoList = ({ photos }) => (
  <div className="photo-list">
    {photos && photos.map((photoItem, index) => (
      <div key={index} className="photo-item">
        <h3>{photoItem.name}</h3>
         {/* Log URL */}
         {console.log('Image URL:', photoItem.url)}
        {photoItem.type === 'photo' && (
          <img src={photoItem.url} alt={photoItem.name} className="photo-content" />
        )}
        <div className="description">{photoItem.description}</div>
      </div>
    ))}
  </div>
);

console.log(PhotoList);

export default PhotoList;