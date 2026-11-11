import localPhotos from './data/portfolioImages.json';

const filename = photo => {
  if (photo.originalFilename) return photo.originalFilename.toLowerCase();
  try {
    return decodeURIComponent(new URL(photo.url, 'https://local.invalid').pathname)
      .split('/').pop().toLowerCase();
  } catch { return ''; }
};

// Keep existing remote photographs first. Match encoded Storage paths as well as local URLs.
export function mergePortfolioPhotos(remotePhotos, additions = localPhotos) {
  const urls = new Set();
  const names = new Set();
  return [...remotePhotos, ...additions].filter(photo => {
    const name = filename(photo);
    if (urls.has(photo.url) || (name && names.has(name))) return false;
    urls.add(photo.url);
    if (name) names.add(name);
    return true;
  });
}
