import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PhotoList = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className="row justify-content-center">
        {photos && photos.map((photoItem, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img 
                src={photoItem.url} 
                alt={photoItem.name} 
                className="card-img-top" 
                onClick={() => openModal(photoItem)} // Opens the modal when clicked
                style={{ cursor: 'pointer' }}
              />
              <div className="card-body">
                <h5 className="card-title">{photoItem.name}</h5>
                {/* <p className="card-text text-muted">{photoItem.description}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
      {selectedPhoto && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedPhoto.name}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <img src={selectedPhoto.url} alt={selectedPhoto.name} className="img-fluid" />
                <p className="mt-3">{selectedPhoto.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoList;



