import React, { useEffect, useRef, useState } from 'react';
import './PhotoList.css';

export default function PhotoList({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  useEffect(() => {
    if (!selectedPhoto) return undefined;
    const element = dialog.current;
    element.showModal();
    return () => { element.close(); opener.current?.focus(); };
  }, [selectedPhoto]);
  return (
    <>
      <div className="photo-gallery">
        {photos?.map((photo, index) => (
          <figure className="photo-gallery__item" key={photo.id || photo.url || index}>
            <button type="button" className="photo-gallery__open"
              aria-label={`Enlarge ${photo.name || 'project photo'}`} onClick={event => {
                opener.current = event.currentTarget; setSelectedPhoto(photo);
              }}>
              <img src={photo.url} alt={photo.name || photo.description || 'Framing Norah installation'} loading="lazy" />
            </button>
            {photo.name && <figcaption>{photo.name}</figcaption>}
          </figure>
        ))}
      </div>
      {selectedPhoto && <dialog ref={dialog} className="gallery-dialog" aria-labelledby="gallery-dialog-title"
        onCancel={event => { event.preventDefault(); setSelectedPhoto(null); }}
        onClick={event => { if (event.target === event.currentTarget) setSelectedPhoto(null); }}>
        <div className="gallery-dialog__content">
          <header><h2 id="gallery-dialog-title">{selectedPhoto.name || 'Project photo'}</h2>
            <button type="button" aria-label="Close image" onClick={() => setSelectedPhoto(null)}>×</button></header>
          <img src={selectedPhoto.url} alt={selectedPhoto.name || selectedPhoto.description || 'Framing Norah installation'} />
          {selectedPhoto.description && <p>{selectedPhoto.description}</p>}
        </div>
      </dialog>}
    </>
  );
}
