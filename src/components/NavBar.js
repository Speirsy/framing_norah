import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';

const hangingLinks = [
  ['/picture-hanging-glasgow', 'Glasgow'],
  ['/picture-hanging-edinburgh', 'Edinburgh'],
];

const links = [
  ['/flatpack-assembly-glasgow', 'Flat-pack assembly'],
  ['/gallery', 'Our work'], ['/about', 'About'], ['/blog', 'Blog'],
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [hangingOpen, setHangingOpen] = useState(false);
  const toggle = useRef(null);
  const hangingButton = useRef(null);
  const hangingMenu = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); setHangingOpen(false); }, [pathname]);

  // Close the Picture hanging dropdown when clicking anywhere outside it.
  useEffect(() => {
    if (!hangingOpen) return undefined;
    const close = event => {
      if (!hangingMenu.current?.contains(event.target)) setHangingOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [hangingOpen]);

  const closeAll = () => { setOpen(false); setHangingOpen(false); };
  const onHangingPage = pathname.startsWith('/picture-hanging');
  return (
    <nav className="site-nav" aria-label="Main navigation" onKeyDown={event => {
      if (event.key !== 'Escape') return;
      if (hangingOpen) { setHangingOpen(false); hangingButton.current?.focus(); }
      else if (open) { setOpen(false); toggle.current?.focus(); }
    }}>
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__brand" aria-label="Framing Norah home">Framing Norah<span>Picture & mirror hanging</span></Link>
        <button ref={toggle} className="site-nav__toggle" type="button"
          aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(value => !value)}>
          {open ? 'Close menu' : 'Menu'} <span aria-hidden="true">{open ? '×' : '☰'}</span>
        </button>
        <div id="site-navigation" className={`site-nav__links${open ? ' is-open' : ''}`}>
          <div className="site-nav__dropdown" ref={hangingMenu}>
            <button ref={hangingButton} type="button"
              className={`site-nav__dropdown-toggle${onHangingPage ? ' is-current' : ''}`}
              aria-expanded={hangingOpen} aria-controls="picture-hanging-menu"
              onClick={() => setHangingOpen(value => !value)}>
              Picture hanging <span aria-hidden="true">▾</span>
            </button>
            <div id="picture-hanging-menu" className={`site-nav__dropdown-menu${hangingOpen ? ' is-open' : ''}`}>
              {hangingLinks.map(([to, label]) => <NavLink key={to} to={to} onClick={closeAll}>{label}</NavLink>)}
            </div>
          </div>
          {links.map(([to, label]) => <NavLink key={to} to={to} onClick={closeAll}>{label}</NavLink>)}
          <NavLink to="/contact" className="site-button site-nav__quote" onClick={closeAll}>Get a Quote</NavLink>
        </div>
      </div>
    </nav>
  );
}
