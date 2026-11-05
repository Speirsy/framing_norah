import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { getMedia } from '../MediaRepository';
jest.mock('../MediaRepository', () => ({ getMedia: jest.fn() }));
jest.mock('./ReviewsCarousel', () => () => <section aria-label="Customer reviews" />);
jest.mock('react-helmet', () => ({ Helmet: () => null }));

test('preserves ordered process content, booking destination and playable promo video', async () => {
  getMedia.mockResolvedValue([
    { type: 'video', category: 'promo', url: 'https://example.test/promo.mp4', name: 'Test promo' },
    { type: 'video', category: 'other', url: 'https://example.test/other.mp4', name: 'Other video' },
  ]);
  render(<MemoryRouter><Home /></MemoryRouter>);
  const mainHeading = screen.getByRole('heading', { level: 1 });
  expect(mainHeading).toHaveTextContent('Picture & Mirror Hanging Specialist – Glasgow & Edinburgh');
  expect(mainHeading.closest('.fn-home')).not.toHaveClass('centered');
  const lead = screen.getByText('Clean, level installations that stay exactly where they should');
  expect(lead.tagName).toBe('P');
  expect(screen.getByRole('link', { name: 'Get a Free Quote' })).toHaveAttribute('href', '/contact');
  const process = screen.getByRole('region', { name: 'How It Works' });
  const list = within(process).getByRole('list');
  expect(list.tagName).toBe('OL');
  expect(within(list).getAllByRole('listitem').map(li => li.textContent)).toEqual([
    'Contact us through our form, phone or email.',
    'Tell us your needs and get a free estimate',
    'Schedule a convenient date and time',
    'We show up, hang your art, and/or assemble your furniture',
    'Enjoy your refreshed space',
    'Leave us a 5-star review and recommend us to your friends!',
  ]);
  const assembly = screen.getByRole('region', { name: 'Flat Pack Assembly Services' });
  const booking = within(assembly).getByRole('link', { name: 'Book Flat Pack Assembly' });
  expect(booking).toHaveAttribute('href', '/contact');
  expect(booking.querySelector('button')).toBeNull();
  const video = await screen.findByTitle('Test promo');
  expect(video.tagName).toBe('VIDEO');
  expect(video).toHaveAttribute('controls');
  expect(video).toHaveAttribute('src', 'https://example.test/promo.mp4');
  expect(video.closest('.fn-home__videos')).not.toBeNull();
  expect(screen.queryByTitle('Other video')).not.toBeInTheDocument();
  expect(getMedia).toHaveBeenCalledTimes(1);
});

test('ivory homepage preserves its opening and excludes the disabled background experiment', async () => {
  getMedia.mockResolvedValue([]);
  render(<MemoryRouter><Home /></MemoryRouter>);
  const header = screen.getByRole('heading', { level: 1 }).closest('header');
  expect(header).toHaveClass('fn-home__hero');
  expect(header.nextElementSibling).toHaveClass('fn-home__photos');
  expect(header.nextElementSibling.querySelectorAll('img')).toHaveLength(2);
  expect(header.querySelector('img')).toBeNull();
  expect(header.parentElement).toHaveClass('fn-home__opening');
  expect(within(header.parentElement).getByRole('region', { name: 'Send me a photo for a quick quote today' })).toBeInTheDocument();
  expect(within(header.parentElement).getByRole('link', { name: 'Get a Free Quote' })).toHaveAttribute('href', '/contact');
  expect(screen.getAllByRole('link', { name: 'Get a Free Quote' })).toHaveLength(1);
  expect(document.querySelector('.fn-home__painting')).toBeNull();
  expect(screen.queryByRole('group', { name: 'Local background preview' })).not.toBeInTheDocument();
  await screen.findByRole('heading', { name: 'How It Works' });
});
