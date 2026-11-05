import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';

const links = [
  ['/picture-hanging-glasgow', 'Picture hanging'],
  ['/flatpack-assembly-glasgow', 'Flat-pack assembly'],
  ['/gallery', 'Our work'], ['/about', 'About'], ['/blog', 'Blog'],
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <nav className="site-nav" aria-label="Main navigation" onKeyDown={event => {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
    }}>
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__brand" aria-label="Framing Norah home">Framing Norah<span>Picture & mirror hanging</span></Link>
        <button ref={toggle} className="site-nav__toggle" type="button"
          aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(value => !value)}>
          {open ? 'Close menu' : 'Menu'} <span aria-hidden="true">{open ? '×' : '☰'}</span>
        </button>
        <div id="site-navigation" className={`site-nav__links${open ? ' is-open' : ''}`}>
          {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
          <NavLink to="/contact" className="site-button site-nav__quote" onClick={() => setOpen(false)}>Get a Quote</NavLink>
        </div>
      </div>
    </nav>
  );
}
