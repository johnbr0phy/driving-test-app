# Sources for `series24` (FINRA Series 24 General Securities Principal exam)

All 200 questions are original, written from FINRA's published Series 24 content outline and the
public rules, statutes and regulations it lists. The outline's own sample items were not used or
reworded, and no commercial question bank, prep course or app item was used. Checked 2026-11-23.

Written after `sie`, `series7`, `series6`, `series63`, `series65` and `series66`, which test much of
the same law. A stem word-overlap scan (with a bonus when the keys match) was run against those
banks, `data/hk-le-paper-1-questions.json`, `data/cpa-reg-questions.json` and every other bank in
`data/`, and each item that asked a fact a sibling asks the same way was replaced with a
principal-level angle: the Form U5 copy (now the 30-day U5 amendment), branch inspection cycle (now
the inspection report's required testing areas), Rule 3270 notice (now the firm's assessment under
3270.01), Rule 3210 consent and its exclusions (now Rule 2010 and non-securities misconduct), the
trusted contact refusal (now the trusted contact disclosure), the 17a-3 36-month account record
(now the change-of-address notice), the Regulation S-P 30-day notice (now the incident response
program), do-not-call exemptions (now prerecorded calls), static social media posts (now
interactive forums), Form CRS delivery (now the dual registrant page limit), the Reg BI scope and
disclosure items (now the retail customer definition and reasonably available alternatives), Rule
2090 (now reasonable-basis suitability), the SHO locate (now the threshold security close-out) and
the Rule 5310 factors (now prompt execution of marketable orders).

## Exam format (landing, FAQ and examFacts only; never in the bank)
- FINRA, Series 24 exam page:
  https://www.finra.org/registration-exams-ce/qualification-exams/series24 (fetched 2026-11-23).
  150 multiple-choice items, 3 hours 45 minutes, passing score 70, fee $235. Corequisites: SIE plus
  Series 7 (or 57, 79, 82, 86/87; Series 16 for research principal). Function counts F1 9, F2 45,
  F3 32, F4 32, F5 32. Retake waits drop from 30 to 15 days after a first or second failure and
  from 180 to 60 days after a third, effective January 19, 2027 (Regulatory Notice 26-18). The GP
  registration does not cover options or municipal securities.
- FINRA, "General Securities Principal Qualification Examination (Series 24) Content Outline",
  (c)2023, the PDF the exam page links:
  https://www.finra.org/sites/default/files/Series_24_Outline.pdf (fetched 2026-11-23).
  150 scored items plus 10 unscored pretest items (160 in all), 3 hours 45 minutes, no penalty for
  guessing, basic calculator provided, passing score 70% on an equated scale. The tasks 1.1 to 5.3
  and their knowledge lists set the twelve categories. Each practice test here has 50 items, a
  third of the scored length, split 3/15/11/11/10 by function (9/45/32/32/32 scaled to 50).

## Rules and law used (as in force 2026-11-23)
FINRA rulebook pages fetched 2026-11-23:
- Rule 3110 (inspection cycles, inspector independence, annual compliance meeting, Rule 3110(d)
  reports within 10 business days of each quarter and five business days after an investigation,
  Form U4 verification within 30 calendar days, Form U5 review within 60 days, branch office
  exclusions: fewer than 30 business days, 25 transactions):
  https://www.finra.org/rules-guidance/rulebooks/finra-rules/3110
- Rule 3110.19 residential supervisory locations (quarterly list by the 15th, three-year presumed
  inspection cycle): https://www.finra.org/rules-guidance/notices/24-02
- Rule 3120 ($200 million gross revenue content): https://www.finra.org/rules-guidance/rulebooks/finra-rules/3120
- Rule 3130 (CEO certification, CEO-CCO meeting): https://www.finra.org/rules-guidance/rulebooks/finra-rules/3130
- Rule 4530 (30 calendar days, theft and forgery complaints, $15,000 and $25,000, quarterly data by
  the 15th, internal discipline over $2,500): https://www.finra.org/rules-guidance/rulebooks/finra-rules/4530
- Rule 2241 (10-day and 3-day quiet periods, EGC exception, pitches and road shows, pre-publication
  review, 1%, 12 and 3 months, 15 persons, termination of coverage, third-party research, small firm
  exemption): https://www.finra.org/rules-guidance/rulebooks/finra-rules/2241
- Rule 5130: https://www.finra.org/rules-guidance/rulebooks/finra-rules/5130
- Rule 5131: https://www.finra.org/rules-guidance/rulebooks/finra-rules/5131
- Rule 1240 (Regulatory Element by December 31, CE inactive, firm element):
  https://www.finra.org/rules-guidance/rulebooks/finra-rules/1240
- Rule 4370 (BCP elements, two emergency contacts, approval and annual review, disclosure at
  account opening): https://www.finra.org/rules-guidance/rulebooks/finra-rules/4370
- Rule 1210 (two principals, two-year lapse, 120-day designation with 18 months of experience in
  five years): https://www.finra.org/rules-guidance/rulebooks/finra-rules/1210
- Rule 2124 (net transactions, order-by-order written consent for non-institutional customers):
  https://www.finra.org/rules-guidance/rulebooks/finra-rules/2124
- Rule 11810 (buy-in notice by 12 noon two business days before; retransmittal by 12 noon the
  business day before): https://www.finra.org/rules-guidance/rulebooks/finra-rules/11810
- Rule 2232 (mark-up disclosure for corporate and agency debt, execution time to the second):
  https://www.finra.org/rules-guidance/rulebooks/finra-rules/2232
- Regulatory Notice 26-05 (Rule 3220 gift limit $300 from March 30, 2026):
  https://www.finra.org/rules-guidance/notices/26-05
- Regulatory Notice 26-20 (Rule 3290 replaces Rules 3270 and 3280 on October 25, 2027):
  https://www.finra.org/rules-guidance/notices/26-20
- Regulatory Notice 25-17 (TRACE stays at a 15-minute outer limit):
  https://www.finra.org/rules-guidance/notices/25-17

eCFR title 17 through the eCFR versioner API (date 2026-11-01, fetched 2026-11-23):
- 242.100 and 242.101 (Regulation M restricted period: one business day for ADTV $100,000 and
  public float $25 million, five otherwise; actively-traded securities $1 million ADTV and $150
  million float): https://www.ecfr.gov/current/title-17/chapter-II/part-242/section-242.101
- 242.204 (close-out: short sales by the start of trading on the settlement day after the
  settlement date, long sales and market making the third settlement day, deemed-owned securities
  the 35th calendar day): https://www.ecfr.gov/current/title-17/chapter-II/part-242/section-242.204
- 240.17a-11 (same-day deficiency notice; 24-hour notice for aggregate indebtedness over 1,200%
  and net capital under 120% of the minimum):
  https://www.ecfr.gov/current/title-17/chapter-II/part-240/section-240.17a-11
- 240.15c3-1 ($250,000 or 2% of aggregate debit items; $100,000; $50,000; $5,000; two business
  days' notice of withdrawals over 30% of excess net capital in 30 days):
  https://www.ecfr.gov/current/title-17/chapter-II/part-240/section-240.15c3-1
- 240.10b-10 (riskless principal disclosure, payment for order flow, yield and call details):
  https://www.ecfr.gov/current/title-17/chapter-II/part-240/section-240.10b-10
- 240.17a-4 (electronic records, audit-trail alternative):
  https://www.ecfr.gov/current/title-17/chapter-II/part-240/section-240.17a-4

Other rules relied on and known from their text: FINRA By-Laws Articles III, IV and V; FINRA Rules
1017, 2010, 2020, 2040, 2060, 2090, 2111, 2121, 2122, 2150, 2165, 2210, 2231, 2242, 2268, 2320,
2341, 3150, 3160, 3170, 3210, 3220, 3230, 3240, 3241, 3270, 3280, 3310, 4311, 4512, 4560, 5110,
5121, 5122, 5123, 5220, 5270, 5280, 5290, 5310, 5320, 6140, 6282, 6380A, 6600 series, 6730, 6830,
9300 series, 8210, 12800, 13201; SEC Rules 15a-6, 15c2-11 (2021 amendments), 15c3-3, 15c3-5,
15c6-2, 17a-3, 10b-16, 134, 144, 144A, 163B, 433, 506(d), 14e-1, 14e-5, Regulation SHO Rules 200,
201, 203, Regulation NMS Rules 602, 606, 607, 611, Regulation AC, Regulation Best Interest and Form
CRS, Regulation S-P as amended in 2024, Regulation S-ID; Regulation T section 220.8; Schedule 13D
deadline of five business days (2023 amendments, effective February 5, 2024); Form 8-K four
business days; Bank Secrecy Act rules (31 CFR 1010.230, 1010.410, 1010.520, 1023.220, 1023.320);
Securities Act Sections 5 and 11; the LULD plan and market-wide circuit breakers.

## Left out on purpose
- Retail communication projections: FINRA Regulatory Notice 26-24 allows specified projections
  from February 1, 2027. No item asks whether projections are allowed.
- Rule 3290 is asked only as the replacement framework and its effective date; the 3270 and 3280
  items say they apply until October 25, 2027 (freshness entry in `lib/examFreshness.json`).
- The Rule 15c3-3 daily reserve computation threshold (compliance date June 30, 2026) and the
  amended Reg NMS access fee and tick size figures; Rule 3110.18 remote inspections (pilot ends
  June 30, 2027); pattern day trading (replaced June 2026); retake waits and exam fees.
- Options and municipal securities supervision, which the GP registration does not cover.

## Copyright check
FINRA does not publish a Series 24 question catalog; the outline's sample items were read only to
see the item style and none of their facts or wording is reused.
