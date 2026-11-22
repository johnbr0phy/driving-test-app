/**
 * SEO and GEO audit of the live site. Crawls every URL in the sitemap and checks
 * what search engines and AI answer engines read, then the site-wide files
 * (robots.txt, sitemaps, llms.txt, IndexNow key, host redirects, 404s).
 *
 *   npx tsx scripts/seo-audit.ts                       # whole site, report to stdout
 *   npx tsx scripts/seo-audit.ts --limit 50            # first 50 sitemap URLs only
 *   npx tsx scripts/seo-audit.ts --base https://<preview>.vercel.app --out audits/seo
 *
 * Exits 1 when any error is found (warnings never fail). Rules are in RULES below;
 * docs/claude/seo.md is the convention each one checks. Run weekly by
 * .github/workflows/seo-audit.yml; the seo-audit skill reads the report and fixes.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { urlLanguage, COUNTRY_HOME_LANGUAGES } from "../lib/urlLanguage";

type Level = "error" | "warn";
type Finding = { level: Level; rule: string; url: string; detail: string };

const RULES: Record<string, { level: Level; why: string }> = {
  status: { level: "error", why: "Sitemap URL does not answer 200" },
  redirected: { level: "error", why: "Sitemap URL redirects (list the final URL instead)" },
  noindex: { level: "error", why: "Sitemap URL is noindex" },
  canonicalMissing: { level: "error", why: "No canonical link" },
  canonicalWrong: { level: "error", why: "Canonical is not the page's own www URL" },
  titleMissing: { level: "error", why: "No <title>" },
  titleLong: { level: "warn", why: "Title over 65 characters (cut off in results)" },
  titleDuplicate: { level: "warn", why: "Same title as another sitemap page" },
  descMissing: { level: "error", why: "No meta description" },
  descLong: { level: "warn", why: "Meta description over 160 characters" },
  descShort: { level: "warn", why: "Meta description under 50 characters" },
  descDuplicate: { level: "warn", why: "Same description as another sitemap page" },
  h1: { level: "error", why: "Page does not have exactly one <h1>" },
  language: { level: "error", why: "Content-Language does not match the URL's language" },
  hreflangHost: { level: "error", why: "hreflang URL is not absolute on https://www" },
  hreflangTarget: { level: "error", why: "hreflang points at a URL not in the sitemap" },
  hreflangReciprocal: { level: "error", why: "hreflang target does not link back" },
  hreflangDuplicate: { level: "error", why: "Same hreflang code twice" },
  hreflangXDefault: { level: "warn", why: "hreflang set without x-default" },
  jsonldInvalid: { level: "error", why: "JSON-LD block is not valid JSON" },
  jsonldEntity: { level: "error", why: "HTML entity (&apos; etc.) inside JSON-LD or title" },
  jsonldMissing: { level: "warn", why: "No JSON-LD on the page" },
  faqNotVisible: { level: "warn", why: "FAQPage question not in the visible text (Google requires it)" },
  orgRef: { level: "warn", why: "JSON-LD never points at the site #organization" },
  staleModified: { level: "warn", why: "dateModified older than 365 days" },
  futureModified: { level: "error", why: "dateModified is in the future" },
  ogImage: { level: "warn", why: "No absolute og:image" },
  ogImageBroken: { level: "error", why: "og:image does not load" },
  linkBroken: { level: "error", why: "Internal link returns 4xx/5xx" },
  linkHost: { level: "warn", why: "Internal link on the apex host or http" },
  orphan: { level: "warn", why: "Sitemap page no other sitemap page links to" },
  sitemapDuplicate: { level: "error", why: "URL listed twice in the sitemaps" },
  sitemapHost: { level: "error", why: "Sitemap URL is not on https://www" },
  sitemapFuture: { level: "error", why: "Sitemap lastmod in the future" },
  sitemapEmpty: { level: "warn", why: "Sitemap segment has no URLs" },
  robots: { level: "error", why: "robots.txt problem" },
  hostRedirect: { level: "error", why: "Apex or http does not 301/308 to https://www" },
  llms: { level: "error", why: "llms.txt / llms-full.txt problem" },
  llmsLink: { level: "error", why: "Link in llms.txt does not load" },
  indexnow: { level: "error", why: "IndexNow key file problem" },
  soft404: { level: "error", why: "Unknown URL does not answer 404" },
  crawlerBlocked: { level: "error", why: "A search or AI crawler user agent is refused" },
};

const args = process.argv.slice(2);
const arg = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const BASE = (arg("base") ?? "https://www.tigertest.io").replace(/\/$/, "");
const HOST = new URL(BASE).host;
const LIMIT = Number(arg("limit") ?? 0);
const CONCURRENCY = Number(arg("concurrency") ?? 8);
const OUT = arg("out");
const TODAY = new Date().toISOString().slice(0, 10);
const UA = "Mozilla/5.0 (compatible; TigertestSEOAudit/1.0; +https://www.tigertest.io/about)";

const findings: Finding[] = [];
const add = (rule: keyof typeof RULES, url: string, detail = "") =>
  findings.push({ level: RULES[rule].level, rule, url, detail });

async function get(url: string, opts: { redirect?: RequestRedirect; ua?: string; method?: string } = {}) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: opts.redirect ?? "manual",
        method: opts.method ?? "GET",
        headers: { "user-agent": opts.ua ?? UA, accept: "text/html,application/xml,text/plain,*/*" },
        signal: AbortSignal.timeout(30_000),
      });
      const body = opts.method === "HEAD" ? "" : await res.text();
      if (res.status >= 500 && attempt < 2) continue;
      return { status: res.status, headers: res.headers, body };
    } catch (e) {
      if (attempt === 2) return { status: 0, headers: new Headers(), body: String(e) };
    }
  }
  throw new Error("unreachable");
}

async function pool<T>(items: T[], n: number, fn: (t: T) => Promise<void>) {
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) await fn(items[i++]);
    })
  );
}

const norm = (u: string) => u.replace(/\/$/, "") || u;
// One pass, so "&amp;lt;" decodes to "&lt;" and never on to "<".
const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&quot;": '"',
  "&#x27;": "'",
  "&#39;": "'",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&nbsp;": " ",
};
const decode = (s: string) => s.replace(/&(?:amp|quot|#x27|#39|apos|lt|gt|nbsp);/g, (e) => ENTITIES[e]);
// Same-site check by parsed host, not by string prefix.
const hostOf = (u: string) => {
  try {
    return new URL(u).host;
  } catch {
    return "";
  }
};
const isWww = (u: string) => u.startsWith("https://") && hostOf(u) === "www.tigertest.io";
const attr = (tag: string, name: string) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : undefined;
};
const visibleText = (html: string) =>
  decode(
    html
      .replace(/<script\b[\s\S]*?<\/script\b[^>]*>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style\b[^>]*>/gi, " ")
      .replace(/<[^>]*>/g, " ")
      .replace(/[<>]/g, " ")
  )
    .replace(/\s+/g, " ")
    .toLowerCase();
const looseText = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

type Page = {
  url: string;
  title?: string;
  desc?: string;
  alternates: Map<string, string>;
  links: Set<string>;
};
const pages = new Map<string, Page>();

// ---------------------------------------------------------------- sitemaps
async function readSitemaps(): Promise<string[]> {
  const index = await get(`${BASE}/sitemap.xml`);
  if (index.status !== 200) {
    add("status", `${BASE}/sitemap.xml`, `sitemap index answered ${index.status}`);
    return [];
  }
  const segs = [...index.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const all: string[] = [];
  const seen = new Set<string>();
  for (const seg of segs) {
    const segUrl = seg.replace(/^https:\/\/www\.tigertest\.io/, BASE);
    const res = await get(segUrl);
    if (res.status !== 200) {
      add("status", segUrl, `sitemap answered ${res.status}`);
      continue;
    }
    const entries = [...res.body.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
    if (!entries.length) add("sitemapEmpty", segUrl);
    for (const e of entries) {
      const loc = e.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "";
      const lastmod = e.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
      if (!isWww(loc)) add("sitemapHost", loc, segUrl);
      if (lastmod && lastmod.slice(0, 10) > TODAY) add("sitemapFuture", loc, lastmod);
      if (seen.has(loc)) add("sitemapDuplicate", loc, segUrl);
      seen.add(loc);
      all.push(loc);
    }
  }
  return [...new Set(all)];
}

// ---------------------------------------------------------------- one page
const sitemapSet = new Set<string>();
const ogImages = new Set<string>();
let orgRefPages = 0;

async function auditPage(loc: string) {
  const path = new URL(loc).pathname;
  const fetchUrl = BASE + path;
  const res = await get(fetchUrl);
  if (res.status >= 300 && res.status < 400) {
    add("redirected", loc, `${res.status} to ${res.headers.get("location")}`);
    return;
  }
  if (res.status !== 200) {
    add("status", loc, String(res.status));
    return;
  }
  const html = res.body;
  const head = html.slice(0, html.indexOf("</head>") > 0 ? html.indexOf("</head>") : 200_000);
  const page: Page = { url: loc, alternates: new Map(), links: new Set() };
  pages.set(norm(loc), page);

  // robots
  const robotsMeta = [...head.matchAll(/<meta[^>]+name="robots"[^>]*>/gi)].map((m) => attr(m[0], "content") ?? "");
  const xRobots = res.headers.get("x-robots-tag") ?? "";
  if ([...robotsMeta, xRobots].some((c) => /noindex/i.test(c))) add("noindex", loc, robotsMeta.join(" ") || xRobots);

  // canonical
  const canonTag = head.match(/<link[^>]+rel="canonical"[^>]*>/i)?.[0];
  const canon = canonTag ? attr(canonTag, "href") : undefined;
  if (!canon) add("canonicalMissing", loc);
  else if (norm(canon) !== norm(loc)) add("canonicalWrong", loc, canon);

  // title and description
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (!title?.trim()) add("titleMissing", loc);
  else {
    if (/&amp;(apos|quot|#39);/.test(title)) add("jsonldEntity", loc, `title: ${title}`);
    page.title = decode(title).trim();
    if ([...page.title].length > 65) add("titleLong", loc, `${[...page.title].length}: ${page.title}`);
  }
  const descTag = head.match(/<meta[^>]+name="description"[^>]*>/i)?.[0];
  const desc = descTag ? attr(descTag, "content")?.trim() : undefined;
  if (!desc) add("descMissing", loc);
  else {
    page.desc = desc;
    const n = [...desc].length;
    if (n > 160) add("descLong", loc, `${n} characters`);
    if (n < 50) add("descShort", loc, `${n}: ${desc}`);
  }

  // h1
  const h1s = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1s !== 1) add("h1", loc, `${h1s} h1 elements`);

  // language
  const homeLang = COUNTRY_HOME_LANGUAGES.find((c) => c.path === path)?.lang;
  const expected = urlLanguage(path) ?? homeLang ?? null;
  const contentLang = res.headers.get("content-language");
  if (expected && contentLang !== expected) add("language", loc, `expected ${expected}, got ${contentLang ?? "none"}`);
  if (!expected && contentLang && contentLang !== "en") add("language", loc, `English URL served as ${contentLang}`);

  // hreflang
  for (const m of head.matchAll(/<link[^>]+rel="alternate"[^>]*>/gi)) {
    const code = attr(m[0], "hrefLang") ?? attr(m[0], "hreflang");
    const href = attr(m[0], "href");
    if (!code || !href) continue;
    if (!isWww(href)) add("hreflangHost", loc, `${code} ${href}`);
    if (page.alternates.has(code)) add("hreflangDuplicate", loc, code);
    page.alternates.set(code, href);
  }
  if (page.alternates.size > 1 && !page.alternates.has("x-default")) add("hreflangXDefault", loc);

  // JSON-LD
  const blocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  if (!blocks.length) add("jsonldMissing", loc);
  const text = visibleText(html);
  const loose = looseText(text);
  let refsOrg = false;
  for (const raw of blocks) {
    if (/&(apos|quot|#39|amp;apos);/.test(raw)) add("jsonldEntity", loc, raw.match(/.{0,40}&(apos|quot|#39|amp;apos);.{0,20}/)?.[0] ?? "");
    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      add("jsonldInvalid", loc, String(e).slice(0, 120));
      continue;
    }
    if (raw.includes("#organization")) refsOrg = true;
    const nodes: Record<string, unknown>[] = [];
    const walk = (v: unknown) => {
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") {
        nodes.push(v as Record<string, unknown>);
        Object.values(v).forEach(walk);
      }
    };
    walk(data);
    for (const n of nodes) {
      const type = n["@type"];
      if (type === "Question" && typeof n.name === "string") {
        const q = looseText(n.name);
        if (q && !loose.includes(q)) add("faqNotVisible", loc, n.name.slice(0, 100));
      }
      const mod = n.dateModified;
      if (typeof mod === "string") {
        const d = mod.slice(0, 10);
        if (d > TODAY) add("futureModified", loc, d);
        else if (Date.parse(TODAY) - Date.parse(d) > 365 * 86400_000) add("staleModified", loc, d);
      }
    }
  }
  if (refsOrg) orgRefPages++;
  else if (blocks.length) add("orgRef", loc);

  // og:image
  const og = head.match(/<meta[^>]+property="og:image"[^>]*>/i)?.[0];
  const ogUrl = og ? attr(og, "content") : undefined;
  if (!ogUrl || !/^https:\/\//.test(ogUrl)) add("ogImage", loc, ogUrl ?? "");
  else ogImages.add(ogUrl);

  // internal links
  for (const m of html.matchAll(/<a\s[^>]*href="([^"#]+)/gi)) {
    let href = decode(m[1]);
    if (/^(mailto|tel|javascript):/i.test(href)) continue;
    if (/^https?:/i.test(href)) {
      const h = hostOf(href);
      if (h === "tigertest.io" || (h === "www.tigertest.io" && !href.startsWith("https://"))) add("linkHost", loc, href);
    }
    if (href.startsWith("/") && !href.startsWith("//")) href = "https://www.tigertest.io" + href;
    if (!isWww(href)) continue;
    href = href.split("?")[0];
    page.links.add(norm(href));
  }
}

// ---------------------------------------------------------------- site-wide
const CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot",
  "DuckAssistBot",
];

async function siteChecks() {
  // host redirects
  for (const from of ["https://tigertest.io/", "http://tigertest.io/", "http://www.tigertest.io/"]) {
    if (HOST !== "www.tigertest.io") break;
    // Every hop must be permanent and the chain must end on https://www within 3 hops
    // (http to https, then apex to www, is how Vercel does it).
    let url = from;
    const hops: string[] = [];
    for (let i = 0; i < 3 && !isWww(url); i++) {
      const r = await get(url);
      const next = r.headers.get("location") ?? "";
      hops.push(`${r.status} to ${next || "nothing"}`);
      if (![301, 308].includes(r.status) || !next) break;
      url = new URL(next, url).toString();
    }
    if (!isWww(url) || hops.some((h) => !/^30[18] /.test(h))) {
      add("hostRedirect", from, hops.join(", then "));
    }
  }

  // robots.txt
  const robots = await get(`${BASE}/robots.txt`);
  if (robots.status !== 200) add("robots", `${BASE}/robots.txt`, `answered ${robots.status}`);
  else {
    const groups = robots.body.split(/\n\s*\n/);
    for (const g of groups) {
      if (/^Disallow:\s*\/\s*$/im.test(g)) {
        const agents = [...g.matchAll(/User-Agent:\s*(.+)/gi)].map((m) => m[1].trim());
        add("robots", `${BASE}/robots.txt`, `Disallow: / for ${agents.join(", ")}`);
      }
    }
    if (!/Sitemap:\s*https:\/\/www\.tigertest\.io\/sitemap\.xml/i.test(robots.body)) {
      add("robots", `${BASE}/robots.txt`, "no Sitemap: line for the www sitemap index");
    }
  }

  // crawlers are not refused at the edge
  for (const bot of CRAWLERS) {
    const r = await get(`${BASE}/`, { ua: `Mozilla/5.0 (compatible; ${bot}/1.0)` });
    if (r.status !== 200) add("crawlerBlocked", `${BASE}/`, `${bot} got ${r.status}`);
  }

  // llms.txt
  for (const f of ["/llms.txt", "/llms-full.txt"]) {
    const r = await get(BASE + f);
    if (r.status !== 200) add("llms", BASE + f, `answered ${r.status}`);
    else if (!/text\/(plain|markdown)/.test(r.headers.get("content-type") ?? "")) {
      add("llms", BASE + f, `content-type ${r.headers.get("content-type")}`);
    } else if (r.body.length < 2000) add("llms", BASE + f, `only ${r.body.length} characters`);
    if (f === "/llms.txt" && r.status === 200) {
      const links = [...new Set([...r.body.matchAll(/\]\((https:\/\/www\.tigertest\.io[^)\s]*)\)/g)].map((m) => norm(m[1].split("#")[0])))];
      const toCheck = links.filter((l) => !sitemapSet.has(l) && !pages.has(l));
      await pool(toCheck, CONCURRENCY, async (l) => {
        const lr = await get(BASE + new URL(l).pathname, { redirect: "follow" });
        if (lr.status >= 400) add("llmsLink", l, String(lr.status));
      });
    }
  }

  // IndexNow key
  const key = await get(`${BASE}/api/indexnow/key`);
  if (key.status !== 200) add("indexnow", `${BASE}/api/indexnow/key`, `answered ${key.status}`);
  else {
    const k = key.body.trim();
    const file = await get(`${BASE}/${k}.txt`);
    if (file.status !== 200 || file.body.trim() !== k) add("indexnow", `${BASE}/${k}.txt`, `answered ${file.status}`);
  }

  // soft 404s
  for (const p of ["/this-page-does-not-exist-seo-audit", "/questions/cdl/no-such-topic", "/real-estate-practice-test/atlantis"]) {
    const r = await get(BASE + p);
    if (r.status !== 404) add("soft404", BASE + p, `answered ${r.status}`);
  }
}

// ---------------------------------------------------------------- run
async function main() {
  const started = Date.now();
  let urls = await readSitemaps();
  urls.forEach((u) => sitemapSet.add(norm(u)));
  if (LIMIT) urls = urls.slice(0, LIMIT);
  let done = 0;
  await pool(urls, CONCURRENCY, async (u) => {
    await auditPage(u);
    if (++done % 200 === 0) console.error(`  ${done}/${urls.length} pages`);
  });

  // cross-page checks
  const byTitle = new Map<string, string[]>();
  const byDesc = new Map<string, string[]>();
  for (const p of pages.values()) {
    if (p.title) byTitle.set(p.title, [...(byTitle.get(p.title) ?? []), p.url]);
    if (p.desc) byDesc.set(p.desc, [...(byDesc.get(p.desc) ?? []), p.url]);
    for (const [code, href] of p.alternates) {
      const target = norm(href);
      if (target === norm(p.url)) continue;
      if (!sitemapSet.has(target)) {
        add("hreflangTarget", p.url, `${code} ${href}`);
        continue;
      }
      const other = pages.get(target);
      if (other && ![...other.alternates.values()].some((h) => norm(h) === norm(p.url))) {
        add("hreflangReciprocal", p.url, `${code} ${href} does not list this page`);
      }
    }
  }
  for (const [t, us] of byTitle) if (us.length > 1) us.forEach((u) => add("titleDuplicate", u, `${us.length} pages: ${t}`));
  for (const [d, us] of byDesc) if (us.length > 1) us.forEach((u) => add("descDuplicate", u, `${us.length} pages: ${d.slice(0, 80)}`));

  // orphans and broken links (only when the whole site was crawled)
  if (!LIMIT) {
    const inbound = new Map<string, number>();
    for (const p of pages.values()) for (const l of p.links) if (l !== norm(p.url)) inbound.set(l, (inbound.get(l) ?? 0) + 1);
    for (const u of sitemapSet) if (u !== norm("https://www.tigertest.io/") && !inbound.has(u)) add("orphan", u);
  }
  const linkTargets = new Map<string, string>();
  for (const p of pages.values()) for (const l of p.links) if (!sitemapSet.has(l) && !linkTargets.has(l)) linkTargets.set(l, p.url);
  await pool([...linkTargets.keys()], CONCURRENCY, async (l) => {
    const r = await get(BASE + new URL(l).pathname, { redirect: "follow" });
    if (r.status >= 400 || r.status === 0) add("linkBroken", linkTargets.get(l)!, `${l} answered ${r.status}`);
  });
  await pool([...ogImages].slice(0, 400), CONCURRENCY, async (img) => {
    const r = await get(img.replace(/^https:\/\/www\.tigertest\.io/, BASE), { redirect: "follow" });
    if (r.status !== 200) add("ogImageBroken", img, String(r.status));
  });

  await siteChecks();

  // ---------------------------------------------------------------- report
  const errors = findings.filter((f) => f.level === "error");
  const warns = findings.filter((f) => f.level === "warn");
  const byRule = new Map<string, Finding[]>();
  for (const f of findings) byRule.set(f.rule, [...(byRule.get(f.rule) ?? []), f]);
  const lines: string[] = [];
  lines.push(`# SEO and GEO audit, ${TODAY}`, "");
  lines.push(
    `${BASE}: ${pages.size} pages crawled of ${sitemapSet.size} in the sitemap, ${linkTargets.size} other linked URLs checked, ${ogImages.size} OG images. ` +
      `${errors.length} errors, ${warns.length} warnings. ${Math.round((Date.now() - started) / 1000)}s.`,
    ""
  );
  const ordered = [...byRule.entries()].sort(
    (a, b) => (a[1][0].level === b[1][0].level ? b[1].length - a[1].length : a[1][0].level === "error" ? -1 : 1)
  );
  lines.push("| Level | Rule | Count | What it means |", "| --- | --- | --- | --- |");
  for (const [rule, fs] of ordered) lines.push(`| ${fs[0].level} | ${rule} | ${fs.length} | ${RULES[rule].why} |`);
  if (!findings.length) lines.push("| ok | all | 0 | Nothing to fix |");
  lines.push("");
  for (const [rule, fs] of ordered) {
    lines.push(`## ${fs[0].level === "error" ? "Error" : "Warning"}: ${rule} (${fs.length})`, "", RULES[rule].why, "");
    for (const f of fs.slice(0, 25)) lines.push(`- ${f.url.replace("https://www.tigertest.io", "")}${f.detail ? `: ${f.detail}` : ""}`);
    if (fs.length > 25) lines.push(`- ...and ${fs.length - 25} more (see the JSON report)`);
    lines.push("");
  }
  const md = lines.join("\n");
  console.log(md);
  if (OUT) {
    mkdirSync(OUT, { recursive: true });
    writeFileSync(join(OUT, `seo-audit-${TODAY}.md`), md);
    writeFileSync(
      join(OUT, `seo-audit-${TODAY}.json`),
      JSON.stringify({ date: TODAY, base: BASE, pages: pages.size, sitemap: sitemapSet.size, findings }, null, 1)
    );
  }
  process.exit(errors.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
