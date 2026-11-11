# Local portfolio photographs

Keep originals in `public/images/OurWork/`, with their exact filenames. Run
`npm run portfolio:sync` after adding photographs (also runs before start/build).
The script creates `src/data/portfolioImages.json`; do not edit this generated list.
JPG/JPEG, PNG, WebP, GIF, AVIF, SVG and BMP are served directly. HEIC/HEIF originals
receive JPEG web copies in `public/images/OurWork-web/`, retaining the complete
original filename and appending `.jpg`. No originals are changed.

New HEIC conversions require macOS's built-in `sips`. Include the generated JPEGs
and manifest with future website changes so Linux CI can build without conversion.
Restart an already running development server, or run the sync command, after
adding files. Existing JPEG derivatives are reused.

The gallery merges these entries with existing Firestore photographs, retaining
remote entries first and removing repeated URLs or original filenames. It cannot
recognise the same photograph uploaded under unrelated names. Filename-derived
alt text avoids claiming details absent from filenames; IMG-number descriptions
are intentionally generic. `PhotoList` also supports a distinct `alt` field without
forcing a visible caption.
