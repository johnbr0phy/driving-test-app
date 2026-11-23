# Sources for `series6` (FINRA Series 6 Investment Company and Variable Contracts Products Representative exam)

All 200 questions are original, written from FINRA's published Series 6 content outline and the
public rules, statutes and regulations it lists. No FINRA sample item, commercial question bank,
prep course or app item was used or reworded. Checked 2026-11-22.

Written after `sie`, `series7`, `series63`, `series65` and `series66`, which test much of the same
law and finance. A stem word-overlap scan (with a bonus when the keys match) was run against
`data/sie-questions.json`, `data/series-7-questions.json`, `data/series-63-questions.json`,
`data/series-65-questions.json`, `data/series-66-questions.json`, `data/life-health-questions.json`,
`data/cfa-level-1-questions.json`, `data/cpa-reg-questions.json` and `data/nmls-questions.json`,
and every item that tested the same fact the same way was replaced: Rule 2210 correspondence at
25 recipients (Series 63 has it at 20), nonqualified stock option spread, T-bill discount, TIPS and
CPI, commercial paper's 270 days, bankers' acceptances, money market instruments, CAPM's reward for
systematic risk, soft dollars for research, the 10b-10 capacity disclosure, final and binding
arbitration awards and the 30-day Form U4 amendment. Duration, prepayment risk, Treasury tax
treatment, repos and negotiable CDs were avoided because the SIE and Series 7 banks ask them.
Numeric items use numbers no sibling bank uses (the CAPM item is 2% / 10% / 0.75, not the Series 65
or Series 66 figures; the sales charge item works POP from NAV, not the Series 7 percentage).

## Exam outline and format (landing, FAQ and examFacts only; never in the bank)
- FINRA, Series 6 exam page:
  https://www.finra.org/registration-exams-ce/qualification-exams/series6 (fetched 2026-11-22).
  50 multiple-choice items, 1 hour 30 minutes, passing score 70, SIE corequisite (both needed for
  the registration), fee $100. Function counts F1 12, F2 8, F3 25, F4 5. Retake waits drop from 30
  to 15 days after the first and second failures and from 180 to 60 days after the third,
  effective January 19, 2027 (Regulatory Notice 26-18).
- FINRA, "Investment Company and Variable Contracts Products Representative Qualification
  Examination (Series 6) Content Outline", (c)2020, the PDF the exam page links:
  https://www.finra.org/sites/default/files/Series_6_Content_Outline.pdf (fetched 2026-11-22).
  50 scored items with four choices plus 5 unscored pretest items (55 in all), 1 hour 30 minutes,
  no penalty for guessing, equated scaled scores. F1 Seeks business 24% (12), F2 Opens accounts
  16% (8), F3 Provides information, makes recommendations, transfers assets and maintains records
  50% (25), F4 Obtains and verifies instructions, processes and confirms transactions 10% (5).
  The topic lists and rule lists under each task (1.1 to 4.3) set the categories. Each practice
  test here is the real length and uses the real 12/8/25/5 split.

## Rules and law used (as in force 2026-11-22)
- FINRA Rule 2210: https://www.finra.org/rules-guidance/rulebooks/finra-rules/2210 (fetched
  2026-11-22): correspondence (25 or fewer retail investors in 30 days), retail and institutional
  communications, principal approval and its exceptions (online interactive forums, communications
  another member filed with a favorable letter), new member pre-filing for one year, investment
  company retail communications filed within 10 business days of first use, pre-use filing of
  rankings in categories a fund or affiliate created, fair and balanced treatment.
- FINRA Rule 2211: https://www.finra.org/rules-guidance/rulebooks/finra-rules/2211 (fetched
  2026-11-22): hypothetical illustrations up to a 12% gross rate with a 0% gross rate included; no
  implication that variable products are short-term, liquid investments.
- FINRA Rule 2213: https://www.finra.org/rules-guidance/rulebooks/finra-rules/2213 (fetched
  2026-11-22): bond fund volatility ratings must be current to the latest calendar quarter, from an
  independent third party, with the prescribed disclosure, and not called a risk rating.
- FINRA Rule 3160: https://www.finra.org/rules-guidance/rulebooks/finra-rules/3160 (fetched
  2026-11-22): written disclosures at account opening, also oral when opened on bank premises.
- FINRA Rule 3170: https://www.finra.org/rules-guidance/rulebooks/finra-rules/3170 (fetched
  2026-11-22): taping firms defined by registered persons from disciplined firms.
- FINRA Rule 2341: https://www.finra.org/rules-guidance/rulebooks/finra-rules/2341 (fetched
  2026-11-22): 8.5% maximum sales charge without an asset-based charge (lower without breakpoints
  or rights of accumulation), 0.75% asset-based cap, 0.25% service fee, "no-load" limits, no sales
  charge on reinvested dividends for funds effective from April 2000.
- FINRA Rule 2330: https://www.finra.org/rules-guidance/rulebooks/finra-rules/2330 (fetched
  2026-11-22): deferred variable annuity purchases and exchanges, the 36-month exchange inquiry,
  principal review within seven business days, initial subaccount allocations covered but not
  later reallocations.
- FINRA Rule 2165: https://www.finra.org/rules-guidance/rulebooks/finra-rules/2165 (fetched
  2026-11-22): specified adults, holds expiring in 15 business days, notice to the trusted contact
  within two business days.
- FINRA Rule 4512: https://www.finra.org/rules-guidance/rulebooks/finra-rules/4512 (fetched
  2026-11-22): account record items, persons authorized for entity accounts, trusted contact.
- FINRA Rules 4514 and 4515: https://www.finra.org/rules-guidance/rulebooks/finra-rules/4514
  (fetched 2026-11-22): express written authorization for negotiable instruments drawn on a
  customer account; 4515 changes in account name or designation approved and documented.
- FINRA Rule 4530: https://www.finra.org/rules-guidance/rulebooks/finra-rules/4530 (fetched
  2026-11-22): events within 30 calendar days, written complaints alleging theft or forgery,
  quarterly statistical complaint data by the 15th of the next month.
- FINRA Rule 11870: https://www.finra.org/rules-guidance/rulebooks/finra-rules/11870 (fetched
  2026-11-22): validate within one business day, complete within three business days after
  validation, instructions for nontransferable assets.
- FINRA Rule 2273: https://www.finra.org/rules-guidance/rulebooks/finra-rules/2273 (fetched
  2026-11-22): educational communication with the first written contact, for three months.
- eCFR title 17 via the eCFR versioner API (fetched 2026-11-22):
  https://www.ecfr.gov/current/title-17/chapter-II/part-270/section-270.22c-1 (forward pricing;
  variable annuity first payment priced within two business days of a complete application, return
  of payment after five business days),
  https://www.ecfr.gov/current/title-17/chapter-II/part-240/section-240.15c6-1 (T+1),
  https://www.ecfr.gov/current/title-17/chapter-II/part-270/section-270.12b-1 (annual
  continuation, quarterly reports to the board), 270.19b-1 (one capital gain distribution a year),
  270.35d-1 (80% names rule), 230.506 (35 non-accredited purchasers in 90 days; 506(c)
  verification), 248.5 (annual privacy notice), 240.10b-10.
- Statutes and other rules relied on and known from their text: Securities Act sections 3, 5, 12
  and 17, Rules 134, 135a, 147, 156, 482, 498, 501, 503; Investment Company Act sections 5(b),
  10(a), 13(a), 16(a), 18(f), 22(d), 22(e) and Rules 2a-7 (government fund 99.5%, 60-day WAM,
  397-day maturity, floating NAV for institutional prime funds), 19a-1, 34b-1; Exchange Act
  section 11(d)(1) and Rules 10b-3, 15c2-8 (48 hours), 15c2-12, 17a-3; Regulation T payment
  period; Regulation Best Interest and Form CRS (two pages for a stand-alone firm); FINRA Rules
  2080, 2090, 2111, 2214, 3110, 3260, 4513 (four years), 5310, 5330, 12200, 12206 (six years);
  MSRB Rule G-21; IRC sections 403(b), 529 (SECURE 2.0 15-year Roth rollover condition, five-year
  gift election), 1035; the SECURE Act 10-year rule for most non-spouse IRA beneficiaries.

## Left out on purpose
- Retail communication projections: FINRA Regulatory Notice 26-24 (November 18, 2026) adopts an
  amendment to Rule 2210 allowing specified projections and targeted returns from February 1, 2027
  (https://www.finra.org/rules-guidance/notices/26-24, fetched 2026-11-22). No item asks whether
  projections are allowed.
- The FINRA gift limit (raised to $300 in 2026), dollar thresholds that are indexed (IRA, gift
  and estate amounts, the 529-to-Roth lifetime cap) and Regulation D dollar caps.
- Exam format facts are on the landing and in examFacts only.

## Not confirmed
- Letter of intent escrow, Class B conversion and household breakpoint combining are fund
  prospectus practices, not rule text; items keep to the common practice and say "generally".

## Second review (2026-11-23)
Blind review of all 200 items: every key agreed. Fixes: COM-003 stem now names an established firm
with no rankings (the 10-business-day pre-use rule for new members made it ambiguous); FND-015 and
FND-016 say "typically" and point at each prospectus and FINRA's breakpoint guidance; FND-034 option
wording. A repeat check (stem word overlap plus shared key) against `sie`, `series7`, `series63`,
`series65`, `series66` and `life-health` found six items asking a fact a sibling asks the same way;
they were replaced with new angles: OFF-001 (now Rule 15c2-8 copies to every participating firm),
OFF-013 (now Rule 506(b)(2)(ii) sophistication), OFF-017 (now Rule 147A out-of-state incorporation),
INV-017 (now participating preferred), DIS-004 (wrap fee account for a buy-and-hold customer),
VAR-013 (1035 exchange as a direct insurer-to-insurer transfer). FINRA's Series 6 page re-read
2026-11-23: 50 items, 1 hour 30 minutes, passing score 70, $100, SIE corequisite, retake waits as stated.
