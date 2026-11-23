/**
 * Build queue: which tests to build next, ranked from live data.
 *
 *   npx tsx scripts/build-queue.ts [--count 10] [--out audits/build-queue] [--only id,id] [--github]
 *   npx tsx scripts/build-queue.ts --mark <id> --status pr|failed|skipped [--note "..."] [--id-base 28100]
 *
 * Every live test gets a score from the last 14 days of practice (answers),
 * paywall views and purchases since PURCHASES_SINCE (Nov 10 2026, when Premium
 * went on sale beyond the DMV; at most 60 days back), each purchase weighted by
 * what it brought in dollars (a US $9.99 sale = 1.0, a $5 sale about 0.5; see
 * lib/buildQueueScore.ts). A candidate in
 * tools/queue/backlog.json inherits the average score of the live tests it
 * names as `siblings` (same buyer, same exam body or the same kind of licence
 * in another country), scaled by `sells`, plus Google Trends interest (`trends`) and a boost when people searched the
 * site for it and found nothing. So families that get use and sales get more
 * siblings, and families that do not, stop.
 *
 * Left out of the picks: anything already in the catalog, anything with an open
 * PR (`buildQueue/{id}.status == "pr"`, for 21 days), anything that failed in
 * the last 14 days, and anything that failed twice or was marked skipped.
 *
 * Writes <out>/<date>.json and <out>/<date>.md. Run by the /build-tests command
 * (.claude/skills/build-tests). --github also writes `matrix`, `any` and `date`
 * to $GITHUB_OUTPUT, for a workflow if one is ever added.
 * v1 picks get a free 100-wide store ID block (`idBase`) so parallel builders
 * never collide.
 *
 * Needs FIREBASE_SERVICE_ACCOUNT_KEY.
 */
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getAdminDb } from "@/lib/firebase-admin";
import { ALL_EXAMS } from "@/lib/exams";
import { TEST_CATALOG, TEST_GROUPS } from "@/lib/testCatalog";
import { regionOfTest } from "@/lib/region";
import { isInternalEmail } from "@/lib/internal";
import { buildSearchGroups } from "@/lib/server/searchGroups";
import { WEIGHTS, liveScore, purchaseWeight, purchaseWindowStart } from "@/lib/buildQueueScore";

interface Candidate {
  id: string;
  name: string;
  /** The body that owns the exam. */
  owner: string;
  region: string;
  engine: "v1" | "v2";
  /** Live test ids whose results predict this one. */
  siblings: string[];
  /** 1 = a job or licence rides on it (Premium sells); 0.5 = it gets use but has not sold. */
  sells?: number;
  /** Words people would type into the site search. */
  search?: string[];
  /** Google Trends worldwide interest for trendsTerm over 12 months, "cna practice test" = 100. */
  trends?: number;
  /** The search term `trends` was read for. */
  trendsTerm?: string;
  /** Id of the candidate that replaced this one (the real exam was retired); never picked. */
  supersededBy?: string;
  note?: string;
}

interface QueueState {
  status: "pr" | "failed" | "skipped";
  at: string;
  attempts?: number;
  note?: string;
  idBase?: number;
}

const arg = (name: string, fallback?: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
};
const flag = (name: string) => process.argv.includes(`--${name}`);
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
const sumSince = (daily: Record<string, number> | undefined, from: string) =>
  Object.entries(daily ?? {}).reduce((s, [d, n]) => (d >= from && typeof n === "number" ? s + n : s), 0);

const BACKLOG = "tools/queue/backlog.json";

async function mark(id: string) {
  const status = arg("status") as QueueState["status"];
  if (!["pr", "failed", "skipped"].includes(status)) throw new Error("--status must be pr, failed or skipped");
  const ref = getAdminDb().doc(`buildQueue/${id}`);
  const prev = (await ref.get()).data() as QueueState | undefined;
  const idBase = arg("id-base");
  await ref.set({
    status,
    at: new Date().toISOString(),
    attempts: (prev?.attempts ?? 0) + (status === "failed" ? 1 : 0),
    note: arg("note") ?? null,
    ...(idBase ? { idBase: Number(idBase) } : prev?.idBase ? { idBase: prev.idBase } : {}),
  });
  console.log(`buildQueue/${id}: ${status}`);
}

/** Paywall keys are "<location>:<item>"; a non-DMV location starts with its exam id. */
function paywallExam(location: string, ids: string[]): string {
  return ids.find((id) => location.startsWith(`${id}_`)) ?? "dmv";
}

async function main() {
  const marked = arg("mark");
  if (marked) return mark(marked);

  const count = Number(arg("count", "10"));
  const out = arg("out", "audits/build-queue")!;
  const only = (arg("only") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const db = getAdminDb();
  const d14 = daysAgo(14);
  const purchasesFrom = purchaseWindowStart();

  const [questions, paywalls, payments, stateSnap, search] = await Promise.all([
    db.doc("analytics/questions").get(),
    db.doc("analytics/paywalls").get(),
    db.collection("payments").where("createdAt", ">=", purchasesFrom).get(),
    db.collection("buildQueue").get(),
    buildSearchGroups().catch(() => ({ groups: [] as Awaited<ReturnType<typeof buildSearchGroups>>["groups"] })),
  ]);

  // Live tests: use, paywall views and purchases.
  const liveIds = TEST_CATALOG.map((t) => t.id);
  const byLength = [...new Set([...liveIds, ...ALL_EXAMS.map((e) => e.id)])].sort((a, b) => b.length - a.length);
  const live = new Map(liveIds.map((id) => [id, { id, answers: 0, views: 0, purchases: 0, score: 0 }]));
  const byExam = (questions.data()?.byExam ?? {}) as Record<string, { daily?: Record<string, number> }>;
  for (const [id, v] of Object.entries(byExam)) {
    const row = live.get(id);
    if (row) row.answers = sumSince(v.daily, d14);
  }
  const byPaywall = (paywalls.data()?.byPaywall ?? {}) as Record<string, { daily?: Record<string, number> }>;
  for (const [key, v] of Object.entries(byPaywall)) {
    const row = live.get(paywallExam(key.split(":")[0], byLength));
    if (row) row.views += sumSince(v.daily, d14);
  }
  payments.forEach((doc) => {
    const p = doc.data();
    if (isInternalEmail(p.email)) return;
    const row = live.get(p.exam || "dmv");
    if (row) row.purchases += purchaseWeight(p, purchasesFrom);
  });
  for (const r of live.values()) {
    r.score = liveScore(r);
  }

  // Families: the catalog's hub groups, for the report and for writing new candidates.
  const families = TEST_GROUPS.map((g) => {
    const rows = g.tests.map((t) => live.get(t.id)).filter((r): r is NonNullable<typeof r> => !!r);
    const total = rows.reduce((s, r) => s + r.score, 0);
    return {
      family: g.title,
      tests: rows.length,
      answers: rows.reduce((s, r) => s + r.answers, 0),
      views: rows.reduce((s, r) => s + r.views, 0),
      purchases: Math.round(rows.reduce((s, r) => s + r.purchases, 0) * 10) / 10,
      scorePerTest: rows.length ? Math.round(total / rows.length) : 0,
    };
  }).sort((a, b) => b.scorePerTest - a.scorePerTest);

  // Candidates.
  const backlog = JSON.parse(readFileSync(BACKLOG, "utf8")) as { candidates: Candidate[] };
  const state = new Map<string, QueueState>();
  stateSnap.forEach((d) => state.set(d.id, d.data() as QueueState));
  const gaps = search.groups.filter((g) => !g.foundNow && g.d30 > 0);
  const liveNames = TEST_CATALOG.map((t) => `${t.name} ${t.shortName ?? ""}`.toLowerCase());
  const now = Date.now();
  const age = (s: QueueState) => (now - Date.parse(s.at)) / 86400000;

  const warnings: string[] = [];
  const ranked = backlog.candidates.map((c) => {
    const sib = c.siblings.map((id) => live.get(id)).filter((r): r is NonNullable<typeof r> => !!r);
    const missing = c.siblings.filter((id) => !live.has(id));
    if (missing.length) warnings.push(`${c.id}: unknown sibling ${missing.join(", ")}`);
    const base = sib.length ? sib.reduce((s, r) => s + r.score, 0) / sib.length : 0;
    const words = (c.search ?? []).map((w) => w.toLowerCase());
    const searched = gaps
      .filter((g) => words.some((w) => [g.q, ...g.variants.map((v) => v.q)].some((q) => ` ${q.toLowerCase()} `.includes(` ${w} `))))
      .reduce((s, g) => s + g.d30, 0);
    const score = Math.round(base * (c.sells ?? 1) + searched * WEIGHTS.perSearch + (c.trends ?? 0) * WEIGHTS.perTrend);
    const s = state.get(c.id);
    let held: string | null = null;
    if (liveIds.includes(c.id)) held = "live";
    else if (liveNames.some((n) => n.includes(c.name.toLowerCase()))) held = "live under another id";
    else if (c.supersededBy) held = `superseded by ${c.supersededBy}`;
    else if (s?.status === "skipped") held = "skipped";
    else if (s?.status === "pr" && age(s) < 21) held = "PR open";
    else if (s?.status === "failed" && ((s.attempts ?? 1) >= 2 || age(s) < 14)) held = "failed";
    return { ...c, score, siblingScore: Math.round(base), searched, held };
  }).sort((a, b) => b.score - a.score);

  const open = ranked.filter((c) => !c.held);
  // At most two a day that lean on the same live test, so one hot test does not fill a whole run.
  const perLead = new Map<string, number>();
  const spread = open.filter((c) => {
    const n = perLead.get(c.siblings[0]) ?? 0;
    perLead.set(c.siblings[0], n + 1);
    return n < 2;
  });
  const chosen = (only.length ? ranked.filter((c) => only.includes(c.id)) : spread).slice(0, count);

  // A free 100-wide store ID block per v1 pick, above every live exam and every block held by an open PR.
  let next = Math.max(...ALL_EXAMS.map((e) => e.idBase), ...[...state.values()].map((s) => s.idBase ?? 0));
  next = Math.ceil((next + 1) / 100) * 100;
  const picks = chosen.map((c) => {
    if (c.engine !== "v1") return { ...c, idBase: 0 };
    next += 100;
    return { ...c, idBase: next };
  });

  const date = new Date().toISOString().slice(0, 10);
  mkdirSync(out, { recursive: true });
  const topLive = [...live.values()].sort((a, b) => b.score - a.score).slice(0, 40);
  writeFileSync(
    join(out, `${date}.json`),
    JSON.stringify({ date, weights: WEIGHTS, picks, families, topLive, open: open.length, backlog: ranked.length, warnings, ranked }, null, 2) + "\n",
  );
  const md = [
    `# Build queue ${date}`,
    "",
    `${ranked.length} candidates in ${BACKLOG}, ${open.length} still to build. Today's ${picks.length}:`,
    "",
    "| # | Test | Owner | Country | Engine | Score | From siblings | Searched (30 days) |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...picks.map((c, i) => `| ${i + 1} | ${c.name} (\`${c.id}\`) | ${c.owner} | ${c.region} | ${c.engine} | ${c.score} | ${c.siblings.join(", ")} (${c.siblingScore}) | ${c.searched} |`),
    "",
    "## Families, best first (score per live test, last 14 days)",
    "",
    "| Family | Tests | Answers | Paywall views | Purchases (price-weighted, since Nov 10 2026) | Score per test |",
    "| --- | --- | --- | --- | --- | --- |",
    ...families.slice(0, 25).map((f) => `| ${f.family} | ${f.tests} | ${f.answers} | ${f.views} | ${f.purchases} | ${f.scorePerTest} |`),
    "",
    ...(warnings.length ? ["## Backlog warnings", "", ...warnings.map((w) => `- ${w}`), ""] : []),
  ].join("\n");
  writeFileSync(join(out, `${date}.md`), md);

  if (flag("github") && process.env.GITHUB_OUTPUT) {
    const matrix = { include: picks.map((c) => ({ id: c.id, name: c.name, owner: c.owner, region: c.region, engine: c.engine, idBase: c.idBase, siblings: c.siblings.join(","), search: (c.search ?? []).join(", "), note: c.note ?? "" })) };
    appendFileSync(process.env.GITHUB_OUTPUT, `matrix=${JSON.stringify(matrix)}\nany=${picks.length > 0}\ndate=${date}\n`);
  }
  console.log(`${picks.length} picked of ${open.length} open (${ranked.length} in backlog) -> ${out}/${date}.{json,md}`);
  for (const c of picks) console.log(`  ${String(c.score).padStart(5)}  ${c.id.padEnd(14)} ${c.name}`);
  // regionOfTest is the catalog's own country map; warn when a sibling sits in another market.
  for (const c of picks) {
    const other = c.siblings.filter((id) => live.has(id) && ![c.region, "GLOBAL"].includes(regionOfTest(id)) && c.region !== "GLOBAL");
    if (other.length) console.log(`  note: ${c.id} (${c.region}) borrows its score from another market: ${other.join(", ")}`);
  }
}

main().then(
  () => process.exit(0),
  (e) => {
    console.error(e);
    process.exit(1);
  },
);
