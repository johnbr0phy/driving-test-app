# HSC Mathematics Standard 2: sources (checked 2026-10-30)

- NESA, Mathematics Standard 11-12 Syllabus (2024), overview and implementation:
  https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-standard-11-12-2024/assessment
  Replaces the Mathematics Standard Stage 6 Syllabus (2017). 2025 plan and prepare; Year 11 from 2026;
  Year 12 from Term 4 2026; **first HSC examination for the new syllabus in 2027**. The 2026 HSC examined
  the 2017 syllabus.
- NESA, HSC examination specifications for the 2024 syllabus (same site, Assessment > HSC examinations):
  https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-standard-11-12-2024/assessment/hsc-examinations
  Standard 2: written paper, 100 marks, 2 h 30 min plus 10 min reading time, reference sheet provided,
  NESA-approved calculators. Section I objective-response questions worth 15 marks. Section II 85 marks,
  35 to 40 items, questions may contain parts, at least two items worth 4 or 5 marks. Based on the Year 12
  Standard 2 course and its outcomes; Year 11 is assumed knowledge and may be examined.
  (Standard 1: 80 marks, 2 h, Section I 15 marks, Section II 65 marks, 25 to 30 items; not modelled.)
- NESA syllabus content pages, Year 12 Standard 2 focus areas (navigation of the content tab):
  algebraic relationships, investment and loans, annuities, trigonometry, ratios and rates, network flow,
  critical path analysis, bivariate data analysis, relative frequency and probability, the normal
  distribution. Year 11 focus areas: number, financial mathematics, measurement, plans maps and networks,
  data statistics and probability, mathematics project.
  - Critical path analysis page (…/content/year-12-tba2/fa9c92c4c6): precedence tables (up to 10
    activities), EST and LST, critical path(s), minimum completion time, float, effect of changing a
    duration, spreadsheets.
  - Network flow page (…/content/year-12-tba2/fafe0a915b): flow terminology (source, sink, capacity,
    cut), table to weighted directed diagram, capacity of a cut, maximum-flow minimum-cut theorem,
    effect of changing an edge capacity, whether capacity meets demand.
  - Minimum spanning trees and shortest paths are Year 11 (assumed knowledge) in the 2024 syllabus;
    used in a few items only.
- Topic detail for focus areas whose pages render only Life Skills text to a fetcher (finance,
  trigonometry, rates, bivariate, normal distribution) follows the matching 2017 Year 12 Standard 2
  content (MS-A4, MS-F4, MS-F5, MS-M6, MS-M7, MS-S4, MS-S5), which the 2024 focus area names mirror.
  Not confirmed point by point against the 2024 text: whether the trapezoidal rule and credit cards
  sit in Year 11 or Year 12, and the exact layout of the new reference sheet. The reference sheet in
  `lib/v2/exams/hscmaths.ts` is Tigertest's own summary of the formulas a Standard 2 student is given,
  not a copy of NESA's sheet.

## Modelling choices
- Practice paper: Section I 15 one-mark multiple-choice items (25 min), Section II 25 one-mark short
  answers (60 min, mostly typed numbers), calculator and reference sheet on both. Real Section II items
  are multi-part and worth up to 5 marks; here each part is its own item, marked all or nothing.
- Per paper by drill group: finance 8, measurement 8, probability/normal 7, algebra 6, networks 6,
  bivariate 5 (no official weighting is published; this spreads the ten focus areas evenly).
- Networks are given as tables (activity/precedence tables, edge capacity tables, edge weight tables)
  because the bank has no figures. Every network answer is computed by `netlib.py`; every finance,
  trigonometry and statistics answer is computed in its `q_*.py`.
- Normal distribution percentages use the 68-95-99.7 rule only (no z-tables), as Standard 2 does.
- 200 items: 80 in the two tests, 120 drill-only (20 per drill). All original.
