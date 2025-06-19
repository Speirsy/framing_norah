// NavBar.js

import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  // const navigate = useNavigate();
  // const goBack = () => navigate(-1);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="navbar">
      <ul className={showMenu ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/flatpack-assembly-glasgow">Flat Pack Assembly</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>  
        </li> 
        <li>
          <Link to="/Picture_Hanging_Service_Glasgow">Glasgow</Link>
        </li>

      
        {/* <li>
          <button onClick={goBack}>Back</button>
        </li> */}
      </ul>

      <div className="burger" onClick={() => setShowMenu(!showMenu)}>
        <div className={showMenu ? "line line1 open" : "line"}></div>
        <div className={showMenu ? "line line2 open" : "line"}></div>
        <div className={showMenu ? "line line3 open" : "line"}></div>
      </div>
    </div>
  );
};

export default NavBar;
  
