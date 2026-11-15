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
  ["naplex", "US", "naplex"],
  ["naplex practice test", "US", "naplex"],
  ["nabp", "US", "naplex"],
  ["north american pharmacist licensure examination", "US", "naplex"],
  ["aafcs", "US", "aafcs"],
  ["hnfs", "US", "aafcs"],
  ["hospitality nutrition and food science", "US", "aafcs"],
  ["mblex", "US", "mblex"],
  ["massage therapy license exam", "US", "mblex"],
  ["fsmtb", "US", "mblex"],
  ["massage and bodywork licensing examination", "US", "mblex"],
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
  ["isee", "US", "isee"],
  ["isee practice test", "US", "isee"],
  ["isee middle level", "US", "isee"],
  ["independent school entrance exam", "US", "isee"],
  ["private school entrance exam", "US", "isee"],
  ["hiset", "US", "hiset"],
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
  ["ssat", "US", "ssat"],
  ["ssat practice test", "US", "ssat"],
  ["secondary school admission test", "US", "ssat"],
  ["private school entrance exam", "US", "ssat"],
  ["ssat middle level", "US", "ssat"],
  ["cogat", "US", "cogat"],
  ["cogat practice test", "US", "cogat"],
  ["cognitive abilities test", "US", "cogat"],
  ["gifted and talented test", "US", "cogat"],
  ["cogat 3rd grade", "US", "cogat"],
  ["hspt", "US", "hspt"],
  ["high school placement test", "US", "hspt"],
  ["catholic high school entrance exam", "US", "hspt"],
  ["scholastic testing service", "US", "hspt"],
];

for (const [q, region, id] of CASES) {
  test(`"${q}" (${region}) opens ${id}`, () => {
    const res = searchAllTests(q, region);
    assert.ok(!res.partial, `"${q}" is only a partial match`);
    assert.equal(res.hits[0]?.test.id, id, `first hit for "${q}" is ${res.hits[0]?.test.id}`);
  });
}
