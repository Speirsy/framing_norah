import fs from 'fs';
import path from 'path';
import photos from './data/portfolioImages.json';
import { mergePortfolioPhotos } from './portfolioImages';

test('every supported original has a unique browser-compatible gallery entry and an existing asset', () => {
  const originals = fs.readdirSync('public/images/OurWork').filter(name => /\.(jpe?g|png|webp|gif|avif|svg|bmp|heic|heif)$/i.test(name));
  expect(photos.map(photo => photo.originalFilename).sort()).toEqual(originals.sort());
  expect(new Set(photos.map(photo => photo.url)).size).toBe(photos.length);
  photos.forEach(photo => {
    expect(photo.alt).toBeTruthy();
    expect(photo.url).not.toMatch(/\.heic$/i);
    expect(fs.existsSync(path.join('public', decodeURIComponent(photo.url)))).toBe(true);
  });
});
test('retains remote photos and avoids duplicate URLs and encoded Storage filenames', () => {
  const remote = { url: 'https://firebasestorage.googleapis.com/v0/b/site/o/photos%2FExample%20Photo.HEIC?alt=media', name: 'Existing caption' };
  const additions = [{ url: '/images/OurWork-web/Example%20Photo.HEIC.jpg', originalFilename: 'Example Photo.HEIC' }, { url: '/new.jpg', alt: 'New photo' }];
  expect(mergePortfolioPhotos([remote, remote], additions)).toEqual([remote, additions[1]]);
});
