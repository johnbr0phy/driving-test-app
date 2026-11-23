---
name: seo-audit
description: Run Tigertest's SEO and GEO audit of the live site and fix what it finds. Crawls every sitemap URL (status, canonical, noindex, titles, descriptions, h1, page language, hreflang, JSON-LD, FAQ visibility, OG images, broken links, orphans) and the site-wide files (robots.txt, crawler access, sitemaps, llms.txt, IndexNow, host redirects, soft 404s), then checks by judgement what a script cannot. Use when John says "run the SEO audit", "SEO/GEO check", "is the site ship shape", or types /seo-audit, and after any change to landings, metadata, sitemaps, robots, llms.txt or JSON-LD.
---

# SEO and GEO audit

The conventions are in `docs/claude/seo.md`. The crawler checks them; this skill
adds the judgement and the fixes. `.github/workflows/seo-audit.yml` runs the
crawler every Monday and fails (GitHub emails John) on any error.

## 1. Crawl

```bash
npx tsx scripts/seo-audit.ts --out audits/seo
```

About a minute for the whole site (~1,700 pages). `--limit 50` for a quick look,
`--base https://<preview>.vercel.app` to check a branch before merge (canonicals
will still say www, which is right). Exit code 1 means errors.

## 2. Fix every error, the same day

Errors are things that lose pages from search or AI answers: a sitemap URL that
is not 200, redirects or is noindex; a wrong or missing canonical; hreflang that
points off the sitemap or is not reciprocal; invalid JSON-LD; a broken internal
link or OG image; robots.txt refusing a crawler; a soft 404; llms.txt broken.
Find the cause in code (never patch one page by hand when a shared component
or `lib/sitemaps.ts` made it), fix it, and re-run the crawler on a preview.

## 3. Warnings: fix whole groups, not single pages

Warnings come by the hundred from templates (topic pages, teach pages, state
pages). Fix the template when a group is worth it:
- **orphan**: a sitemap page nothing links to. Always fix: link it from its
  exam's landing or topic pages.
- **ogImage**: page-level `openGraph` replaces the root one entirely in Next, so
  a page that sets `openGraph` without `images` shares with no picture. Add
  `images: [{ url: shareImageUrl(<examId or "home">), width: 1200, height: 630 }]`.
- **titleDuplicate / descDuplicate**: always fix.
- **faqNotVisible**: Google requires FAQ JSON-LD to be on the page. Fix.
- **fewContextLinks**: a landing fewer than 3 other pages link to from their
  main content (header and footer do not count). Fix the shared source:
  `relatedTests()` in `lib/testCatalog.ts`, `neighboringSlugs` in
  `data/stateLandingData.ts`, topic pages, country homepages.
- **factMismatch**: the FAQ and the ExamFacts answer quote different question
  counts or pass marks. Search engines and AI answers trust neither number. Read
  the official source, fix whichever is wrong, and keep both from one constant
  where the page allows it.
- **faqBoilerplate**: a page family whose FAQ is mostly the same answers. Put
  each page's own facts (its name, topics, counts) into the answers or drop the
  shared ones. One shared "is it free" answer next to specific ones is fine.
- **aiCrawlerContent**: GPTBot or ClaudeBot got less text than a browser, or no
  h1 or ExamFacts answer. Most AI crawlers do not run JavaScript, so anything
  that matters must be in the server HTML. Treat it like an error.
- **titleLong / descLong**: Google cuts at about 60 characters / 155. Only
  shorten where the front of the title is not the search phrase; a long tail
  after " | Tigertest" costs little.

## 4. Judgement checks the script cannot do

Sample 10 pages: the homepage, 3 DMV states, the 3 busiest landings (Today tab
on /admin or `analytics/questions.byExam`), 1 translated landing, 1 topic page,
1 teach page. For each:
- The title starts with the phrase people search ("CDL practice test", not
  "Free practice for your CDL"), the description says free to start, never
  "everything free" on an exam with Premium steps.
- The `ExamFacts` answer and facts table match the official source today
  (question count, time, pass mark, fee). Fix `lib/examFacts.ts` from the
  official page only.
- The dated "Updated" line is not stale for a page whose content changed.
- `/llms.txt` lists every new test and country added since the last audit.
- The first 40 words under the h1 and the ExamFacts answer state the direct
  answer (count, time, pass mark, who takes it), not a preamble. AI answers
  and featured snippets quote the opening of a section.
- Read the latest AI answer run (`ai-answers-data` branch, `runs/<date>.json`):
  every `saidAboutUs` sentence that is wrong means the page that owns the fact
  does not state it plainly, so fix that page; every `foundNotCited` question is
  a page search found and the answer passed over, so put the asked-for fact in
  its first answer block. `topHosts` is the outreach list.
- Ask an AI search (Perplexity or ChatGPT search, through the browser) the
  page's main question ("how many questions are on the CDL general knowledge
  test"). Note whether Tigertest is cited; if a competitor is cited for a fact
  we have, check our page states that fact plainly in the first answer block.

## Never install outside SEO packs

Third-party SEO skill packs and plugins often bundle remote MCP servers, load
instructions from their own websites and push paid tools. Do not install them
or call their servers. Read the idea, then add it here or to
`scripts/seo-audit.ts` as our own free check (the Nov 23 2026 checks
fewContextLinks, factMismatch, faqBoilerplate and aiCrawlerContent came that way).

## 5. Report

Commit the fixes on a branch, open one PR, and give John: errors found and
fixed, warning groups fixed, judgement findings, and anything left with why.
Compare counts with the last report in the workflow artifacts so drift is seen.
