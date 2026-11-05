# Shared website design

`src/index.css` is the single shared foundation, imported once after Bootstrap in
`src/index.js`. Palette: ivory #F7F4ED, stone #EAE5DA, olive #344638. System sans-serif,
18px body, 16px minimum supporting text, shared fluid heading scale. Homepage h1
retains its previous clamp(2.2rem, 1.5rem + 3vw, 3.6rem). Homepage CSS now contains
composition only; no legacy font or gradient overrides. The temporary
LegacyPageStyles.css was removed. About and Blog styles no longer leak .centered,
paragraph or list rules onto unrelated pages. No new dependency or web font.

The existing routes and metadata remain. Main navigation uses Framing Norah text
branding, actual routes, and /contact for Get a Quote. Below 1080px it becomes a
button-controlled menu; aria-expanded, aria-controls, active links, Escape focus
return, close-on-navigation, and a skip-to-main link support keyboard use.

PhotoList uses natural-height CSS columns with a consistent 20px gap, one column
on phones. All originals and descriptions remain; no forced aspect ratios or
object-fit:cover. Browser-native modal dialog provides focus containment and Escape
behaviour; closing returns focus to the originating thumbnail. Images lazy-load;
the first homepage photograph remains eager. Descriptive media names are used for
alt text; unnamed media have a neutral fallback and should receive authored names
in Firestore when possible. No Firestore content was edited.

VideoList retains native controls, title and original URL, adding metadata-only
preload and shared natural-ratio layout. Home keeps its 640px cap. Blog image
renderers no longer impose 25%/50% width; YouTube iframes are responsive. Review
fetching, carousel timing, imported testimonials, and EmailJS submission are
unchanged. Firebase configuration, credentials, indexes and rules are untouched.

Minor markup repairs: About's nested paragraphs and trailing image-path whitespace;
CV's stray code-like JSX text; Contact's page heading; long gallery/assembly
introductions become paragraphs. Customer-facing prose and service pricing were
not rewritten. Contact form changes are limited to a scoped wrapper and styling.

Local regression checks: full React test suite with mocked services; importer
unit tests; production build; git diff whitespace check. Native dialog behaviour
and CSS breakpoints still need real-browser/device visual review. The test DOM
mocks native dialog methods, so it verifies wiring rather than browser rendering.
No actual contact message was sent and no live review reads/writes were needed.

Known pre-existing items outside this visual work: unused-variable build warnings,
outdated Browserslist/test-library deprecations, invalid web-app manifest, raw blog
HTML sanitisation, generic/missing media metadata, and some dated page copy. No
attempt was made to change live data or perform a deployment.
