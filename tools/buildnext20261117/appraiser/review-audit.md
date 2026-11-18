# Independent Licensed Residential Appraiser review

Reviewed all 200 stems and all 800 answer options. Options-only guesses were saved before reading stems; independent answers were saved before reading keys/id mapping. All indices below are zero-based. No app code was edited or heavy build run.

## Results

Full-content independent agreement: 200/200 (100%). Options-only forced guesses: 50/200 (25%). No category exceeds the 40% cue gate. Fifty distinct answer sets each recur four times; choosing the same option text for each set yields exactly one correct answer per set. This is a legitimate blind result, not evidence that coverage or difficulty is calibrated. Many questions are straightforward terminology/one-step applications. No arithmetic key errors found; 55 explicit numeric/date/statistical derivations are saved in answers.json. All stems were considered for alternative answers and national-standard accuracy.

## Required precision corrections

1. **APPRAISER-USPAP-020 (P2)**: “testifies in a proceeding” does not establish that the proceeding is judicial or that the testimony concerns the assignment. USPAP's two-year extension specifically requires both. As written, January 10, 2031 is defensible if it was not a qualifying judicial proceeding, while the intended answer is January 10, 2034. Replace with “The appraiser provides testimony related to this assignment in a judicial proceeding with final disposition January 10, 2032.” Retain the 2034 key.
2. **APPRAISER-USPAP-019 (P3)**: add the same judicial/assignment-related qualification to “A proceeding in which the appraiser testified”. Its 2033 answer does not change because the five-year period dominates, but the wording should not teach that all proceedings trigger the rule. Use “A judicial proceeding in which the appraiser provided testimony related to this assignment reaches final disposition January 10, 2029.”

No other required key changes or defensible second answers identified. The report/assignment date item MARKET-024 explicitly says signed and transmitted on March 18; its report-completion choice is acceptable in that scenario. USPAP-031's generic option about effects is acceptable if its explanation accurately says use might have affected results (the rule does not require quantifying an effect).

## Blueprint, sources, and public claims

Read the complete six-page April 1, 2026 AQB outline hosted by approved administrator Pearson: https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/229905.pdf . Licensed column weights checked: Market22, Property11, Site5, Sales28, Cost10, Income5, Reconciliation2, USPAP24, Statistics3, Emerging0 out of110. The code's10/5/2/13/5/2/1/11/1 per50 is a reasonable disclosed whole-question approximation.

Current owner https://appraisalfoundation.org/pages/uspap confirms USPAP2024 is current; the2026 guidance manual and AO41 are separate guidance. Checked the public complete USPAP2024 appendix at https://nebraskalegislature.gov/FloorDocs/109/PDF/Agencies/Legislative_Council/707_20260106-132413.pdf (local /tmp/appraiser-uspap.txt), especially Ethics, Record Keeping, Competency, Standards1/2. Record Keeping requires five years after preparation or two after final disposition of a judicial proceeding with assignment-related testimony, whichever ends later. Confirmed restricted-report additional users by name; client anonymity/workfile handling; assignment-specific signature permission; confidentiality recipients/redaction; procurement fee fact disclosure; competency stages; three-year transfers and prior services; extraordinary/hypothetical conditions; standard1–4 distinctions. Protected-trait-proxy scenario appropriately calls for investigation rather than approving race-based valuation.

Owner format https://appraisalfoundation.org/pages/national-uniform-licensing-and-certification-examination confirms125 total/110scored/15unscored and four hours. PSI primary bulletin https://test-takers.psiexams.com/api/content/bulletin/651 confirms passing scaled75, explicitly not a percent. Reviewed app/licensed-residential-appraiser-practice-test/page.tsx and lib/exams.ts appraiser block: these correctly disclose the real format, distinguish four50-question practice tests, mark70% as a study target, and exclude Certified/state-law/qualifying-education/full-guidance claims. Introductory difficulty is explicitly disclosed. Current bank is not comprehensive across all outline subtopics: advanced mortgage amortization, band-of-investment derivation, ownership types, and detailed fair-housing law are examples for future expansion, not represented as validated mastery coverage.

## Category gates

| Category | Full-content agreement | Options-only correct | Cue gate |
|---|---:|---:|---|
| appraiserCost | 20/20 | 5/20 (25%) | PASS |
| appraiserIncome | 8/8 | 2/8 (25%) | PASS |
| appraiserMarket | 40/40 | 10/40 (25%) | PASS |
| appraiserProperty | 20/20 | 5/20 (25%) | PASS |
| appraiserReconciliation | 4/4 | 1/4 (25%) | PASS |
| appraiserSales | 52/52 | 13/52 (25%) | PASS |
| appraiserSite | 8/8 | 2/8 (25%) | PASS |
| appraiserStatistics | 4/4 | 1/4 (25%) | PASS |
| appraiserUspap | 44/44 | 11/44 (25%) | PASS |

## All-200 real-ID ledger

| Real ID | Independent index | Key index | Options-only index | Result / reasoning |
|---|---:|---:|---:|---|
| APPRAISER-COST-001 | 0 | 0 | 1 | MATCH: Stem facts directly identify Reproduction cost |
| APPRAISER-COST-002 | 1 | 1 | 1 | MATCH: Stem facts directly identify Replacement cost |
| APPRAISER-COST-003 | 1 | 1 | 0 | MATCH: Stem facts directly identify Historical cost |
| APPRAISER-COST-004 | 1 | 1 | 2 | MATCH: Stem facts directly identify Depreciated improvement value |
| APPRAISER-COST-005 | 2 | 2 | 3 | MATCH: Stem facts directly identify Physical deterioration |
| APPRAISER-COST-006 | 1 | 1 | 1 | MATCH: Stem facts directly identify Functional obsolescence |
| APPRAISER-COST-007 | 2 | 2 | 3 | MATCH: Stem facts directly identify External obsolescence |
| APPRAISER-COST-008 | 1 | 1 | 2 | MATCH: Stem facts directly identify Entrepreneurial incentive |
| APPRAISER-COST-009 | 1 | 1 | 3 | MATCH: Stem facts directly identify Quantity survey method |
| APPRAISER-COST-010 | 2 | 2 | 0 | MATCH: Stem facts directly identify Unit-in-place method |
| APPRAISER-COST-011 | 0 | 0 | 0 | MATCH: Stem facts directly identify Comparative unit method |
| APPRAISER-COST-012 | 0 | 0 | 3 | MATCH: Stem facts directly identify Trended historical cost method |
| APPRAISER-COST-013 | 1 | 1 | 3 | MATCH: 300000*(1-20/50)=180000 |
| APPRAISER-COST-014 | 0 | 0 | 2 | MATCH: 70000+200000-60000=210000 |
| APPRAISER-COST-015 | 1 | 1 | 1 | MATCH: 1500*160=240000 |
| APPRAISER-COST-016 | 3 | 3 | 0 | MATCH: 225000*240/200=270000 |
| APPRAISER-COST-017 | 3 | 3 | 2 | MATCH: Stem facts directly identify Actual age |
| APPRAISER-COST-018 | 1 | 1 | 1 | MATCH: Stem facts directly identify Effective age |
| APPRAISER-COST-019 | 2 | 2 | 1 | MATCH: Stem facts directly identify Total economic life |
| APPRAISER-COST-020 | 1 | 1 | 3 | MATCH: Stem facts directly identify Remaining economic life |
| APPRAISER-INCOME-001 | 0 | 0 | 1 | MATCH: Stem facts directly identify Potential gross income |
| APPRAISER-INCOME-002 | 1 | 1 | 3 | MATCH: Stem facts directly identify Effective gross income |
| APPRAISER-INCOME-003 | 3 | 3 | 3 | MATCH: Stem facts directly identify Net operating income |
| APPRAISER-INCOME-004 | 3 | 3 | 1 | MATCH: Stem facts directly identify Before-tax equity cash flow |
| APPRAISER-INCOME-005 | 1 | 1 | 3 | MATCH: 20000/.08=250000 |
| APPRAISER-INCOME-006 | 3 | 3 | 3 | MATCH: 2500*120=300000 |
| APPRAISER-INCOME-007 | 3 | 3 | 0 | MATCH: 385000/1.1=350000 |
| APPRAISER-INCOME-008 | 0 | 0 | 3 | MATCH: (42000-18000)/.06=400000 |
| APPRAISER-MARKET-001 | 1 | 1 | 1 | MATCH: Stem facts directly identify Utility |
| APPRAISER-MARKET-002 | 1 | 1 | 3 | MATCH: Stem facts directly identify Scarcity |
| APPRAISER-MARKET-003 | 3 | 3 | 2 | MATCH: Stem facts directly identify Desire |
| APPRAISER-MARKET-004 | 0 | 0 | 2 | MATCH: Stem facts directly identify Effective purchasing power |
| APPRAISER-MARKET-005 | 3 | 3 | 1 | MATCH: Stem facts directly identify Police power |
| APPRAISER-MARKET-006 | 2 | 2 | 2 | MATCH: Stem facts directly identify Eminent domain |
| APPRAISER-MARKET-007 | 3 | 3 | 1 | MATCH: Stem facts directly identify Escheat |
| APPRAISER-MARKET-008 | 2 | 2 | 3 | MATCH: Stem facts directly identify Taxation |
| APPRAISER-MARKET-009 | 2 | 2 | 3 | MATCH: Stem facts directly identify Legally permissible |
| APPRAISER-MARKET-010 | 3 | 3 | 0 | MATCH: Stem facts directly identify Physically possible |
| APPRAISER-MARKET-011 | 3 | 3 | 1 | MATCH: Stem facts directly identify Financially feasible |
| APPRAISER-MARKET-012 | 1 | 1 | 1 | MATCH: Stem facts directly identify Maximally productive |
| APPRAISER-MARKET-013 | 1 | 1 | 1 | MATCH: Stem facts directly identify Substitution |
| APPRAISER-MARKET-014 | 0 | 0 | 1 | MATCH: Stem facts directly identify Contribution |
| APPRAISER-MARKET-015 | 1 | 1 | 2 | MATCH: Stem facts directly identify Anticipation |
| APPRAISER-MARKET-016 | 2 | 2 | 3 | MATCH: Stem facts directly identify Externalities |
| APPRAISER-MARKET-017 | 1 | 1 | 1 | MATCH: Stem facts directly identify Market value |
| APPRAISER-MARKET-018 | 0 | 0 | 1 | MATCH: Stem facts directly identify Investment value |
| APPRAISER-MARKET-019 | 3 | 3 | 0 | MATCH: Stem facts directly identify Value in use |
| APPRAISER-MARKET-020 | 0 | 0 | 2 | MATCH: Stem facts directly identify Insurable value |
| APPRAISER-MARKET-021 | 0 | 0 | 2 | MATCH: Stem facts directly identify A retrospective effective date |
| APPRAISER-MARKET-022 | 3 | 3 | 3 | MATCH: Stem facts directly identify A current effective date |
| APPRAISER-MARKET-023 | 1 | 1 | 2 | MATCH: Stem facts directly identify A prospective effective date |
| APPRAISER-MARKET-024 | 3 | 3 | 2 | MATCH: Stem facts directly identify The report completion date |
| APPRAISER-MARKET-025 | 1 | 1 | 0 | MATCH: Stem facts directly identify Social forces |
| APPRAISER-MARKET-026 | 0 | 0 | 0 | MATCH: Stem facts directly identify Economic forces |
| APPRAISER-MARKET-027 | 3 | 3 | 2 | MATCH: Stem facts directly identify Governmental forces |
| APPRAISER-MARKET-028 | 1 | 1 | 0 | MATCH: Stem facts directly identify Environmental forces |
| APPRAISER-MARKET-029 | 0 | 0 | 3 | MATCH: 30/6=5 |
| APPRAISER-MARKET-030 | 1 | 1 | 1 | MATCH: 80/(20*.4)=10 |
| APPRAISER-MARKET-031 | 3 | 3 | 0 | MATCH: (108-3*6)/6=15 |
| APPRAISER-MARKET-032 | 1 | 1 | 2 | MATCH: 80/(48/12)=20 |
| APPRAISER-MARKET-033 | 0 | 0 | 2 | MATCH: 200000*.06=12000 |
| APPRAISER-MARKET-034 | 2 | 2 | 2 | MATCH: 28000-10000=18000 |
| APPRAISER-MARKET-035 | 0 | 0 | 1 | MATCH: 120000*.20=24000 |
| APPRAISER-MARKET-036 | 2 | 2 | 3 | MATCH: 132000/1.1-90000=30000 |
| APPRAISER-MARKET-037 | 1 | 1 | 3 | MATCH: Stem facts directly identify Land |
| APPRAISER-MARKET-038 | 0 | 0 | 2 | MATCH: Stem facts directly identify Labor |
| APPRAISER-MARKET-039 | 3 | 3 | 3 | MATCH: Stem facts directly identify Capital |
| APPRAISER-MARKET-040 | 3 | 3 | 0 | MATCH: Stem facts directly identify Entrepreneurship |
| APPRAISER-PROPERTY-001 | 1 | 1 | 1 | MATCH: Stem facts directly identify Fee simple interest |
| APPRAISER-PROPERTY-002 | 2 | 2 | 3 | MATCH: Stem facts directly identify Leased fee interest |
| APPRAISER-PROPERTY-003 | 2 | 2 | 1 | MATCH: Stem facts directly identify Leasehold interest |
| APPRAISER-PROPERTY-004 | 2 | 2 | 1 | MATCH: Stem facts directly identify Life estate interest |
| APPRAISER-PROPERTY-005 | 1 | 1 | 1 | MATCH: Stem facts directly identify Metes-and-bounds description |
| APPRAISER-PROPERTY-006 | 1 | 1 | 2 | MATCH: Stem facts directly identify Recorded lot-and-block description |
| APPRAISER-PROPERTY-007 | 0 | 0 | 1 | MATCH: Stem facts directly identify Rectangular survey description |
| APPRAISER-PROPERTY-008 | 2 | 2 | 1 | MATCH: Stem facts directly identify Street-address identification |
| APPRAISER-PROPERTY-009 | 0 | 0 | 0 | MATCH: Stem facts directly identify Frontage |
| APPRAISER-PROPERTY-010 | 3 | 3 | 1 | MATCH: Stem facts directly identify Depth |
| APPRAISER-PROPERTY-011 | 3 | 3 | 2 | MATCH: Stem facts directly identify Topography |
| APPRAISER-PROPERTY-012 | 0 | 0 | 3 | MATCH: Stem facts directly identify Drainage |
| APPRAISER-PROPERTY-013 | 2 | 2 | 0 | MATCH: Stem facts directly identify Public zoning restriction |
| APPRAISER-PROPERTY-014 | 0 | 0 | 2 | MATCH: Stem facts directly identify Private deed restriction |
| APPRAISER-PROPERTY-015 | 0 | 0 | 0 | MATCH: Stem facts directly identify Access easement |
| APPRAISER-PROPERTY-016 | 2 | 2 | 1 | MATCH: Stem facts directly identify Boundary encroachment |
| APPRAISER-PROPERTY-017 | 3 | 3 | 0 | MATCH: 30*40=1200 |
| APPRAISER-PROPERTY-018 | 1 | 1 | 0 | MATCH: 40*40-10*10=1500 |
| APPRAISER-PROPERTY-019 | 1 | 1 | 1 | MATCH: 60*60/2=1800 |
| APPRAISER-PROPERTY-020 | 1 | 1 | 2 | MATCH: 30*50+20*30=2100 |
| APPRAISER-RECONCILIATION-001 | 1 | 1 | 2 | MATCH: Stem facts directly identify Emphasize the sales comparison indication |
| APPRAISER-RECONCILIATION-002 | 3 | 3 | 1 | MATCH: Stem facts directly identify Emphasize the cost indication |
| APPRAISER-RECONCILIATION-003 | 3 | 3 | 0 | MATCH: Stem facts directly identify Emphasize the income indication |
| APPRAISER-RECONCILIATION-004 | 0 | 0 | 0 | MATCH: Stem facts directly identify Revisit the inconsistent input data |
| APPRAISER-SALES-001 | 2 | 2 | 3 | MATCH: Stem facts directly identify Conditions of sale |
| APPRAISER-SALES-002 | 3 | 3 | 2 | MATCH: Stem facts directly identify Financing terms |
| APPRAISER-SALES-003 | 2 | 2 | 2 | MATCH: Stem facts directly identify Market conditions |
| APPRAISER-SALES-004 | 3 | 3 | 2 | MATCH: Stem facts directly identify Property rights conveyed |
| APPRAISER-SALES-005 | 3 | 3 | 0 | MATCH: Stem facts directly identify Site size |
| APPRAISER-SALES-006 | 1 | 1 | 0 | MATCH: Stem facts directly identify Dwelling condition |
| APPRAISER-SALES-007 | 3 | 3 | 1 | MATCH: Stem facts directly identify Living area |
| APPRAISER-SALES-008 | 0 | 0 | 0 | MATCH: Stem facts directly identify Location |
| APPRAISER-SALES-009 | 3 | 3 | 3 | MATCH: Stem facts directly identify Verify the transaction |
| APPRAISER-SALES-010 | 3 | 3 | 0 | MATCH: Stem facts directly identify Convert financing to cash equivalence |
| APPRAISER-SALES-011 | 2 | 2 | 3 | MATCH: Stem facts directly identify Apply a market-conditions adjustment |
| APPRAISER-SALES-012 | 1 | 1 | 3 | MATCH: Stem facts directly identify Remove personal-property value |
| APPRAISER-SALES-013 | 3 | 3 | 3 | MATCH: Stem facts directly identify Paired-sales analysis |
| APPRAISER-SALES-014 | 3 | 3 | 1 | MATCH: Stem facts directly identify Regression analysis |
| APPRAISER-SALES-015 | 1 | 1 | 0 | MATCH: Stem facts directly identify Cost analysis |
| APPRAISER-SALES-016 | 2 | 2 | 1 | MATCH: Stem facts directly identify Income capitalization |
| APPRAISER-SALES-017 | 1 | 1 | 1 | MATCH: Stem facts directly identify Comparable Alder |
| APPRAISER-SALES-018 | 2 | 2 | 1 | MATCH: Stem facts directly identify Comparable Birch |
| APPRAISER-SALES-019 | 0 | 0 | 3 | MATCH: Stem facts directly identify Comparable Cedar |
| APPRAISER-SALES-020 | 3 | 3 | 2 | MATCH: Stem facts directly identify Comparable Dogwood |
| APPRAISER-SALES-021 | 1 | 1 | 3 | MATCH: 350000+10000=360000 |
| APPRAISER-SALES-022 | 3 | 3 | 0 | MATCH: 385000-25000+10000=370000 |
| APPRAISER-SALES-023 | 2 | 2 | 2 | MATCH: 400000-20000=380000 |
| APPRAISER-SALES-024 | 1 | 1 | 0 | MATCH: 375000*1.04=390000 |
| APPRAISER-SALES-025 | 0 | 0 | 3 | MATCH: 280000/2000=140 |
| APPRAISER-SALES-026 | 2 | 2 | 2 | MATCH: (300000-15000)/1900=150 |
| APPRAISER-SALES-027 | 2 | 2 | 1 | MATCH: 152+8=160 |
| APPRAISER-SALES-028 | 1 | 1 | 2 | MATCH: 255000/1500=170 |
| APPRAISER-SALES-029 | 2 | 2 | 0 | MATCH: 266000-260000=6000 |
| APPRAISER-SALES-030 | 2 | 2 | 0 | MATCH: 284000-270000-5000=9000 |
| APPRAISER-SALES-031 | 3 | 3 | 3 | MATCH: 60*200=12000 |
| APPRAISER-SALES-032 | 3 | 3 | 0 | MATCH: 900/.06=15000 |
| APPRAISER-SALES-033 | 2 | 2 | 3 | MATCH: 5000/250000=.02 |
| APPRAISER-SALES-034 | 2 | 2 | 2 | MATCH: (8000+4000)/300000=.04 |
| APPRAISER-SALES-035 | 0 | 0 | 2 | MATCH: (212000-200000)/200000=.06 |
| APPRAISER-SALES-036 | 2 | 2 | 1 | MATCH: 20000/250000=.08 |
| APPRAISER-SALES-037 | 2 | 2 | 3 | MATCH: Stem facts directly identify An upward adjustment |
| APPRAISER-SALES-038 | 1 | 1 | 2 | MATCH: Stem facts directly identify A downward adjustment |
| APPRAISER-SALES-039 | 3 | 3 | 2 | MATCH: Stem facts directly identify No adjustment for that feature |
| APPRAISER-SALES-040 | 3 | 3 | 3 | MATCH: Stem facts directly identify Additional evidence before adjustment |
| APPRAISER-SALES-041 | 0 | 0 | 1 | MATCH: 100000+205000=305000 |
| APPRAISER-SALES-042 | 2 | 2 | 3 | MATCH: 330000-15000=315000 |
| APPRAISER-SALES-043 | 2 | 2 | 2 | MATCH: 300000+10000+15000=325000 |
| APPRAISER-SALES-044 | 2 | 2 | 3 | MATCH: 345000-10000=335000 |
| APPRAISER-SALES-045 | 3 | 3 | 0 | MATCH: Stem facts directly identify Bracketing the subject |
| APPRAISER-SALES-046 | 2 | 2 | 2 | MATCH: Stem facts directly identify Avoiding double counting |
| APPRAISER-SALES-047 | 1 | 1 | 2 | MATCH: Stem facts directly identify Testing a model outside its data range |
| APPRAISER-SALES-048 | 2 | 2 | 0 | MATCH: Stem facts directly identify Distinguishing correlation from cause |
| APPRAISER-SALES-049 | 2 | 2 | 0 | MATCH: 400000*.8+410000*.2=402000 |
| APPRAISER-SALES-050 | 2 | 2 | 2 | MATCH: 425000-12000+5000-10000=408000 |
| APPRAISER-SALES-051 | 0 | 0 | 1 | MATCH: 400000*1.02+6000=414000 |
| APPRAISER-SALES-052 | 2 | 2 | 1 | MATCH: Stem facts directly identify $420,000 |
| APPRAISER-SITE-001 | 1 | 1 | 0 | MATCH: Stem facts directly identify Allocation method |
| APPRAISER-SITE-002 | 2 | 2 | 2 | MATCH: Stem facts directly identify Extraction method |
| APPRAISER-SITE-003 | 3 | 3 | 2 | MATCH: Stem facts directly identify Land residual method |
| APPRAISER-SITE-004 | 0 | 0 | 2 | MATCH: Stem facts directly identify Subdivision development method |
| APPRAISER-SITE-005 | 2 | 2 | 3 | MATCH: 300000*.20=60000 |
| APPRAISER-SITE-006 | 1 | 1 | 1 | MATCH: 310000-230000=80000 |
| APPRAISER-SITE-007 | 3 | 3 | 1 | MATCH: 6000/.06=100000 |
| APPRAISER-SITE-008 | 2 | 2 | 3 | MATCH: 480000-360000=120000 |
| APPRAISER-STATISTICS-001 | 0 | 0 | 3 | MATCH: (160000+180000+210000+250000)/4=200000 |
| APPRAISER-STATISTICS-002 | 2 | 2 | 2 | MATCH: (200000+240000)/2=220000 |
| APPRAISER-STATISTICS-003 | 0 | 0 | 1 | MATCH: 240000 occurs twice |
| APPRAISER-STATISTICS-004 | 0 | 0 | 3 | MATCH: (180000+340000)/2=260000 |
| APPRAISER-USPAP-001 | 1 | 1 | 1 | MATCH: Stem facts directly identify Client |
| APPRAISER-USPAP-002 | 2 | 2 | 1 | MATCH: Stem facts directly identify Other intended user |
| APPRAISER-USPAP-003 | 2 | 2 | 3 | MATCH: Stem facts directly identify Intended use |
| APPRAISER-USPAP-004 | 3 | 3 | 0 | MATCH: Stem facts directly identify Effective date |
| APPRAISER-USPAP-005 | 3 | 3 | 3 | MATCH: Stem facts directly identify Extraordinary assumption |
| APPRAISER-USPAP-006 | 1 | 1 | 3 | MATCH: Stem facts directly identify Hypothetical condition |
| APPRAISER-USPAP-007 | 3 | 3 | 1 | MATCH: Stem facts directly identify Jurisdictional exception |
| APPRAISER-USPAP-008 | 0 | 0 | 3 | MATCH: Stem facts directly identify Scope of work |
| APPRAISER-USPAP-009 | 2 | 2 | 2 | MATCH: Stem facts directly identify Standard 1 |
| APPRAISER-USPAP-010 | 1 | 1 | 2 | MATCH: Stem facts directly identify Standard 2 |
| APPRAISER-USPAP-011 | 1 | 1 | 2 | MATCH: Stem facts directly identify Standard 3 |
| APPRAISER-USPAP-012 | 0 | 0 | 1 | MATCH: Stem facts directly identify Standard 4 |
| APPRAISER-USPAP-013 | 3 | 3 | 3 | MATCH: Stem facts directly identify Contingent compensation |
| APPRAISER-USPAP-014 | 2 | 2 | 3 | MATCH: Stem facts directly identify Undisclosed prior service |
| APPRAISER-USPAP-015 | 1 | 1 | 3 | MATCH: Stem facts directly identify Unauthorized signature use |
| APPRAISER-USPAP-016 | 2 | 2 | 0 | MATCH: Stem facts directly identify Improper advocacy |
| APPRAISER-USPAP-017 | 1 | 1 | 0 | MATCH: 2026+5=2031 |
| APPRAISER-USPAP-018 | 0 | 0 | 0 | MATCH: max(2026+5,2030+2)=2032 |
| APPRAISER-USPAP-019 | 2 | 2 | 0 | MATCH; clarify judicial proceeding (P3): max(2028+5,2029+2)=2033 |
| APPRAISER-USPAP-020 | 3 | 3 | 1 | MATCH; clarify judicial proceeding (P2): max(2026+5,2032+2)=2034 |
| APPRAISER-USPAP-021 | 0 | 0 | 0 | MATCH: Stem facts directly identify Clarify the intended use and users |
| APPRAISER-USPAP-022 | 3 | 3 | 2 | MATCH: Stem facts directly identify Expand the research and analysis |
| APPRAISER-USPAP-023 | 3 | 3 | 1 | MATCH: Stem facts directly identify Disclose an extraordinary assumption |
| APPRAISER-USPAP-024 | 1 | 1 | 2 | MATCH: Stem facts directly identify Withdraw from the assignment |
| APPRAISER-USPAP-025 | 2 | 2 | 2 | MATCH: Stem facts directly identify Disclose the gap before accepting |
| APPRAISER-USPAP-026 | 0 | 0 | 1 | MATCH: Stem facts directly identify Notify the client when the gap emerges |
| APPRAISER-USPAP-027 | 0 | 0 | 2 | MATCH: Stem facts directly identify Describe the learning steps in the report |
| APPRAISER-USPAP-028 | 2 | 2 | 1 | MATCH: Stem facts directly identify Decline work that cannot be performed competently |
| APPRAISER-USPAP-029 | 3 | 3 | 3 | MATCH: Stem facts directly identify Obtain authorization from the client |
| APPRAISER-USPAP-030 | 3 | 3 | 1 | MATCH: Stem facts directly identify Provide records to the state regulator |
| APPRAISER-USPAP-031 | 1 | 1 | 2 | MATCH: Stem facts directly identify Use fully redacted aggregate information |
| APPRAISER-USPAP-032 | 0 | 0 | 2 | MATCH: Stem facts directly identify Arrange continuing workfile access |
| APPRAISER-USPAP-033 | 1 | 1 | 0 | MATCH: Stem facts directly identify The fact of a referral payment |
| APPRAISER-USPAP-034 | 2 | 2 | 2 | MATCH: Stem facts directly identify Prior services concerning the property |
| APPRAISER-USPAP-035 | 0 | 0 | 3 | MATCH: Stem facts directly identify An interest in the subject property |
| APPRAISER-USPAP-036 | 3 | 3 | 0 | MATCH: Stem facts directly identify Significant appraisal assistance |
| APPRAISER-USPAP-037 | 3 | 3 | 1 | MATCH: Stem facts directly identify Client identity retained in the workfile |
| APPRAISER-USPAP-038 | 1 | 1 | 1 | MATCH: Stem facts directly identify Other intended users identified by name |
| APPRAISER-USPAP-039 | 2 | 2 | 0 | MATCH: Stem facts directly identify Reasons for excluding an approach |
| APPRAISER-USPAP-040 | 3 | 3 | 0 | MATCH: Stem facts directly identify Effects of extraordinary assumptions disclosed |
| APPRAISER-USPAP-041 | 1 | 1 | 3 | MATCH: Stem facts directly identify Analyze the three-year transfer history |
| APPRAISER-USPAP-042 | 0 | 0 | 1 | MATCH: Stem facts directly identify Develop an exposure-time opinion |
| APPRAISER-USPAP-043 | 0 | 0 | 0 | MATCH: Stem facts directly identify Assess a possible protected-trait proxy |
| APPRAISER-USPAP-044 | 0 | 0 | 1 | MATCH: Stem facts directly identify Create the workfile before reporting |
