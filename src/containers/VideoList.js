import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoList = ({ videos }) => (
  <div className="row justify-content-center">
    {videos && videos.map((videoItem, index) => (
      <div key={index} className="col-md-6 mb-4">
        <div className="card">
          <video controls className="card-img-top" src={videoItem.url} title={videoItem.name}>
            Your browser does not support the video tag.
          </video>
          <div className="card-body">
            <h5 className="card-title">{videoItem.name}</h5>
            {/* <p className="card-text text-muted">{videoItem.description}</p> */}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default VideoList;
