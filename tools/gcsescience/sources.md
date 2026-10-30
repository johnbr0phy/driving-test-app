# GCSE Combined Science: sources

All 210 questions and the 7 Basics skills are original. No past paper, specimen,
exam board or commercial item was copied or paraphrased. Sources set the topic
coverage, the split by paper, the maths skills and what is given on the day.

| Source | Used for | Checked |
|---|---|---|
| DfE, GCSE combined science subject content (DFE-00351-2014, updated May 2019), https://www.gov.uk/government/publications/gcse-combined-science and PDF https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/800339/Combined_science_GCSE_updated_May_2019.pdf | Topic coverage for biology, chemistry and physics; maths skills; required practical activities as a theme | 2026-10-30 |
| Ofqual, GCSE subject level conditions and requirements for combined science, https://www.gov.uk/government/publications/gcse-subject-level-conditions-for-2022/gcse-subject-level-conditions-and-requirements-for-combined-science-2022 | Assessment objectives (AO1 40%, AO2 40%, AO3 20%), at least 15% of marks on practical skills | 2026-10-30 |
| DfE / Ofqual consultation outcome, Decisions on changes to the assessment of mathematics, physics and combined science GCSEs in 2025, 2026 and 2027, https://www.gov.uk/government/consultations/proposed-changes-to-the-assessment-of-mathematics-physics-and-combined-science-gcses-in-2025-2026-and-2027/outcome/decisions-on-changes-to-the-assessment-of-mathematics-physics-and-combined-science-gcses-in-2025-2026-and-2027 | Equation sheet given to every physics/combined science candidate for 2025 to 2027 (decision 3 October 2024). A May 2026 Ofqual proposal would extend it from 2028; not yet confirmed when checked. | 2026-10-30 |
| AQA, GCSE Combined Science: Trilogy (8464) scheme of assessment, https://www.aqa.org.uk/subjects/science/gcse/science-8464/specification/scheme-of-assessment, and AQA news on 2026-27 equation sheets, https://www.aqa.org.uk/news/gcse-maths-and-gcse-sciences-formulae-and-equation-sheets-for-2025-2027 | Paper structure on the largest specification (six papers, 1 h 15 min, 70 marks, 16.7% each, Foundation and Higher), the paper 1 / paper 2 topic split used for the six drills, which content is Higher tier only | 2026-10-30 |
| Pearson Edexcel GCSE Physics and Combined Science equation sheet notice, https://qualifications.pearson.com/en/news-policy/subject-updates/Science/gcse_physics_and_combined_science_equation_sheet_support.html | Confirms the equation sheet applies across boards | 2026-10-30 |

## Design decisions
- Foundation tier focus: content shared by both tiers. Higher-only topics left out
  (moles, Le Chatelier, F = BIL, momentum, moments, adrenaline and thyroxine,
  glucagon). Review 2026-10-30: the adrenaline item was replaced with one on how
  hormones travel in the blood; the pituitary as "master gland" is in the shared
  (both tiers) human endocrine system content, so it stays.
- Every numeric stem ends "Type the number only." (added in q.py) because units
  typed after a number are not stripped by the answer parser.
- Every physics calculation states its equation in the stem, and the physics section
  carries the full equation sheet as its `reference`. Chemistry calculations give Ar values.
- Board-neutral wording; no exam board is named in any question.
- Practice tests: 20 items per science (10 per paper-1 and paper-2 domain), 25 minutes
  each, 5-minute breaks. Real papers are much longer; this is sized for one sitting.
- Grades: no percent-to-grade claim, because boundaries change every year.

## Facts I could not confirm from a primary page
- The AQA scheme-of-assessment page itself did not load (404 on the old path);
  paper length and marks were confirmed from two consistent secondary summaries
  (Save My Exams spec page, Cognito AQA guide) and match long-standing AQA figures.
