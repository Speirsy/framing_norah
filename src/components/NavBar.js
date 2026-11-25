import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';

// Dropdown menus in the navbar. `match` marks the toggle as current when
// you're on one of its pages.
const menus = [
  {
    id: 'areas',
    label: 'Areas',
    match: pathname => pathname.startsWith('/picture-hanging'),
    links: [
      ['/picture-hanging-glasgow', 'Glasgow'],
      ['/picture-hanging-edinburgh', 'Edinburgh'],
      ['/contact', 'Somewhere else?'],
    ],
  },
  {
    id: 'other-services',
    label: 'Other services',
    match: pathname => pathname.startsWith('/flatpack'),
    links: [
      ['/flatpack-assembly-glasgow', 'Flat-pack assembly'],
    ],
  },
];

// Labels differ from URLs (/gallery, /blog) on purpose; URLs stay so existing links and search results keep working.
const links = [
  ['/gallery', 'Portfolio'], ['/blog', 'Advice'], ['/about', 'About John'],
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // id of the open dropdown, or null
  const toggle = useRef(null);
  const menuButtons = useRef({});
  const menuBoxes = useRef({});
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); setOpenMenu(null); }, [pathname]);

  // Close an open dropdown when clicking anywhere outside it.
  useEffect(() => {
    if (!openMenu) return undefined;
    const close = event => {
      if (!menuBoxes.current[openMenu]?.contains(event.target)) setOpenMenu(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [openMenu]);

  const closeAll = () => { setOpen(false); setOpenMenu(null); };
  return (
    <nav className="site-nav" aria-label="Main navigation" onKeyDown={event => {
      if (event.key !== 'Escape') return;
      if (openMenu) { menuButtons.current[openMenu]?.focus(); setOpenMenu(null); }
      else if (open) { setOpen(false); toggle.current?.focus(); }
    }}>
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__brand" aria-label="Framing Norah home">Framing Norah<span>Picture & mirror hanging</span></Link>
        <button ref={toggle} className="site-nav__toggle" type="button"
          aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(value => !value)}>
          {open ? 'Close menu' : 'Menu'} <span aria-hidden="true">{open ? '×' : '☰'}</span>
        </button>
        <div id="site-navigation" className={`site-nav__links${open ? ' is-open' : ''}`}>
          {menus.map(menu => {
            const isOpen = openMenu === menu.id;
            return (
              <div key={menu.id} className="site-nav__dropdown" ref={el => { menuBoxes.current[menu.id] = el; }}>
                <button ref={el => { menuButtons.current[menu.id] = el; }} type="button"
                  className={`site-nav__dropdown-toggle${menu.match(pathname) ? ' is-current' : ''}`}
                  aria-expanded={isOpen} aria-controls={`${menu.id}-menu`}
                  onClick={() => setOpenMenu(current => (current === menu.id ? null : menu.id))}>
                  {menu.label} <span aria-hidden="true">▾</span>
                </button>
                <div id={`${menu.id}-menu`} className={`site-nav__dropdown-menu${isOpen ? ' is-open' : ''}`}>
                  {menu.links.map(([to, label]) => <NavLink key={to} to={to} onClick={closeAll}>{label}</NavLink>)}
                </div>
              </div>
            );
          })}
          {links.map(([to, label]) => <NavLink key={to} to={to} onClick={closeAll}>{label}</NavLink>)}
          <NavLink to="/contact" className="site-button site-nav__quote" onClick={closeAll}>Get a Quote</NavLink>
        </div>
      </div>
    </nav>
  );
}
