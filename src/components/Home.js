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
      <h1>Picture Hanger <br/> Glasgow and Nearby</h1>

      <img src={process.env.PUBLIC_URL + '/Cover.jpeg'} alt="Norah" />

      <h2>Professional picture hanging service<br />in Glasgow for your home and office</h2>

  
  
      
      {/* <h2>How's It Hanging?</h2> */}
      <h3>Have you got art hanging around? Get the art hanger round</h3>
  
      <p>I can create layouts with precision and flair, and I can hang it securely.  </p>
      <p>I have decades of picture framing experience and carefully handling beloved artefacts. </p>
      <p>I can work safely in you home and will give it the lift you've been waiting for.  </p>
        
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
