/** Complete UK route matrix. Run: node scripts/uk-pages-manifest.cjs [output.json] */
require("tsx/cjs");
const fs = require("node:fs");
const { EXAMS } = require("../lib/exams.ts");
const { EXAMS_V2 } = require("../lib/v2/registry.ts");
const { regionOfTest } = require("../lib/region.ts");
const parts = require("../lib/trainingParts.json");
function manifest() {
  const exams = [
    ...EXAMS.map((e) => ({ ...e, version: "v1" })),
    ...EXAMS_V2.map((e) => ({ ...e, version: "v2" })),
  ].filter((e) => regionOfTest(e.id) === "UK");
  const routes = [];
  const add = (path, kind, e) =>
    routes.push({
      path,
      kind,
      exam: e?.id ?? null,
      version: e?.version ?? null,
    });
  add("/uk", "home");
  add("/teach", "shared");
  add("/tests", "shared");
  for (const e of exams) {
    add(e.landingPath ?? e.slug, "landing", e);
    add(e.slug, "root", e);
    add(`${e.slug}/dashboard`, "dashboard", e);
    add(`${e.slug}/stats`, "stats", e);
    const nums =
      e.version === "v1"
        ? Array.from({ length: e.testCount }, (_, i) => i + 1)
        : e.tests.map((t) => t.number);
    for (const n of nums) {
      add(`${e.slug}/test/${n}`, "test", e);
      add(`${e.slug}/test/${n}/results`, "results-empty", e);
    }
    if (e.version === "v1") {
      add(`${e.slug}/drill`, "drill-empty", e);
      for (const n of nums)
        add(`${e.slug}/drill?test=${n}`, "drill-filter-empty", e);
      for (const s of e.trainingSets) {
        add(`${e.slug}/practice/${s.setNumber}`, "practice", e);
        for (let p = 1; p <= (parts[s.id]?.sizes.length ?? 0); p++)
          add(
            `${e.slug}/practice/${s.setNumber}?part=${p}`,
            "practice-part",
            e,
          );
      }
    } else
      for (const [i, d] of e.drills.entries()) {
        add(`${e.slug}/practice/${i + 1}`, "practice", e);
        add(`${e.slug}/practice/${i + 1}?level=exam`, "practice-exam", e);
        for (const skill of d.basics ?? [])
          add(
            `${e.slug}/practice/${i + 1}?skill=${skill}`,
            "practice-basics",
            e,
          );
      }
  }
  return {
    exams: exams.map((e) => ({
      id: e.id,
      version: e.version,
      slug: e.slug,
      landing: e.landingPath,
    })),
    routes,
  };
}
module.exports = { manifest };
if (require.main === module) {
  const data = JSON.stringify(manifest(), null, 2);
  if (process.argv[2]) fs.writeFileSync(process.argv[2], data + "\n");
  else console.log(data);
}
