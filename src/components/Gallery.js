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
  // const photos = media.filter((mediaItem) => mediaItem.type === 'photo');
  // const photosframing = media.filter((mediaItem) => mediaItem.type = 'photos' && mediaItem.portfolioGroup === 'LargsJobs');
  // I want to add more filters to bring in different types of media. 
  // const pleanStPhotos = media.filter((mediaItem) => mediaItem.portfolioGroup === 'pleanSt');
  const beforeAfter = media.filter((mediaItem) => mediaItem.beforeAfter === 'paired');
  const beforeAfter1 = media.filter((mediaItem) => mediaItem.beforeAfter === 'paired1');
  const beforeAfter2 = media.filter((mediaItem) => mediaItem.beforeAfter === 'paired2');
  const beforeAfter3 = media.filter((mediaItem) => mediaItem.beforeAfter === 'paired3');
  const beforeAfter4 = media.filter((mediaItem) => mediaItem.beforeAfter === 'paired4');


  return (
    <div className='centered'>
      <h2>Portfolio</h2>
      <p>Here is a collection of images and videos that encapsulates the wide range of projects I have completed,</p>
      <p>in recent years, to give you an idea of the high quality of work you can expect from Framing Norah.</p>
      <div className="gallery">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>

            {/* Render VideoList component for videos */}
            {/* Render PhotoList component for photos */}
            <h1>Picture Framing</h1>            
            <VideoList videos={videos} />

            {/* <PhotoList photos={photos} /> */}
            {/* <PhotoList photos={pleanStPhotos} /> */}
            {/* <PhotoList photos={photosframing} /> */}
            <h1>Flat Refurbishment</h1>

            <h2>Before and After</h2>
            <PhotoList photos={beforeAfter} />
    
         
    
          </p>
        )}
      </div>
    </div>
  );
};

export default Gallery;

