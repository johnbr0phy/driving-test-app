# HKSI LE Paper 8 Securities

Securities is Paper 8 of the HKSI Licensing Examination for Securities and Futures Intermediaries. The computer-based exam contains 40 multiple-choice questions, allows 60 minutes and has a pass mark of 70%. HKSI provides the questions in English and Traditional Chinese.

The four v1 tests are longer than the real paper. Each has 50 single-answer questions in English and a target of 35/50. The six topic counts are a Tigertest allocation across the March 2026 syllabus. The one-hour sitting and Chinese text are not modelled. HKSI study guide version 3.6 applies at build time and version 3.7 takes effect on 9 December 2026.

| Category | Per test | Bank |
| --- | ---: | ---: |
| Securities Investments | 6 | 24 |
| Primary and Secondary Markets | 8 | 32 |
| Market Participants | 8 | 32 |
| Securities Products | 12 | 48 |
| Trading and Administration | 8 | 32 |
| Securities Analysis | 8 | 32 |

The app slug is `/hksi-paper-8` and the landing is `/hksi-paper-8-practice-test`. The bank is `data/hklesfi8-questions.json`, state code `HKLESFI8`, question prefix `HKLESFI8-`. Tests use IDs 54301 to 54304 and the topic sets use IDs 54301 to 54305. The catalogue group is Hong Kong insurance and securities exams in the HK region. The theme is HSL 218, 10%, 42% with the `series7` mascot.

Sources and question material live in `tools/practice/hklesfi8/`. Rebuild with `python3 -I tools/practice/build_bank.py hklesfi8`.
