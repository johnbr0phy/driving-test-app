# HKSI LE Paper 7 Financial Markets

Paper 7, Financial Markets, is part of the HKSI Licensing Examination for Securities and Futures Intermediaries. It is a computer-based exam with 60 multiple-choice questions in 90 minutes. The pass mark is 70%. The exam questions are in English and Traditional Chinese.

Four 50-question single-answer tests in English use a practice target of 35/50. The seven topic counts are a Tigertest allocation for the March 2026 syllabus. The full-length timed sitting and Chinese questions are outside this bank. HKSI study guide 3.6 applies at build time, and guide 3.7 takes effect on 9 December 2026.

| Category | Per test | Bank |
| --- | ---: | ---: |
| Global Financial System | 6 | 24 |
| Hong Kong Financial System | 7 | 28 |
| Equity Market | 8 | 32 |
| Debt Market | 8 | 32 |
| Foreign Exchange and Derivatives | 8 | 32 |
| Financial Risk Management | 7 | 28 |
| Financial Sector Applications | 6 | 24 |

The app slug is `/hksi-paper-7` and the landing is `/hksi-paper-7-practice-test`. The bank is `data/hklesfi7-questions.json`, state code `HKLESFI7`, question prefix `HKLESFI7-`. Tests use IDs 54201 to 54204 and the topic sets use IDs 54201 to 54205. The catalogue group is Hong Kong insurance and securities exams in the HK region. The theme is HSL 122, 6%, 32% with the `series7` mascot.

Sources and question material live in `tools/practice/hklesfi7/`. Rebuild with `python3 -I tools/practice/build_bank.py hklesfi7`.
