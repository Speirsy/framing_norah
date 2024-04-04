
// container/PhotoPairList.js
import React from 'react';
import './PhotoPairList.css';

const PhotoPairList = ({ parentItems }) => {
  // Filter parent items that have a child property
  const parentItemsWithChild = parentItems.filter(parentItem => parentItem.child);
  
  // Map over parentItems to render parent and child items side by side 
  const pairs = parentItemsWithChild.map(parentItem => {
    
    return (
      <div className="pair" key={parentItem.id}>
        {/* Render parentItem */}
        <div className="parent">
          <h3>{parentItem.name}</h3>
          {parentItem.type === 'photo' && (
            <img src={parentItem.url} alt={parentItem.name} className="photo-content" />
          )}
          <div className="description">{parentItem.description}</div>
        </div>

        Render childItem
        <div className="child">
          <h3>{parentItem.child.name}</h3>
          {parentItem.child.type === 'name' && (
            <img src={parentItem.child.url} alt={parentItem.child.name} className="photo-content" />
          )}
          <div className="description">{parentItem.child.description}</div>
        </div>
      </div>
    );
  });


};

export default PhotoPairList;