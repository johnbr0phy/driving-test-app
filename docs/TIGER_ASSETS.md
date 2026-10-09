# Tiger artwork

`lib/tigerAssets.ts` is the list of complete, reviewed exam sets. The original
DMV images remain at the root of `public`. Exam images live at
`public/tigers/{examId}/tiger_face_01.png` through `tiger_face_08.png`.

Current exam sets: CDL, CDL Endorsements, Motorcycle, Citizenship, Part 107,
Ham Radio, EPA 608, CNA, PTCB, Phlebotomy, EKG, HTL, CST and CRCST.

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
