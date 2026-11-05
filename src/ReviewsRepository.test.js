import { getDocs } from 'firebase/firestore';
import { getReviews, normaliseReview, safeGoogleReviewUrl } from './ReviewsRepository';
jest.mock('./firebase', () => ({ db: {} }));
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(), getDocs: jest.fn(), limit: jest.fn(),
  orderBy: jest.fn(), query: jest.fn(), where: jest.fn(),
}));
test('deduplicates concurrent calls and later mounts', async () => {
  getDocs.mockResolvedValue({ docs: [] });
  await Promise.all([getReviews(), getReviews()]);
  await getReviews();
  expect(getDocs).toHaveBeenCalledTimes(1);
});
test('rejects unsafe URLs and malformed review documents', () => {
  for (const url of ['javascript:alert(1)', 'https://google.com.evil.test/', 'http://google.com/', 'https://evil.test/']) {
    expect(safeGoogleReviewUrl(url)).toBeNull();
  }
  expect(safeGoogleReviewUrl('https://maps.app.goo.gl/example')).toBeTruthy();
  expect(normaliseReview('id', {})).toBeNull();
  expect(normaliseReview('id', { text: 'fixture', reviewerName: 'fixture', rating: 8 })).toBeNull();
});
test('preserves imported text exactly and identifies ordering-only dates', () => {
  const text = '  Text with spacing\n\nand paragraphs.  ';
  const review = normaliseReview('fixture', { text, reviewerName: 'Test name', rating: 5,
    date: { toDate: () => new Date('2000-01-01T00:00:00Z') },
    dateLabel: '1 week ago', dateIsExact: false, dateSource: 'ordering-only' });
  expect(review.text).toBe(text);
  expect(review.dateIsExact).toBe(false);
  expect(review.dateLabel).toBe('1 week ago');
  expect(review.googleReviewUrl).toBeNull();
});
