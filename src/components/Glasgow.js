import React from 'react';
import { Link } from 'react-router-dom';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 55.884916163844096,
  lng: -4.363090646063317,
};

const Glasgow = () => {
  return (
    <div className="centered">
      <h1>Picture Hanging Glasgow</h1>

      <p>
        Looking for a reliable picture hanger in Glasgow?
      </p>

      <p>
        Framing Norah provides a specialist picture hanging and art installation
        service across Glasgow, including the West End, Kelvindale, Hyndland,
        Broomhill, Partick, Hillhead, and surrounding areas.
      </p>

      <p>
        With over 30 years of experience in picture framing and a detailed
        understanding of Glasgow’s tenement walls, I work confidently with
        plaster, brick, and modern plasterboard surfaces.
      </p>

      <p>
        Most frames are modified as standard to improve stability and accuracy.
        I don’t rely on cord. Instead, I use secure fixings and twin-hook systems
        to ensure pictures hang level, sit flush to the wall, and stay that way.
      </p>

      <p>
        Whether it’s a single statement piece, a fireplace mirror, or a full
        gallery wall, the aim is always the same — a clean, balanced finish that
        feels right in the space.
      </p>

      <p>
        I also cover nearby areas including Scotstoun, Knightswood, Woodlands,
        Renfrew, Paisley, Erskine, and Old Kilpatrick.
      </p>

      <p>
        If you’re based in Glasgow and need help getting pictures up properly,
        feel free to get in touch.
      </p>

      <Link to="/contact">
        <button className="btn">Get a Free Quote</button>
      </Link>

      <p style={{ marginTop: '2rem' }}>
        Want to know more about how I work? <Link to="/about">Read more about Framing Norah</Link>.
      </p>


    </div>
  );
};

export default Glasgow;