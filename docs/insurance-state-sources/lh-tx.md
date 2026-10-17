# Texas General Lines Life, Accident and Health (and HMO) agent exam: sources (all accessed 2026-10-17)

## Official exam facts

| Fact | Value | Source |
|---|---|---|
| Regulator and license | Texas Department of Insurance (TDI), General Lines: Life, Accident, Health and HMO agent license (TIC 4054.051) | TDI license page, updated 7/28/2025: https://tdi.texas.gov/agent/general-life-apply.html |
| Vendor | Pearson VUE, at physical test centers | https://www.pearsonvue.com/us/en/tx/insurance.html |
| Exam name and series | InsTX-LAH05 "General Lines - Life, Accident & Health" (English); InsTX-LAH25 (Spanish) | Texas Insurance Licensing Candidate Handbook #124400 (October 2024, current link on the Pearson page): https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/124400.pdf |
| Time | 150 minutes | Handbook #124400 exam table |
| Scored items | 130 scored: 100 general ("Life and Health - General Knowledge", plus 10 pretest) + 30 Texas state-specific ("Life and Health Agent State Specific", plus 5 pretest); 145 items delivered | Texas Insurance Content Outlines #124401, effective September 1, 2026: https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/124401.pdf |
| Scoring | One combined score for the whole exam (not per part); scaled 0 to 100, pass = 70 | Handbook #124400 "Examination content" and "Score explanation" |
| Retakes | May reschedule after one day; no attempt limit | Handbook #124400 "Retake policy" |
| Exam exemptions | CLU designation; license expired less than one year (TDI page says more than 90 days but less than one year needs a new application, no exam) | TIC 4002.003; TIC 4003.007; TDI page |

Both downloaded PDFs were checked as real text (extracted with pypdf), not a challenge page. Copies: `src/124400.pdf`, `src/124401.pdf` (+ `.txt`).

### General knowledge outline (100 scored)
I Life policy types incl. annuities 15; II Life riders, provisions, options, exclusions 15; III Application, underwriting, delivery, contract law 12; IV Retirement and other concepts (third-party ownership, life settlements, group life, retirement plans, needs, Social Security, taxes) 8; V Health policy types 16; VI Health provisions, clauses, riders, renewability 15; VII Social insurance 6; VIII Other insurance concepts 5; IX Field underwriting 8.

### Texas state outline (30 scored)
I Statutes and rules common to life and health 14 (commissioner, definitions, licensing, marketing practices, agent duties, guaranty association); II Life only 6 (advertising, policy provisions, group life, credit life, replacement, nonforfeiture); III Accident and health only 7 (newborns, dependents, chemical dependency, Medicare supplement, AIDS testing, LTC, small group, ACA); IV HMOs 3.

## Chosen form
130 items = 100 national picks weighted to the general outline + 30 Texas items at the exact state outline weights (14 / 6 / 7 / 3). Pass 70% (the scaled pass mark, used as the percent). Texas licenses this line as one exam, so the combined-form rule does not apply. Pretest items are not modeled.

National picks by outline area (approximate, since national categories do not map one to one): life types 10 + annuity products 5 = 15; life provisions and riders 14 (+ payor and similar in types); application/contract law 9 general + FCRA, GLBA, 1033, twisting, agent authority 5; retirement/other 7 life basics + 2 annuity tax; health types 14; health provisions and renewability 15 + 4; social insurance 6 (Medicare, Medigap, Medicaid, SSDI); other concepts 4 (COB, subrogation, workers' comp); foreign/alien insurer 2 (state outline I.B, kept national).

## Law sources (official current text)
Texas Insurance Code chapters from the Legislature's statute file server behind statutes.capitol.texas.gov, pattern https://tcss.legis.texas.gov/resources/IN/htm/IN.<chapter>.htm (local copies in `src/IN.*.htm`):
- Ch. 31 (31.022 commissioner appointment and term)
- Ch. 83 (83.051, 83.053 emergency cease and desist, hearing request)
- Ch. 463 (463.451 prohibited use of guaranty association; 463.114 summary document)
- Ch. 541 (541.051, 541.052, 541.053, 541.061 misrepresentation, advertising, defamation)
- Ch. 542 (542.055, 542.056 prompt payment of claims)
- Ch. 701 (701.051, 701.052 fraud reporting and immunity)
- Ch. 982 (982.001 alien insurer definition, for the LH-REG-002 override)
- Ch. 1101 (1101.005 grace, 1101.006 incontestability, 1101.009 loans, 1101.011 settlement, 1101.054 backdating)
- Ch. 1114 (1114.053 replacing insurer duties: 5 business days, 30-day return)
- Ch. 1131 (1131.110 group life conversion within 31 days, background)
- Ch. 1153 (1153.155 credit life limited to the debt, background)
- Ch. 1201 (1201.058 10-day return; 1201.209 grace 7/10/31; 1201.210 reinstatement; 1201.211-.217 claim provisions, for national items)
- Ch. 1367 (1367.003 newborns, as amended by S.B. 896, 89th Leg., applicable to plans delivered, issued or renewed on or after January 1, 2026). Bill text: https://capitol.texas.gov/tlodocs/89R/billtext/html/SB00896F.htm
- Ch. 1501 (1501.002 small employer and dependent; 1501.154 75 percent participation)
- Ch. 1651 (1651.054 LTC 30-day return, background)
- Ch. 1702 (1702.102 rebates, 1702.104(5) $25 promotional item exemption; added by H.B. 2221, 89th Leg., effective September 1, 2025)
- Ch. 4001 (4001.104, 4001.151-.157 temporary license, 4001.202-.204 appointments, 4001.252 monthly notices, 4001.255 records)
- Ch. 4002 (4002.003 exam exemptions)
- Ch. 4003 (4003.001 expiration on birthday every two years, 4003.007 late renewal)
- Ch. 4004 (4004.051, 4004.053 CE 24 hours, half classroom)
- Ch. 4005 (4005.053 no commission to unlicensed persons, 4005.101 grounds, 4005.105 five-year bar)

28 Texas Administrative Code, from Cornell LII mirrors of the official TAC (https://www.law.cornell.edu/regulations/texas/28-Tex-Admin-Code-SS-<rule>, local copies `src/TAC.*`). These are a secondary mirror of the Secretary of State text; each page was checked as real rule text with its Texas Register history note, not a challenge page.
- 3.3308 (Medicare supplement 30-day return notice)
- 3.3403 (newborn rule, 31 days; superseded for 2026 plans by TIC 1367.003 as amended)
- 3.3822 (LTC at least guaranteed renewable), 3.3824 (LTC preexisting six months), 3.3832 (LTC outline of coverage before application)
- 4.2311 (annuity 15-day free look if buyer's guide and disclosure not given; adopted eff. 1/24/2024)
- 4.611 (reinstatement within three years, for LH-PROV-005 override)
- 11.506 (HMO evidence of coverage: (b)(3) cancellation notice 15 days for fraud, 30 days nonpayment; (b)(12) grace at least 30 days)
- 19.1003 (CE 24 hours; 10 for certain limited licenses)
- 21.704, 21.705 (HIV testing: two ELISAs confirmed by Western Blot; no sexual orientation underwriting)

HMO PCP assignment: TIC 843.315(d), (e), (h) (in `src/IN.843.htm`).

## Item-to-source map
| Item | Source |
|---|---|
| LHTX-TXREG-001 | TIC 31.022 |
| LHTX-TXREG-002 | TIC 83.051(b), 83.053(b) |
| LHTX-TXLIC-001 | TIC 4001.151, 4001.152, 4001.153, 4001.155 |
| LHTX-TXLIC-002 | TIC 4001.157(b) |
| LHTX-TXLIC-003 | TIC 4001.202(b), 4001.204 |
| LHTX-TXLIC-004 | TIC 4001.252(a) |
| LHTX-TXLIC-005 | TIC 4004.051(c), 4004.053(a); 28 TAC 19.1003(a) |
| LHTX-TXLIC-006 | TIC 4003.001(a), (c) |
| LHTX-TXLIC-007 | TIC 4005.105(b)-(d) |
| LHTX-TXLIC-008 | TIC 4005.053(a), (b) |
| LHTX-TXMKT-001 | TIC 463.451; 463.114(a) |
| LHTX-TXMKT-002 | TIC 1702.102, 1702.104(5); also 4005.053(d) |
| LHTX-TXMKT-003 | TIC 701.051(a), 701.052 |
| LHTX-TXMKT-004 | TIC 542.055(a), 542.056(a) |
| LHTX-TXRPL-001 | TIC 1114.053(c), 1114.054(c) |
| LHTX-TXRPL-002 | TIC 1114.053(e) |
| LHTX-TXLIF-001 | TIC 1101.054(a) |
| LHTX-TXLIF-002 | TIC 1101.009(a), (b) |
| LHTX-TXLIF-003 | TIC 1101.011(a) |
| LHTX-TXANN-001 | 28 TAC 4.2311(a), (c) |
| LHTX-TXUND-001 | 28 TAC 21.705; 21.704(a) |
| LHTX-TXHMO-001 | 28 TAC 11.506(b)(12) |
| LHTX-TXHMO-002 | 28 TAC 11.506(b)(3)(A)(i)-(iii) |
| LHTX-TXHMO-003 | TIC 843.315(d), (e), (h) |
| LHTX-TXAH-001 | TIC 1367.003 as amended by S.B. 896 (2025), sec. 5 applicability; 28 TAC 3.3403(e) for the old 31-day rule |
| LHTX-TXAH-002 | TIC 1201.058 |
| LHTX-TXHPT-001 | 28 TAC 3.3308 (return notice) |
| LHTX-TXHPT-002 | 28 TAC 3.3832(a) |
| LHTX-TXHPT-003 | 28 TAC 3.3824(a), (c) |
| LHTX-TXHPT-004 | TIC 1501.002 (small employer), 1501.154(a) |

## National overrides (text only)
- LH-REG-002: stem moved from Florida to Texas; explanation cites the TIC 982.001 alien insurer definition.
- LH-PROV-004: explanation states the Texas rule (grace of at least one month, TIC 1101.005).
- LH-PROV-005: explanation states the Texas three-year reinstatement rule (28 TAC 4.611).
- LH-HPRV-001: explanation states the Texas 7/10/31-day grace minimums (TIC 1201.209).

## Checked and left alone (no conflict with Texas law)
Health uniform provisions in the national bank (notice 20 days, forms 15, proof 90, legal action 60 days to 3 years, reinstatement 45/10 days, 2-year time limit on defenses) match TIC 1201.208-.217. Life incontestability (2 years, 1101.006), misstatement of age (1101.008), group life conversion (31 days, 1131.110), credit life limit (1153.155), LTC guaranteed renewable and no prior hospitalization (3.3822), 75 percent participation (1501.154) all match.

## Facts deliberately not used
- Ethics CE hours: TIC 4004.054 says 3 hours of ethics per renewal period, but 28 TAC 19.1003(a)(1)(B) says at least 2 hours of ethics or consumer protection. Conflicting current texts, so no item.
- Individual life free look: no Texas statute or rule setting a general life free-look period was found in official text (only exam-prep sites say 10 days). National LH-PROV-011, which says it varies by state, was not selected; no Texas item written.
- Guaranty association dollar limits: dollar limits are off-limits as the asked fact.
