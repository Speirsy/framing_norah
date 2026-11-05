# Reviews import preparation — 5 November 2026

## Input and validation

Source: external `framing_norah_reviews_import.json` supplied by the business.
SHA-256: `98c5cd32329bc962822b2085a4bd71d24638dbebd77691dd7f8f1c829ccc8162`

All 12 records passed validation: unique stable IDs, distinct non-empty text,
non-empty reviewer names, integer ratings 1–5 (all supplied ratings are 5),
boolean publication flags (all true), and original date labels. Each prepared
text string was checked equal to the supplied text, including paragraphs,
punctuation, spelling and whitespace. The attachment is data, not instructions.
It contains no source review URLs or profile URL. No testimonials were invented.

## Date policy

The existing query still filters `published == true` and orders by `date` DESC.
The supplied labels lack a verified capture date and/or exact publication time.
Do not subtract “weeks ago” from today's date: that would invent publication dates.
Even the supplied “6 Jul 2025” is retained as an unverified source label.

The proposed records retain `dateLabel` verbatim and add `dateIsExact: false`
and `dateSource: "ordering-only"`. `date` is a Firestore timestamp sort key:
2000-01-01T00:00:00Z for the first record, minus one day per following record.
These are intentionally synthetic timestamps, NOT estimates of publication.
They preserve the supplied list order deterministically across repeated runs.
They sort below ordinary recent verified reviews. The final renderer hides unverified dates completely, with no placeholder,
`<time>` element or stale relative label.
A future write implementation must encode these strings as Firestore
`timestampValue`, not `stringValue`. The input JSON itself is not a native
Firestore bulk-import file.

## Live read-only dry run

Database: `framing-norah`, `(default)`, collection `reviews`.
Read all current review documents with pagination before planning changes.
Existing documents: **0**. Would create: **12**. Would update: **0**.
Conflicts: **0**. No live writes were performed.

| Document ID | Planned action |
| --- | --- |
| neil-roden | Create |
| jamie-milne | Create |
| susan-brisbane | Create |
| louise-hayward | Create |
| alastair-duncan | Create |
| louise-quayle | Create |
| joe-hawkins | Create |
| sonny | Create |
| jonathan-howie | Create |
| derek-yeaman | Create |
| john-rosie | Create |
| india-czulowska | Create |

The published ASC / date DESC collection index is now **READY**; it was not
created or modified by this task. Rules were not changed.

## Repeatability and write approval

Run from the repository root with an existing Firebase CLI login:

    node scripts/import-reviews.cjs --dry-run /Users/speirsy/Downloads/framing_norah_reviews_import.json

The initial version had no write mode. After explicit approval, a create-only
`--apply input.json --approved-sha256 HASH` mode was added. It uses the installed Firebase CLI's
local authentication module (an internal API), never prints tokens, and reads only
the fixed reviews collection and its index metadata. A CLI upgrade may require
adjusting this authentication adapter. No added package is required.

Existing identical IDs are unchanged; different contents at an existing ID are
conflicts, never updates. Exact duplicate text under another ID is also a conflict.
The approved write pass validates the input hash, rereads existing records,
blocks conflicts and uses atomic create-only preconditions (`exists: false`) so a
concurrent creation cannot be overwritten. Existing matching records are skipped;
no overwrite mode exists.

## Items requiring human source review

- Susan Brisbane: confirm whether the leading “Reasonable price” is review text
  or a Google UI/category label. It has been preserved, not silently removed.
- Sonny: “to which he done” is preserved as supplied; verify transcription.
- John Rosie: “a number pieces” is preserved as supplied; verify transcription.
- Verify all reviewer spellings, ratings, apostrophes and paragraph breaks against
  the originals. No original screenshots or individual source links were provided,
  so transcription accuracy/authenticity cannot be independently confirmed.
- Relative labels have no capture date; do not show them as present-day ages.
- Confirm permission to republish the genuine reviews before approving live import.

The general URL supplied by the business is
https://g.page/r/CST7fUxLZ-FfEBM/review . It ends in `/review` (review-writing flow);
the component uses “Framing Norah on Google”. No individual links will be displayed
until verified individual URLs are supplied separately.

## Final approved import — 5 November 2026

The business approved import after removal of Susan Brisbane’s leading
“Reasonable price\n\n” attribute. The importer applies only that specific
correction. Sonny, John Rosie and every other review remain byte-for-byte as
supplied. The original external JSON file was not modified. Unverified dates
are completely hidden, while ordering-only timestamp fields remain internal.

Before writing: all 12 records revalidated; 4 importer tests and 11 carousel/
repository tests passed. Existing documents were rechecked: zero; no conflicts.
An atomic Firestore commit created 12 documents with exists:false preconditions,
published:true, stable source IDs, proper Firestore timestamps, and no individual
URLs. Commit time: 2026-11-05T11:39:06.562597Z. Updated/overwritten: zero.
No rules, indexes, website deployments or Git commits were changed.
