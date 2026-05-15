import React from 'react';
import { Link } from 'react-router-dom';

const Glasgow = () => {
  return (
    <div className="centered">

      <h1>Picture Hanging Glasgow</h1>

      <p>
        Looking for a reliable picture hanger in Glasgow?
      </p>

      <p>
        Framing Norah provides a specialist picture hanging, mirror hanging,
        and gallery wall installation service across Glasgow and the West End,
        including Kelvindale, Hyndland, Broomhill, Partick, Hillhead,
        Jordanhill, Bearsden, surrounding areas, and far beyond. 
      </p>

    <p>
        With over 30 years of experience working with pictures, mirrors, and frames,
        alongside a detailed understanding of Glasgow’s tenement walls,
        I work confidently with plaster, brick, sandstone, lath and plaster,
        and modern plasterboard surfaces.
        That’s why I’ll often ask about your building type before quoting or installation.
    </p>

      <p>
        Most frames are modified as standard to improve stability and accuracy.
        I don’t rely on cord. Instead, I use secure fixings and twin-hook systems
        to ensure pictures hang level, sit flush to the wall, and stay that way. 
      </p>

      <p>
        Whether it’s a single statement piece, a heavy fireplace mirror,
        a stairway installation, or a full gallery wall, the aim is always
        the same — a clean, balanced finish that feels right in the space.
      </p>

      <p>
        Many customers find Framing Norah while searching for:
        picture hanging Glasgow, mirror hanging Glasgow,
        gallery wall installation, or professional art hanging services.
      </p>

      <p>
        I also cover nearby areas including Scotstoun, Knightswood,
        Woodlands, Renfrew, Paisley, Erskine, Old Kilpatrick,
        and occasionally Edinburgh and wider Scotland for larger installs.
      </p>

      <p>
        If you’re based in Glasgow and need help getting pictures up properly,
        feel free to get in touch.
      </p>

      <Link to="/contact">
        <button className="btn">Get a Free Quote</button>
      </Link>

      <p style={{ marginTop: '2rem' }}>
        Want to know more about how I work?
        <Link to="/about"> Read more about Framing Norah</Link>.
      </p>

    </div>
  );
};

export default Glasgow;