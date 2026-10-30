# GMAT Focus Edition sources

Checked October 2026. The GMAT Focus Edition has been the only GMAT since the classic exam was retired in early 2024; its format has not changed since launch.

- GMAC, "GMAT Exam Structure" and "GMAT Focus Edition" pages, mba.com (https://www.mba.com/exams/gmat-exam/about/exam-structure): three sections of 45 minutes, Quantitative Reasoning 21 questions, Verbal Reasoning 23, Data Insights 20; 2 hours 15 minutes; one optional 10-minute break; candidate chooses the section order; question review and up to three answer edits per section; on-screen calculator in Data Insights only.
- GMAC, "Understanding your score" (https://www.mba.com/exams/gmat-exam/scores): section scores 60 to 90, total 205 to 805 in 10-point steps, all sections weighted equally, computer adaptive.
- GMAC content descriptions of each section: Quant is problem solving on arithmetic and algebra (no geometry, no data sufficiency); Verbal is reading comprehension and critical reasoning (no sentence correction); Data Insights covers Data Sufficiency (five fixed answer choices), Multi-Source Reasoning, Table Analysis, Graphics Interpretation and Two-Part Analysis.
- Cross-checked against prep-provider summaries (Magoosh "GMAT Focus Edition: The Key Changes (2026)", Manya Group "GMAT Exam Pattern 2026") for counts, times and the three-edit rule.

## What is modelled and what is not

- Two fixed full tests (Test 2 held out of the drills) with the real section lengths and times; the real exam is question adaptive, these are not.
- The runner lets candidates change any answer; the directions remind them the real exam allows three edits per section.
- Section mix per test: Quant 11 arithmetic + 10 algebra; Verbal 13 RC (passages of 4, 3, 3, 3 questions) + 10 CR; DI 7 DS, 3 Table Analysis, 4 Graphics Interpretation, 3 Two-Part Analysis and one 3-question Multi-Source set. GMAC publishes no exact per-type counts; these follow the commonly reported split (RC slightly more than half of Verbal, DS about a third of DI).
- Table Analysis and Two-Part Analysis are `matrix` items; verbal Two-Part items are modelled as classify-each (strengthens / weakens / neither). Graphics Interpretation is `cloze` with the graph given as a table or in words (no images).
- Scores: section 60 to 90 via `curve()` anchors and total via `gmatTotal()` (205 + (sum of sections - 180) x 600/90, rounded to 10). An estimate, not GMAC's conversion.

All 169 questions, passages and data sets are original. Nothing is copied from the GMAT Official Guide, GMAC practice exams or any other bank (including the Tigertest GRE bank built alongside).
