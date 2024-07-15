import React, { useEffect, useState } from 'react';
import './Home.css';
import { getMedia } from '../MediaRepository';
import VideoList from '../containers/VideoList';

const Home = () => {
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

  const promoVideo = media.filter((mediaItem) => mediaItem.type === 'video' && mediaItem.category === 'promo');

  return (
    <div className="centered">

      <img src={process.env.PUBLIC_URL + '/Cover.jpeg'} alt="Norah" />

      <h1>Professional picture hanging service<br />in Glasgow for your home and office</h1>

  
  
      
      <h2>How's It Hanging?</h2>
      <h3>Have you got art hanging around? Get the art hanger round</h3>
  
      <p>Get the art hanger round!</p>

    
        
      <button onClick={() => window.location.href = '/contact'}>Tell Us</button>
      
      <p>DIY framing with ‘off the shelf’ picture frames can be frustrating,</p>
      <p>and results can be disappointing</p>
      <p>Fear not! Shop frames can look great with an expert touch.</p> 
      <p>I can re-mount, adjust or reassemble to turn your "standard" frames  </p> 
      <p>into something special.</p>


      
      <button onClick={() => window.location.href = '/contact'}>We Can Help</button>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
        <>
          <div>
            <VideoList videos={promoVideo} />
          </div>  
        </>
        )}
      </div>
    </div>
  );
};

export default Home;
