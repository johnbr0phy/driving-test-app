# Sources for `series7` (FINRA Series 7 General Securities Representative exam)

All 200 questions are original, written from FINRA's published Series 7 content outline and the
public rules and statutes it covers. No commercial question bank, prep course or FINRA sample
item was copied. Written alongside the SIE bank in this batch (`tools/next30/sie/`); a similarity
scan against `data/sie-questions.json` was run and every item that tested the same fact in the
same way was rewritten as a Series 7 level application (calculations, scenarios), so the two
banks do not share items. Checked 2026-10-30.

## Exam format
- FINRA, "Series 7: General Securities Representative Qualification Examination (GS)":
  https://www.finra.org/registration-exams-ce/qualification-exams/series7 (checked 2026-10-30):
  125 scored items, 3 hours 45 minutes, passing score 72, SIE is a corequisite, firm sponsorship
  required. Content outline "for exams on or after October 1, 2018", the PDF now sitting in a
  2025-10 folder (current revision). Functions: F1 Seeks business 9 (7.2%), F2 Opens accounts 11
  (8.8%), F3 Provides information, makes recommendations, transfers assets, maintains records
  91 (72.8%), F4 Obtains and verifies instructions, processes and confirms transactions 14 (11.2%).
- Unscored pretest items cut from 10 to 5 on 2025-10-27 (FINRA Series 7 page and prep providers),
  so 130 items in all; length unchanged.
- Fee: FINRA lists $395 (deliberately not used in copy).

## Rules and facts used (current as of 2026-10-30)
- T+1 regular-way settlement since 2024-05-28; ex-date equals record date for regular cash dividends.
- Regulation T 50%; FINRA Rule 4210: $2,000 minimum equity, 25% long and 30% short maintenance.
  The pattern day trader rule was replaced by intraday margin standards effective 2026-06-04, so
  no item asks about it.
- FINRA Rule 3220 gift limit rose from $100 to $300 effective 2026-03-30 (MSRB G-20 followed on
  2026-06-01); no item asks for the gift limit.
- Regulation SHO locate and Rule 201 (alternative uptick rule after a 10% decline).
- FINRA Rules 2111 (suitability components), 2165 (temporary holds), 2210 (communications,
  testimonials, public appearances, 25 retail investors in 30 days), 2231, 2330 (deferred variable
  annuity exchanges, 36 months), 2341 (no-load: 12b-1 at most 0.25%), 2360 (ODD at approval,
  options agreement within 15 days), 3210, 3230 (8 a.m. to 9 p.m., do-not-call five years,
  established business relationship 18 months / 3 months), 3240, 3260, 3270, 3280, 4512, 4513,
  4530, 5330 (adjustment of open orders), 5% markup policy.
- Regulation Best Interest and Form CRS (June 30, 2020); Regulation S-P initial privacy notice;
  SEC Rule 10b-10 confirmations.
- Rule 144: six months (reporting issuer), volume greater of 1% or four-week average weekly volume.
- MSRB Rule G-37 (two-year ban); EMMA; syndicate order priority and spread terminology.
- OCC exercise by exception at $0.01 in the money; option exercise settles T+1; contract
  adjustments for even and uneven splits.
- Tax: wash sale 30 days, $3,000 capital loss offset, step-up at death, carryover basis for gifts,
  qualified dividends, REIT 90% payout, IRA 10% penalty and the higher education exception,
  SECURE 2.0 RMD age 73 (born 1951 to 1959) and 75 (born 1960 or later), Roth 5-year rule,
  one 60-day IRA rollover per 12 months, Section 1035, 529 plans.
