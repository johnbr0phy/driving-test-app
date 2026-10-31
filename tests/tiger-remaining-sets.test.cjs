// Run: node --test tests/tiger-remaining-sets.test.cjs
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const { createHash } = require('node:crypto');
const path = require('node:path');
const sharp = require('sharp');
const { getTigerAsset, getSiteTigerAsset, hasTigerSet, TIGER_EXAM_IDS } = require('../lib/tigerAssets.ts');
const { getTigerFace } = require('../lib/resultsCopy.ts');
const { shareImageUrl, SHARE_IMAGE_VERSION } = require('../lib/shareImageUrl.ts');

const ids = ["capm", "psm", "cissp", "rbt", "pcoc", "ukseru", "ibpspo", "ctet", "praxis", "gre"];
for (const id of ids) {
  test(`${id} has eight distinct transparent 512px expressions and a happy default`, async () => {
    assert.equal(hasTigerSet(id), true);
    assert.equal(TIGER_EXAM_IDS.filter(value => value === id).length, 1);
    assert.equal(getTigerAsset(id), `/tigers/${id}/tiger_face_03.png`);
    const hashes = new Set();
    for (let n = 1; n <= 8; n++) {
      const asset = `/tigers/${id}/tiger_face_${String(n).padStart(2, '0')}.png`;
      assert.equal(getTigerAsset(id, n), asset);
      const png = readFileSync(path.join(__dirname, '..', 'public', asset));
      assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
      assert.equal(png.readUInt32BE(16), 512);
      assert.equal(png.readUInt32BE(20), 512);
      assert.equal(png[25], 6, 'PNG must have RGBA color type');
      const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
      assert.equal(info.channels, 4);
      let transparent = 0;
      let opaque = 0;
      for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 512; x++) {
          const alpha = data[(y * 512 + x) * 4 + 3];
          if (alpha === 0) transparent++;
          if (alpha >= 250) opaque++;
          if (x === 0 || y === 0 || x === 511 || y === 511) {
            assert.equal(alpha, 0, `${asset} must have a clear outer margin`);
          }
        }
      }
      assert.ok(transparent > 512 * 512 * 0.15, 'Background must contain true transparent pixels');
      assert.ok(opaque > 512 * 512 * 0.15, 'Character must contain near-opaque pixels');
      hashes.add(createHash('sha256').update(data).digest('hex'));
    }
    assert.equal(hashes.size, 8, 'Expressions must have distinct decoded pixels');
  });

  test(`${id} keeps score boundaries and refreshes only its share-image URL`, () => {
    for (const [score, expression] of [[100, 1], [99, 2], [85, 2], [84, 3], [70, 3], [69, 4], [55, 4], [54, 5], [40, 5], [39, 6], [25, 6], [24, 7], [10, 7], [9, 8], [0, 8]]) {
      assert.equal(getTigerFace(score, id), getTigerAsset(id, expression));
    }
    assert.equal(shareImageUrl(id), `/og/${id}?v=remaining-mascots-1`);
    assert.equal(shareImageUrl(id, 'es'), `/og/${id}?v=remaining-mascots-1&lang=es`);
  });
}

test('site artwork, borrowed mascots and previous cache versions remain stable', () => {
  assert.equal(getSiteTigerAsset(), '/tiger.png');
  assert.equal(getTigerAsset('unknown', 3), '/tiger_face_03.png');
  assert.equal(getTigerAsset('inrto', 8), '/tigers/driving/tiger_face_08.png');
  assert.equal(getTigerAsset('awssaa', 3), '/tigers/aws/tiger_face_03.png');
  assert.equal(shareImageUrl('dmv'), `/og/dmv?v=${SHARE_IMAGE_VERSION}`);
  assert.equal(shareImageUrl('pmp'), '/og/pmp?v=citizenship-pmp-1');
  assert.equal(shareImageUrl('ffi'), '/og/ffi?v=role-mascots-1');
});
