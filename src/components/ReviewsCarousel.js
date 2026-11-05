import React, { useEffect, useRef, useState } from 'react';
import { getReviews, googleReviewsUrl } from '../ReviewsRepository';
import './ReviewsCarousel.css';

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('loading');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  const touch = useRef(null);

  useEffect(() => {
    let active = true;
    getReviews().then(items => {
      if (active) { setReviews(items); setStatus('ready'); }
    }).catch(() => { if (active) setStatus('error'); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const change = () => setReducedMotion(media?.matches ?? false);
    const visibility = () => setHidden(document.hidden);
    media?.addEventListener('change', change);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      media?.removeEventListener('change', change);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  const rotating = reviews.length > 1 && !paused && !hovered && !focused && !hidden && !reducedMotion;
  useEffect(() => {
    if (!rotating) return undefined;
    const timer = window.setInterval(() => setIndex(i => (i + 1) % reviews.length), 6000);
    return () => window.clearInterval(timer);
  }, [rotating, reviews.length]);

  const move = direction => {
    setPaused(true);
    setIndex(i => (i + direction + reviews.length) % reviews.length);
  };
  const review = reviews[index];

  return (
    <section className="fn-reviews" aria-labelledby="fn-reviews-heading"
      aria-roledescription="carousel"
      onFocusCapture={event => {
        // The rotation control must be able to resume while it retains focus.
        const rotationControl = !!event.target.closest('[data-rotation-control]');
        setFocused(!rotationControl);
        if (!rotationControl) setPaused(true);
      }}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onPointerDownCapture={event => {
        if (!event.target.closest('[data-rotation-control]')) setPaused(true);
      }}
      onKeyDownCapture={event => {
        if (!event.target.closest('[data-rotation-control]')) setPaused(true);
      }}>
      <header>
        <h2 id="fn-reviews-heading">What our customers say</h2>
      </header>

      {status === 'loading' && <p role="status">Loading customer reviews…</p>}
      {status === 'error' && <p role="status">Reviews are unavailable here just now. You can still read them on Google.</p>}
      {status === 'ready' && !reviews.length && <p>Read customer feedback on our Google profile.</p>}

      {review && (
        <>
          <div className={`fn-reviews__stage${reviews.length === 1 ? ' fn-reviews__stage--single' : ''}`}>
          {reviews.length > 1 && <button type="button" className="fn-reviews__arrow"
            aria-label="Previous review" onClick={() => move(-1)}><span aria-hidden="true">‹</span></button>}
          <div className="fn-reviews__viewport" aria-live={rotating ? 'off' : 'polite'}
            onPointerEnter={event => {
              if (event.pointerType === 'mouse' || event.pointerType === 'pen') setHovered(true);
            }}
            onPointerLeave={() => setHovered(false)}
            onTouchStart={event => {
              setPaused(true);
              setHovered(false);
              touch.current = event.touches.length === 1
                ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
            }}
            onTouchCancel={() => { touch.current = null; }}
            onTouchEnd={event => {
              const start = touch.current;
              touch.current = null;
              if (!start || reviews.length < 2 || !event.changedTouches.length) return;
              const dx = event.changedTouches[0].clientX - start.x;
              const dy = event.changedTouches[0].clientY - start.y;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
            }}>
            {/* Overlapping grid slides all contribute their natural height. Only the
                active slide is visible, interactive, or exposed to assistive tech. */}
            {reviews.map((review, slideIndex) => (
            <article key={review.id} className="fn-reviews__card" aria-roledescription="slide"
              aria-label={`Review ${slideIndex + 1} of ${reviews.length}`}
              aria-hidden={slideIndex !== index}
              inert={slideIndex !== index ? '' : undefined}
              data-active={slideIndex === index}>
              <p className="fn-reviews__stars">
                <span aria-hidden="true">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                <span className="fn-reviews__sr-only">{review.rating} out of 5 stars</span>
              </p>
              <blockquote><p>{review.text}</p></blockquote>
              <p className="fn-reviews__author">{review.reviewerName}</p>
              {review.dateIsExact !== false && <time dateTime={review.date.toISOString().slice(0, 10)}>
                {review.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>}
              {review.googleReviewUrl && <a className="fn-reviews__source" href={review.googleReviewUrl}
                tabIndex={slideIndex === index ? undefined : -1}
                target="_blank" rel="noopener noreferrer">Read this review on Google <span className="fn-reviews__sr-only">(opens in a new tab)</span>↗</a>}
            </article>
            ))}
          </div>
          {reviews.length > 1 && <button type="button" className="fn-reviews__arrow"
            aria-label="Next review" onClick={() => move(1)}><span aria-hidden="true">›</span></button>}
          </div>
          {reviews.length > 1 && !reducedMotion && <div className="fn-reviews__controls">
            <button type="button" className="fn-reviews__rotation" data-rotation-control
              aria-label={paused ? 'Resume rotation' : 'Pause rotation'}
              title={paused ? 'Resume rotation' : 'Pause rotation'}
              onClick={() => setPaused(value => !value)}>
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                {paused ? <path d="M4 2 13 8 4 14Z" fill="currentColor" />
                  : <path d="M4 2H7V14H4ZM9 2H12V14H9Z" fill="currentColor" />}
              </svg>
            </button>
          </div>}
          {reviews.length > 1 && <p className="fn-reviews__sr-only" role="status">
            {reducedMotion ? 'Automatic rotation off: reduced motion enabled.'
              : hidden ? 'Rotation paused while this tab is hidden.'
              : paused || focused ? 'Rotation paused.'
              : hovered ? 'Rotation paused while you read. Move the pointer away to continue.'
              : ''}
          </p>}
        </>
      )}
      <a className="fn-reviews__all" href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">
        Read all reviews on Google <span aria-hidden="true">↗</span>
        <span className="fn-reviews__sr-only"> (opens in a new tab)</span>
      </a>
    </section>
  );
}
