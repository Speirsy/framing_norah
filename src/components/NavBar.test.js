import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

test('menu has accessible state, closes after navigation and Escape restores focus', () => {
  render(<MemoryRouter initialEntries={['/gallery']}><NavBar /></MemoryRouter>);
  expect(screen.getByRole('link', { name: 'Framing Norah home' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: 'Get a Quote' })).toHaveAttribute('href', '/contact');
  expect(screen.getByRole('link', { name: 'Our work' })).toHaveAttribute('aria-current', 'page');
  fireEvent.click(screen.getByRole('button', { name: /Menu/ }));
  const close = screen.getByRole('button', { name: /Close menu/ });
  expect(close).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(close, { key: 'Escape' });
  const menu = screen.getByRole('button', { name: /Menu/ });
  expect(menu).toHaveFocus();
  expect(menu).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(menu);
  fireEvent.click(screen.getByRole('link', { name: 'About' }));
  expect(screen.getByRole('button', { name: /Menu/ })).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
});
