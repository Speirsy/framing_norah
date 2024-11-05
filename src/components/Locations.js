import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Google Maps components

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 55.884916163844096, // Latitude for Anniesland crescent
  lng: -4.363090646063317, // Longitude for Anniesland crescent
};

const Locations = () => {
  return (
    <div className='centered'>
      <h1>Picture Hanging Service <br/>Glasgow West End and Surrounding Suburbs</h1>
      <h2>Scotstoun, Hyndland, Broomhill, Knightswood</h2>
      <h3>Partick, Hillhead, Woodlands</h3>
      <h3>Erskine, Old Kilpatrick, Renfrew, Paisley and more</h3>
      <p>Let us know where you are and how we can help via our contact page.</p>
         {/* Link to Contact page */}
         <Link to="/contact">
        <button className="btn">Where are you?</button>
      </Link>
      <p>More info about us and</p> 
           <Link to="/">
        <button className="btn">Our service</button>
      </Link>

      {/* Google Map */}
      <LoadScript googleMapsApiKey="AIzaSyARH3vdyFk3z9Cm4diWa2bkjywXgPW1KOQ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          {/* Optional: Add a marker at the center */}
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>

      {/* Link to Contact page */}
      <Link to="/contact">
        <button className="btn">Contact Us</button>
      </Link>
    </div>
  );
};

export default Locations;
