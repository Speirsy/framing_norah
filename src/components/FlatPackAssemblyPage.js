// FlatPackAssemblyPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMedia } from '../MediaRepository';
import PhotoList from '../containers/PhotoList';
import 'bootstrap/dist/css/bootstrap.min.css';

const Flatpack = () => {
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

    const flatpackPhotos = media.filter(mediaItem => mediaItem.category === 'FlatpackPhoto');


  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>

      <h1 className="text-3xl font-bold mb-4 text-center">
        
        Flat Pack Assembly in Glasgow & Surrounding Areas
      </h1>
<PhotoList photos={flatpackPhotos} />
      <h2 className="mb-4">
        Let Framing Norah handle your flat pack frustrations. We assemble furniture all over
        <strong> Glasgow</strong>, and beyond. Whether it’s an IKEA wardrobe,
        a B&Q bed, or a mystery unit with 96 screws and no words, we’ll get it built securely and neatly.
      </h2>

      <h2 className="text-xl font-semibold mt-6 mb-2">What We Assemble</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Wardrobes (with wall fixings if needed)</li>
        <li>Beds and bunk beds</li>
        <li>Chest of drawers</li>
        <li>Desks, tables, and chairs</li>
        <li>Shelving units and bookcases</li>
        <li>Garden furniture</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Why Choose Framing Norah?</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Careful, respectful, and professional</li>

        <li>Clear pricing: <strong>FlatPack Assembly at £25 per hour</strong></li>
        <li>Trusted by customers across Glasgow and beyond.</li>
        <li>Fully insured for your peace of mind</li>
        <li>5 Stars on Google</li>
      </ul>

      {/* <h2 className="text-xl font-semibold mt-6 mb-2">What People Say</h2>
      <blockquote className="italic border-l-4 border-blue-500 pl-4 mb-2">
        “Saved me a full day of arguing with my partner and the instructions. Fast and professional.”
        <br />– Mark, Pollokshields
      </blockquote>
      <blockquote className="italic border-l-4 border-blue-500 pl-4 mb-4">
        “Fantastic service – even brought wall fixings to secure the wardrobe properly.”
        <br />– Jenna, Bearsden
      </blockquote> */}

      <h2 className="text-xl font-semibold mt-6 mb-2">Get in Touch</h2>
      <p className="mb-4">
        Call or message John on <strong>07989 226593</strong><br />
        Or use our <Link to="/contact" className="text-blue-600 underline">contact form</Link> and mention "Flat Pack."
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Areas Covered</h2>
      {/* <p className="mb-4">
        Glasgow • West End • Shawlands • Bearsden • Milngavie • Bishopbriggs • Giffnock • Renfrew • Clydebank
      </p> */}
    </div>
  );
}
export default Flatpack;
