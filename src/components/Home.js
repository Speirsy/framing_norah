import React, { useEffect, useState } from 'react';
import './Home.css';
import { getMedia } from '../MediaRepository';
import VideoList from '../containers/VideoList';
import ReviewsCarousel from './ReviewsCarousel';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Helmet } from "react-helmet";


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

     <div className="fn-home">
    <Helmet>
      <title>
        Framing Norah | Picture Hanging & Mirror Installation Glasgow
      </title>

      <meta
        name="description"
        content="Specialist picture hanging, mirror installation and gallery wall services across Glasgow, Edinburgh and surrounding areas. Secure, level installations with over 30 years of experience."
      />
    </Helmet>

    <div className="fn-home__opening">
    <header className="fn-home__hero">
      <div className="fn-home__hero-content">
      <h1>Picture & Mirror Hanging Specialist – Glasgow & Edinburgh</h1>
      <p className="fn-home__lead">Clean, level installations that stay exactly where they should</p>
      </div>
    </header>



<div className="fn-home__photos">
  <img
    src="https://firebasestorage.googleapis.com/v0/b/framing-norah.appspot.com/o/Summer25%2FIMG_5157.jpeg?alt=media&token=74cf3009-eecb-40f7-9036-3fba4d803551"
    alt="Gallery wall install – Glasgow"
    className="rounded shadow w-full object-cover max-h-[400px]"
  />
  <img loading="lazy"
    src="https://firebasestorage.googleapis.com/v0/b/framing-norah.appspot.com/o/Summer25%2FIMG_5260.jpeg?alt=media&token=39dc02c5-c88d-426e-a0e0-631b9bec1bf0"
    alt="Mirror and art hanging in hallway"
    className="rounded shadow w-full object-cover max-h-[400px]"
  />
</div>



      <section className="fn-home__quote" aria-labelledby="fn-home-quote-title">
        <div className="fn-home__quote-copy">
  <h2 id="fn-home-quote-title" className="fn-home__quote-title">Send me a photo for a quick quote today</h2>
<p>Text or WhatsApp your wall or frames and I’ll get back to you quickly.</p>
<p className="fn-home__phone">07989 226593</p>

        </div>
        <Link to="/contact" className="site-button fn-home__booking">Get a Free Quote</Link>
      </section>
    </div>

<div className="fn-home__intro">

  <p>Picture & Mirror Hanging – Let Us Take Care Of It</p>

  <p>
  Looking for a <Link to="/picture-hanging-glasgow" className="text-blue-600 underline hover:text-blue-800">
    picture hanger in Glasgow
  </Link>? 
  I provide clean, level installations across the West End and wider city.
</p>

  <p>Maybe you…</p>

  <p>Have moved house? <Link to="/contact" className="text-blue-600 underline hover:text-blue-800">Get settled in sooner.</Link></p>
  <p>Don't have the tools? <Link to="/contact" className="text-blue-600 underline hover:text-blue-800">BIG ladders, tiny screws – we’ve got it all.</Link></p>
  <p>Can’t reach or “it’s too heavy”? <Link to="/contact" className="text-blue-600 underline hover:text-blue-800">We can get it “up there”.</Link></p>
  <p>Just don’t have the time? <Link to="/contact" className="text-blue-600 underline hover:text-blue-800">We can do it for you.</Link></p>

      <p>With decades of experience in picture framing and carefully handling artwork and frames, I bring precision and flair to every installation. Your home will finally feel finished!</p>
      <p>Need help with your flat pack furniture? I’m also a dab hand with IKEA and other assembly tasks.</p>
</div>

  <div className="fn-home__photos fn-home__photos--single">
  <img loading="lazy"
    src="https://firebasestorage.googleapis.com/v0/b/framing-norah.appspot.com/o/Summer25%2F44%20Pictures.jpeg?alt=media&token=217ddef0-715e-4e81-b898-9195c2afa18b"
    alt="Gallery wall install – Glasgow"
    className="rounded shadow w-full object-cover max-h-[400px]"

  />
</div>

      <section className="fn-home__benefits" aria-labelledby="fn-home-benefits">
      <h2 id="fn-home-benefits">Why Choose Framing Norah?</h2>
      <ul>
        <li>Precision layouts for your art and decor</li>
        <li>Safe and secure hanging techniques</li>
        <li>5 Star reviews from very happy customers</li>
        <li>Professional and reliable service in your home</li>
      </ul>
      </section>

      <ReviewsCarousel />

      <section className="fn-home__section" aria-labelledby="fn-home-process">
      <h2 id="fn-home-process">How It Works</h2>
      <ol className="fn-home__steps">
        <li>Contact us through our form, phone or email.</li>
        <li>Tell us your needs and get a free estimate</li>
        <li>Schedule a convenient date and time</li>
        <li>We show up, hang your art, and/or assemble your furniture</li>
        <li>Enjoy your refreshed space</li>
        <li>Leave us a 5-star review and recommend us to your friends!</li>
      </ol>
      </section>

      <section className="fn-home__section fn-home__assembly" aria-labelledby="fn-home-assembly">
      <h2 id="fn-home-assembly">Flat Pack Assembly Services</h2>
      <p>From IKEA wardrobes to office desks, I can assemble it all with ease and precision. No more headaches over confusing instructions!</p>

      <Link to="/contact" className="site-button fn-home__booking">Book Flat Pack Assembly</Link>
      </section>

      <div className="fn-home__videos">
        {loading ? (
          <p>Loading videos...</p>
        ) : (
          <VideoList videos={promoVideo} />
        )}
      </div>


    </div>
  );
};

export default Home;

