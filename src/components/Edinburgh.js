import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PhoneLinks from './PhoneLinks';
import './Edinburgh.css';
import prestonfield from '../assets/edinburgh-gallery-wall-prestonfield-1000.jpg';
import prestonfieldSmall from '../assets/edinburgh-gallery-wall-prestonfield-600.jpg';
import stockbridge from '../assets/edinburgh-large-canvas-stairwell-stockbridge-1000.jpg';
import stockbridgeSmall from '../assets/edinburgh-large-canvas-stairwell-stockbridge-600.jpg';
import portobello from '../assets/edinburgh-stairwell-gallery-wall-portobello-1000.jpg';
import portobelloSmall from '../assets/edinburgh-stairwell-gallery-wall-portobello-600.jpg';

const jobs = [
  {
    src: prestonfield,
    small: prestonfieldSmall,
    alt: 'Gallery wall of around forty framed original artworks arranged around two panelled doors in a high-ceilinged Prestonfield, Edinburgh room',
    title: 'Gallery wall of original artwork, Prestonfield',
    text: 'A proper collaboration with the client. We laid everything out on the floor inside taped-off dimensions, agreed the arrangement, then transferred it to the wall precisely.',
  },
  {
    src: stockbridge,
    small: stockbridgeSmall,
    alt: 'Very large white-framed seascape canvas hung high on a stairwell wall in a Stockbridge, Edinburgh home, with the owner standing beside it for scale',
    title: 'Large canvas in a stairwell, Stockbridge',
    text: 'Big, but surprisingly light, which meant it was up and level in a couple of hours.',
  },
  {
    src: portobello,
    small: portobelloSmall,
    alt: 'Stairwell gallery wall of around twenty black frames stepped up the stairs beneath a large seaside print in a Portobello, Edinburgh home',
    title: 'Stairwell gallery wall, Portobello',
    text: 'Stairs are never straightforward. Every frame has to sit level while the arrangement follows the climb.',
  },
];

const Edinburgh = () => (
  <div className="centered fn-edinburgh">
    <Helmet>
      <title>Picture Hanging Edinburgh | Framing Norah</title>
      <meta
        name="description"
        content="Picture hanging, gallery walls and stairwell installations in Edinburgh. Over 30 years' experience, careful planning and a precise, level finish."
      />
      <link rel="canonical" href="https://framingnorah.com/picture-hanging-edinburgh" />
    </Helmet>

    <h1>Picture Hanging Edinburgh</h1>

    <p>
      Framing Norah is based in Glasgow, and I regularly travel through to Edinburgh
      for picture hanging, gallery walls, mirrors and larger installations.
    </p>

    <p>
      I've spent over 30 years working with pictures, frames and walls. Edinburgh's high
      ceilings and long stairwells are a big part of the appeal of its homes, and a big
      part of the challenge when it comes to hanging things on them.
    </p>

    <h2>Planned before a hole is drilled</h2>
    <p>
      For complex gallery walls I measure up and plan the whole arrangement digitally,
      using photographs of every piece, so we can agree the layout before anything goes
      on the wall. Or we lay it all out on the floor first. Whichever suits you and the job.
    </p>

    <h2>Recent work in Edinburgh</h2>
    <div className="fn-edinburgh__jobs">
      {jobs.map(job => (
        <figure className="fn-edinburgh__job" key={job.title}>
          <img
            src={job.src}
            srcSet={`${job.small} 600w, ${job.src} 1000w`}
            sizes="(max-width: 700px) 100vw, 300px"
            alt={job.alt}
            width="1000"
            height="1333"
            loading="lazy"
          />
          <figcaption>
            <strong>{job.title}</strong>
            <span>{job.text}</span>
          </figcaption>
        </figure>
      ))}
    </div>

    <h2>Get a quote</h2>
    <p>
      Send me a photo of the wall and the pieces, and tell me roughly where in Edinburgh
      you are. Call or WhatsApp on <PhoneLinks />, or use the contact form.
    </p>

    <Link to="/contact" className="site-button">Get a Free Quote</Link>

    <p style={{ marginTop: '2rem' }}>
      Based in the west? <Link to="/picture-hanging-glasgow">Picture hanging in Glasgow</Link>.
    </p>
  </div>
);

export default Edinburgh;
