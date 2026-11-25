require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync, readdirSync } = require('node:fs');
const { createHash } = require('node:crypto');
const path = require('node:path');
const sharp = require('sharp');
const { getTigerAsset, getSiteTigerAsset, hasTigerSet, TIGER_EXAM_IDS } = require('../lib/tigerAssets.ts');
const { getTigerFace } = require('../lib/resultsCopy.ts');
const { getShareCard } = require('../lib/shareCards.ts');
const { shareImageUrl } = require('../lib/shareImageUrl.ts');

const dedicated = ['waterop', 'pesticide'];
const filenames = Array.from({ length: 8 }, (_, i) => `tiger_face_${String(i + 1).padStart(2, '0')}.png`);
const mappings = {
  waterop: 'waterop', wastewaterop: 'waterop', pesticide: 'pesticide',
  ccst: 'aplus', acecpt: 'nasm', rhia: 'cehrs', series66: 'series7', cnor: 'cst',
};

for (const [exam, family] of Object.entries(mappings)) {
  test(`${exam} resolves the full role set on landing, results and share cards`, () => {
    assert.equal(hasTigerSet(exam), true);
    assert.equal(TIGER_EXAM_IDS.filter(id => id === exam).length, dedicated.includes(exam) ? 1 : 0);
    const base = `/tigers/${family}/`;
    assert.equal(getTigerAsset(exam), base + filenames[2]);
    for (const [i, file] of filenames.entries()) {
      assert.equal(getTigerAsset(exam, i + 1), base + file);
      readFileSync(path.join(__dirname, '..', 'public', base, file));
    }
    for (const [score, expression] of [[100, 1], [99, 2], [85, 2], [84, 3], [70, 3], [69, 4], [55, 4], [54, 5], [40, 5], [39, 6], [25, 6], [24, 7], [10, 7], [9, 8], [0, 8]]) {
      assert.equal(getTigerFace(score, exam), base + filenames[expression - 1]);
    }
    assert.deepEqual(getShareCard(exam).mascots, [exam]);
    assert.equal(shareImageUrl(exam), `/og/${exam}?v=operator-and-remap-mascots-1`);
    assert.equal(shareImageUrl(exam, 'fr'), `/og/${exam}?v=operator-and-remap-mascots-1&lang=fr`);
  });
}

test('borrowed family sources, site brand and unrelated share URLs are unchanged', () => {
  for (const [exam, family] of Object.entries({ ccna: 'aplus', nscacpt: 'nasm', cehrs: 'cehrs', series7: 'series7', cst: 'cst', epa608: 'epa608', hvacjourney: 'epa608', esthetician: 'esthetics' })) {
    assert.equal(getTigerAsset(exam), `/tigers/${family}/tiger_face_03.png`);
    assert.ok(!shareImageUrl(exam).includes('operator-and-remap-mascots-1'));
  }
  assert.equal(getTigerAsset('no-such-exam'), getSiteTigerAsset());
  assert.equal(shareImageUrl('esthetician'), '/og/esthetician?v=esthetics-mascot-1');
});

for (const family of dedicated) {
  test(`${family} ships eight distinct reviewed transparent 512px palette PNGs`, async () => {
    const expectedHashes = require('./fixtures/tiger-operator-applicator-sha256.json');
    const dir = path.join(__dirname, '..', 'public/tigers', family);
    assert.deepEqual(readdirSync(dir).sort(), filenames);
    const decodedHashes = new Set();
    for (const file of filenames) {
      const key = `${family}/${file}`;
      const png = readFileSync(path.join(dir, file));
      assert.equal(createHash('sha256').update(png).digest('hex'), expectedHashes[key], key);
      assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', key);
      assert.ok(png.length <= 100_000, key);
      const meta = await sharp(png).metadata();
      assert.deepEqual([meta.width, meta.height, meta.hasAlpha, meta.isPalette], [512, 512, true, true], key);
      const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
      assert.equal(info.channels, 4, key);
      let clear = 0;
      let opaque = 0;
      for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 512; x++) {
          const alpha = data[(y * 512 + x) * 4 + 3];
          if (alpha === 0) clear++;
          if (alpha >= 250) opaque++;
          if (!x || !y || x === 511 || y === 511) assert.equal(alpha, 0, key + ' must have a clear margin');
        }
      }
      assert.ok(clear > 512 * 512 * 0.15 && opaque > 512 * 512 * 0.15, key);
      decodedHashes.add(createHash('sha256').update(data).digest('hex'));
    }
    assert.equal(decodedHashes.size, 8);
  });
}
