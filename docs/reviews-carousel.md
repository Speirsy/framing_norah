# Homepage reviews carousel

The carousel sits between “Why Choose Framing Norah?” and “How It Works”.
It uses the existing Firebase client, not Places, a Google widget, a Cloud
Function, or a new API key. Google links are ordinary external navigation.
No reviews are included in source; test fixtures are synthetic and test-only.

## Enter real reviews

In the Firebase Console, select Firestore Database in `framing-norah` and create
collection `reviews`. Add one document per genuine review (auto IDs are fine):

| Field | Firestore type | Value |
| --- | --- | --- |
| text | string | Actual review text, reproduced with the appropriate permission |
| reviewerName | string | Reviewer’s approved display name |
| rating | number | Integer 1 through 5 matching the original |
| date | timestamp | Verified original date, or an explicitly flagged ordering-only fallback |
| dateIsExact | boolean | false for unverified/import ordering dates |
| dateSource | string | ordering-only for synthetic sort timestamps |
| dateLabel | string | Optional original source label; retained without treating relative text as current |
| googleReviewUrl | string | Optional HTTPS share link to the individual review |
| published | boolean | true to display; false for a draft |

Do not invent testimonials or silently rewrite their meaning. Obtain the
appropriate permission to republish customer text; do not populate this collection
by retaining old Places API responses. Do not store private contact information
in public review documents. Links must use google.com, google.co.uk (including
subdomains), maps.app.goo.gl, or g.page. Other hosts are omitted by the renderer.

The general link is labelled “Read all reviews on Google” and uses the exact
business-supplied destination:
https://www.google.com/search?q=framing+norah+picture+hanger+glasgow+reviews#mpd=~11958296049149817427/customers/reviews?p%3DCgxxdWFsaXR5c2NvcmUSA2FsbA
No key or API fetch is involved. Individual URLs must come from verified review
share links, not invented IDs.

## Query, reads and indexes

One shared promise per browser page load fetches up to 20 published reviews,
newest first. Rotations, component rerenders and route returns reuse that promise.
Failures are also cached for that page load; a reload retries. No realtime listener,
background polling, or automatic retries. Each fetched document can incur a
Firestore read; this is not a zero-cost integration and minimum query charges may
apply. New content becomes visible on reload.

The query uses published == true and date descending. If Firestore asks for a
composite index, create one for collection `reviews`, published ascending and
date descending (collection scope). This was not created by this task. Missing
indexes, denied reads, and other failures produce a quiet fallback with the Google
profile link. Empty collections do likewise. Invalid documents are omitted.

## Security rules inspection and proposed change (NOT applied)

The deployed rules were read through the Rules management API. They currently
allow all document reads publicly and writes only for one specific owner UID.
There is no local Firestore rules file or rules configuration in firebase.json.
The new client can read published reviews with these existing permissions, but
the broad public-read rule ALSO exposes drafts and any other document fields.
A client query is not an access-control boundary.

Before storing drafts, replace the broad recursive public-read rule with explicit
collection access. Do not merely add a stricter reviews rule: matching allow rules
are ORed, so the broad rule would still win. Preserve the existing exact owner UID
condition for writes; do not replace it with “any signed-in user”.

Proposed reviews match to incorporate during a separate, reviewed rules change:

```text
match /reviews/{reviewId} {
  allow read: if resource.data.published == true || isExistingOwner();
  allow write: if isExistingOwner();
}
```

Here isExistingOwner() must use the current authenticated-owner UID check from
the deployed rules. It is a placeholder, not a deployable definition. Keep existing
public read and owner-only write permissions for `media` and
`blog_framing_norah` with explicit matches; inventory any additional legitimate
collections before removing the broad match. This preserves current website
features while tightening draft access. Consider write validation for the field
schema and immutable/public-safe fields. Test published/anonymous reads, draft
read denial, owner administration, and unauthorised write denial in the emulator
before deploying rules. No live rules or data were changed by this task.

## Interaction and accessibility

Reviews rotate every six seconds. Mouse/pen hover over the review card temporarily pauses rotation; touch does
not latch hover. Focus on review links/navigation, touch, keyboard or pointer
interaction pauses until Resume is chosen. The rotation button is exempt from
the focus lock so Resume works while it retains focus; controls sit outside the
card hover area. A screen-reader-only status message explains temporary pauses without adding
visible explanatory text. Unboxed chevrons occupy separate 44px grid columns
at each side of the review, so they do not overlap its text. The pause/play
control is an icon with an accessible action label and a 44px touch target.
There is no visible slide counter; the slide retains its accessible position label. Reduced motion disables automatic rotation and
movement; previous/next and swipe remain available. Hidden tabs pause timers.
One review has no rotation controls. Swiping horizontally does not block vertical
page scrolling. Long reviews are displayed in full without fixed-height clipping.
Controls have visible focus and touch-sized targets; external links announce a
new tab, star symbols have a text equivalent, and automatic slide changes are
not live-announced. Manual changes use a polite live region.

Styles are scoped to .fn-reviews with a warm background and explicit colours,
including overrides for the existing global button hover and paragraph styles.
No animation or extra dependency is needed.

## SEO and validation

Text is rendered as escaped React text, with blockquote, author and time markup.
No Review/AggregateRating schema is added and no aggregate rating is fabricated.
The existing public/index.html already contains static review schema and a fixed
count; review those separately for accuracy before release. The site is still
client-rendered; this feature does not introduce SSR or guarantee rich results.

Run targeted tests:

    CI=true npm test -- --watchAll=false --watchman=false --runInBand --runTestsByPath src/ReviewsRepository.test.js src/components/ReviewsCarousel.test.js

Then npm run build. Tests mock Firestore, so they do not read/write live reviews.
Before release, check phone/desktop layout, keyboard focus, swipe, source URLs,
and the published query/index with real permissioned data. The 12 approved reviews were imported on 5 November 2026; see reviews-import-dry-run.md for the import record. The pre-existing App.test.js is outside these targeted tests.
