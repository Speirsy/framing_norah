import React, { useEffect, useState } from 'react';
import './Home.css';
import { getMedia } from '../MediaRepository';
import VideoList from '../containers/VideoList';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import GoogleReviews from './GoogleReviews';

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
      <h1>Picture Hanger <br /> Glasgow and Nearby</h1>

      {/* Lorna advice */}
      <img src={process.env.PUBLIC_URL + '/Cover.jpeg'} alt="Norah" />

      <h2><br />Professional picture hanging service<br />in Glasgow for your home and office</h2>

      <h3>Have you got art hanging around? Get the art hanger round!</h3>

      <p>I can create layouts with precision and flair, and I can hang it securely.</p>
      <p>I have decades of picture framing experience and carefully handling beloved artefacts.</p>
      <p>I can work safely in your home and will give it the lift you've been waiting for.</p>

      <button onClick={() => window.location.href = '/contact'}>Tell Us</button>

      <p>DIY framing with ‘off the shelf’ picture frames can be frustrating,</p>
      <p>and results can be disappointing.</p>
      <p>Fear not! Shop frames can look great with an expert touch.</p>
      <p>I can re-mount, adjust or reassemble to turn your "standard" frames</p>
      <p>into something special.</p>

      <button onClick={() => window.location.href = '/contact'}>We Can Help</button>
      
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <VideoList videos={promoVideo} />
          </div>
        )}
      </div>

      <h2> How it all works</h2>

      <p>1. Contact us to arrange a visit</p>
      <p>2. We discuss your requirements and provide a quote</p>
      <p>3. We agree a date and time for the work</p>
      <p>4. We arrive on time and hang your art</p>
      <p>5. You enjoy your art</p>
      <p>6. We leave your home clean and tidy</p>
      <p>7. You recommend us to your friends</p>
      <p>8. We all live happily ever after</p>

      <h3>IKEA much?</h3>
      <p>We also are a dab hand with flatpack so feel free to tell us about any furniture assembly you may need doing.</p>

      <div>
        <Link to="/contact">
          <button className="btn">Go to Contact Page</button>
        </Link>
      </div>

      {/* Add Google Reviews Section at the bottom */}
      <div>
        <h2>What Our Customers Are Saying</h2>
        <GoogleReviews /> {/* Render Google Reviews */}
      </div>
    </div>
  );
};

export default Home;

