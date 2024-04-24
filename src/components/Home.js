import React from 'react';
import './Home.css';

const Home = () => (

    <div className="centered">
      <h1>Framing Norah</h1>
      <img src={process.env.PUBLIC_URL + '/Norah_2.png'} alt="Norah" />
      
      <h1>Picture Hanger</h1>
      <p>Expert picture hanging service for your home or office</p>

  
{/* 
      <MediaList media={pleanStPhotos} /> */}
      {/* I want one image in here. I'd like to pull it using MediaList as I do in the Gallery.
      Theres alot of gubbins including useEffect in Gallery.js. should I separate the Gallery gubbins for use 
      throughout the site. How will I refactor? */}
      
      <h4>Got art hanging around? Get the art hanger round</h4>
      <p></p>
      <p>Expert picture hanging service for your home or office</p>      <button onClick={() => window.location.href = '/contact'}>Tell Us</button>
      <h4>Picture Therapist</h4>
      <p>DIY framing and ‘off the shelf’ frames can be frustrating to work with, </p>
       <p>and results can be disapointing</p>
       <p>Fear not! Retail frames can look great with an expert touch.</p> 
       <p>I will re-mount, re-assemble, clean, and your frames, ON SITE!</p> 
       <p>to display your beloved pictures at their very best, for you to enjoy.   </p>
      <button onClick={() => window.location.href = '/contact'}>We Can Help</button>
    </div>
  );

  export default Home;
    

