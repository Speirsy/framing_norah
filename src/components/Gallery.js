// gallery.js
import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { getMedia } from '../MediaRepository';
import VideoList from '../containers/VideoList';
import PhotoList from '../containers/PhotoList';

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const mediaData = await getMedia();
        setMedia(mediaData);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const videos = media.filter((mediaItem) => mediaItem.type === 'video');
  const pleanStBefore = media.filter((mediaItem) => mediaItem.portfolioGroup === 'pleanStBefore');
  const pleanSt = media.filter((mediaItem) => mediaItem.portfolioGroup === 'pleanSt');
  const framingPhotos = media.filter((mediaItem) => mediaItem.portfolioGroup === 'LargsJobs');

  return (
    <div className='centered'>
      <h4>Portfolio</h4>
      <p>Here is a collection of images and videos that encapsulates a wider range of projects I have completed, in recent years, to give you an idea of the high quality of work you can expect from Framing Norah.</p>
      <div className="gallery">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>Picture Hanging</h2>
             <div> PROFESSIONAL PHOTOS TO BE ADDED SOON</div>
            <h2>Picture Framing</h2>
            <div>
            <VideoList videos={videos} />
            </div>
            <div>
            <PhotoList photos={framingPhotos} />
            </div>
            <h2>Flat Refurbishment</h2>
            
              <div>
                <PhotoList photos={pleanStBefore} />
              </div>
              <div>
                <PhotoList photos={pleanSt} />
              </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;