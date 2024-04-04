import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { getMedia } from '../MediaRepository';
import VideoList from '../containers/VideoList';
import PhotoPairList from '../containers/PhotoPairList';

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
  // const photos = media.filter((mediaItem) => mediaItem.type === 'photo');
  const parent = media.filter((mediaItem) => mediaItem.type === 'photo');
  const child = media.filter((mediaItem) => mediaItem.type === 'photo');

  return (
    <div className='centered'>
      <h2>Portfolio</h2>
      <p>Here is a collection of images and videos that encapsulates the wide range of projects I have completed,</p>
      <p>in recent years, to give you an idea of the high quality of work you can expect from Framing Norah.</p>
      <div className="gallery">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>Picture Framing</h1>
            <VideoList videos={videos} />
         
            <h1>Flat Refurbishment</h1>
            <h2>Before and After</h2>
            <PhotoPairList parentItems={parent} />
            <PhotoPairList childItems={child} />
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;