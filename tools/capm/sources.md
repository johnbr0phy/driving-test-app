# CAPM (`capm`) sources

## Outline followed

**PMI, Certified Associate in Project Management (CAPM) Examination Content Outline** (the 2023 outline,
first used for exams in 2023). Checked 2026-10-30: secondary prep sources updated in 2026 still describe
this outline as current, and PMI's 2026 exam change (July 2026) applied to the PMP only. pmi.org returned
HTTP 403 to automated fetches, so the PDF itself was not re-read today; confirm against
https://www.pmi.org/certifications/certified-associate-capm before publishing copy that depends on a date.

- Certification page: https://www.pmi.org/certifications/certified-associate-capm
- ECO summary cross-checked: https://open-exam-prep.com/study-guides/capm/introduction-and-exam-overview/exam-content-outline-eco (page updated June 2026)

Facts used:

- Domains and weights: Project Management Fundamentals and Core Concepts 36%, Predictive Plan-Based
  Methodologies 17%, Agile Frameworks/Methodologies 20%, Business Analysis Frameworks 27%.
- 19 tasks: Domain 1 has 5 (1.1 life cycles and processes, 1.2 planning, 1.3 roles and responsibilities,
  1.4 following and executing planned strategies or frameworks, 1.5 common problem-solving tools and
  techniques); Domain 2 has 3 (2.1 when to use predictive, 2.2 project management plan schedule, 2.3 project
  controls); Domain 3 has 5 (3.1 when to use adaptive, 3.2 planning iterations, 3.3 adaptive controls, 3.4
  components of an adaptive plan, 3.5 task management); Domain 4 has 6 (4.1 BA roles, 4.2 stakeholder
  communication, 4.3 gathering requirements, 4.4 product roadmaps, 4.5 how methodologies influence BA, 4.6
  validating requirements through product delivery).
- 150 questions (135 scored, 15 unscored pretest) in 3 hours.
- Item types: multiple choice, multiple response, matching, hotspot, limited fill-in-the-blank.
- Pass mark not published; results are pass/fail with domain ratings (Above Target, Target, Below Target,
  Needs Improvement).
- Code of Ethics values: responsibility, respect, fairness, honesty (PMI Code of Ethics and Professional
  Conduct). Scrum facts from the Scrum Guide (November 2020). PMBOK Guide concepts are paraphrased from
  general knowledge; no PMI or PMBOK text or question is reproduced.

## How the bank models it

- 180 original items (CAPM-T1-001.., CAPM-T2-001.., CAPM-D-001..): two 75-item tests in 90 minutes (the
  real pace of 180 minutes per 150; a half-length mock), Test 2 held out, 30 drill-only items.
- Six drill domains: `capmLifecycle` (tasks 1.1-1.2), `capmRoles` (1.3-1.5), `capmPredictive` (2.1-2.3),
  `capmAgile` (3.1-3.5), `capmBaRequirements` (4.1-4.3), `capmBaDelivery` (4.4-4.6). Per test
  14/13/13/15/11/9 = Fundamentals 27 (36%), Predictive 13 (17%), Agile 15 (20%), Business Analysis 20 (27%).
- Formats per test: about 61 single, 5 "Choose two", 3 to 5 matching grids (`matrix`), 4 to 5 typed numeric
  items standing in for fill-in-the-blank (CV, SV, CPI, critical path, float, velocity, channels, payback).
  Hotspots are not modelled.
- Knowledge-based, entry-level items (definitions, short scenarios), deliberately unlike the situational PMP
  bank; no PMP item was reused or adapted.
- Build: `python3 -I tools/capm/build.py` (keys authored first, shuffled by a stem seed; key strictly
  longest in 15% of singles).
