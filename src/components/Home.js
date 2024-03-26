import React from 'react';
import './Home.css';
// import Gallery from './Gallery';
// import { getMedia } from '../MediaRepository';
// import MediaList from './MediaList';


const Home = () => (
  

    <div className="centered">
      <h1>Framing Norah</h1>
      <h2>Picture Hanger</h2>
      <h3>Art Installer</h3>
{/* 
      <MediaList media={pleanStPhotos} /> */}
      {/* I want one image in here. I'd like to pull it using MediaList as I do in the Gallery.
      Theres alot of gubbins including useEffect in Gallery.js. should I separate the Gallery gubbins for use 
      throughout the site. How will I refactor? */}
      
      <h4>Got Art hanging around?</h4>
      <h4>Get the Art Hanger round</h4>
      <p></p>
      <p>An expert, clean and safe service to get your art and frames up on your walls</p>
      <button onClick={() => window.location.href = '/contact'}>Tell Us</button>
      <h4>Frame Therapist</h4>
      <p>REDUCE THIS PARA> ITS TOO LONG. GET TO THE CALL TO ACTION.</p>
      <p>DIY framing and ‘off the shelf’ frames can be frustrating to work with, </p>
       <p>and results can be disapointing</p>
       <p>Fear not! Standard frames can look great with an expert touch.</p> 
       <p>I will re-mount, re-assemble, clean, hang and stand your frames, ON SITE!</p> 
       <p>to display your beloved pictures at their very best, for you to enjoy.   </p>
      <button onClick={() => window.location.href = '/contact'}>We Can Help</button>
    </div>
  );

  export default Home;
    

