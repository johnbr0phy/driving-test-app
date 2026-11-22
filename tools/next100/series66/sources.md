# Sources for `series66` (NASAA Series 66 Uniform Combined State Law Exam)

All 200 questions are original, written from NASAA's published Series 66 test specifications and
the public statutes, model rules and SEC/FINRA rules it lists as testable. No NASAA item (all are
NASAA copyright), commercial question bank or prep course was used. Checked 2026-11-22.

Written after `series63`, `series65`, `series7` and `sie`, which test much of the same law and
finance. A stem word-overlap scan against `data/series-63-questions.json`,
`data/series-65-questions.json`, `data/series-7-questions.json` and `data/sie-questions.json` was
run and every item testing the same fact the same way was replaced (hedge fund investors,
non-traded REIT liquidity, qualified dividend rates, Roth withdrawals, 529 withdrawals, REIT
payout, inherited basis, capital loss limit, cease and desist hearings, Howey, unlawful
representations, 28(e) research, IAR termination notice for state advisers, IAR registration while
employed, the agent termination notice, municipal-only broker-dealers, the issuer exclusion,
10b-10 timing, selling away, matched orders, Reg BI best interest, a sports agent as adviser).
Numeric items that share a template with Series 65 use different numbers and answers.

## Exam outline and format (landing, FAQ and examFacts only; never in the bank)
- NASAA, Series 66 exam content outline page:
  https://www.nasaa.org/exams/study-guides/series-66-exam-content-outline/ (fetched 2026-11-22).
  100 scored + 10 unscored, 150 minutes, 73 of 100 to pass, closed book, administered by FINRA,
  Series 7 corequisite. NASAA is updating questions affected by the May 2026 model rule
  amendments on adviser advertising (102(a)(4)-1, USA 2002 502(b), 203(a)-2, 411(c)-1), expected
  early 2027. No item here tests adviser advertising or testimonials for that reason.
- NASAA, "Series 66 Test Specifications", effective June 12, 2023:
  https://www.nasaa.org/wp-content/uploads/2023/02/Series-66-Outline-June-2023.pdf (fetched
  2026-11-22). Weights: I Economic Factors and Business Information 8% (8), II Investment Vehicle
  Characteristics 17% (17), III Client/Customer Investment Recommendations and Strategies 30% (30),
  IV Laws, Regulations, and Guidelines Including Prohibition on Unethical Business Practice 45%
  (45). Subtopics used to split the categories. Per 50-question test here: 4 / 8 / 15 / 23.
- NASAA, "Uniform Combined State Law Examination (Series 66) Overview", dated September 1, 2023:
  https://www.nasaa.org/wp-content/uploads/2023/09/NASAA-Series-66-Exam-Study-Guide.pdf (fetched
  2026-11-22). 110 questions, 100 scored, 150 minutes, at least 73 of 100 to pass, tests the
  Uniform Securities Act of 1956 as amended by NASAA (not the 2002 Act); Part 2 lists the
  testable federal and state law sections and model rules used to pick topics.
- FINRA, Series 66 page: https://www.finra.org/registration-exams-ce/qualification-exams/series66
  (fetched 2026-11-22): 100 scored + 10 unscored, 150 minutes, 73 of 100, corequisite Series 7
  (SIE + S7TO), fee $177, retake waits 30/30/180 days, third-failure wait 60 days for windows
  opened from January 4, 2027. Fee and retake recorded in lib/examCosts.json from this page.

## Law and rules used (as in force 2026-11-22)
- Uniform Securities Act of 1956 with NASAA updates and commentary:
  https://www.nasaa.org/wp-content/uploads/2021/10/1956-Uniform-Securities-Act-with-NASAA-Updates-and-Commentary.pdf
  (fetched 2026-11-22). Sections read: 102 (principal trades with written capacity disclosure,
  contract terms, custody notice), 201 (registration; agent and IAR registration effective only
  while associated; who notifies on termination; institutional-only and de minimis advisers;
  expiry December 31), 202 (noon of the 30th day; automatic agent/IAR registration of officers;
  successor registration without fee; bond or deposit of cash or securities), 203 (correcting
  amendments), 204 (grounds incl. felony in 10 years, failure to supervise, fee-only denial, the
  90-day rule for disclosed orders), 306 (stop orders, unreasonable underwriting compensation),
  401 (definitions of agent, broker-dealer incl. out-of-state existing customers, adviser
  exclusions, guaranteed, sale and offer incl. stock dividends and bonus securities), 402
  (exempt securities incl. nonprofits and $50,000 commercial paper; unsolicited orders), 405,
  407, 408, 409 (five-year bracketed limit), 410(f) (three years / two years after discovery).
- SEC rules from the eCFR (title 17, fetched 2026-11-22): 203A-1 ($100M/$110M, $90M buffer),
  203A-2 (15-state and internet adviser exemptions), 203A-3 (IAR definition, more than five
  natural-person clients, impersonal advice), 204-3 (brochure delivery, 120-day summary),
  204A-1 (10-day holdings, 30-day quarterly reports), 205-3, 206(4)-2 (custody, three business
  days, surprise exam), 206(4)-5 ($350/$150 de minimis, two-year time-out), 10b-10 (capacity
  disclosure), 17a-4, Rule 501 (accredited investor), Regulation D 506(b).
- NASAA model rules: minimum financial requirements (202(d)-1, $35,000 custody, $10,000
  discretion): https://www.nasaa.org/wp-content/uploads/2022/11/model-rule-investment-adviser-minimum-financial-requirements.pdf
  (fetched 2026-11-22); IAR continuing education, 12 credits a year, 6 Products and Practice and
  6 Ethics: https://www.nasaa.org/industry-resources/investment-advisers/investment-adviser-representative-continuing-education/iar-ce-faq/
  (fetched 2026-11-22); unethical business practices of advisers (102(a)(4)-1, borrowing,
  confidentiality, unreasonable fees); agency cross transactions (102(f)-1); business continuity
  and succession planning (203(a)-1); IAR exam rule (Series 65, or 66 + 7, or listed designations).
- Investment Advisers Act sections 203(m), 205, 206(3), 208(c), 222; Securities Exchange Act
  section 28(e); Investment Company Act sections 4 and 5; ERISA section 404; Uniform Prudent Investor
  Act; Bank Secrecy Act SAR rule for broker-dealers ($5,000); FINRA Rules 2150, 2210 (social
  media guidance), 4512; Regulation Best Interest and Form CRS.
- Finance, investing and tax items (sections I to III) test commonly taught principles, as the
  NASAA overview says. Tax items avoid indexed dollar limits (contribution limits, estate
  exemption amounts, annual exclusions) and state no RMD age as a key.

## Left out on purpose
- Adviser advertising, testimonials and the related recordkeeping (pending NASAA update, early 2027).
- Indexed dollar figures and anything a state sets differently.
- Exam format facts are on the landing and in examFacts only.

## Not confirmed
- NASAA's model rules on financial reporting (203(c)-1) and business continuity (203(a)-1) were
  not refetched for this build; items on them keep to the rule's main requirement only.
