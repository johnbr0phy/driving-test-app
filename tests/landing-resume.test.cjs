require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { LANDING_RESUME_KEY, LANDING_RESUME_SCRIPT, syncLandingResume } = require("../lib/landingResume.ts");
const { LANDING_TRY_FIT_SCRIPT } = require("../lib/landingTryTest.ts");
const { examTestIds, getExamById, getExamVariant } = require("../lib/exams.ts");

function beforePaint(storage, exam, arm = "a") {
  const attributes = new Map();
  const marker = { dataset: { exam }, setAttribute: (key, value) => attributes.set(key, value) };
  const document = {
    __ltq: arm,
    currentScript: marker,
    documentElement: { setAttribute() {} },
    querySelector: () => attributes.has("data-resume") ? marker : null,
    querySelectorAll: () => [{ closest: () => ({ getBoundingClientRect: () => ({ bottom: 450 }) }) }],
  };
  new Function("localStorage", "document", LANDING_RESUME_SCRIPT)(storage, document);
  new Function("document", "window", "location", LANDING_TRY_FIT_SCRIPT)(document, { innerHeight: 700 }, { pathname: "/exam" });
  return { resume: attributes.has("data-resume"), fit: document.__ltqFit };
}

test("each landing reads only its small local hint and leaves both fresh layouts eligible", () => {
  const saved = { getItem(key) { assert.equal(key, LANDING_RESUME_KEY); return '["phlto","crcst"]'; } };
  for (const arm of ["a", "b"]) {
    for (const id of ["phlto", "crcst"]) assert.deepEqual(beforePaint(saved, id, arm), { resume: true, fit: undefined });
    assert.deepEqual(beforePaint(saved, "rbt", arm), { resume: false, fit: true });
    for (const data of [null, "bad JSON", "{}", "[]"]) {
      assert.deepEqual(beforePaint({ getItem: () => data }, "phlto", arm), { resume: false, fit: true });
    }
    assert.deepEqual(beforePaint({ getItem() { throw Error("blocked"); } }, "rbt", arm), { resume: false, fit: true });
  }
});

test("local progress updates, account changes and resets maintain the hint for the right exam family", (t) => {
  const values = new Map();
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, v) => values.set(key, v), removeItem: (key) => values.delete(key) };
  const original = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: storage });
  t.after(() => original ? Object.defineProperty(globalThis, "localStorage", original) : delete globalThis.localStorage);
  const fresh = { isGuest: false, userId: null, loadedUid: null, startedExams: [], currentTests: {}, testAttempts: [], trainingSets: {} };
  syncLandingResume(fresh);
  assert.equal(values.size, 0);
  const guest = { ...fresh, isGuest: true, startedExams: ["crcst"] };
  syncLandingResume(guest, fresh);
  assert.equal(beforePaint(storage, "crcst").resume, true);
  const legacy = { ...fresh, isGuest: false, userId: "local-test-user", loadedUid: "local-test-user",
    currentTests: { [examTestIds(getExamById("phlto"))[0]]: {} },
    testAttempts: [{ testNumber: examTestIds(getExamById("rbt"))[0] }],
    trainingSets: {
      [getExamVariant("pnc", "CA").trainingSets[0].id]: { masteredIds: ["q"] },
      [getExamById("crcst").trainingSets[0].id]: { masteredIds: [] },
    },
  };
  syncLandingResume(legacy, guest);
  assert.deepEqual(JSON.parse(storage.getItem(LANDING_RESUME_KEY)).sort(), ["phlto", "pnc", "rbt"].sort());
  const reset = { ...legacy, startedExams: [], testAttempts: [] };
  syncLandingResume(reset, legacy);
  assert.equal(beforePaint(storage, "rbt").resume, false);
  syncLandingResume(fresh, reset);
  assert.equal(values.size, 0);
});
