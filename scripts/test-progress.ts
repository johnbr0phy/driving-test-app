/**
 * Progress toward 1,000 tests: one row per live test with how well its
 * questions have been checked. Feeds the Google Sheet "Tigertest: road to
 * 1,000 tests" (its id is in tools/queue/progress-sheet.json).
 *
 *   npx tsx scripts/test-progress.ts [--out audits/progress]
 *
 * Writes <out>/rows.json: { date, header, rows } where rows is the 2D array
 * for the "All tests" tab (text and numbers only, no formulas).
 *
 * Per test, from the repo: name, id, country, hub group, format, price,
 * questions, languages, last content change (lib/landingDates.json), whether
 * its official sources are on file (a sources.md under tools/), and the
 * second-reviewer checks recorded in tools/queue/reviews.json. From Firestore:
 * questions re-read by the Claude audit (questionAuditLog) and when, audit
 * findings (questionAuditFindings), student reports (questionReports), answers
 * and percent correct (questionPicks), and flags still open
 * (globalStats/questionFlags minus the ones a review cleared).
 *
 * Without FIREBASE_SERVICE_ACCOUNT_KEY the live columns are left blank and the
 * output says so (`live: false`); never write blanks over real numbers.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { TEST_CATALOG, TEST_GROUPS } from "@/lib/testCatalog";
import { EXAM_VARIANTS } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { REGIONS, regionOfTest } from "@/lib/region";
import { applyFlagReviews, type FlagReview, type QuestionFlag, type QuestionPickCounts } from "@/lib/questionQuality";
import landingDates from "@/lib/landingDates.json";

const arg = (name: string, fallback: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
};
const OUT = arg("out", "audits/progress");

export const HEADER = [
  "Test",
  "Id",
  "Country",
  "Group",
  "Format",
  "Price",
  "Questions",
  "Languages",
  "Last content change",
  "Official sources on file",
  "Second-reviewer checks",
  "Last second review",
  "Questions re-read by the audit",
  "Last audit",
  "Audit findings",
  "Findings fixed",
  "Findings open",
  "Student reports",
  "Reports open",
  "Answers recorded",
  "Correct answers",
  "Flags open",
];

interface Review {
  date: string;
  kind: string;
  pr?: number;
  findings?: number;
}

function sourcesOnFile(): Set<string> {
  const ids = new Set<string>();
  const walk = (dir: string, depth: number) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const p = join(dir, e.name);
      if (existsSync(join(p, "sources.md"))) ids.add(e.name);
      if (depth < 2) walk(p, depth + 1);
    }
  };
  walk("tools", 0);
  return ids;
}

async function live() {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) return null;
  const { getAdminDb } = await import("@/lib/firebase-admin");
  const db = getAdminDb();
  const [log, findings, reports, picks, flagsDoc, reviewDocs] = await Promise.all([
    db.collection("questionAuditLog").get(),
    db.collection("questionAuditFindings").select("examId", "status").get(),
    db.collection("questionReports").select("examId", "status").get(),
    db.collection("questionPicks").get(),
    db.doc("globalStats/questionFlags").get(),
    db.collection("questionFlagReviews").get(),
  ]);
  const audited = new Map<string, { n: number; last: string }>();
  for (const d of log.docs) {
    const dates = Object.values(d.data()).filter((v): v is string => typeof v === "string");
    audited.set(d.id, { n: dates.length, last: dates.sort().at(-1)?.slice(0, 10) ?? "" });
  }
  const count = (docs: FirebaseFirestore.QueryDocumentSnapshot[]) => {
    const m = new Map<string, Record<string, number>>();
    for (const d of docs) {
      const { examId, status } = d.data();
      const row = m.get(examId) ?? {};
      row.total = (row.total ?? 0) + 1;
      row[status] = (row[status] ?? 0) + 1;
      m.set(examId, row);
    }
    return m;
  };
  const answers = new Map<string, { n: number; c: number }>();
  for (const d of picks.docs) {
    let n = 0;
    let c = 0;
    for (const q of Object.values(d.data()) as QuestionPickCounts[]) {
      n += q?.n || 0;
      c += q?.c || 0;
    }
    answers.set(d.id, { n, c });
  }
  const reviews: Record<string, Record<string, FlagReview>> = {};
  for (const d of reviewDocs.docs) reviews[d.id] = d.data() as Record<string, FlagReview>;
  const openFlags = new Map<string, number>();
  for (const f of applyFlagReviews((flagsDoc.data()?.flags ?? []) as QuestionFlag[], reviews).flags) {
    if (!f.cleared) openFlags.set(f.examId, (openFlags.get(f.examId) ?? 0) + 1);
  }
  return { audited, findings: count(findings.docs), reports: count(reports.docs), answers, openFlags };
}

const v2Ids = new Set(EXAMS_V2.map((e) => e.id));
const groupOf = new Map<string, string>();
for (const g of TEST_GROUPS) for (const t of g.tests) if (!groupOf.has(t.id)) groupOf.set(t.id, g.title);
const countryName = (id: string) => {
  const r = regionOfTest(id);
  return r === "GLOBAL" ? "Worldwide" : (REGIONS.find((x) => x.code === r)?.name ?? r);
};
async function main() {
const reviewsFile = "tools/queue/reviews.json";
const secondReviews: Record<string, Review[]> = existsSync(reviewsFile) ? JSON.parse(readFileSync(reviewsFile, "utf8")).reviews : {};
const sources = sourcesOnFile();
const data = await live();
const dates = landingDates as Record<string, string>;

const rows = TEST_CATALOG.map((t) => {
  const done = secondReviews[t.id] ?? [];
  const a = data?.audited.get(t.id);
  const f = data?.findings.get(t.id);
  const r = data?.reports.get(t.id);
  const p = data?.answers.get(t.id);
  const blank = data ? 0 : "";
  return [
    t.name,
    t.id,
    countryName(t.id),
    groupOf.get(t.id) ?? "",
    t.id === "dmv" ? "DMV" : v2Ids.has(t.id) ? "Timed exam" : "Question bank",
    t.pricing ? "Free + Premium" : "Free",
    t.questions,
    t.languages.length,
    dates[t.id] ?? "",
    t.id === "dmv" || sources.has(t.id) ? "Yes" : "No",
    done.length,
    done.map((x) => x.date).sort().at(-1) ?? "",
    a?.n ?? blank,
    a?.last ?? "",
    f?.total ?? blank,
    f?.fixed ?? blank,
    f?.open ?? blank,
    r?.total ?? blank,
    r?.open ?? blank,
    p?.n ?? blank,
    p?.c ?? blank,
    data ? (data.openFlags.get(t.id) ?? 0) : "",
  ];
}).sort((x, y) => String(x[2]).localeCompare(String(y[2])) || String(x[0]).localeCompare(String(y[0])));

mkdirSync(OUT, { recursive: true });
const date = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(OUT, "rows.json"),
  JSON.stringify({ date, live: !!data, tests: rows.length, stateVersions: EXAM_VARIANTS.length, header: HEADER, rows }, null, 1) + "\n",
);
console.log(`[progress] ${rows.length} tests (+${EXAM_VARIANTS.length} state versions), live data: ${data ? "yes" : "NO"}; wrote ${join(OUT, "rows.json")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
