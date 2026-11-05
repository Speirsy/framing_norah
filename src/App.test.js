import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { getMedia } from './MediaRepository';
import { getReviews } from './ReviewsRepository';
import { getBlogs } from './BlogRepository';
import { onAuthStateChanged } from 'firebase/auth';

jest.mock('./firebase', () => ({ auth: {}, db: {} }));
jest.mock('firebase/auth', () => ({ onAuthStateChanged: jest.fn(() => () => {}), signInWithEmailAndPassword: jest.fn() }));
jest.mock('./MediaRepository', () => ({ getMedia: jest.fn().mockResolvedValue([]) }));
jest.mock('./ReviewsRepository', () => ({ getReviews: jest.fn().mockResolvedValue([]), googleReviewsUrl: 'https://www.google.com/' }));
jest.mock('./BlogRepository', () => ({ getBlogs: jest.fn().mockResolvedValue([]), getBlogBySlug: jest.fn().mockResolvedValue(null) }));

beforeEach(() => {
  getMedia.mockResolvedValue([]);
  getReviews.mockResolvedValue([]);
  getBlogs.mockResolvedValue([]);
  onAuthStateChanged.mockReturnValue(() => {});
});

test.each([
  ['/', 'Picture & Mirror Hanging Specialist – Glasgow & Edinburgh'],
  ['/about', 'About'], ['/contact', 'Contact Us'], ['/gallery', 'Portfolio'],
  ['/flatpack-assembly-glasgow', 'Flat Pack Assembly in Glasgow & Surrounding Areas'],
  ['/picture-hanging-glasgow', 'Picture Hanging Glasgow'], ['/CV', 'John Speirs'],
  ['/blog', 'Projects, Help, Ideas, Therapy, Musings...'], ['/unknown-page', '404 - PAGE NOT FOUND'],
])('route %s retains page content and navigation', async (path, heading) => {
  window.history.replaceState({}, '', path);
  await act(async () => { render(<App />); });
  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
});
