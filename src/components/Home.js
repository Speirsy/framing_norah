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

  const promoVideo = media.filter(
    (mediaItem) => mediaItem.type === 'video' && mediaItem.category === 'promo'
  );

  return (
    <div className="centered">
      <h1>Professional Picture Hanging & Art Installation in Glasgow</h1>

      <img src={process.env.PUBLIC_URL + '/Cover.jpeg'} alt="Norah" />

      <p></p>

      <h2>Your Go-To Expert for Hanging Art and Assembling Furniture</h2>

      <h3>Have you got art hanging around? Let the art hanger handle it!</h3>

      <p>With decades of experience in picture framing and carefully handling cherished artifacts, I bring precision and flair to every installation. Your walls will thank you!</p>
      <p>Need help with your flat pack furniture? I’m also a dab hand with IKEA and other assembly tasks.</p>

      <Link to="/contact">
        <button className="btn">Get a Free Quote</button>
      </Link>
      <p></p>

      <img src={process.env.PUBLIC_URL + '/44 pictures.jpeg'} alt="Norah" />
      <p></p>

      <h2>Why Choose Framing Norah?</h2>
      <ul>
        <li>Precision layouts for your art and decor</li>
        <li>Safe and secure hanging techniques</li>
        <li>5 Star reviews from very happy customers</li>
        <li>Professional and reliable service in your home</li>
      </ul>

      <h2>How It Works</h2>
      <ol>
        <li>Contact us through phone, email, or WhatsApp</li>
        <li>Discuss your needs and get a free estimate</li>
        <li>Schedule a convenient date and time</li>
        <li>We show up, hang your art, and assemble your furniture</li>
        <li>Enjoy your refreshed space</li>
        <li>Leave us a 5-star review and recommend us to your friends!</li>
      </ol>

      <h3>Flat Pack Assembly Services</h3>
      <p>From IKEA wardrobes to office desks, I can assemble it all with ease and precision. No more headaches over confusing instructions!</p>

      <Link to="/contact">
        <button className="btn">Book Flat Pack Assembly</button>
      </Link>

      <div>
        {loading ? (
          <p>Loading videos...</p>
        ) : (
          <VideoList videos={promoVideo} />
        )}
      </div>

      <h2>What Our Customers Are Saying</h2>
      <GoogleReviews />
    </div>
  );
};

export default Home;

