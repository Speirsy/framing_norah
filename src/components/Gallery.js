// Gallery.js
import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { getMedia } from '../MediaRepository';
import VideoList from './VideoList'; // Import the VideoList component
import PhotoList from './PhotoList'; // Import the PhotoList component

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

  // Separate videos and photos
  const videos = media.filter((mediaItem) => mediaItem.type === 'video');
  const photos = media.filter((mediaItem) => mediaItem.type === 'photo');

  return (
    <div className='centered'>
      <h2>Portfolio</h2>
      <p>Here is a collection of images and videos that encapsulates the wide range of projects I have completed,</p>
      <p>in recent years, to give you an idea of the high quality of work you can expect from Framing Norah.</p>
      <div className="gallery">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {/* Render VideoList component for videos */}
            <VideoList videos={videos} />
            {/* Render PhotoList component for photos */}
            <PhotoList photos={photos} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

