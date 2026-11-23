# Sources for sgm9 (Singapore CMFAS M9, Life Insurance and Investment-Linked Policies), checked 2026-11-23

Every question in `data/sg-cmfas-m9-questions.json` is original, written from the rules and
guides below. No SCI study text item, past paper, sample question or prep provider's question was
read or used. SCI does not publish a question catalogue for M9, so there was no official item list
to run a similarity check against; the bank was compared item by item with the other insurance
banks on the site instead (see the end of this file).

## Exam owner and outline
- Singapore College of Insurance (SCI), M9 exam details,
  https://www.scicollege.org.sg/Exam/ExamDetails/M9 (fetched 2026-11-23). Title "M9 - Life
  Insurance And Investment-Linked Policies". The page lists the 17 chapters the bank follows:
  1 Risk and Life Insurance, 2 Setting Life Insurance Premium, 3 Classification of Life Insurance
  Products, 4 Traditional Life Insurance Products, 5 Riders (or Supplementary Benefits),
  6 Participating Life Insurance Policies, 7 ILPs: Types, Features, Benefits and Risks,
  8 Investment-linked Sub-Funds, 9 ILPs: Computational Aspects, 10 Annuities and Other Life
  Insurance Products, 11 Application and Underwriting, 12 Policy Services, 13 Life Insurance Claims,
  14 The Insurance Contract, 15 Law of Agency, 16 Income Tax and Life Insurance, 17 Insurance
  Nomination, Wills and Trusts. Format on the same page: 100 multiple-choice questions, 2 hours,
  passing grade 70%, one mark per correct answer, no mark taken off for wrong or blank answers,
  English, closed-book Computer Screen Examination (CSE); study text as an eBook only.
  M9 has not been renamed or replaced (unlike Module 5, which became RES5 in April 2024).
- SCI notice "Release of new versions of study texts for regulatory examinations",
  https://www.scicollege.org.sg/docs/IMP_REGULATORY.pdf (fetched 2026-11-23): M9 study text 7th
  Edition (Version 1.2), released 20 July 2026, effective for exams from 22 September 2026.
- MAS Notice FAA-N26, Competency Requirements for Representatives of Financial Advisers,
  https://www.mas.gov.sg/regulation/notices/notice-faa-n26 and PDF
  https://www.mas.gov.sg/-/media/mas-media-library/regulation/notices/cmg/notice-faa-n26/faa-n26-notice-on-competency-requirements-for-representatives-of-financial-advisers-1.pdf
  (fetched 2026-11-23). Table 1 lists RES5 with M9 and M9A for advising on and arranging life
  policies; Table 2 lets CM-LIP (M9 + M9A) replace the two single modules, and CM-LIC (M8 + M8A +
  M9 + M9A) cover CIS units as well; para 4.10 deems an old Module 9 pass a pass in M9; Annex B
  names M9 "Life Insurance and Investment-linked Policies", administered by SCI; Annex E lists
  qualifications that exempt a person from M9 (for example a degree in actuarial science or
  insurance). Used for the landing and examFacts only.
- Model choice: the real 100 questions in 2 hours are modelled as four 50-question tests (60
  minutes each, the real pace). SCI publishes no chapter weights, so the per-test split by chapter
  is Tigertest's: risk and premium 4, classification and traditional products 6, riders 4, par
  policies 5, ILPs and sub-funds 7, ILP computations 5, annuities 4, underwriting, policy services
  and claims 6, contract and agency law 4, income tax and nomination 5. Pass line 70%, as SCI states.

## Content sources (Singapore rules and industry standards as of November 2026)
- Life Insurance Association Singapore (LIA), Code of Life Insurance Practice (December 2021,
  v2.0), copy hosted by an LIA member insurer:
  https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/general/lia-code-of-life-insurance-practice.pdf
  (fetched 2026-11-23). Used: 30 days to decide an application, policy document within 30 days,
  free-look of at least 14 days from receipt (seven days after posting), refund less medical
  costs, ILP refund at market value, contestable period usually one or two years except fraud,
  understated and overstated age, suicide clause, 30-day notice for guaranteed yearly renewable
  policies, grace period of at least 30 days, ILP statements (monthly for single premium, yearly
  for regular premium) and fund updates at least twice a year, policy loan notices (rate at loan,
  30 days' notice of change, yearly statement, cessation notice within 14 days), automatic premium
  loan, extended term and paid-up options, reinstatement usually within two years, assignment by
  written notice and the policies that cannot be assigned (CPFIS, HPS, SRS, s.73 CLPA, trust
  nomination), claim notice within 30 days, acknowledgement within 7 days, decision within 21 days,
  payment within 14 days, interest on death claims paid over two months after notice at LIA's
  quarterly rate, non-disclosure test (material, asked, known, reasonably expected), CPF/SRS living
  claims credited back to the account, proper claimant payment up to S$150,000.
- LIA and MoneySense, Your Guide to Life Insurance (May 2020), LIA member copy:
  https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/guides/your-guide-to-life-insurance.pdf
  (fetched 2026-11-23). Used: whole life, term, endowment, health cover types, life annuity,
  universal life (declared crediting rate, minimum guarantee, protection- and savings-oriented
  plans, flexible premiums), Direct Purchase Insurance (no advice, no commission, "DIRECT" prefix,
  term and whole life with TPD and optional CI rider), compareFIRST, duty to disclose, riders,
  interim accidental death cover, free-look, grace period, reinstatement, assignment, policy loans,
  automatic premium loan, par and non-par, cash value after about three years, paid-up value.
- LIA, Your Guide to Participating Policies (May 2020), LIA member copy:
  https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/guides/your-guide-to-participating-policies.pdf
  (fetched 2026-11-23). Used: par fund, factors behind bonuses, reversionary and terminal bonuses,
  cash dividends, appointed actuary and board, smoothing, shareholder share capped at 1/9 of
  bonuses allocated, shortfall met by shareholders, board-approved internal policy, Policy Owners'
  Protection Fund, par versus ILP, two projected investment rates of return in the illustration
  (not limits), yearly update.
- LIA, Your Guide to Investment-Linked Insurance Policies (March 2026, v2.0), LIA member copy:
  https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/guides/your-guide-to-investment-linked-insurance-plans.pdf
  (fetched 2026-11-23). Used: single and regular premium ILPs, top-ups, recurring single premium
  options, premium holidays, switching and fees, risks (returns not guaranteed, coverage charges
  rise with age and may rise for a class of policies, units may not cover charges), CPFIS single
  premium only since January 2001 and the CPF Self-Awareness Questionnaire, single pricing at NAV
  from 8 October 2021, bid-offer spread, front-end premium charge and back-end surrender charge
  examples, forward pricing, sub-fund types with risk categories and minimum time horizons,
  free-look refund adjusted for market value, no participating bonuses on ILPs.
- MAS Notice 307, Investment-Linked Policies (last revised 28 June 2021),
  https://www.mas.gov.sg/regulation/notices/notice-307 and PDF
  https://www.mas.gov.sg/-/media/mas-media-library/regulation/notices/id/notice-307/mas-307_clean_28-jun-2021.pdf
  (fetched 2026-11-23). Used: para 12 (units issued and redeemed at NAV divided by units
  outstanding), 14 (capital guaranteed sub-fund redeemed at the higher of the guaranteed amount or
  NAV per unit), 35 and 35A (monthly statements, annual for specified ILPs including single
  premium ILPs with death and CI benefits of 150% or more of the premium), 36 (semi-annual report
  within 2 months, audit report within 3 months), 51 (CIS Code investment guidelines and borrowing
  limits apply), 53 (redemption proceeds T+4 for bond and money market sub-funds, T+6 others, T+7
  feeder sub-funds), 66 to 68 (suspension only in exceptional circumstances, ending within 21 days
  unless extended), 75 (valued every business day, at least monthly where dealing is less frequent),
  77 (rounding differences credited to the sub-fund), 79 (compensation for errors of 0.5% or more
  of NAV per unit).
- LIA, Your Guide to Nomination of Insurance Nominees (March 2026, v1.0),
  https://www.lia.org.sg/media/4815/ygtnin-english-2026.pdf (fetched 2026-11-23). Used: nomination
  rules from 1 September 2009 and online nomination from 2 January 2024, owner must be the life
  assured and at least 18, trust nomination (spouse and children only, owner loses ownership,
  consent needed for changes, loans, surrender and revocation, creditor protection, all benefits to
  nominees, hard copy with wet-ink signatures only, trustee of 18 or over, predeceased nominee's
  share to their estate), revocable nomination (any individual or entity, death benefit only,
  owner keeps living benefits, survivors take predeceased nominees' shares), two witnesses aged 21
  or over who are not nominees or their spouses, summary table (RSS annuity none; RSPS annuity
  both; CPFIS, DPS and SRS policies revocable only; riders follow the main policy), proper claimant
  up to S$150,000 under section 150 of the Insurance Act and who counts as one, group insurance
  outside the rules, pre-2009 s.73 CLPA nominations, Muslim policy owners may make both types.
- IRAS, Life Insurance Relief,
  https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/life-insurance-relief
  (fetched 2026-11-23; page last updated 10 August 2026). Used: CPF contributions under S$5,000 in
  the year before the year of assessment, relief the lower of S$5,000 less CPF or 7% of the
  insured value (or premiums paid if lower), own or spouse's life only, wives on husbands' policies
  from YA 2026, insurer with an office or branch in Singapore for policies from 10 August 1973,
  excluded policies (accident, health and hospitalisation, disability, riders, critical illness,
  endowment, investment-focused ILPs).

## Written from general principles (no Singapore figure asserted)
- Chapters 1 and 2 concepts (pure and speculative risk, risk transfer and retention, morbidity,
  law of large numbers, pooling, mortality, interest and expenses in pricing, level premium and
  reserves, moral and morale hazard, adverse selection), the arithmetic of which is exact.
- Traditional product definitions not in the LIA guides (limited payment, mortgage reducing,
  increasing and family income term, pure endowment, joint life, key person), rider definitions
  (waiver, payor, accidental death, accelerated and additional CI, hospital income, disability
  income, guaranteed insurability, early CI, spouse rider), compound reversionary bonus arithmetic
  and annuity types (deferred, certain, guaranteed period, joint and survivor, escalating, variable,
  cash refund, participating).
- Contract law (offer and acceptance, consideration, capacity, utmost good faith, insurable
  interest at inception, life policies not indemnity contracts, contra proferentem, material facts,
  voidable for misrepresentation) and the common law of agency (express, implied and apparent
  authority, ratification, duties of agent and principal, imputed knowledge, termination). No
  statute section is cited for these.

## Left out on purpose
- Fees, CPF LIFE and CPF scheme figures (asked in sgm5), Integrated Shield and MediShield Life
  detail (M9A and the health insurance module), FAA-N16 sales process detail (sgm5), will
  formalities under the Wills Act (could not be read: sso.agc.gov.sg refused automated access on
  2026-11-23), Insurance Act section numbers other than section 150, and illustrated par rates of
  return (they change).

## Overlap check against the family, 2026-11-23
- Compared every stem and key with `sg-cmfas-res5`, `malaysia-pce`, `hkiiqe1`, `life-health`,
  `llqp`, `philippines-insurance`, `ieqfa`, `re5` and `gr-insurance-intermediary` (word-set
  similarity of stems, plus same-key checks). 31 items that asked a fact those banks already ask
  with the same answer (joint first death, family income benefit, accidental death rider, hospital
  income, ILP investment risk, why life policies are not indemnity contracts, ratification,
  utmost good faith, renewable term premiums, and others) were rewritten with a different angle,
  scenario or calculation.
