
// // container/PhotoPairList.js
// import React from 'react';
// import './PhotoPairList.css'; // Import CSS file

// const PhotoPairList = ({ parentItems }) => {
//   // Filter parent items that have a child property and return a new array
//   const parentItemsWithChild = parentItems.filter(parentItems => parentItems.child);
// //filter children from parentItems
//   const childItems = parentItemsWithChild.find(childItems => childItems.name === parentItems.child)
  
//  {
    
//     return (
//       <div className="pair photo-item" key={parentItems.id}> {/* Add photo-item class */}
//         {/* Render parentItem */}
//         <div className="parent">
//           <h3>{parentItems.name}</h3>
//           {parentItems.type === 'photo' && (
//             <img src={parentItems.url} alt={parentItems.name} className="photo-content" />
//           )}
//           <div className="description">{parentItems.description}</div>
//         </div>

//         {/* Render childItem */}
//         <div className="child">
//           <h3>{parentItems.child.name}</h3>
//           {parentItems.child.type === 'photo' && (
//             <img src={childItems.url} alt={childItems.name} className="photo-content" />
//           )}
//           <div className="description">{parentItems.child.description}</div>
//         </div>
//       </div>
//     );
//   };

//   // return <div className="pair-list photo-list">{pairs}</div>; {/* Add photo-list class */}
// }

// export default PhotoPairList;