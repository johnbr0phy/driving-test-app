# Tiger artwork

`lib/tigerAssets.ts` is the list of complete, reviewed exam sets. The original
DMV images remain at the root of `public`. Exam images live at
`public/tigers/{examId}/tiger_face_01.png` through `tiger_face_08.png`.

All 30 tests now have all eight expressions, including the original DMV set.
The 29 exam sets are CDL, CDL Endorsements, Motorcycle, Citizenship, Part 107,
Ham Radio, EPA 608, CNA, PTCB, Phlebotomy, EKG, HTL, CST, CRCST, CCMA,
Dental Assistant, EMT, Food Protection Manager, Real Estate, Life & Health
Insurance, Notary, TEAS, AWS Cloud Practitioner, CompTIA A+, Food Handler,
Boating, Hunter Safety, CompTIA Security+ and HESI A2.

These are 512 × 512 transparent PNG production exports of the TigerTest
illustrations. The default mascot reuses expression 03. PNG is also supported
by the score-card renderer. Next Image creates smaller browser derivatives.

| Expression | Results score | Face |
| --- | --- | --- |
| 01 | 100% | Crowned winner |
| 02 | 85–99% | Celebrating |
| 03 | 70–84% | Happy |
| 04 | 55–69% | Confident smile |
| 05 | 40–54% | Tentative smile |
| 06 | 25–39% | Neutral |
| 07 | 10–24% | Frowning |
| 08 | 0–9% | Worried |

Scores select artwork only. Each exam keeps its configured pass mark.
Dashboard progress retains its existing completion thresholds.

To add a set, add all eight reviewed files, then add its registry ID to
`TIGER_EXAM_IDS`. Use the registry ID, for example `cet`, rather than the URL
slug, for example `ekg`. Unknown and unfinished exams retain the original
artwork and navigation icons until their complete set is added.

The helper is used by exam headers, the test catalog, the test picker,
settings, landing-page celebration images, dashboards, training completion,
results, empty drills and shared score cards. The score-card files are
explicitly included in Next's production file trace.

The final 15 sets add 120 PNGs (9.5 MiB). CCMA uses the corrected rounded
head throughout. The role and expression prompts are recorded in
`TIGER_ASSET_PROMPTS.md`. These images were created with the built-in image
generation tool and exported at 512 × 512 while preserving transparency.

## International school, workplace and trade exams

Forty dedicated sets (320 PNGs) replace the borrowed/default artwork for the exams in PRs #568 and #569. See [coverage, previews and expression requirements](tiger-assets-international.md).

## Link-preview cards

`app/og/[examId]/route.tsx` renders 1200 × 630 cards using happy expression 03, never the crowned results expression. `lib/shareCards.ts` resolves home, country, exam, state and DMV-language cards; `lib/shareCardCopy.ts` holds short subject-specific exam copy. The background fades from white to the exam's light theme colour, with no side stripe. The home and country cards use three relevant smiling mascots. State-specific professional exams reuse their family's mascot with their own title and copy.

Metadata calls `shareImageUrl` for a versioned `/og/<id>?v=...` URL. Root, country, test, translated and DMV state-page images use the same renderer. Social images retain the existing `/og` path outside the API crawl restrictions. The production file trace includes the tiger PNGs and local OFL-licensed Inter fonts. Explicit score-sharing images remain unchanged.

## Car-driving mascot

The `driving` set contains all eight reviewed 512 × 512 transparent expressions using the corrected **round-wheel-v2** artwork. The original rejected flat-bottom steering-wheel exports are not included. `dmv`, UK car/ADI, Canadian provincial car tests, Australian learner tests and India RTO resolve directly to this set. Motorcycle and commercial-driving sets retain their own art.

`getSiteTigerAsset` preserves the original root mascot for the site brand and generic custom quizzes. Root PNGs, favicons, global header/premium logo, emails and the small share-card brand mark are unchanged. The DMV dashboard, landing celebration and training nudge use the test resolver; results, training celebrations, shared score cards and test icons pick up the set through their existing resolver calls. Link-preview URLs are versioned to refresh the new driving mascot, including the homepage collage.
