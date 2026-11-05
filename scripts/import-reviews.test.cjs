const test = require('node:test');
const assert = require('node:assert/strict');
const { prepare, plan } = require('./import-reviews.cjs');
const fixture = () => Array.from({ length: 12 }, (_, i) => ({ id: 'test-' + i,
  text: '  Test-only fixture ' + i + '\n\n  ', reviewerName: 'Test ' + i,
  rating: 5, dateLabel: 'Unverified source label', published: true }));
test('preserves every character and stable IDs; dates are explicitly ordering-only', () => {
  const source = fixture(); const records = prepare(source);
  records.forEach((r, i) => {
    assert.equal(r.id, source[i].id); assert.equal(r.data.text, source[i].text);
    assert.equal(r.data.dateLabel, source[i].dateLabel);
    assert.equal(r.data.dateIsExact, false); assert.equal(r.data.dateSource, 'ordering-only');
    assert.equal(r.data.googleReviewUrl, undefined);
    if (i) assert.ok(Date.parse(records[i - 1].data.date) > Date.parse(r.data.date));
  });
});
test('repeatable plan never updates existing records and detects conflicts', () => {
  const records = prepare(fixture());
  assert.ok(plan(records, []).every(p => p.action === 'WOULD_CREATE'));
  assert.ok(plan(records, records).every(p => p.action === 'UNCHANGED'));
  assert.match(plan(records, [{ ...records[0], data: { ...records[0].data, text: 'different' } }])[0].action, /CONFLICT/);
  assert.match(plan(records, [{ id: 'other', data: records[0].data }])[0].action, /CONFLICT/);
});
test('rejects duplicate IDs, wrong record counts and malformed ratings before network', () => {
  assert.throws(() => prepare([]));
  let rows = fixture(); rows[1].id = rows[0].id; assert.throws(() => prepare(rows));
  rows = fixture(); rows[0].rating = 8; assert.throws(() => prepare(rows));
  rows = fixture(); rows[0].googleReviewUrl = 'https://example.test'; assert.throws(() => prepare(rows));
});
test('only the approved Susan attribute is removed; Sonny and John are unchanged', () => {
  const rows = fixture();
  rows[0] = { ...rows[0], id: 'susan-brisbane', text: 'Reasonable price\n\nActual written review.\n' };
  rows[1] = { ...rows[1], id: 'sonny', text: 'to which he done' };
  rows[2] = { ...rows[2], id: 'john-rosie', text: 'a number pieces' };
  const records = prepare(rows);
  assert.equal(records[0].data.text, 'Actual written review.\n');
  assert.equal(records[1].data.text, rows[1].text);
  assert.equal(records[2].data.text, rows[2].text);
});
