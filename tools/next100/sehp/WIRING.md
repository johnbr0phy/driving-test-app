# Wiring for `sehp` (Högskoleprovet, the Swedish Scholastic Aptitude Test, written in Swedish, v2)

A v2 exam (sections, a clock, KVA and NOG with fixed locked alternatives, shared texts and tables, a
0 to 2 scale and a composite), and Tigertest's first native-language v2 exam: the bank and all
config and landing copy are Swedish (ELF texts and questions in English, as on the real test).
Builder: tools/gre pattern for the engine, tools/next100/detheorie for the native-language pieces.

Files already written by the builder (unique to this exam):
- `tools/next100/sehp/` : `build.py`, sources `ord.py`, `las.py`, `mek.py`, `elf.py`, `xyz.py`,
  `kva.py`, `nog.py`, `dtk.py`, `sources.md`, `glossary.md`, this file
- `data/v2/sehp/questions.json` (object form, 218 questions, 26 stimuli)
- `lib/v2/exams/sehp.ts` (export `SEHP`), `lib/v2/banks/sehp.ts`
- `app/hogskoleprovet/{layout.tsx,page.tsx,dashboard/page.tsx,stats/page.tsx}` (copied from
  `app/gre/`; no test or practice folders, the shared `app/[slug]` routes serve them)
- `lib/landings/sehp.sv.json` (Swedish landing content in the `TranslatedLandingContent` shape)
- `app/sv/hogskoleprovet-ovningsprov/page.tsx` (the landing; see "Landing" below)

Rebuild: `python3 -I tools/next100/sehp/build.py` (exits 1 on any warning). Validate (from a copy,
since the validator rewrites `lib/v2/bankSizes.ts`):
```
python3 -I tools/validate_v2_bank.py sehp '{"1": {"verbal": {"1": 40}, "kvant": {"1": 40}}, "2": {"verbal": {"1": 40}, "kvant": {"1": 40}}}'
```
Result: `sehp: 218 questions, 26 stimuli, 0 problems`. Do not add `sehp` to `tools/build_v2_bank.py` PLANS.

Shape: a practice test is one verbal and one quantitative provpass in the real order and at the
real pace (verbal ORD 10, LÄS 10, MEK 10, ELF 10 in 55 min; kvant XYZ 12, KVA 10, NOG 6, DTK 12 in
55 min; 5-minute break), half the real 160 scored items. Two tests, Test 2 held out; 8 drills, one
per delprov (pools 20/16/18/16/20/18/12/18 from Test 1 plus 58 drill-only items), so 10 dashboard
steps. No Basics, no Premium, no calculator (none allowed on the real test). Key strictly longest
0/127 shuffled text items (key strictly shortest 24/127, about chance); all-number items (45) are
sorted and locked, key in an end slot 53%; KVA keys A8 B6 C7 D7; NOG keys A4 B3 C4 D4 E3.

## lib/v2/bankSizes.ts
```ts
  sehp: 218,
```

## lib/v2/registry.ts
```ts
import { SEHP } from "./exams/sehp";
// EXAMS_V2: after GMAT (or after PSAT, with the other admission tests)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/sehp";      // classQuestions.ts
import '@/lib/v2/banks/sehp';      // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: the domain labels are Swedish in `SEHP.domainLabels` (keys `sehpOrd`, `sehpLas`,
`sehpMek`, `sehpElf`, `sehpXyz`, `sehpKva`, `sehpNog`, `sehpDtk`).

## Native language on a v2 exam (platform change, decide before wiring)

v2 configs have no `language`, `locale`, `english` or `review` fields yet, and the v2 chrome
(`DashboardV2`, `ExamRunner`, `DrillRunner`, `ResultsV2`, `StatsV2`) is English. With no change
the exam works, with Swedish content and copy inside English buttons and headings. Recommended
(same meaning as on `ExamConfig`):

1. `lib/v2/types.ts`, in `ExamV2Config`:
```ts
  /** The exam's own language when it is not English (base bank and copy). */
  language?: Language;
  locale?: string;
  /** English names for English surfaces (catalog, /tests, llms.txt, admin) when `language` is set. */
  english?: { name: string; shortName: string; fullName: string };
  review?: Partial<Record<Language, "machine" | "model" | "native">>;
```
2. `lib/v2/exams/sehp.ts`, after `icon`:
```ts
  language: "sv",
  locale: "sv-SE",
  english: {
    name: "Swedish Scholastic Aptitude Test (Högskoleprovet)",
    shortName: "Högskoleprovet",
    fullName: "Högskoleprovet, the Swedish Scholastic Aptitude Test (SweSAT), in Swedish",
  },
  review: { sv: "model" },
```
3. `lib/testCatalog.ts` `v2Entry`: use the English names and the base language when set:
```ts
  shortName: exam.english?.shortName ?? exam.shortName,
  name: exam.english?.name ?? exam.name,
  languages: [exam.language ?? "en"],
  ...(exam.language && exam.language !== "en"
    ? { language: exam.language, nativeName: exam.name, nativeShortName: exam.shortName }
    : {}),
```
4. `lib/pageLanguage.ts` / `contexts/LanguageContext.tsx`: run `/hogskoleprovet/*` in `sv` the way a
   native v1 exam's pages run in its language (`getExamV2ByPath(path)?.language`). Until the v2
   components read `i18n` for their chrome, that only sets `html lang` and the footer; the chrome
   strings in `components/v2/*` would need a dictionary (separate task).
5. `lib/v2/scoreEstimate.ts` line 170: the 0 to 2 scale makes composite differences floats, so
   "points to gain" can print as 0.15000000000000002. Round the gain:
```ts
      gain = Math.max(0, Math.round((raised.composite - base.composite) * 1000) / 1000);
```
   and in `components/v2/StatsV2.tsx` the `pts()` label reads "about +0.15 pts"; for a scale whose
   max is under 10 consider formatting with a decimal comma for `sv`.
   Section tables are already rounded to twentieths in the config (`twentieths()`), the composite
   rounds to 0,05, `band` is 0, and goals are 0.8 to 1.8 (displayed as 0.8, 1, 1.2...). Check the
   goal picker and results header render decimals cleanly on a phone.

## app/globals.css

Suggested hue `265 55% 30%` (deep violet). The brief's `265 40% 34%` clashes with `aurcg`
(`269 40% 30%`) and `ssccpo` (`262 40% 38%`): same saturation, lightness within 8. `265 55% 30%` is
15 points of saturation from both and clears every `[data-theme]` in `app/globals.css` (checked
2026-11-06 by script). Siblings in this wave (semoto, sejakt, semedb) were not checked. White text
on the brand is well above 4.5:1. Run `tools/gen_dark_brand_css.py` after.
```css
  /* Högskoleprovet theme: deep violet (v2 exam; matches lib/v2/exams/sehp.ts theme) */
  [data-theme="sehp"] {
    --brand: 265 55% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 265 55% 96%;
    --brand-hover: 265 55% 25%;
    --brand-dark: 265 55% 22%;
    --brand-darker: 265 55% 15%;
    --brand-muted: 265 30% 70%;
    --brand-border: 265 35% 80%;
    --brand-border-light: 265 35% 90%;
    --brand-gradient-to: 48 90% 93%;
  }
```
(The gradient end is a pale Swedish yellow.)

## lib/shareCardCopy.ts and lib/shareImageUrl.ts
```ts
  sehp: { title: "Högskoleprovet övningsprov", description: "Öva ORD, LÄS, MEK, ELF, XYZ, KVA, NOG och DTK med två övningsprov och ett uppskattat resultat från 0,0 till 2,0." },
```
Add `"sehp"` to `SHARE_COPY_IDS` in `lib/shareImageUrl.ts`. The landing calls
`shareImageUrl("sehp")` (English card frame; pass `"sv"` once share cards carry Swedish footers).

## lib/region.ts
Region SE already exists (from setrafik).
```ts
// TEST_REGIONS
  sehp: "SE",
// NON_DRIVING_TESTS
  "sehp",
```
`REGION_HOME.SE` is English and driving-only. When this wave makes `/se` Swedish, its lead can name
högskoleprovet; until then nothing else changes on the region.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  sehp: "Practice for Högskoleprovet, the Swedish university admission test, in Swedish: two practice tests with one verbal and one quantitative pass each (ORD, LÄS, MEK, ELF in English, XYZ, KVA, NOG, DTK), eight drills and an estimated result on the 0.0 to 2.0 scale.",
// EXAM_ORG
  sehp: "UHR (Universitets- och högskolerådet) · Högskoleprovet, verbal and quantitative parts, in Swedish",
// SEARCH_ALIASES (Swedish and English)
  sehp: "högskoleprovet hogskoleprovet högskoleprov hogskoleprov hp swesat swedish scholastic aptitude test swedish sat sweden university admission test övningsprov ovningsprov öva högskoleprovet gamla högskoleprov ord läs las mek elf xyz kva nog dtk ordförståelse meningskomplettering kvantitativa jämförelser normerad poäng uhr studera.nu antagning universitet högskola",
// RELATED_OVERRIDES
  sehp: ["semedb", "setrafik", "sat", "gre"],
```
Hub group: a new Sweden group after "EU driving theory tests" (setrafik, Sweden's driving test,
lives in the EU group), shared with this wave's other Swedish non-driving tests (merge with what
semedb and sejakt propose):
```ts
  { title: "Sweden tests", ids: ["sehp", "semedb", "sejakt"] },
```
If the integrator prefers the international admission group, append `"sehp"` to
"GED, college, military & nursing school entrance" instead; the country group is better for `/se`.

## lib/examFacts.ts (English, for llms.txt and English surfaces)
```ts
  sehp: {
    answer:
      "Högskoleprovet (the Swedish Scholastic Aptitude Test, SweSAT) is Sweden's university admission test, set by the Swedish Council for Higher Education (UHR) and given by the universities each spring and autumn. It has five passes of 40 multiple-choice items, 55 minutes each: two verbal, two quantitative and one unscored try-out pass, so 160 items count. The verbal part has ORD (vocabulary), LÄS (Swedish reading), MEK (sentence completion) and ELF (English reading); the quantitative part has XYZ (problem solving), KVA (quantitative comparisons), NOG (data sufficiency) and DTK (diagrams, tables and maps). There are no penalties for wrong answers. Each part is normed separately to a 0.00 to 2.00 scale, and the result is their mean, given in steps of 0.05. Results are valid for eight years and the best valid result counts. The test is in Swedish, with ELF in English.",
    rows: [
      { label: "Set by", value: "UHR; sittings run by the universities" },
      { label: "Passes", value: "5 x 40 items, 55 minutes each; 4 count" },
      { label: "Scored items", value: "160 (80 verbal, 80 quantitative)" },
      { label: "Verbal pass", value: "ORD 10, LÄS 10, MEK 10, ELF 10" },
      { label: "Quantitative pass", value: "XYZ 12, KVA 10, NOG 6, DTK 12" },
      { label: "Scoring", value: "1 point per correct answer, no penalty" },
      { label: "Result", value: "0.00 to 2.00 in steps of 0.05, mean of the two normed parts" },
      { label: "Valid", value: "8 years; the best result counts" },
      { label: "Tigertest mock tests", value: "2 x 80 items in Swedish, one verbal and one quantitative pass" },
    ],
    basedOn: "studera.nu (UHR): the test's description, how the result is calculated, and the 18 October 2026 test booklets' instructions, checked November 2026",
    source: { name: "studera.nu: Vad är högskoleprovet?", url: "https://www.studera.nu/hogskoleprov/om/intro/" },
    tigertest:
      "Tigertest has 218 original practice items in Swedish (ELF in English), two practice tests and eight drills, one per subtest, all free with no account required. The result shown is an estimate, not a UHR norm table.",
  },
```

## lib/landingContent.ts
Register the Swedish landing so `/se` can quote it once the Swedish homepage lists the test:
```ts
import sehpSv from "@/lib/landings/sehp.sv.json";
  "sehp.sv": sehpSv as TranslatedLandingContent,
```

## Landing
`app/sv/hogskoleprovet-ovningsprov/page.tsx` renders `lib/landings/sehp.sv.json` with the same
sections and classes as `components/exam/TranslatedExamLanding`, written out because that
component resolves exams with `getExamById` (v1 only) and would 404 a v2 exam. It sets canonical,
`sv-SE` hreflang and x-default to itself, `og:locale sv_SE`, `inLanguage sv-SE`, `priceCurrency
SEK`, `ExamLandingHero`/`ExamLandingCTA` with `lang="sv"` and `ExamRelatedTests lang="sv"`. If
`TranslatedExamLanding` learns v2 exams (fall back to `getExamV2(id)` for slug, landingPath and
shortName; `examLandingLocale` and `examLandingAlternates` to the config's `locale`), replace the
page with the three-line wrapper:
```tsx
import type { Metadata } from "next";
import content from "@/lib/landings/sehp.sv.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";
const c = content as TranslatedLandingContent;
export const metadata: Metadata = translatedLandingMetadata("sehp", "sv", c);
export default function Page() { return <TranslatedExamLanding examId="sehp" lang="sv" content={c} related />; }
```
(no `samples`: `ExamSampleQuestions` reads v1 banks).

`app/sv/layout.tsx` does not exist yet (semoto's landing is also under `/sv`): add a copy of
`app/de/layout.tsx` with `lang="sv"` (and the `Content-Language` / `URL_LANG_INIT_SCRIPT` entry for
`/sv` in `lib/urlLanguage.ts` if not already added for semoto). The page also sets `lang="sv"` on
its own wrapper.

## components/exam/ExamClassFaq.tsx and components/TeachNudge.tsx
Högskoleprovet prep is taught in courses (folkhögskolor, komvux, private courses):
```ts
// TEACHES
  sehp: "högskoleprovet",
// TEACHER_LED
  "sehp",
```
(The landing does not render `ExamClassFaq`, whose copy is English.)

## lib/tigerAssets.ts
`BORROWED_SETS`: `sehp: "sat",` (the admission-test tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts, lib/seoDates.ts
The exams sitemap maps over `EXAMS_V2`, so `/sv/hogskoleprovet-ovningsprov` is listed once
registered; check it carries `sv-SE` hreflang. llms.txt reads the catalog and examFacts (English
names). Bump the exams date in `lib/seoDates.ts` with the wave.

## Screenshots
`/landing/sehp-mobile.png` and `/landing/sehp-desktop.png` (+ `-dark`), from the dashboard:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing sehp:hogskoleprovet:v2:ord`

## CLAUDE.md (v2 section, after GMAT)
```md
- **Högskoleprovet** (`sehp`, `/hogskoleprovet`, landing `/sv/hogskoleprovet-ovningsprov` from `lib/landings/sehp.sv.json`, `[data-theme="sehp"]` deep violet, region SE, hub group "Sweden tests"): Sweden's university admission test (SweSAT), set by UHR, Tigertest's first native-language v2 exam: bank, config and landing in Swedish (`review: { sv: "model" }`), ELF texts and questions in English as on the real test. Real test (studera.nu and the 18 October 2026 booklets): five passes of 40 items in 55 minutes, two verbal (ORD 10, LÄS 10, MEK 10, ELF 10), two quantitative (XYZ 12, KVA 10, NOG 6, DTK 12) and one unscored try-out pass; no penalty for wrong answers; each part normed to 0,00 to 2,00 and the result is the mean, given in steps of 0,05; valid eight years. Modelled: two practice tests of one verbal and one quantitative pass each (80 items, 2 x 55 minutes, 5-minute break), half length at the real pace, Test 2 held out, 8 drills one per delprov (`sehpOrd` ... `sehpDtk`), 10 dashboard steps, free, no Basics, no calculator. ORD has five alternatives; KVA's four and NOG's five fixed alternatives are locked in UHR's order; all-number options sorted and locked; DTK diagrams and maps are tables with a sentence saying what the figure shows. Each part is estimated on 0 to 2 with `curve()` anchors over 40 items rounded to twentieths (`twentieths()`), the composite their mean rounded to 0,05: an estimate, not a UHR norm table. Bank `data/v2/sehp/questions.json` (218 original items, 26 stimuli, ids `SEHP-T<n>-V-NN`, `SEHP-T<n>-K-NN`, `SEHP-D-V-NN`, `SEHP-D-K-NN`) built by `python3 -I tools/next100/sehp/build.py` from one Python source per delprov; sources in `tools/next100/sehp/sources.md`, terms in `glossary.md`. Borrows the SAT tiger.
```

## Decisions for the integrator
1. **v2 and native language**: see the section above. Without it the exam ships with English v2
   chrome around Swedish content, and the catalog lists it under its Swedish name.
2. **Length**: half the real scored length (one pass per part) at the real pace; said in
   `scoreNote`, the landing facts and the FAQ.
3. **Scale**: the 0 to 2 curve anchors are Tigertest's estimate (UHR publishes norm tables per
   sitting and says they cannot predict a result). Check decimals render cleanly on the dashboard
   goal picker, results and stats (item 5 above).
4. **Calculator**: not allowed is from a secondary source; the config never offers one either way.
5. **Hue**: `265 55% 30%`, not the brief's `265 40% 34%` (clash with aurcg and ssccpo).
6. **Hub group**: "Sweden tests" shared with semedb and sejakt; settle the title with them.
