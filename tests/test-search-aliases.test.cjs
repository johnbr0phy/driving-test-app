require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { searchAllTests } = require("../lib/testSearch.ts");

// Searches from the /admin build list that name a test we already have.
// The daily search-gaps run (.github/workflows/search-gaps.yml) adds a case here
// for every alias it wires, so an alias never quietly stops working.
const CASES = [
  // [query, visitor region, test id that must come first]
  ["test de citoyenneté canadienne", "CA", "cacit"],
  ["test de citoyennete canadienne", "US", "cacit"],
  ["hazard", "UK", "ukcar"],
  ["hazard perception", "UK", "ukcar"],
  ["osha 50", "US", "osha"],
  ["mcat", "US", "mcat"],
  ["mcat practice test", "US", "mcat"],
  ["medical college admission test", "US", "mcat"],
  ["aafcs", "US", "aafcs"],
  ["cen", "US", "cen"],
  ["bcen", "US", "cen"],
  ["certified emergency nurse", "US", "cen"],
  ["er nurse certification", "US", "cen"],
  ["hnfs", "US", "aafcs"],
  ["hospitality nutrition and food science", "US", "aafcs"],
  ["ase", "US", "ase"],
  ["ase a5", "US", "ase"],
  ["ase certification", "US", "ase"],
  ["automotive service excellence", "US", "ase"],
  ["auto mechanic certification", "US", "ase"],
  ["gcp professional p", "SG", "gcppca"],
  ["gcp professional", "SG", "gcppca"],
  ["gcp architect", "US", "gcppca"],
  ["professional cloud architect", "US", "gcppca"],
  ["pca google", "IN", "gcppca"],
  ["ielts", "IN", "ieltsread"],
  ["ielts academic reading", "UK", "ieltsread"],
  ["ielts general reading", "PH", "ieltsread"],
  ["ielts mock test", "US", "ieltsread"],
  ["wassce english", "NG", "wassceeng"],
  ["waec english", "NG", "wassceeng"],
  ["ssce english", "NG", "wassceeng"],
  ["may june english", "NG", "wassceeng"],
  ["waec english objective", "NG", "wassceeng"],
  ["test of orals", "NG", "wassceeng"],
  ["staar biology", "US", "staarbio"],
  ["biology eoc", "US", "staarbio"],
  ["texas biology eoc", "US", "staarbio"],
  ["staar bio", "US", "staarbio"],
  ["toefl", "IN", "toeflread"],
  ["toefl ibt reading", "US", "toeflread"],
  ["toefl mock test", "KR", "toeflread"],
  ["complete the words", "US", "toeflread"],
  ["hiset", "US", "hiset"],
  ["wonderlic", "US", "wonderlic"],
  ["wonderlic practice test", "US", "wonderlic"],
  ["wonderlic personnel test", "US", "wonderlic"],
  ["wonscore", "US", "wonderlic"],
  ["pre employment test", "US", "wonderlic"],
  ["cognitive ability test", "US", "wonderlic"],
  ["hiset practice test", "US", "hiset"],
  ["hiset math", "US", "hiset"],
  ["jkssb", "IN", "jkssbja"],
  ["jkssb junior assistant", "IN", "jkssbja"],
  ["jkssb", "US", "jkssbja"],
  ["telangana sub inspector", "IN", "tgsi"],
  ["tg si", "IN", "tgsi"],
  ["ts si", "IN", "tgsi"],
  ["tslprb", "IN", "tgsi"],
  ["tgprb", "IN", "tgsi"],
  ["lsat", "US", "lsat"],
  ["lsat practice test", "US", "lsat"],
  ["law school admission test", "US", "lsat"],
  ["logical reasoning practice", "US", "lsat"],
  ["waec maths", "NG", "wasscemath"],
  ["waec mathematics", "GH", "wasscemath"],
  ["wassce maths", "NG", "wasscemath"],
  ["ssce maths", "NG", "wasscemath"],
  ["may june maths", "NG", "wasscemath"],
  ["staar algebra 1", "US", "staaralg1"],
  ["staar algebra", "US", "staaralg1"],
  ["algebra 1 eoc", "US", "staaralg1"],
  ["algebra i eoc", "US", "staaralg1"],
  ["texas algebra 1", "US", "staaralg1"],
  ["staar english 1", "US", "staareng1"],
  ["staar english i", "US", "staareng1"],
  ["english 1 eoc", "US", "staareng1"],
  ["english i eoc", "US", "staareng1"],
];

for (const [q, region, id] of CASES) {
  test(`"${q}" (${region}) opens ${id}`, () => {
    const res = searchAllTests(q, region);
    assert.ok(!res.partial, `"${q}" is only a partial match`);
    assert.equal(res.hits[0]?.test.id, id, `first hit for "${q}" is ${res.hits[0]?.test.id}`);
  });
}
