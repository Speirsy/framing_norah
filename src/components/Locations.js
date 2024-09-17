import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Locations = () => {
  return (
    <>
      <div className='centered'>
        <h1>Glasgow West End and surrounding suburbs</h1>
        <h2>Hyndland, Broomhill, Knightswood</h2>
        <p>Do let us know where you are and how we can help via our contact page</p>
        
        {/* Add the Link to Contact page */}
        <Link to="/contact">
          <button className="btn">Go to Contact Page</button>
        </Link>
      </div>
    </>
  );
};

export default Locations;