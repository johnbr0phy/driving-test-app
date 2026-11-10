/**
 * Daily search gaps: the searches on tigertest.io that still find no test.
 *
 *   npx tsx scripts/search-gaps.ts [--out audits/search-gaps] [--min 2]
 *   npx tsx scripts/search-gaps.ts --mark-planned "<intent key>"
 *
 * Reads the same groups as the Searches tab on /admin (lib/server/searchGroups),
 * re-run through today's search, and keeps the ones that still find nothing
 * (or only a partial match) and are not marked Planned or Ignored there.
 *
 * Writes <out>/<date>.json and <out>/<date>.md. The GitHub Action
 * (.github/workflows/search-gaps.yml) hands both to Claude Code, which wires
 * aliases for searches that name a test we have, builds at most one new test
 * for the most-searched one we don't, and opens a PR.
 *
 * --mark-planned sets that group to Planned on /admin, so the next day's run
 * does not start the same test again while its PR waits for review.
 *
 * Needs FIREBASE_SERVICE_ACCOUNT_KEY.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getAdminDb } from "@/lib/firebase-admin";
import { buildSearchGroups, readSearchTriage, searchTriageId, type SearchGroup } from "@/lib/server/searchGroups";

const arg = (name: string, fallback?: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
};

async function markPlanned(key: string) {
  await getAdminDb()
    .doc(`searchTriage/${searchTriageId(key)}`)
    .set({ key, status: "planned", at: new Date().toISOString(), by: "search-gaps" });
  console.log(`Marked "${key}" Planned`);
}

const regions = (g: SearchGroup) =>
  Object.entries(g.byRegion)
    .sort((a, b) => b[1] - a[1])
    .map(([r, n]) => `${r} ${n}`)
    .join(", ") || "unknown";

async function main() {
  const planned = arg("mark-planned");
  if (planned) return markPlanned(planned);

  const out = arg("out", "audits/search-gaps")!;
  const min = Number(arg("min", "2"));
  const [{ groups }, triage] = await Promise.all([buildSearchGroups(), readSearchTriage()]);

  const gaps = groups
    .filter((g) => !g.foundNow && !triage[g.key] && g.d30 > 0)
    .map((g) => ({
      key: g.key,
      query: g.q,
      variants: g.variants.slice(0, 8),
      last7Days: g.d7,
      last30Days: g.d30,
      allTime: g.count,
      regions: g.byRegion,
      closestHitToday: g.topHit,
      lastAt: g.lastAt,
    }));
  const buildable = gaps.filter((g) => g.last30Days >= min);

  const date = new Date().toISOString().slice(0, 10);
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, `${date}.json`), JSON.stringify({ date, minSearches: min, gaps, buildable: buildable.map((g) => g.key) }, null, 2) + "\n");

  const row = (g: (typeof gaps)[number]) =>
    `| ${g.query.replace(/\|/g, "/")} | ${g.last7Days} | ${g.last30Days} | ${regions({ byRegion: g.regions } as SearchGroup)} | ${g.closestHitToday ?? "nothing"} |`;
  const md = [
    `# Search gaps ${date}`,
    "",
    `${gaps.length} searches still find no test (not Planned or Ignored on /admin). ${buildable.length} were searched ${min}+ times in 30 days.`,
    "",
    "| Search | 7 days | 30 days | Regions | Closest hit today |",
    "| --- | --- | --- | --- | --- |",
    ...gaps.slice(0, 60).map(row),
    "",
  ].join("\n");
  writeFileSync(join(out, `${date}.md`), md);
  console.log(`${gaps.length} gaps, ${buildable.length} with ${min}+ searches -> ${out}/${date}.{json,md}`);
}

main().then(
  () => process.exit(0),
  (e) => {
    console.error(e);
    process.exit(1);
  },
);
