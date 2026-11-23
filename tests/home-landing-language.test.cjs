require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { TEST_CATALOG, landingIn } = require("../lib/testCatalog.ts");

// A country homepage links a test's landing in the page's language when the
// test has one: the Dutch CBR car test on /nl, the Belgian test in Dutch and
// French, and English everywhere else.
const byId = (id) => TEST_CATALOG.find((t) => t.id === id);

test("landingIn picks the translated landing for the page language", () => {
  const nl = byId("nltheorie");
  assert.ok(nl, "nltheorie is in the catalog");
  assert.equal(landingIn(nl, "nl"), "/nl/cbr-theorie-examen-auto-oefenen");
  assert.equal(landingIn(nl, "en"), nl.href);
  assert.equal(landingIn(nl, "de"), nl.href);
});

// Every link to a landing on the homepage goes through landingIn, so no surface
// (cards, the country list, About each test, the JSON-LD list) falls back to
// the English page on its own.
test("homepage surfaces link landings through landingIn", () => {
  const read = (p) => fs.readFileSync(path.join(__dirname, "..", p), "utf8");
  const home = read("components/home/HomePage.tsx");
  assert.doesNotMatch(home, /href=\{test\.href\}/);
  assert.doesNotMatch(home, /\$\{t\.href\}/);
  for (const f of ["components/home/HomePage.tsx", "components/TestCard.tsx", "components/TestCatalogStatic.tsx"]) {
    assert.match(read(f), /landingIn\(/, f);
  }
});
