// gallery.js
import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { getMedia } from '../MediaRepository';
import VideoList from '../containers/VideoList';
import PhotoList from '../containers/PhotoList';
import { Link } from 'react-router-dom';


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

  const videos = media.filter((mediaItem) => mediaItem.type === 'video' && mediaItem.category !== 'promo' && mediaItem.category !== 'pictureHanging');
  const pleanStBefore = media.filter((mediaItem) => mediaItem.portfolioGroup === 'pleanStBefore');
  const pleanSt = media.filter((mediaItem) => mediaItem.portfolioGroup === 'pleanSt');
  const framingPhotos = media.filter((mediaItem) => mediaItem.portfolioGroup === 'LargsJobs');
  const pictureHangingVideo = media.filter((mediaItem) => mediaItem.category === 'pictureHanging');


  return (
    <div className='centered'>
      <h1>Portfolio</h1>
<h4>Ok so this page needs work. It's early days here at Framing Norah so we'll be updating as we go, featuring new work. </h4>  
<h4>
  You'll also find a growing list of help, advice, articles and updates on our regularly updated{' '}
  <Link to="/blog">BLOG</Link>.
</h4> 
      <p>Here is a small sample of images and videos that feature work from my days in bespoke picture framing.  </p>
      {/* <p>These images and videos are a mix of picture hanging, picture framing and flat refurbishment projects.</p> */}
      <p></p>
      <p>For more information, please get in touch.</p>
      <Link to="/contact">
        <button className="btn">Contact Us</button>
      </Link>
      <div className="gallery">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>Picture Hanging</h2>
             <div> PROFESSIONAL PHOTOS TO BE ADDED SOON</div>
            <VideoList videos={pictureHangingVideo} />
            <h2>Picture Framing</h2>
            <div>
            <VideoList videos={videos} />
            </div>
            <div>
            <PhotoList photos={framingPhotos} />
            </div>
            {/* <h2>Flat Refurbishment</h2> */}
            
              {/* <div>
                <PhotoList photos={pleanStBefore} />
              </div>
              <div>
                <PhotoList photos={pleanSt} />
              </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;