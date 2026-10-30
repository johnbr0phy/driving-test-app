// Run: node --test tests/tiger-global-sets.test.cjs
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { getTigerAsset, getSiteTigerAsset, hasTigerSet, TIGER_EXAM_IDS } = require('../lib/tigerAssets.ts');
const { getTigerFace } = require('../lib/resultsCopy.ts');
const { shareImageUrl, SHARE_IMAGE_VERSION } = require('../lib/shareImageUrl.ts');

const ids = ['uklitu', 'cacit', 'aucit', 'pmp'];
for (const id of ids) {
  test(`${id} has eight distinct 512px RGBA expressions and a happy default`, () => {
    assert.equal(hasTigerSet(id), true);
    assert.equal(TIGER_EXAM_IDS.filter(value => value === id).length, 1);
    assert.equal(getTigerAsset(id), `/tigers/${id}/tiger_face_03.png`);
    const images = [];
    for (let n = 1; n <= 8; n++) {
      const asset = `/tigers/${id}/tiger_face_${String(n).padStart(2, '0')}.png`;
      assert.equal(getTigerAsset(id, n), asset);
      const png = readFileSync(path.join(__dirname, '..', 'public', asset));
      assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
      assert.equal(png.readUInt32BE(16), 512);
      assert.equal(png.readUInt32BE(20), 512);
      assert.equal(png[25], 6, 'PNG must have RGBA color type');
      images.push(png.toString('base64'));
    }
    assert.equal(new Set(images).size, 8);
  });

  test(`${id} retains all score boundaries and refreshes its share image`, () => {
    for (const [score, expression] of [[100, 1], [99, 2], [85, 2], [84, 3], [70, 3], [69, 4], [55, 4], [54, 5], [40, 5], [39, 6], [25, 6], [24, 7], [10, 7], [9, 8], [0, 8]]) {
      assert.equal(getTigerFace(score, id), getTigerAsset(id, expression));
    }
    assert.equal(shareImageUrl(id), `/og/${id}?v=citizenship-pmp-1`);
  });
}

test('unrelated mascots, site branding and share versions stay unchanged', () => {
  assert.equal(getTigerAsset('dmv', 3), '/tigers/driving/tiger_face_03.png');
  assert.equal(getTigerAsset('inrto', 8), '/tigers/driving/tiger_face_08.png');
  assert.equal(getTigerAsset('awssaa', 3), '/tigers/aws/tiger_face_03.png');
  assert.equal(getTigerAsset('unknown', 3), '/tiger_face_03.png');
  assert.equal(getSiteTigerAsset(), '/tiger.png');
  assert.equal(shareImageUrl('dmv'), `/og/dmv?v=${SHARE_IMAGE_VERSION}`);
  assert.equal(shareImageUrl('dmv', 'es'), `/og/dmv?v=${SHARE_IMAGE_VERSION}&lang=es`);
});
