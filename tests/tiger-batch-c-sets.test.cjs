// Run: node --test tests/tiger-batch-c-sets.test.cjs
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
const expectedHashes = require('./fixtures/tiger-batch-c-sha256.json');

const dedicated = ['rdexam', 'phr'];
const reused = {
  aswbclin: 'aswb', cisa: 'cissp', cssgb: 'pmp', ccs: 'cpc',
  praxis5001: 'praxis', fladjuster: 'pnc', llqp: 'insurance', cemap: 'nmls',
};
const mappings = { ...reused, rdexam: 'rdexam', phr: 'phr' };
const filenames = Array.from({ length: 8 }, (_, i) => `tiger_face_${String(i + 1).padStart(2, '0')}.png`);
const scoreBoundaries = [[100, 1], [99, 2], [85, 2], [84, 3], [70, 3], [69, 4], [55, 4], [54, 5], [40, 5], [39, 6], [25, 6], [24, 7], [10, 7], [9, 8], [0, 8]];

for (const [id, mascot] of Object.entries(mappings)) {
  test(`${id} resolves all eight expressions to ${mascot} without changing score boundaries`, () => {
    assert.equal(hasTigerSet(id), true);
    assert.equal(getTigerAsset(id), `/tigers/${mascot}/tiger_face_03.png`);
    assert.equal(TIGER_EXAM_IDS.filter(value => value === id).length, dedicated.includes(id) ? 1 : 0);
    for (let n = 1; n <= 8; n++) {
      assert.equal(getTigerAsset(id, n), `/tigers/${mascot}/tiger_face_${String(n).padStart(2, '0')}.png`);
    }
    for (const [score, expression] of scoreBoundaries) {
      assert.equal(getTigerFace(score, id), getTigerAsset(mascot, expression));
    }
    const version = dedicated.includes(id) ? 'batch-c-mascots-1' : 'share-copy-1';
    assert.equal(shareImageUrl(id), `/og/${id}?v=${version}`);
    assert.equal(shareImageUrl(id, 'es'), `/og/${id}?v=${version}&lang=es`);
  });
}

for (const id of dedicated) {
  test(`${id} has eight exact reviewed transparent 512px exports`, async () => {
    assert.deepEqual(readdirSync(path.join(__dirname, '..', 'public/tigers', id)).sort(), filenames);
    const decodedHashes = new Set();
    for (const filename of filenames) {
      const key = `${id}/${filename}`;
      const png = readFileSync(path.join(__dirname, '..', 'public/tigers', key));
      assert.equal(createHash('sha256').update(png).digest('hex'), expectedHashes[key], 'Use the exact reviewed optimized export');
      assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
      assert.equal(png.readUInt32BE(16), 512);
      assert.equal(png.readUInt32BE(20), 512);
      assert.ok(png.length <= 100_000, 'Reviewed optimized PNG budget is 100 KB');
      assert.equal((await sharp(png).metadata()).hasAlpha, true);
      const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
      assert.equal(info.channels, 4, 'Palette PNGs must retain decoded alpha');
      let transparent = 0;
      let opaque = 0;
      for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 512; x++) {
          const alpha = data[(y * 512 + x) * 4 + 3];
          if (alpha === 0) transparent++;
          if (alpha >= 250) opaque++;
          if (x === 0 || y === 0 || x === 511 || y === 511) {
            assert.equal(alpha, 0, `${key} must have a clear outer margin`);
          }
        }
      }
      assert.ok(transparent > 512 * 512 * 0.15);
      assert.ok(opaque > 512 * 512 * 0.15);
      decodedHashes.add(createHash('sha256').update(data).digest('hex'));
    }
    assert.equal(decodedHashes.size, 8, 'Every expression must have distinct pixels');
  });
}

test('batch C adds exactly sixteen optimized exports and reuses eight existing families', () => {
  const keys = dedicated.flatMap(id => filenames.map(name => `${id}/${name}`));
  assert.deepEqual(Object.keys(expectedHashes).sort(), keys.sort());
  assert.equal(new Set(Object.values(expectedHashes)).size, 16);
  let total = 0;
  let happy = 0;
  for (const key of keys) {
    const bytes = readFileSync(path.join(__dirname, '..', 'public/tigers', key)).length;
    total += bytes;
    if (key.endsWith('tiger_face_03.png')) happy += bytes;
  }
  assert.equal(total, 1_021_162, 'Use the exact approved sixteen-file batch');
  assert.equal(happy, 128_497, 'Only the two approved new default faces enter the trace');
  assert.ok(total <= 1_600_000, 'Only sixteen optimized PNGs belong in this batch');
  assert.ok(happy <= 200_000, 'Only two new default faces enter the exam OG trace');
  assert.equal(Object.keys(reused).length, 8);
});

test('prior mascots, aliases, site branding and unrelated share-image caches stay unchanged', () => {
  const unchanged = {
    foodmgr: 'foodmgr', capm: 'capm', cca: 'cpc', cma: 'ccma', nbdhe: 'danb',
    txadjuster: 'pnc', sfadmin: 'aws', cfal1: 'series7', cpaaud: 'cpafar',
    accafa: 'cpafar', aatl2: 'cpafar', nhie: 'nhie', nptepta: 'nptepta', inrto: 'driving',
  };
  for (const [id, mascot] of Object.entries(unchanged)) {
    for (let n = 1; n <= 8; n++) {
      assert.equal(getTigerAsset(id, n), `/tigers/${mascot}/tiger_face_${String(n).padStart(2, '0')}.png`);
    }
  }
  assert.equal(getSiteTigerAsset(), '/tiger.png');
  assert.equal(getTigerAsset('unknown', 3), '/tiger_face_03.png');
  assert.equal(shareImageUrl('nhie'), '/og/nhie?v=batch-b-mascots-1');
  assert.equal(shareImageUrl('nptepta'), '/og/nptepta?v=batch-b-mascots-1');
  assert.equal(shareImageUrl('cpaaud'), '/og/cpaaud?v=batch-b-mascots-1');
  assert.equal(shareImageUrl('cpafar'), '/og/cpafar?v=batch-a-mascots-1');
  assert.equal(shareImageUrl('aswb'), '/og/aswb?v=batch-a-mascots-1');
  assert.equal(shareImageUrl('nmls'), '/og/nmls?v=batch-a-mascots-1');
  assert.equal(shareImageUrl('cpc'), '/og/cpc?v=share-copy-1');
  assert.equal(shareImageUrl('foodmgr'), '/og/foodmgr?v=car-smile-3');
  assert.equal(shareImageUrl('capm'), '/og/capm?v=remaining-mascots-1');
  assert.equal(shareImageUrl('home'), '/og/home?v=search-home-1');
});

test('existing OG trace rules include the two new happy faces without bundling full sets', () => {
  const config = require('../next.config.ts').default;
  assert.deepEqual(config.outputFileTracingIncludes['/api/og/score-card'], ['./public/tiger_face_*.png', './public/fonts/share/*']);
  assert.ok(config.outputFileTracingExcludes['/api/og/score-card'].includes('./public/tigers/**'));
  assert.deepEqual(config.outputFileTracingIncludes['/og/[examId]'], ['./public/tigers/*/tiger_face_03.png', './public/tiger_face_03.png', './public/fonts/share/*']);
  assert.ok(config.outputFileTracingExcludes['/og/[examId]'].includes('./public/tigers/*/tiger_face_0[124-9].png'));
});
