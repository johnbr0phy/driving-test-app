# CII IF1 Insurance, Legal and Regulatory

Insurance, Legal and Regulatory (IF1) is a Chartered Insurance Institute unit covering the principles of insurance and the legal and regulatory framework for insurance business. The real exam has 100 multiple-choice questions in two hours. The CII lists a standard pass mark of 70%. The October 2025 syllabus is in force through 31 December 2026.

The four v1 tests each contain 50 single-answer questions. The practice pass threshold is 35/50. The two outcomes on risk are grouped and the syllabus weights are rounded for shorter tests. The full two-hour sitting is not modelled.

| Category | Per test | Bank |
| --- | ---: | ---: |
| Risk and Risk Management | 5 | 20 |
| Features of Insurance | 4 | 16 |
| Insurance Market | 7 | 28 |
| Contract and Agency | 5 | 20 |
| Insurable Interest | 3 | 12 |
| Good Faith and Disclosure | 5 | 20 |
| Proximate Cause | 1 | 4 |
| Indemnity | 3 | 12 |
| Contribution and Subrogation | 2 | 8 |
| Regulation of Insurance Business | 8 | 32 |
| Consumer Protection | 3 | 12 |
| Handling Complaints | 2 | 8 |
| Professional Ethics | 2 | 8 |

The app slug is `/cii-if1` and the landing is `/cii-if1-practice-test`. The bank is `data/ukif1-questions.json`, state code `UKIF1`, question prefix `UKIF1-`. Tests use IDs 54101 to 54104 and the topic sets use IDs 54101 to 54105. The catalogue group is Real estate, insurance, securities & notary licenses in the UK region. The theme is HSL 354, 10%, 34% with the `insurance` mascot.

Sources and question material live in `tools/practice/ukif1/`. Rebuild with `python3 -I tools/practice/build_bank.py ukif1`.
