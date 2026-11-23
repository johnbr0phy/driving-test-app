# Sources for `cfp` (CFP Board CFP Certification Examination)

All 200 questions are original, written from CFP Board's Principal Knowledge Topics and from the
federal law, regulations and IRS guidance listed below. No CFP Board sample or practice exam item,
past exam question, review-course item or prep company question was copied or reworded (CFP Board
sells its own practice exam; it was not opened). Every calculation (net worth, ratios, time value
of money, education costs, credits, Sharpe, alpha, CAPM, CV, HPR, geometric mean, constant-growth
value, current yield, tax-equivalent yield, margin call price, two-asset standard deviation,
duration, dollar-cost averaging, exclusion ratio, capital needs, Social Security reductions and
delayed credits, RMD, NUA, installment sale, gift splitting, basis) is computed and asserted at the
top of its source file before the bank is built.

## Exam outline and format (official, CFP Board)
- What you'll be tested on, https://www.cfp.net/get-certified/certification-process/exam-requirement/about-the-cfp-exam/what-youll-be-tested-on,
  fetched 2026-11-23: 170 questions; eight Principal Knowledge Domains with approximate weights,
  A Professional Conduct and Regulation 8%, B General Principles of Financial Planning 15%,
  C Risk Management and Insurance Planning 11%, D Investment Planning 17%, E Tax Planning 14%,
  F Retirement Savings and Income Planning 18%, G Estate Planning 10%, H Psychology of Financial
  Planning 7%. Scaled to 50: 4/8/5/9/7/9/5/3 (Tigertest's rounding).
- Principal Knowledge Topics list, https://cfp.net/principaltopics, fetched 2026-11-23: the 70
  topics A.1 to H.70 from the 2021 practice analysis (tested since March 2022). No newer topic
  list is published; CFP Board's January 2026 competency standards update changes education,
  experience and CE rules on dates from Q2 2026 to Q4 2027, not the exam blueprint
  (https://www.cfp.net/news/2026/01/cfp-board-announces-updates-to-the-competency-standards, checked 2026-11-23).
- Exam format, https://www.cfp.net/get-certified/certification-process/exam-requirement/about-the-cfp-exam/exam-format,
  fetched 2026-11-23: two 3-hour sections of 85 questions each, each in two subsections, an
  optional break after question 43, a 40-minute break between sections; stand-alone questions,
  short scenarios of about 3 questions, and case studies of 8 to 12 questions.
- Scoring and results, https://www.cfp.net/get-certified/certification-process/exam-requirement/about-the-cfp-exam/scoring-and-results,
  fetched 2026-11-23: pass or fail on the total score, one point per question, preliminary result
  at the test centre, official result by email about 4 weeks after the window; failing candidates
  get a diagnostic by topic. No percentage pass mark is published, so 70% is Tigertest's
  readiness line.
- Exam statistics, https://www.cfp.net/certification-process/exam-requirement/about-the-cfp-exam/scoring-and-results/exam-statistics,
  fetched 2026-11-23: July 2026 administration pass rate 66% (2,388 of 3,621).

## Professional conduct (official, CFP Board)
- Code of Ethics and Standards of Conduct, https://www.cfp.net/ethics/code-of-ethics-and-standards-of-conduct,
  fetched 2026-11-23: the six Code of Ethics duties, fiduciary duty (loyalty, care, follow client
  instructions), when the Practice Standards apply and the integration factors, the seven-step
  process, conflict disclosure and consent, fee-only and Sales-Related Compensation, competence,
  written engagement terms, privacy notices at engagement and at least yearly, 30-day reporting.
- Procedural Rules, https://www.cfp.net/ethics/enforcement/procedural-rules, fetched 2026-11-23:
  sanctions (private censure, public censure, suspension, revocation, bars).

## Federal law, regulations and agency guidance
- IRS Publication 970, https://www.irs.gov/publications/p970, fetched 2026-11-23: American
  opportunity credit (100% of first $2,000 plus 25% of next $2,000, 4 years, 40% refundable),
  lifetime learning credit (20% of the first $10,000 per return), Coverdell ($2,000 per
  beneficiary, under 18, paid out by 30, K-12 expenses), 529 beneficiary changes and the
  529-to-Roth rollover (account over 15 years, last 5 years' contributions excluded).
- IRS gift tax FAQ, https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-gift-taxes,
  fetched 2026-11-23: tuition and medical exclusions, annual exclusion $19,000 for 2026 (the only
  indexed figure in the bank, named with its year). Estate tax page,
  https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax, fetched 2026-11-23:
  portability by timely Form 706.
- IRS Publications 17, 525, 523, 526, 541, 542, 544, 550, 551, 559, 575, 590-A, 590-B, 915 and 969
  (https://www.irs.gov/publications/p525, https://www.irs.gov/publications/p550,
  https://www.irs.gov/publications/p590b and the same path for the others), fetched 2026-11-23:
  kiddie tax, disability benefit taxation, home sale exclusion and 2-of-5-year test, charitable
  30% limit for capital gain property, wash sales and holding period, qualified dividend holding
  period, return of capital, EE bond deferral, community property and gift basis, alternate
  valuation, annuity General Rule, NUA, mandatory 20% withholding, one rollover per 12 months,
  SIMPLE 2-year rule, Uniform Lifetime Table (26.5 at 73), up to 85% of benefits taxable,
  HSA rules and the 20% additional tax.
- IRS retirement pages: RMD FAQs https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs
  (age 73, April 1 first deadline, no lifetime Roth RMDs, 25%/10% excise, 10-year rule);
  early distribution exceptions https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-tax-on-early-distributions
  (age-55 separation, QDRO, SIMPLE 25%); catch-up contributions
  https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions
  (higher limit at 60 to 63); all fetched 2026-11-23.
- Internal Revenue Code (Cornell LII), fetched 2026-11-23: section 101 (transfer for value)
  https://www.law.cornell.edu/uscode/text/26/101, 7702A (seven-pay test), 7702B (2 ADLs, 90 days),
  1035, 2035 (three-year rule), 2056 (marital deduction, QDOT), 2518 (9-month disclaimer),
  857 (REIT 90%), 1361 (S corporation eligibility), 675 (substitution power), 1041 (divorce
  transfers), 469 (real estate professionals), 408(p) (SIMPLE: 100 employees, 2% nonelective),
  411 (3-year cliff and 2-to-6 graded vesting), 416 (top-heavy 60%).
- COBRA, 29 U.S.C. 1162, https://www.law.cornell.edu/uscode/text/29/1162, fetched 2026-11-23:
  18 months after termination or reduced hours.
- Social Security regulations (eCFR), fetched 2026-11-23: 20 CFR 404.409 full retirement age 67
  for births from 1/2/1960, https://www.ecfr.gov/current/title-20/part-404/section-404.409;
  404.410 reduction of 5/9 of 1% a month for 36 months and 5/12 beyond; 404.313 delayed credits
  of 2/3 of 1% a month for births after 1943; 404.430 earnings test, $1 for $2 and $1 for $3;
  404.335 widow's benefits continue after remarriage at 60 or later. ssa.gov returned 403 to
  automated fetches, so the regulations were used instead.
- Medicare, https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start,
  fetched 2026-11-23: the 7-month initial enrollment period.
- Federal Reserve, https://www.federalreserve.gov/monetarypolicy/openmarket.htm and
  https://www.federalreserve.gov/faqs/what-economic-goals-does-federal-reserve-seek-to-achieve-through-monetary-policy.htm,
  fetched 2026-11-23: open market operations and the dual mandate.
- FINRA bonds page, https://www.finra.org/investors/investing/investment-products/bonds, fetched
  2026-11-23: duration as price sensitivity to a 1% rate change; investor.gov asset allocation,
  https://www.investor.gov/introduction-investing/getting-started/asset-allocation, fetched
  2026-11-23: rebalancing.
- Investment and behavioral finance concepts (Sharpe, Jensen's alpha, CAPM, constant-growth
  model, efficient market forms, prospect theory, anchoring, framing, mental accounting) are
  standard formulas and terms named in CFP Board's topics D.30, D.32, D.33, H.65 and H.66; each
  computed key is recomputed in the source file.

## Not loaded or left out
- ssa.gov, sec.gov and dol.gov blocked automated fetches; the eCFR and the U.S. Code were used.
- Not modelled: short-scenario item sets and case studies (written as self-contained single
  questions; the landing says so), the two-section timing, and the scaled pass decision.
- Left out on purpose: exam fees, yearly indexed limits other than the named 2026 gift exclusion
  (contribution limits, brackets, standard deduction, the 2026 estate exclusion, phaseouts), the
  529 K-12 limit (changed for 2026), the ABLE age (changed for 2026), state law, office-holders.
- Repeats: checked against the series-7, series-63, series-65, series-66, sie, series-6 (open PR),
  cfa-level-1, enrolled-agent parts 1 to 3, cpa-reg, cpa-tcp, cpa-far, cpa-bar, life-health,
  llqp, cemap, nmls and real-estate banks for shared fact-and-answer pairs and shared numbers;
  about 40 items were rewritten.
