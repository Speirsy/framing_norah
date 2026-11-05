import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewsCarousel from './ReviewsCarousel';
import { getReviews } from '../ReviewsRepository';

jest.mock('../ReviewsRepository', () => ({
  getReviews: jest.fn(), googleReviewsUrl: 'https://www.google.com/search?q=framing+norah+picture+hanger+glasgow+reviews#mpd=~11958296049149817427/customers/reviews?p%3DCgxxdWFsaXR5c2NvcmUSA2FsbA',
}));
// Synthetic test fixtures only; these are never shipped as customer testimonials.
const items = [0, 1].map(i => ({ id: String(i), text: `Test review ${i}`,
  reviewerName: `Test author ${i}`, rating: 5, date: new Date('2025-01-01'),
  googleReviewUrl: i ? null : 'https://www.google.com/maps/reviews/test',
}));
let motionListener;
let motionQuery;
beforeEach(() => {
  jest.useFakeTimers();
  window.PointerEvent = class extends MouseEvent {
    constructor(type, init = {}) { super(type, init); this.pointerType = init.pointerType || ''; }
  };
  motionQuery = { matches: false,
    addEventListener: (_, fn) => { motionListener = fn; }, removeEventListener: jest.fn(),
  };
  window.matchMedia = jest.fn(() => motionQuery);
  getReviews.mockResolvedValue(items);
});
afterEach(() => { jest.clearAllTimers(); jest.useRealTimers(); jest.clearAllMocks(); });
async function mount() {
  const result = render(<ReviewsCarousel />);
  await act(async () => {});
  return result;
}
test('rotates every six seconds without refetching; links original review', async () => {
  await mount();
  expect(screen.getByText('Read this review on Google', { exact: false })).toHaveAttribute('href', items[0].googleReviewUrl);
  act(() => jest.advanceTimersByTime(5999));
  expect(screen.getByText('Test review 0')).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(1));
  expect(screen.getByText('Test review 1')).toBeInTheDocument();
  expect(getReviews).toHaveBeenCalledTimes(1);
});
test('hover pauses and resumes; manual navigation stays paused', async () => {
  await mount();
  const viewport = screen.getByRole('article').parentElement;
  fireEvent.pointerEnter(viewport, { pointerType: 'mouse' });
  act(() => jest.advanceTimersByTime(12000));
  expect(screen.getByText('Test review 0')).toBeInTheDocument();
  fireEvent.pointerLeave(viewport, { pointerType: 'mouse' });
  act(() => jest.advanceTimersByTime(6000));
  fireEvent.click(screen.getByRole('button', { name: 'Next review' }));
  act(() => jest.advanceTimersByTime(12000));
  expect(screen.getByText('Test review 0')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Resume rotation' })).toBeInTheDocument();
});
test('focus pauses rotation; swipe moves review and leaves it paused', async () => {
  await mount();
  fireEvent.focus(screen.getByRole('button', { name: 'Next review' }));
  act(() => jest.advanceTimersByTime(12000));
  expect(screen.getByText('Test review 0')).toBeInTheDocument();
  const viewport = screen.getByRole('article').parentElement;
  fireEvent.touchStart(viewport, { touches: [{ clientX: 200, clientY: 20 }] });
  fireEvent.touchEnd(viewport, { changedTouches: [{ clientX: 50, clientY: 25 }] });
  expect(screen.getByText('Test review 1')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Resume rotation' })).toBeInTheDocument();
});
test('reduced motion disables automatic rotation, including preference changes', async () => {
  await mount();
  act(() => { motionQuery.matches = true; motionListener(); });
  act(() => jest.advanceTimersByTime(12000));
  expect(screen.getByText('Test review 0')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Pause rotation' })).not.toBeInTheDocument();
});
test('empty and failed loads retain a Google profile link', async () => {
  getReviews.mockResolvedValueOnce([]);
  const view = await mount();
  expect(screen.getByText('Read customer feedback on our Google profile.')).toBeInTheDocument();
  view.unmount();
  getReviews.mockRejectedValueOnce(new Error('permission denied'));
  await mount();
  expect(screen.getByRole('status')).toHaveTextContent('unavailable');
  expect(screen.getByRole('link', { name: /Read all reviews on Google/ })).toBeInTheDocument();
});
test('pause and resume controls work with pointer interaction', async () => {
  await mount();
  const pause = screen.getByRole('button', { name: 'Pause rotation' });
  fireEvent.pointerDown(pause);
  fireEvent.click(pause);
  act(() => jest.advanceTimersByTime(12000));
  expect(screen.getByText('Test review 0')).toBeInTheDocument();
  const resume = screen.getByRole('button', { name: 'Resume rotation' });
  fireEvent.pointerDown(resume);
  fireEvent.click(resume);
  act(() => jest.advanceTimersByTime(6000));
  expect(screen.getByText('Test review 1')).toBeInTheDocument();
});
test('single review has no rotation controls and timers are cleaned on unmount', async () => {
  getReviews.mockResolvedValueOnce([items[0]]);
  const view = await mount();
  expect(screen.queryByRole('button', { name: 'Next review' })).not.toBeInTheDocument();
  view.unmount();
  const rotatingView = await mount();
  expect(jest.getTimerCount()).toBeGreaterThan(0);
  rotatingView.unmount();
  expect(jest.getTimerCount()).toBe(0);
});
test('never displays synthetic dates or stale relative labels as verified dates', async () => {
  getReviews.mockResolvedValueOnce([{ ...items[0], date: new Date('2000-01-01'),
    dateIsExact: false, dateLabel: '1 week ago' }]);
  await mount();
  expect(screen.queryByText('Review date not verified')).not.toBeInTheDocument();
  expect(screen.queryByText(/2000|1 week ago/)).not.toBeInTheDocument();
  expect(document.querySelector('time')).toBeNull();
});
test('resume advances while rotation button retains keyboard focus', async () => {
  await mount();
  const next = screen.getByRole('button', { name: 'Next review' });
  fireEvent.focus(next);
  fireEvent.click(next);
  const resume = screen.getByRole('button', { name: 'Resume rotation' });
  fireEvent.focus(resume);
  fireEvent.click(resume);
  act(() => jest.advanceTimersByTime(6000));
  expect(screen.getByText('Test review 0')).toBeInTheDocument();
});
test('hover only pauses over review text; resume control is outside hover area', async () => {
  await mount();
  const viewport = screen.getByRole('article').parentElement;
  fireEvent.pointerEnter(viewport, { pointerType: 'mouse' });
  expect(screen.getByRole('status')).toHaveTextContent('paused while you read');
  act(() => jest.advanceTimersByTime(12000));
  expect(screen.getByText('Test review 0')).toBeInTheDocument();
  fireEvent.pointerLeave(viewport, { pointerType: 'mouse' });
  const pause = screen.getByRole('button', { name: 'Pause rotation' });
  fireEvent.focus(pause);
  fireEvent.click(pause);
  fireEvent.click(screen.getByRole('button', { name: 'Resume rotation' }));
  act(() => jest.advanceTimersByTime(6000));
  expect(screen.getByText('Test review 1')).toBeInTheDocument();
});
test('touch pointer entry does not latch hover and hidden tabs suspend timers', async () => {
  await mount();
  fireEvent.pointerEnter(screen.getByRole('article').parentElement, { pointerType: 'touch' });
  act(() => jest.advanceTimersByTime(6000));
  expect(screen.getByText('Test review 1')).toBeInTheDocument();
  const original = Object.getOwnPropertyDescriptor(document, 'hidden');
  Object.defineProperty(document, 'hidden', { configurable: true, value: true });
  fireEvent(document, new Event('visibilitychange'));
  act(() => jest.advanceTimersByTime(12000));
  expect(screen.getByText('Test review 1')).toBeInTheDocument();
  Object.defineProperty(document, 'hidden', { configurable: true, value: false });
  fireEvent(document, new Event('visibilitychange'));
  act(() => jest.advanceTimersByTime(6000));
  expect(screen.getByText('Test review 0')).toBeInTheDocument();
  if (original) Object.defineProperty(document, 'hidden', original);
  else delete document.hidden;
});
test('links to the exact supplied all-reviews destination', async () => {
  await mount();
  expect(screen.getByRole('link', { name: /Read all reviews on Google/ })).toHaveAttribute('href',
    'https://www.google.com/search?q=framing+norah+picture+hanger+glasgow+reviews#mpd=~11958296049149817427/customers/reviews?p%3DCgxxdWFsaXR5c2NvcmUSA2FsbA');
});

test('controls are icon-only with accessible names and no visible counter or rotation explanation', async () => {
  await mount();
  const previous = screen.getByRole('button', { name: 'Previous review' });
  const next = screen.getByRole('button', { name: 'Next review' });
  const pause = screen.getByRole('button', { name: 'Pause rotation' });
  expect(previous).toHaveTextContent('‹');
  expect(next).toHaveTextContent('›');
  expect(pause).toHaveTextContent('');
  expect(pause.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  expect(screen.queryByText(/\d+ \/ \d+/)).not.toBeInTheDocument();
  expect(screen.queryByText('Reviews change automatically every 6 seconds.')).not.toBeInTheDocument();
  expect(previous.parentElement).toHaveClass('fn-reviews__stage');
  expect(previous.nextElementSibling).toHaveClass('fn-reviews__viewport');
  expect(next.previousElementSibling).toHaveClass('fn-reviews__viewport');
});

test('keeps every slide in layout but exposes only the active slide and its links', async () => {
  await mount();
  const slides = document.querySelectorAll('.fn-reviews__card');
  expect(slides).toHaveLength(2);
  expect(screen.getAllByRole('article')).toHaveLength(1);
  expect(screen.getByRole('article')).toHaveTextContent('Test review 0');
  expect(slides[1]).toHaveAttribute('aria-hidden', 'true');
  expect(slides[1]).toHaveAttribute('inert');
  expect(slides[1]).not.toHaveAttribute('hidden');
  const firstLink = slides[0].querySelector('a');
  fireEvent.click(screen.getByRole('button', { name: 'Next review' }));
  expect(screen.getByRole('article')).toHaveTextContent('Test review 1');
  expect(slides[0]).toHaveAttribute('data-active', 'false');
  expect(firstLink).toHaveAttribute('tabindex', '-1');
  expect(screen.queryByRole('link', { name: /Read this review on Google/ })).not.toBeInTheDocument();
  expect(slides[1]).not.toHaveAttribute('inert');
  // Slide nodes are reused, not remounted or re-fetched on rotation.
  expect(document.querySelectorAll('.fn-reviews__card')[0]).toBe(slides[0]);
  expect(getReviews).toHaveBeenCalledTimes(1);
});

test('automatic rotation changes the accessible slide while retaining long inactive content', async () => {
  const longText = 'Long test-only review. '.repeat(50);
  getReviews.mockResolvedValueOnce([items[0], { ...items[1], text: longText }]);
  await mount();
  expect(screen.getByRole('article')).toHaveTextContent('Test review 0');
  const longSlide = document.querySelectorAll('.fn-reviews__card')[1];
  expect(longSlide).toHaveTextContent(longText.trim());
  expect(longSlide).toHaveAttribute('aria-hidden', 'true');
  act(() => jest.advanceTimersByTime(6000));
  expect(screen.getByRole('article')).toBe(longSlide);
  expect(longSlide).toHaveAttribute('aria-hidden', 'false');
});
