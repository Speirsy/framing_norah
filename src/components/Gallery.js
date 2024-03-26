// Gallery.js


import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { getMedia } from '../MediaRepository';
import MediaList from './MediaList';

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
  const largsVideos = media.filter((mediaItem) => mediaItem.portfolioGroup === 'LargsJobs');
  const pleanStPhotos = media.filter((mediaItem) => mediaItem.portfolioGroup === 'pleanSt');
  const framingJobs = media.filter((mediaItem) => mediaItem.portfolioGroup === 'framingJobs');

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
            <MediaList media={largsVideos} />
            <MediaList media={pleanStPhotos} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Gallery;
    

