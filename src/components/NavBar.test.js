import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

test('menu has accessible state, closes after navigation and Escape restores focus', () => {
  render(<MemoryRouter initialEntries={['/gallery']}><NavBar /></MemoryRouter>);
  expect(screen.getByRole('link', { name: 'Framing Norah home' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: 'Get a Quote' })).toHaveAttribute('href', '/contact');
  expect(screen.getByRole('link', { name: 'Portfolio' })).toHaveAttribute('aria-current', 'page');
  fireEvent.click(screen.getByRole('button', { name: /Menu/ }));
  const close = screen.getByRole('button', { name: /Close menu/ });
  expect(close).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(close, { key: 'Escape' });
  const menu = screen.getByRole('button', { name: /Menu/ });
  expect(menu).toHaveFocus();
  expect(menu).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(menu);
  fireEvent.click(screen.getByRole('link', { name: 'About John' }));
  expect(screen.getByRole('button', { name: /Menu/ })).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByRole('link', { name: 'About John' })).toHaveAttribute('aria-current', 'page');
});

test('Areas dropdown lists Glasgow and Edinburgh and closes with Escape', () => {
  render(<MemoryRouter initialEntries={['/']}><NavBar /></MemoryRouter>);
  const toggle = screen.getByRole('button', { name: /Areas/ });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('link', { name: 'Glasgow' })).toHaveAttribute('href', '/picture-hanging-glasgow');
  expect(screen.getByRole('link', { name: 'Edinburgh' })).toHaveAttribute('href', '/picture-hanging-edinburgh');
  fireEvent.keyDown(toggle, { key: 'Escape' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();
});

test('Other services dropdown links to flat-pack, and only one dropdown is open at a time', () => {
  render(<MemoryRouter initialEntries={['/']}><NavBar /></MemoryRouter>);
  const locations = screen.getByRole('button', { name: /Areas/ });
  const other = screen.getByRole('button', { name: /Other services/ });
  fireEvent.click(locations);
  fireEvent.click(other);
  expect(locations).toHaveAttribute('aria-expanded', 'false');
  expect(other).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('link', { name: 'Flat-pack assembly' })).toHaveAttribute('href', '/flatpack-assembly-glasgow');
  expect(screen.queryByRole('link', { name: 'Our work' })).not.toBeInTheDocument();
});
