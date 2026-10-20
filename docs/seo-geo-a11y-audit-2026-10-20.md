# SEO, GEO and accessibility audit, 20 October 2026

Three parallel static audits (technical SEO, GEO for AI answer engines, WCAG 2.2 AA). Low-risk fixes are on branch `claude/seo-geo-accessibility-audit-vis0jv`; `npm run build` and ESLint pass. Below is what was fixed and what is left, ranked.

## Fixed

**SEO**
- IndexNow submits the sitemap URL list (about 189 URLs, was about 140: vi/ko/zh DMV pages, `/dmv-practice-test`, `/teach` and translated landings were missing).
- `/teach` canonical and og:url are absolute on the sitemap host (relative ones resolved against the www `metadataBase`).
- `robots.ts` disallows `/drill` (DMV miss drill, was indexable with duplicate DMV copy) and `/oauth/`.
- `EXAM_LANDINGS_UPDATED_AT` and `STATE_PAGES_UPDATED_AT` bumped to 2026-10-19.
- `/tests` OG alt reads the catalog size (was "30").

**GEO**
- 41 landings dropped their own unlinked `Organization` node; each `WebApplication` now has `publisher` pointing at `#organization`.
- `ExamFacts` WebPage name no longer doubles ("CNA Practice Test practice test").
- `llms.txt` / `llms-full.txt`: exam count from the catalog, new sections for the 9 translated landings and `/teach`.
- Organization description says "more than 40" exams. `duck.ai` counted as an AI referrer.

**Accessibility**
- Fireworks (incl. Super Amazing Mode) respect `prefers-reduced-motion`.
- Focus hand-off and live feedback in Basics walkthrough, Basics runner and the guest prompt step.
- Class pages: announced errors and "Copied", table `scope`, QR title, named Leave/Change controls, `aria-pressed` sort pills.
- Contrast: QuizRow wrong pick, class "near" score color, TeachLanding step label, TeachNudge close icon, class "0" chip.
- Catalog heading levels, state grid "46Q" named, ProgressCard `aria-expanded` and "(Premium)", Super Amazing switch state matches what is drawn, visible label included in accessible names (state pickers, test switcher, language switcher), admin link label.

## Open, ranked

**High**
1. **Canonical host redirects.** `https://tigertest.io/*` returns a 307 to `www`, but every canonical, hreflang, sitemap `<loc>` and IndexNow host is the apex. Pick one: make the apex primary in Vercel (www 308 to apex), or set `NEXT_PUBLIC_SITE_URL=https://www.tigertest.io`. Either way the redirect must be permanent. Vercel setting, not code.

**Medium**
2. **Titles too long.** 45 indexable titles exceed 65 chars after the " | TigerTest" suffix (worst: `/cdl-endorsement-practice-test` 92, `/alcohol-server-practice-test` 90). Trim the tail clause or use `title.absolute`.
3. **Descriptions too long.** 46 of 47 landing descriptions exceed 160 chars (ACT 401). The same constant feeds the WebApplication JSON-LD, so add a short `metaDescription` per landing.
4. **Translated landings have no crawlable link.** The landing language switcher uses `router.push` (`components/CDLHeader.tsx:51`). Render options as `<a href>`.
5. **FAQ JSON-LD not visible on page.** `/dmv-practice-test` has two comparative FAQ items ("best free DMV practice test website", "better than other sites") only in JSON-LD; `/citizenship-test` has "Do the answers change?" only in JSON-LD. Google requires visible FAQ content. Show them or drop them.
6. **Basics explainer**: unspoken words are gray-300 (1.5:1) and stay unreadable while paused (`BasicsExplainer.tsx:341`); "Jump to" segments are 6px tall, under the 24px target (`:239`).
7. **Focus loss**: BasicsRunner's next question doesn't take focus; `/teach/new` loses focus after picking a test and doesn't announce the search count.
8. **Super Amazing switch off-track** is gray-200 on white (1.2:1). Use gray-400 or add a border.

**Low**
- `/` and `/tests` titles nearly duplicate; give `/tests` a catalog angle.
- `/teach/new` and `/teach/classes/*` inherit the `/teach` canonical while noindex; set `alternates: { canonical: null }`.
- `<html lang="en">` hardcoded on language pages (content is wrapped in a `lang` div, so cosmetic for Google, matters for Bing).
- Translated landings: no `ExamRelatedTests` cross-links and no localized "at a glance" answer block.
- ~15 landings paraphrase FAQ text in JSON-LD instead of sharing one array (no numbers disagree).
- `ExamClassFaq` visible link text vs JSON-LD wording differ.
- DMV FAQ says "20-50 questions"; Pennsylvania has 18.
- California knowledge test marked in-person only; verify against the DMV's online option.
- `/stats` and exam stats "0"/"-" chips gray-300; ProgressCard puts an h3 inside a button; ClassQuestions h2 nested in an h2 on `/teach`; 🎯 emoji in DMV test titles read aloud; `TranslatedExamLanding` decorative tiger has `alt="TigerTest"`; Basics explainer struck words are color/line-through only.
- DMV state OG image is 512x512 under a large card (left alone per the DMV state page rule).

## Follow-up, same day

Fixed from the open list: items 2 to 8 and most Low items. Titles are 65 chars or less and descriptions 160 or less on all 56 indexable non-state pages (a `metaDescription` per landing; JSON-LD keeps the long copy). FAQ JSON-LD matches visible text word for word on every landing (shared `faqs` arrays on 13 pages, DMV comparative claims replaced with repo facts, DMV question range now 18 to 50). The landing language switcher renders real links. `/tests` has its own title, `/teach/new` and `/teach/classes` drop the inherited canonical.

Still open: item 1 (canonical host, Vercel setting), `<html lang>` on language pages, `ExamRelatedTests` and a localized answer block on translated landings (copy is English-only), the California online-test fact, DMV state OG image. The new DMV FAQ items 5 and 6 in `i18n/{es,vi,ko,zh}.ts` are machine translations.

## Checked and fine

Sitemaps (189 URLs, no duplicates, nothing noindex or redirected), self-referencing canonicals, OG images, reciprocal hreflang with `x-default`, one h1 on all 64 landings, noindex on every app route, 404s for unknown slugs, no redirect chains, AI crawler access in `robots.ts`, `visitSource()` AI hosts, `examFacts` coverage and numbers, ExamFacts on every landing, homepage JSON-LD, no entities in JSON-LD, skip link and focus-visible, catalog flags, search labels, `lang` on translated content, overlays, no autoplay audio, image alts.
