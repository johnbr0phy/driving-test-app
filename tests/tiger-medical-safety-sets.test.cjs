require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync, readdirSync } = require('node:fs');
const { createHash } = require('node:crypto');
const path = require('node:path');
const sharp = require('sharp');
const { getTigerAsset, hasTigerSet, TIGER_EXAM_IDS } = require('../lib/tigerAssets.ts');
const { getTigerFace } = require('../lib/resultsCopy.ts');
const { shareImageUrl } = require('../lib/shareImageUrl.ts');
const expectedHashes = require('./fixtures/tiger-medical-safety-sha256.json');
const dedicated = ['cmaa', 'mace'];
const filenames = Array.from({ length: 8 }, (_, i) => `tiger_face_${String(i + 1).padStart(2, '0')}.png`);
const mappings = {cmaa:'cmaa', mace:'mace', aufirearmsnsw:'capal', aufirearmsqld:'capal', aufirearmsvic:'capal', aufirearmswa:'capal', aufatas:'capal'};
for (const [id, mascot] of Object.entries(mappings)) {
  test(`${id} uses correct art and refreshed share cache`, () => {
    assert.equal(hasTigerSet(id), true);
    assert.equal(getTigerAsset(id), `/tigers/${mascot}/tiger_face_03.png`);
    assert.equal(TIGER_EXAM_IDS.filter(x => x === id).length, dedicated.includes(id) ? 1 : 0);
    for (let n=1;n<=8;n++) assert.equal(getTigerAsset(id,n), `/tigers/${mascot}/tiger_face_${String(n).padStart(2,'0')}.png`);
    for (const [score,n] of [[100,1],[99,2],[85,2],[84,3],[70,3],[69,4],[55,4],[54,5],[40,5],[39,6],[25,6],[24,7],[10,7],[9,8],[0,8]]) assert.equal(getTigerFace(score,id), getTigerAsset(mascot,n));
    assert.equal(shareImageUrl(id), `/og/${id}?v=medical-safety-mascots-1`);
    assert.equal(shareImageUrl(id,'es'), `/og/${id}?v=medical-safety-mascots-1&lang=es`);
  });
}
 test('related role and other countries keep their existing artwork', () => {
  for(const [id,mascot] of Object.entries({ncma:'ccma',cma:'ccma',rma:'ccma',cna:'cna',crfsc:'capal',nzfirearms:'hunter',sejakt:'hunter'})) assert.equal(getTigerAsset(id), `/tigers/${mascot}/tiger_face_03.png`);
 });
for (const id of dedicated) {
  test(`${id} has eight exact reviewed transparent 512px exports`, async () => {
    assert.deepEqual(readdirSync(path.join(__dirname, '..', 'public/tigers', id)).sort(), filenames);
    const decodedHashes = new Set();
    for (const filename of filenames) {
      const key = `${id}/${filename}`;
      const png = readFileSync(path.join(__dirname, '..', 'public/tigers', key));
      assert.equal(createHash('sha256').update(png).digest('hex'), expectedHashes[key], 'Use the exact visually reviewed optimized export');
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

