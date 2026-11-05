#!/usr/bin/env node
// Defaults to dry-run. Apply requires the approved input hash; writes are create-only.
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { execFileSync } = require('child_process');

function prepare(input) {
  if (!Array.isArray(input) || input.length !== 12) throw new Error('Expected exactly 12 records');
  const ids = new Set();
  const texts = new Set();
  return input.map((item, position) => {
    const allowed = ['id', 'reviewerName', 'rating', 'text', 'dateLabel', 'published', 'googleReviewUrl'];
    if (Object.keys(item).some(k => !allowed.includes(k))) throw new Error('Unexpected fields in record');
    if (typeof item.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || ids.has(item.id)) throw new Error('Invalid/duplicate ID');
    if (typeof item.text !== 'string' || !item.text.trim() || texts.has(item.text)) throw new Error('Empty/duplicate text');
    if (typeof item.reviewerName !== 'string' || !item.reviewerName.trim()) throw new Error('Missing reviewer name');
    if (!Number.isInteger(item.rating) || item.rating < 1 || item.rating > 5) throw new Error('Invalid rating');
    if (typeof item.dateLabel !== 'string' || !item.dateLabel.trim() || typeof item.published !== 'boolean') throw new Error('Missing dateLabel/published');
    if (item.googleReviewUrl !== undefined) throw new Error('Review URLs require separate verification; not accepted by this import');
    ids.add(item.id); texts.add(item.text);
    const data = {
      text: item.id === 'susan-brisbane' ? item.text.replace(/^Reasonable price\n\n/, '') : item.text, reviewerName: item.reviewerName, rating: item.rating,
      published: item.published, dateLabel: item.dateLabel,
      dateIsExact: false, dateSource: 'ordering-only',
      // Synthetic sort keys ONLY: preserve supplied order without estimating dates.
      date: new Date(Date.UTC(2000, 0, 1) - position * 86400000).toISOString(),
    };
    return { id: item.id, data };
  });
}
function decode(fields = {}) {
  return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key,
    value.stringValue ?? value.booleanValue ??
    (value.integerValue !== undefined ? Number(value.integerValue) : undefined) ??
    value.doubleValue ?? value.timestampValue ?? null]));
}
function plan(records, existing) {
  return records.map(record => {
    const old = existing.find(doc => doc.id === record.id);
    if (old) {
      const equal = Object.entries(record.data).every(([k, value]) =>
        k === 'date' ? Date.parse(old.data[k]) === Date.parse(value) : old.data[k] === value);
      return { id: record.id, action: equal ? 'UNCHANGED' : 'CONFLICT — existing ID; never overwrite' };
    }
    if (existing.some(doc => doc.data.text === record.data.text)) return { id: record.id, action: 'CONFLICT — same text under another ID' };
    return { id: record.id, action: 'WOULD_CREATE' };
  });
}
async function main() {
  const args = process.argv.slice(2);
  const apply = args[0] === '--apply';
  if ((!apply && (args.length !== 2 || args[0] !== '--dry-run')) ||
      (apply && (args.length !== 4 || args[2] !== '--approved-sha256'))) {
    throw new Error('Usage: --dry-run input.json OR --apply input.json --approved-sha256 HASH');
  }
  const bytes = fs.readFileSync(args[1]);
  const hash = crypto.createHash('sha256').update(bytes).digest('hex');
  if (apply && args[3] !== hash) throw new Error('Input hash differs from approved source');
  const records = prepare(JSON.parse(bytes.toString('utf8')));
  if (records.some(r => r.data.published !== true)) throw new Error('Approved import requires all records published');
  const cli = execFileSync('which', ['firebase'], { encoding: 'utf8' }).trim();
  const auth = require(path.join(path.dirname(fs.realpathSync(cli)), '..', 'auth.js'));
  const account = auth.getProjectDefaultAccount(process.cwd());
  if (!account) throw new Error('Firebase CLI login required');
  let token = account.tokens.access_token;
  if (!token || account.tokens.expires_at <= Date.now()) {
    token = (await auth.getAccessToken(account.tokens.refresh_token, ['https://www.googleapis.com/auth/cloud-platform'])).access_token;
  }
  const base = 'https://firestore.googleapis.com/v1/projects/framing-norah/databases/(default)';
  const existing = [];
  let next;
  do {
    const url = new URL(base + '/documents/reviews');
    url.searchParams.set('pageSize', '100');
    if (next) url.searchParams.set('pageToken', next);
    const response = await fetch(url, { headers: { Authorization: 'Bearer ' + token } });
    if (!response.ok) throw new Error('Read existing documents failed: HTTP ' + response.status);
    const result = await response.json();
    existing.push(...(result.documents || []).map(doc => ({ id: doc.name.split('/').pop(), data: decode(doc.fields) })));
    next = result.nextPageToken;
  } while (next);
  const response = await fetch(base + '/collectionGroups/reviews/indexes', { headers: { Authorization: 'Bearer ' + token } });
  if (!response.ok) throw new Error('Read indexes failed: HTTP ' + response.status);
  const indexes = (await response.json()).indexes || [];
  const result = plan(records, existing);
  console.log(JSON.stringify({
    mode: apply ? 'CREATE_ONLY' : 'DRY_RUN_ONLY', project: 'framing-norah', collection: 'reviews',
    sourceSha256: crypto.createHash('sha256').update(bytes).digest('hex'),
    validRecords: records.length, existingDocuments: existing.length,
    wouldCreate: result.filter(r => r.action === 'WOULD_CREATE').length,
    wouldUpdate: 0, conflicts: result.filter(r => r.action.startsWith('CONFLICT')).length,
    plan: result, indexes: indexes.map(i => ({ state: i.state, queryScope: i.queryScope, fields: i.fields })),
    datePolicy: 'Synthetic ordering timestamps anchored at 2000-01-01, descending in source order; never displayed as review dates',
  }, null, 2));
  if (!apply) return;
  if (result.some(r => r.action.startsWith('CONFLICT'))) throw new Error('Conflicts detected; no writes attempted');
  const creates = records.filter(record => result.find(r => r.id === record.id).action === 'WOULD_CREATE');
  if (!creates.length) { console.log('Already imported: no writes needed'); return; }
  const writes = creates.map(record => ({
    update: { name: 'projects/framing-norah/databases/(default)/documents/reviews/' + record.id,
      fields: Object.fromEntries(Object.entries(record.data).map(([key, value]) => [key,
        key === 'date' ? { timestampValue: value } : typeof value === 'boolean'
          ? { booleanValue: value } : typeof value === 'number'
            ? { integerValue: String(value) } : { stringValue: value }])) },
    currentDocument: { exists: false },
  }));
  const committed = await fetch(base + '/documents:commit', {
    method: 'POST', headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ writes }),
  });
  if (!committed.ok) throw new Error('Atomic create-only import failed: HTTP ' + committed.status + '; existing documents were not overwritten');
  const outcome = await committed.json();
  console.log(JSON.stringify({ created: outcome.writeResults.length, updated: 0, commitTime: outcome.commitTime }));
}
module.exports = { prepare, decode, plan };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
