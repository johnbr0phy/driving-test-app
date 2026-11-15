/**
 * Writes lib/landingDates.json: for every exam (v1 registry exams and their
 * state variants, every v2 exam, and the DMV), the date of the last commit
 * that touched what its landing says: the landing page file(s), the question
 * bank(s) and the translated landing and copy JSON. The sitemap's <lastmod>
 * and each landing's WebPage dateModified and "Updated" line read it
 * (lib/landingDates.ts), so an exam only claims to have changed when it did,
 * instead of every landing moving together with EXAM_LANDINGS_UPDATED_AT.
 *
 * Vercel builds from a shallow clone, so the dates cannot be computed at
 * build time: re-run this after committing landing or bank changes and commit
 * the JSON with them.
 *   npx tsx scripts/build-landing-dates.ts           # rewrite the file
 *   npx tsx scripts/build-landing-dates.ts --check   # exit 1 if it is stale
 *
 * lib/examFacts.ts is shared by every exam, so it is left out; uncommitted
 * changes do not count until they are committed.
 *
 * It also keeps lib/examLaunchDates.json, the day each exam went live (the
 * first commit that added any of the same files), read by the /admin New
 * tests tab. A launch date is written once and never moved: an exam already
 * in the file keeps its date, and a new exam whose files git cannot find yet
 * (not committed, or a shallow clone) gets today.
 */
import { execFileSync } from "child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { ALL_EXAMS, examLandingPath } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";

const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "lib/landingDates.json");
const LAUNCH_OUT = join(ROOT, "lib/examLaunchDates.json");

/** "@/data/x.json" imports of a bank module, by imported identifier. */
function dataImports(modulePath: string): Map<string, string> {
  const out = new Map<string, string>();
  const file = join(ROOT, modulePath);
  if (!existsSync(file)) return out;
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/import\s+(\w+)\s+from\s+["']@\/(data\/[^"']+)["']/g)) out.set(m[1], m[2]);
  return out;
}

/** app/<path>/page.tsx for a landing path, when that file exists. */
function landingFile(path: string | undefined): string[] {
  if (!path) return [];
  const rel = `app${path}/page.tsx`;
  return existsSync(join(ROOT, rel)) ? [rel] : [];
}

/** lib/landings/<id>.<lang>.json and lib/examTranslations/<id>.<lang>.json. */
function translationFiles(id: string): string[] {
  const out: string[] = [];
  for (const dir of ["lib/landings", "lib/examTranslations"]) {
    if (!existsSync(join(ROOT, dir))) continue;
    for (const f of readdirSync(join(ROOT, dir))) if (f.startsWith(`${id}.`) && f.endsWith(".json")) out.push(`${dir}/${f}`);
  }
  return out;
}

/** The state variant's own bank in its family module (lib/banks/<family>States.ts). */
function variantBank(id: string): string[] {
  for (const f of readdirSync(join(ROOT, "lib/banks"))) {
    if (!f.endsWith("States.ts")) continue;
    const rel = `lib/banks/${f}`;
    const src = readFileSync(join(ROOT, rel), "utf8");
    const key = src.match(new RegExp(`["']${id}["']\\s*:\\s*(\\w+)`));
    if (key) {
      const path = dataImports(rel).get(key[1]);
      return path ? [path] : [];
    }
  }
  return [];
}

function lastCommitDate(paths: string[]): string | null {
  if (paths.length === 0) return null;
  const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...paths], { cwd: ROOT, encoding: "utf8" }).trim();
  return out || null;
}

/** The day the first of these files was added, or null when git has none of them. */
function firstAddDate(paths: string[]): string | null {
  if (paths.length === 0) return null;
  const out = execFileSync("git", ["log", "--diff-filter=A", "--format=%cs", "--", ...paths], { cwd: ROOT, encoding: "utf8" }).trim();
  const days = out.split("\n").filter(Boolean).sort();
  return days[0] ?? null;
}

const sources: Record<string, string[]> = {};

sources.dmv = ["app/dmv-practice-test/page.tsx", "data/questions.json"];

for (const exam of ALL_EXAMS) {
  const files = [
    ...landingFile(examLandingPath(exam)),
    ...Object.values(exam.translations ?? {}).flatMap((tr) => landingFile(tr?.landingPath)),
    ...translationFiles(exam.id),
    ...(exam.variantOf ? variantBank(exam.id) : [...dataImports(`lib/banks/${exam.id}.ts`).values()]),
  ];
  sources[exam.id] = files;
}

for (const exam of EXAMS_V2) {
  sources[exam.id] = [...landingFile(exam.landingPath), ...dataImports(`lib/v2/banks/${exam.id}.ts`).values()];
}

const dates: Record<string, string> = {};
const missing: string[] = [];
for (const id of Object.keys(sources).sort()) {
  const date = lastCommitDate(sources[id]);
  if (date) dates[id] = date;
  else missing.push(id);
}

const json = `${JSON.stringify(dates, null, 2)}\n`;

// Launch dates: existing entries are kept; state variants count in their family.
const launches: Record<string, string> = existsSync(LAUNCH_OUT) ? JSON.parse(readFileSync(LAUNCH_OUT, "utf8")) : {};
const today = new Date().toISOString().slice(0, 10);
const variantIds = new Set<string>(ALL_EXAMS.filter((e) => e.variantOf).map((e) => e.id));
for (const id of Object.keys(sources)) {
  if (variantIds.has(id) || launches[id]) continue;
  launches[id] = firstAddDate(sources[id]) ?? today;
}
const launchJson = `${JSON.stringify(Object.fromEntries(Object.entries(launches).sort(([a], [b]) => a.localeCompare(b))), null, 2)}\n`;
if (missing.length) console.warn(`No committed files found for: ${missing.join(", ")} (they fall back to EXAM_LANDINGS_UPDATED_AT)`);

if (process.argv.includes("--check")) {
  const current = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
  if (current !== json) {
    console.error("lib/landingDates.json is stale: run npx tsx scripts/build-landing-dates.ts");
    process.exit(1);
  }
  if ((existsSync(LAUNCH_OUT) ? readFileSync(LAUNCH_OUT, "utf8") : "") !== launchJson) {
    console.error("lib/examLaunchDates.json is missing exams: run npx tsx scripts/build-landing-dates.ts");
    process.exit(1);
  }
  console.log("lib/landingDates.json is up to date.");
} else {
  writeFileSync(OUT, json);
  writeFileSync(LAUNCH_OUT, launchJson);
  console.log(`Wrote ${Object.keys(dates).length} landing dates to lib/landingDates.json`);
}
