import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from './firebase';

// A shared promise deduplicates mounts and route returns until the page reloads.
let reviewsRequest;

export const googleReviewsUrl =
  'https://www.google.com/search?q=framing+norah+picture+hanger+glasgow+reviews#mpd=~11958296049149817427/customers/reviews?p%3DCgxxdWFsaXR5c2NvcmUSA2FsbA';

export function safeGoogleReviewUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname;
    const allowed = host === 'google.com' || host.endsWith('.google.com') ||
      host === 'google.co.uk' || host.endsWith('.google.co.uk') ||
      host === 'maps.app.goo.gl' || host === 'g.page';
    return url.protocol === 'https:' && allowed && !url.username && !url.password
      ? url.href : null;
  } catch {
    return null;
  }
}

export function normaliseReview(id, data) {
  const date = typeof data.date?.toDate === 'function' ? data.date.toDate() : null;
  if (typeof data.text !== 'string' || !data.text.trim() ||
      typeof data.reviewerName !== 'string' || !data.reviewerName.trim() ||
      !Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5 ||
      !(date instanceof Date) || Number.isNaN(date.getTime())) return null;
  return {
    id, text: data.text, reviewerName: data.reviewerName.trim(),
    rating: data.rating, date, dateIsExact: data.dateIsExact !== false && data.dateSource !== 'ordering-only',
    dateLabel: typeof data.dateLabel === 'string' ? data.dateLabel : null,
    googleReviewUrl: safeGoogleReviewUrl(data.googleReviewUrl),
  };
}

export function getReviews() {
  if (!reviewsRequest) {
    reviewsRequest = getDocs(query(
      collection(db, 'reviews'), where('published', '==', true),
      orderBy('date', 'desc'), limit(20)
    )).then(snapshot => snapshot.docs
      .map(doc => normaliseReview(doc.id, doc.data())).filter(Boolean));
  }
  return reviewsRequest;
}
