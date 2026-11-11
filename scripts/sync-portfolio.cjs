// Preserve originals; generate browser-compatible copies and a central manifest.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'public/images/OurWork');
const output = path.join(root, 'public/images/OurWork-web');
const supported = /\.(jpe?g|png|webp|gif|avif|svg|bmp|heic|heif)$/i;
fs.mkdirSync(output, { recursive: true });
const photos = fs.readdirSync(source).sort().filter(name => supported.test(name) && fs.statSync(path.join(source, name)).isFile()).map(name => {
  const heic = /\.hei[cf]$/i.test(name);
  const webName = `${name}.jpg`;
  if (heic && !fs.existsSync(path.join(output, webName))) {
    if (process.platform !== 'darwin') throw new Error(`Generate the JPEG for ${name} locally on macOS with npm run portfolio:sync before building.`);
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '78', '-Z', '1800', path.join(source, name), '--out', path.join(output, webName)], { stdio: 'pipe' });
  }
  const label = name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return {
    id: `ourwork:${name}`, originalFilename: name,
    url: `/images/${heic ? 'OurWork-web' : 'OurWork'}/${encodeURIComponent(heic ? webName : name)}`,
    alt: /^IMG\b/i.test(label) ? `Portfolio photograph ${label}` : label,
    category: 'HangingPhoto'
  };
});
const manifest = path.join(root, 'src/data/portfolioImages.json');
const json = JSON.stringify(photos, null, 2) + '\n';
if (!fs.existsSync(manifest) || fs.readFileSync(manifest, 'utf8') !== json) fs.writeFileSync(manifest, json);
console.log(`Portfolio: ${photos.length} local photographs ready.`);
