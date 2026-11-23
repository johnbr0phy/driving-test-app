/**
 * Weekly Google Search Console report: where Tigertest is close to page 1 and
 * what to change. Reads the Search Console API (free, read-only) as the site's
 * Google service account, which is a Restricted user on the tigertest.io
 * property. No paid tools.
 *
 *   npx tsx scripts/gsc-report.ts --out audits/gsc            # full report
 *   npx tsx scripts/gsc-report.ts --inspect 0                 # skip URL inspection
 *
 * Sections (docs/claude/seo.md, "Search Console report"):
 *   - Page 2: queries at average position 8 to 20 with real impressions. The
 *     closest wins: answer the query in the page's first block, put it in the
 *     title and h1 where it reads naturally, add links from related pages.
 *   - Low click rate: positions 1 to 5 whose click rate is under half the usual
 *     rate for that position. Rewrite the title and description.
 *   - Competing pages: queries where two or more of our pages each get a real
 *     share of impressions. Pick one page for the query and link the other to it.
 *   - Falling pages: clicks down 30% or more on the previous 28 days.
 *   - Indexing: landings Google has not indexed, with its reason (URL
 *     Inspection API, 2,000 a day per property, so landings only).
 *   - Sitemaps: errors and warnings Google reports.
 *
 * Key: GSC_SERVICE_ACCOUNT_KEY, else FIREBASE_SERVICE_ACCOUNT_KEY (service
 * account JSON). Writes gscReports/{date} in Firestore as the watchdog heartbeat
 * when Firestore is reachable. Run weekly by .github/workflows/gsc-report.yml.
 */
import { createSign } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const arg = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const OUT = arg("out");
const INSPECT = Number(arg("inspect") ?? 600);
const API = "https://searchconsole.googleapis.com";
const SITE = "https://www.tigertest.io";

type Key = { client_email: string; private_key: string };
type Row = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

function readKey(): Key {
  const raw = process.env.GSC_SERVICE_ACCOUNT_KEY || process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error("Set GSC_SERVICE_ACCOUNT_KEY or FIREBASE_SERVICE_ACCOUNT_KEY (service account JSON).");
  const key = JSON.parse(raw) as Key;
  if (!key.client_email || !key.private_key) throw new Error("The service account JSON has no client_email or private_key.");
  return key;
}

const b64url = (s: string | Buffer) => Buffer.from(s).toString("base64url");

/** OAuth access token for a service account (JWT bearer grant), read-only scope. */
async function accessToken(key: Key): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const sig = createSign("RSA-SHA256").update(`${head}.${claims}`).sign(key.private_key);
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claims}.${b64url(sig)}` }),
  });
  const body = (await res.json()) as { access_token?: string; error_description?: string };
  if (!body.access_token) throw new Error(`Token request failed: ${res.status} ${body.error_description ?? ""}`);
  return body.access_token;
}

let token = "";
async function call<T>(path: string, body?: unknown): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(API + path, {
      method: body ? "POST" : "GET",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(60_000),
    });
    if ((res.status === 429 || res.status >= 500) && attempt < 3) {
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
      continue;
    }
    if (!res.ok) throw new Error(`${path}: ${res.status} ${(await res.text()).slice(0, 300)}`);
    return (await res.json()) as T;
  }
}

const day = (offset: number) => new Date(Date.now() - offset * 86400_000).toISOString().slice(0, 10);

async function query(site: string, start: string, end: string, dimensions: string[]): Promise<Row[]> {
  const rows: Row[] = [];
  for (let startRow = 0; ; startRow += 25000) {
    const r = await call<{ rows?: Row[] }>(`/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
      startDate: start,
      endDate: end,
      dimensions,
      type: "web",
      rowLimit: 25000,
      startRow,
    });
    rows.push(...(r.rows ?? []));
    if (!r.rows || r.rows.length < 25000) return rows;
  }
}

/** Typical click rate by position (rounded from public studies); a page under half of it has a weak title. */
const EXPECTED_CTR = [0.28, 0.15, 0.1, 0.07, 0.05];

const short = (u: string) => u.replace(/^https:\/\/www\.tigertest\.io/, "") || "/";
/** Like short(), but keeps a non-www or http host visible: Google showing those means a duplicate got indexed. */
const shortHost = (u: string) => (/^https:\/\/www\./.test(u) ? short(u) : u.replace(/^https?:\/\//, "").replace(/\/$/, "") || u);
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
const pos = (n: number) => n.toFixed(1);

async function main() {
  const key = readKey();
  token = await accessToken(key);
  console.error(`[gsc-report] signed in as ${key.client_email.replace(/@.*/, "@...")}`);

  const sites = (await call<{ siteEntry?: { siteUrl: string; permissionLevel: string }[] }>("/webmasters/v3/sites")).siteEntry ?? [];
  const site =
    sites.find((s) => s.siteUrl === "sc-domain:tigertest.io")?.siteUrl ??
    sites.find((s) => s.siteUrl === `${SITE}/`)?.siteUrl ??
    sites.find((s) => s.siteUrl.includes("tigertest.io"))?.siteUrl;
  if (!site) {
    throw new Error(
      `The service account ${key.client_email} cannot see a tigertest.io property. In Search Console, Settings, Users and permissions, add it as a Restricted user. It sees: ${sites.map((s) => s.siteUrl).join(", ") || "nothing"}.`
    );
  }

  // Search Console data lags about 2 days: compare the last 28 full days with the 28 before.
  const end = day(3), start = day(30), prevEnd = day(31), prevStart = day(58);
  console.error(`[gsc-report] property ${site}`);
  const [qp, pages, prevPages, totals, prevTotals] = await Promise.all([
    query(site, start, end, ["query", "page"]),
    query(site, start, end, ["page"]),
    query(site, prevStart, prevEnd, ["page"]),
    query(site, start, end, []),
    query(site, prevStart, prevEnd, []),
  ]);

  // Query totals (a query's impressions over all our pages) for page-2 and low-CTR.
  type Q = { query: string; clicks: number; impressions: number; posSum: number; pages: { page: string; impressions: number; clicks: number; position: number }[] };
  const byQuery = new Map<string, Q>();
  for (const r of qp) {
    const [q, page] = r.keys;
    const e = byQuery.get(q) ?? { query: q, clicks: 0, impressions: 0, posSum: 0, pages: [] };
    e.clicks += r.clicks;
    e.impressions += r.impressions;
    e.posSum += r.position * r.impressions;
    e.pages.push({ page, impressions: r.impressions, clicks: r.clicks, position: r.position });
    byQuery.set(q, e);
  }
  // Very long "queries" are AI agents pasting prompts into search, not people.
  const queries = [...byQuery.values()].filter((q) => q.query.length <= 100).map((q) => ({ ...q, position: q.posSum / q.impressions, ctr: q.clicks / q.impressions }));
  const top = (q: (typeof queries)[number]) => [...q.pages].sort((a, b) => b.impressions - a.impressions)[0];

  const page2 = queries
    .filter((q) => q.position >= 8 && q.position <= 20 && q.impressions >= 50)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 50)
    .map((q) => ({ query: q.query, page: short(top(q).page), impressions: q.impressions, clicks: q.clicks, position: q.position }));

  const lowCtr = queries
    .filter((q) => q.position < 5.5 && q.impressions >= 200 && q.ctr < 0.5 * EXPECTED_CTR[Math.max(0, Math.round(q.position) - 1)])
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 30)
    .map((q) => ({ query: q.query, page: short(top(q).page), impressions: q.impressions, ctr: q.ctr, position: q.position }));

  const competing = queries
    .filter((q) => q.impressions >= 100)
    .map((q) => ({ q, rivals: q.pages.filter((p) => p.impressions >= 20 && p.impressions / q.impressions >= 0.1) }))
    .filter((x) => x.rivals.length >= 2)
    .sort((a, b) => b.q.impressions - a.q.impressions)
    .slice(0, 30)
    .map(({ q, rivals }) => ({
      query: q.query,
      impressions: q.impressions,
      pages: rivals.sort((a, b) => b.impressions - a.impressions).map((p) => ({ page: shortHost(p.page), impressions: p.impressions, position: p.position })),
    }));

  const prevClicks = new Map(prevPages.map((r) => [r.keys[0], r.clicks]));
  const falling = pages
    .map((r) => ({ page: short(r.keys[0]), clicks: r.clicks, before: prevClicks.get(r.keys[0]) ?? 0 }))
    .filter((p) => p.before >= 20 && p.clicks <= p.before * 0.7)
    .sort((a, b) => b.before - b.clicks - (a.before - a.clicks))
    .slice(0, 20);

  // Sitemaps as Google sees them.
  const sitemaps = ((await call<{ sitemap?: { path: string; errors?: string; warnings?: string; lastDownloaded?: string; isPending?: boolean }[] }>(
    `/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps`
  )).sitemap ?? []).map((s) => ({ path: s.path, errors: Number(s.errors ?? 0), warnings: Number(s.warnings ?? 0), lastDownloaded: s.lastDownloaded ?? null }));

  // Indexing of the landings (the pages meant to rank), from the live sitemap.
  const notIndexed: { page: string; verdict: string; coverage: string; googleCanonical?: string; lastCrawl?: string }[] = [];
  let inspected = 0;
  if (INSPECT > 0) {
    const urls: string[] = [];
    const index = await (await fetch(`${SITE}/sitemap.xml`)).text();
    for (const seg of [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])) {
      const xml = await (await fetch(seg)).text();
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) if (/^https:\/\/www\.tigertest\.io\/[^/]+-practice-test$/.test(m[1])) urls.push(m[1]);
    }
    const todo = [...new Set(urls)].slice(0, INSPECT);
    let i = 0;
    await Promise.all(
      Array.from({ length: 4 }, async () => {
        while (i < todo.length) {
          const url = todo[i++];
          try {
            const r = await call<{ inspectionResult?: { indexStatusResult?: { verdict?: string; coverageState?: string; googleCanonical?: string; lastCrawlTime?: string } } }>("/v1/urlInspection/index:inspect", {
              inspectionUrl: url,
              siteUrl: site,
            });
            if (++inspected % 50 === 0) console.error(`[gsc-report] inspected ${inspected}/${todo.length}`);
            const s = r.inspectionResult?.indexStatusResult;
            if (s?.verdict !== "PASS") {
              notIndexed.push({
                page: short(url),
                verdict: s?.verdict ?? "unknown",
                coverage: s?.coverageState ?? "",
                googleCanonical: s?.googleCanonical && s.googleCanonical !== url ? shortHost(s.googleCanonical) : undefined,
                lastCrawl: s?.lastCrawlTime?.slice(0, 10),
              });
            }
          } catch (e) {
            if (/429|quota/i.test(String(e))) break;
            notIndexed.push({ page: short(url), verdict: "error", coverage: String(e).slice(0, 120) });
          }
        }
      })
    );
    notIndexed.sort((a, b) => a.coverage.localeCompare(b.coverage) || a.page.localeCompare(b.page));
  }

  const sum = (rows: Row[]) => rows[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const now = sum(totals), before = sum(prevTotals);
  const change = (a: number, b: number) => (b ? `${a >= b ? "+" : ""}${Math.round(((a - b) / b) * 100)}%` : "new");
  const date = new Date().toISOString().slice(0, 10);
  const report = {
    date,
    site,
    window: { start, end, prevStart, prevEnd },
    totals: { clicks: now.clicks, impressions: now.impressions, ctr: now.ctr, position: now.position, prevClicks: before.clicks, prevImpressions: before.impressions },
    page2,
    lowCtr,
    competing,
    falling,
    sitemaps,
    indexing: { inspected, notIndexed },
  };

  const L: string[] = [];
  L.push(`# Search Console report, ${date}`, "");
  L.push(
    `${site}, ${start} to ${end}: **${now.clicks.toLocaleString("en-US")} clicks** (${change(now.clicks, before.clicks)} on the 28 days before), ` +
      `${now.impressions.toLocaleString("en-US")} impressions (${change(now.impressions, before.impressions)}), click rate ${pct(now.ctr)}, average position ${pos(now.position)}.`,
    ""
  );
  L.push("## Page 2: closest wins", "", "Answer the query in the page's first block, put it in the title and h1 where it reads naturally, and link the page from related pages.", "");
  L.push("| Query | Page | Impressions | Clicks | Position |", "| --- | --- | --- | --- | --- |");
  for (const r of page2) L.push(`| ${r.query} | ${r.page} | ${r.impressions} | ${r.clicks} | ${pos(r.position)} |`);
  L.push("", "## Low click rate for the position", "", "Rewrite the title and description: lead with the query's words and say what the page gives (free, number of questions).", "");
  L.push("| Query | Page | Impressions | Click rate | Position |", "| --- | --- | --- | --- | --- |");
  for (const r of lowCtr) L.push(`| ${r.query} | ${r.page} | ${r.impressions} | ${pct(r.ctr)} | ${pos(r.position)} |`);
  L.push("", "## Our pages competing for one query", "", "Pick the page that should rank, point the other at it with a link, and keep the other's title off the query.", "");
  L.push("| Query | Impressions | Pages (impressions, position) |", "| --- | --- | --- |");
  for (const r of competing) L.push(`| ${r.query} | ${r.impressions} | ${r.pages.map((p) => `${p.page} (${p.impressions}, ${pos(p.position)})`).join("; ")} |`);
  L.push("", "## Falling pages (clicks down 30%+)", "", "| Page | Clicks | Before |", "| --- | --- | --- |");
  for (const r of falling) L.push(`| ${r.page} | ${r.clicks} | ${r.before} |`);
  L.push("", "## Sitemaps", "", "| Sitemap | Errors | Warnings | Last read |", "| --- | --- | --- | --- |");
  for (const s of sitemaps) L.push(`| ${shortHost(s.path)} | ${s.errors} | ${s.warnings} | ${s.lastDownloaded?.slice(0, 10) ?? "never"} |`);
  // Search Console's "Request indexing" button allows about 10 a day: pages Google
  // filed under another URL first, then DMV state pages (the biggest searches),
  // then pages Google has never crawled.
  const rank = (r: (typeof notIndexed)[number]) =>
    (r.googleCanonical ? 0 : 3) + (/-dmv-practice-test$/.test(r.page) ? 0 : 1) + (r.lastCrawl ? 1 : 0);
  const requestNext = [...notIndexed].sort((a, b) => rank(a) - rank(b) || a.page.localeCompare(b.page)).slice(0, 10);
  if (requestNext.length) {
    L.push("", "## Request indexing next", "", "Search Console allows about 10 a day: URL Inspection, paste the URL, Request indexing.", "");
    for (const r of requestNext) L.push(`- ${SITE}${r.page}`);
  }
  L.push("", `## Landings not indexed (${notIndexed.length} of ${inspected} inspected)`, "");
  if (notIndexed.length) {
    L.push("Find the cause (thin, duplicate, orphaned, canonical elsewhere) and fix that, not the page alone.", "", "| Page | Google's reason | Google's canonical | Last crawl |", "| --- | --- | --- | --- |");
    for (const r of notIndexed) L.push(`| ${r.page} | ${r.coverage || r.verdict} | ${r.googleCanonical ?? ""} | ${r.lastCrawl ?? "never"} |`);
  }
  const md = L.join("\n") + "\n";
  console.log(md);

  if (OUT) {
    mkdirSync(OUT, { recursive: true });
    writeFileSync(join(OUT, `${date}.json`), JSON.stringify(report, null, 1) + "\n");
    writeFileSync(join(OUT, `${date}.md`), md);
  }

  // Watchdog heartbeat; a report without Firestore still counts as a run.
  try {
    const { getAdminDb } = await import("@/lib/firebase-admin");
    await getAdminDb()
      .doc(`gscReports/${date}`)
      .set({
        date,
        at: new Date().toISOString(),
        site,
        totals: report.totals,
        counts: { page2: page2.length, lowCtr: lowCtr.length, competing: competing.length, falling: falling.length, notIndexed: notIndexed.length, inspected },
      });
  } catch (e) {
    console.error(`[gsc-report] heartbeat not written: ${String(e).slice(0, 200)}`);
  }
}

// Exit explicitly: an open Firestore connection would keep the process alive.
main().then(() => process.exit(0)).catch((e) => {
  console.error(`[gsc-report] ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
});
