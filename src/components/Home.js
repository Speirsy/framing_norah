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
      <h1>Expert Mirror & Picture Hanging Service in Glasgow, Edinburgh And Beyond </h1>

<div className="grid gap-6 sm:grid-cols-2 my-6">
  <img
    src="https://firebasestorage.googleapis.com/v0/b/framing-norah.appspot.com/o/Summer25%2FIMG_5157.jpeg?alt=media&token=74cf3009-eecb-40f7-9036-3fba4d803551"
    alt="Gallery wall install – Glasgow"
    className="rounded shadow w-full object-cover max-h-[400px]"
  />
  <img
    src="https://firebasestorage.googleapis.com/v0/b/framing-norah.appspot.com/o/Summer25%2FIMG_5260.jpeg?alt=media&token=39dc02c5-c88d-426e-a0e0-631b9bec1bf0"
    alt="Mirror and art hanging in hallway"
    className="rounded shadow w-full object-cover max-h-[400px]"
  />
</div>



      <p></p>
<h2>Your Go-To Expert for Hanging Pictures, Mirrors and More</h2>

<div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>

  <p><strong>Picture Hanging – Let Us Take Care Of It</strong></p>
  <p>Maybe you…</p>

  <p><strong>Have moved house?</strong> <Link to="/contact" className="text-blue-600 underline hover:text-blue-800">Get settled in sooner.</Link></p>
  <p><strong>Don't have the tools or the "bits"?</strong> <Link to="/contact" className="text-blue-600 underline hover:text-blue-800">BIG ladders, tiny screws – we’ve got it all.</Link></p>
  <p><strong>Can’t reach or “it’s too heavy”?</strong> <Link to="/contact" className="text-blue-600 underline hover:text-blue-800">We can get it “up there”.</Link></p>
  <p><strong>Just don’t have the time?</strong> <Link to="/contact" className="text-blue-600 underline hover:text-blue-800">We can do it for you.</Link></p>


      <p>With decades of experience in picture framing and carefully handling cherished artifacts, I bring precision and flair to every installation. Your walls will thank you!</p>
      <p>Need help with your flat pack furniture? I’m also a dab hand with IKEA and other assembly tasks.</p>
</div>
      <Link to="/contact">
        <button className="btn">Get a Free Quote</button>
      </Link>

  <div className="grid gap-6 sm:grid-cols-2 my-6">
  <img
    src="https://firebasestorage.googleapis.com/v0/b/framing-norah.appspot.com/o/Summer25%2F44%20Pictures.jpeg?alt=media&token=217ddef0-715e-4e81-b898-9195c2afa18b"
    alt="Gallery wall install – Glasgow"
    className="rounded shadow w-full object-cover max-h-[400px]"

  />
</div>

      <h2>Why Choose Framing Norah?</h2>
      <ul>
        <li>Precision layouts for your art and decor</li>
        <li>Safe and secure hanging techniques</li>
        <li>5 Star reviews from very happy customers</li>
        <li>Professional and reliable service in your home</li>
      </ul>

      <h2>How It Works</h2>
      <ol>
        <li>Contact us through our form, phone or email.</li>
        <li>Tell us your needs and get a free estimate</li>
        <li>Schedule a convenient date and time</li>
        <li>We show up, hang your art, and/or assemble your furniture</li>
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

