# CII R01 Financial Services, Regulation and Ethics

The Chartered Insurance Institute R01 unit is part of the Diploma in Regulated Financial Planning. The June 2026 syllabus applies from 1 September 2026 to 31 August 2027. The CII allows two hours for 87 standard questions and 13 multiple-response questions and lists a standard pass mark of 65%.

The UK v1 practice exam at `/cii-r01` has four 50-question single-answer tests. It rounds the published learning outcome weights to whole questions and combines the two ethics outcomes. It does not model the multiple-response format or two-hour exam sitting. The practice pass threshold is 33/50.

| Category | Per test | Bank |
| --- | ---: | ---: |
| Financial Markets | 3 | 12 |
| Retail Financial Needs | 6 | 24 |
| Law and Financial Advice | 4 | 16 |
| Regulatory Framework | 3 | 12 |
| Regulatory Supervision | 15 | 60 |
| Applying Regulatory Rules | 5 | 20 |
| Regulated Advice | 6 | 24 |
| Adviser Skills | 2 | 8 |
| Principles and Culture | 3 | 12 |
| Professional Ethics | 3 | 12 |

The landing is `/cii-r01-practice-test`. The bank is `data/ukr01-questions.json`, state code `UKR01`, question prefix `UKR01-`. Tests use IDs 54001 to 54004 and the five topic sets use IDs 54001 to 54005. The catalogue group is Accounting, CPA and finance exams in the UK region. The theme is HSL 60, 4%, 38% with the mortgage adviser mascot borrowed from `nmls`.

Sources and question material live in `tools/practice/ukr01/`. Rebuild with `python3 -I tools/practice/build_bank.py ukr01`.
