import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

  const videos = media.filter(mediaItem => mediaItem.type === 'video' && mediaItem.category !== 'promo' && mediaItem.category !== 'pictureHanging');
  const framingPhotos = media.filter(mediaItem => mediaItem.portfolioGroup === 'LargsJobs');

  const pictureHangingPhotos = media.filter(mediaItem => mediaItem.category === 'HangingPhoto');
  const pictureHangingVideo = media.filter(mediaItem => mediaItem.category === 'pictureHanging');
  return (
    <div className="site-page site-page--wide">
      <h1>Portfolio</h1>
      <p>It's early days here at Framing Norah so we'll be updating this page when we're not out and about actually hanging mirrors, pictures and lots more. </p>
      <p>
        You'll also find a growing list of help, advice, articles and updates on our {' '}
        <Link to="/blog">BLOG</Link>.
      </p>
      <p></p>
      <Link to="/contact" className="site-button mb-4">Contact Us</Link>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Picture & Mirror Hanging</h2>
          <div>
          {/* <div className="row justify-content-center"> */}
            {/* <div className="col-md-8"> */}
              <PhotoList photos={pictureHangingPhotos} />
              <VideoList videos={pictureHangingVideo} />

            </div>


          {/* <h2>Picture Framing - Quick Portfolio</h2> */}
          {/* <p>Here is a small sample of images and videos that feature work from my days in bespoke picture framing. */}
          {/* For more information, please get in touch.</p> */}
          {/* <VideoList videos={videos} /> */}
          {/* <PhotoList photos={framingPhotos} /> */}
        </>
      )}
    </div>
  );
};

export default Gallery;



