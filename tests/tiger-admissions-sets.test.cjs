// Run: node --test tests/tiger-admissions-sets.test.cjs
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync, readdirSync } = require('node:fs');
const { createHash } = require('node:crypto');
const path = require('node:path');
const sharp = require('sharp');
const { getTigerAsset, getSiteTigerAsset, hasTigerSet, TIGER_EXAM_IDS } = require('../lib/tigerAssets.ts');
const { getTigerFace } = require('../lib/resultsCopy.ts');
const { shareImageUrl } = require('../lib/shareImageUrl.ts');
const expectedHashes = require('./fixtures/tiger-admissions-sha256.json');

const ids = ['mcat', 'lsat', 'ieltsread'];
const filenames = Array.from({ length: 8 }, (_, i) => `tiger_face_${String(i + 1).padStart(2, '0')}.png`);
const boundaries = [[100,1],[99,2],[85,2],[84,3],[70,3],[69,4],[55,4],[54,5],[40,5],[39,6],[25,6],[24,7],[10,7],[9,8],[0,8]];

for (const id of ids) {
  test(`${id} uses its own complete set at every score boundary`, () => {
    assert.equal(hasTigerSet(id), true);
    assert.equal(TIGER_EXAM_IDS.filter(value => value === id).length, 1);
    assert.equal(getTigerAsset(id), `/tigers/${id}/tiger_face_03.png`);
    for (let n = 1; n <= 8; n++) {
      assert.equal(getTigerAsset(id, n), `/tigers/${id}/tiger_face_${String(n).padStart(2, '0')}.png`);
    }
    for (const [score, expression] of boundaries) assert.equal(getTigerFace(score, id), getTigerAsset(id, expression));
    assert.equal(shareImageUrl(id), `/og/${id}?v=admissions-mascots-1`);
    assert.equal(shareImageUrl(id, 'fr'), `/og/${id}?v=admissions-mascots-1&lang=fr`);
  });

  test(`${id} has eight distinct, reviewed, optimized transparent 512px PNGs`, async () => {
    const dir = path.join(__dirname, '..', 'public/tigers', id);
    assert.deepEqual(readdirSync(dir).sort(), filenames);
    const hashes = new Set();
    for (const file of filenames) {
      const png = readFileSync(path.join(dir, file));
      const key = `${id}/${file}`;
      assert.equal(createHash('sha256').update(png).digest('hex'), expectedHashes[key]);
      assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
      assert.ok(png.length <= 100_000, `${key} exceeds the 100 KB budget`);
      const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      assert.equal(info.width, 512);
      assert.equal(info.height, 512);
      assert.equal((await sharp(png).metadata()).hasAlpha, true);
      let transparent = 0;
      let opaque = 0;
      for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
        const alpha = data[(y * 512 + x) * 4 + 3];
        if (alpha === 0) transparent++;
        if (alpha >= 250) opaque++;
        if (x === 0 || y === 0 || x === 511 || y === 511) assert.equal(alpha, 0, `${key} needs a clear margin`);
      }
      assert.ok(transparent > 512 * 512 * 0.15);
      assert.ok(opaque > 512 * 512 * 0.15);
      hashes.add(createHash('sha256').update(data).digest('hex'));
    }
    assert.equal(hashes.size, 8);
  });
}

test('HiSET, French driving, donors and generic branding stay unchanged', () => {
  const mappings = { hiset: 'ged', frcode: 'driving', nclex: 'nclex', gre: 'gre', aplang: 'aplang', apitalian: 'aplang', dmv: 'driving' };
  for (const [id, set] of Object.entries(mappings)) for (let n = 1; n <= 8; n++) {
    assert.equal(getTigerAsset(id, n), `/tigers/${set}/tiger_face_${String(n).padStart(2, '0')}.png`);
  }
  assert.equal(getSiteTigerAsset(), '/tiger.png');
  assert.equal(getTigerAsset('unknown', 5), '/tiger_face_05.png');
  assert.equal(shareImageUrl('hiset'), '/og/hiset?v=share-copy-1');
  assert.equal(shareImageUrl('frcode'), '/og/frcode?v=car-smile-3');
  assert.equal(shareImageUrl('nclex'), '/og/nclex?v=car-smile-3');
});

test('only the 24 reviewed assets are pinned', () => {
  const keys = ids.flatMap(id => filenames.map(name => `${id}/${name}`));
  assert.deepEqual(Object.keys(expectedHashes).sort(), keys.sort());
  assert.equal(new Set(Object.values(expectedHashes)).size, 24);
});
