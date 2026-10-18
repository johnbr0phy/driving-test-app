# Ohio Life, Accident and Health Insurance Agent exam (Series 11-35): sources (all accessed 2026-10-18)

## Official exam facts

| Fact | Value | Source |
|---|---|---|
| Regulator | Ohio Department of Insurance (ODI), superintendent of insurance; life and accident and health are separate lines of authority (ORC 3905.06(B)(1), (2)) | ORC 3905.06, https://codes.ohio.gov/ohio-revised-code/section-3905.06 |
| Vendor | PSI Services LLC, in-person at PSI test centers (remote proctored exams ended 3/13/2026) | PSI Ohio Insurance License Examination Candidate Information Bulletin, updated 3/24/2026, hosted by ODI: https://dam.assets.ohio.gov/image/upload/insurance.ohio.gov/Agent/Documents/Candidate_Handbook_updated_3.20.2025.pdf (same 3/24/2026 text served by PSI at https://test-takers.psiexams.com/api/content/bulletin/5493) |
| Exams | Combined "Ohio Life, Accident and Health Insurance Agent", Series 11-35; separate Life (Series 11-44) and Accident and Health (Series 11-45) exams are also offered | Bulletin, "Examination Content Outlines" |
| Items and time | 150 questions, 2.5 hours | Bulletin, Series 11-35 outline header |
| Unscored items | Up to about 10% experimental items (one to ten) may be added on top of the stated count; they count against time | Bulletin, "Non-Scored Questions" |
| Pass mark | Minimum passing score 70% | Bulletin, "Examination Content Outlines" |
| State vs general | Not separate parts. Ohio statutes and rules are cited inside every outline section (one integrated 150-item exam, one score) | Series 11-35 outline |
| Prelicensing | 20 hours per line; the combined exam needs both completion certificates; certificates valid 180 days | ORC 3905.04(C)(1)(c); Bulletin checklist and "Pre-Licensing Education" |
| Retakes | No limit on attempts | Bulletin checklist |

The bulletin was downloaded with curl and extracted with pdftotext (real text, 66 pages, "Updated 3/24/2026"). The two copies (ODI and PSI) were compared and match. Local copies: scratchpad `oh-src/handbook.pdf`, `oh-src/psi5493.pdf`.

### Series 11-35 outline weights (150 items)
1.0 Insurance Regulation 10% (licensing, company and agent regulation, state regulation incl. unfair trade practices, fraud and privacy, federal regulation); 2.0 General Insurance 5%; 3.0 Life Insurance Basics 8%; 4.0 Life Insurance Policies 7%; 5.0 Life Policy Provisions, Options and Riders 9%; 6.0 Annuities 5%; 7.0 Federal Tax Considerations for Life and Annuities 8%; 8.0 Accident and Health Basics 8%; 9.0 Individual A&H Policy General Provisions 5%; 10.0 Disability Income 5%; 11.0 Medical Plans 6%; 12.0 Health Insuring Corporations 5%; 13.0 Group A&H 5%; 14.0 Dental 2%; 15.0 Senior Citizens and Special Needs 8%; 16.0 Federal Tax for A&H 4%. (The bulletin's two-column layout scrambles topic order, but each heading's percentage is printed with it; they sum to 100.)

## Chosen form
150 items, the real scored count (it equals the 150 cap), pass 70%. Ohio offers the combined exam itself, so no combined form had to be built. Because Ohio integrates state law into every section, the "state" items are the Ohio-statute items the outline cites (49), and the other 101 are national picks.

| Category | Outline areas served | National | Ohio | Total |
|---|---|---|---|---|
| insuranceRegulation | 1.0 (15) plus 2.2 insurer types | 6 | 15 | 21 |
| generalInsurance | 2.0 concepts and contracts, 3.8 field underwriting | 9 | 0 | 9 |
| lifeBasics | 3.0 (insurable interest, needs, business uses, viaticals, underwriting) | 9 | 4 | 13 |
| lifePolicyTypes | 4.0 incl. group and credit life | 9 | 1 | 10 |
| lifeProvisions | 5.0 standard provisions, beneficiaries, nonforfeiture, settlement, riders | 7 | 6 | 13 |
| annuitiesRetirement | 6.0 annuities and 7.0 life/annuity taxation (20 outline items) | 15 | 2 | 17 |
| healthBasics | 8.0 basics and plan types, 16.0 tax, HICs as a term | 14 | 3 | 17 |
| healthProvisions | 9.0 individual provisions, group continuation | 10 | 4 | 14 |
| healthPolicyTypes | 10.0 DI, 11.0 medical, 12.0 HICs, 13.0 group, 14.0 dental, 15.0 seniors and LTC | 22 | 14 | 36 |
| Total | | 101 | 49 | 150 |

Life-specific areas (3.0 to 7.0, 55.5 outline items) get 53 here, health-specific areas (8.0 to 16.0, 72) get 67, and shared regulation and general concepts (22.5) get 30, because the Ohio regulation items carry most of the state law.

State items rotate the correct letter A, B, C, D across the Ohio items (a single running rotation, which balances the whole form better than restarting at A in each small segment).

## Law sources (official current text, Ohio Laws and Administrative Rules, codes.ohio.gov)
URL patterns: ORC https://codes.ohio.gov/ohio-revised-code/section-<section>, OAC https://codes.ohio.gov/ohio-administrative-code/rule-<rule>. Each page was fetched as real text with its "Effective" and "Latest Legislation" lines (local copies in scratchpad `oh-src/law/`). Independent review on 2026-10-18 re-fetched every cited section from codes.ohio.gov and found the text identical to these copies.

| Section | Effective / latest legislation | Facts used |
|---|---|---|
| ORC 3905.04 | 9/30/2021, HB 110 | 20 hours prelicensing per line |
| ORC 3905.06 | 7/21/2022, SB 256 | biennial birth-month renewal; late renewal; suspension and 12-month reinstatement |
| ORC 3905.061 | 5/26/2010 | 30-day address change |
| ORC 3905.09 | 9/1/2002 | temporary license, 180 days |
| ORC 3905.14 | 10/24/2024, SB 175 | (B)(19) agent as beneficiary; (B)(21) 21-day response; (B)(32) refund timing; (E)(9) surrender for cause 5 years |
| ORC 3905.18 | 9/1/2002 | (D) referral fee to unlicensed person |
| ORC 3905.20 | 5/26/2010 | appointment within 30 days, whichever is earlier |
| ORC 3905.21 | 9/1/2002 | termination notice; copy to agent in 15 days; comments in 30 days |
| ORC 3905.22 | 9/1/2002 | criminal prosecution notice, 30 days after initial appearance |
| ORC 3905.481 | 12/19/2016 | 24 hours CE incl. 3 ethics |
| OAC 3901-5-01 | 11/14/2024 | CE carryover up to 50% |
| OAC 3901-5-09 | 3/27/2025 | 30-day change reporting (name, email, phone) |
| ORC 3901.221 | 10/24/2024, SB 175 | cease and desist hearing within 15 days |
| ORC 3999.21 | 10/23/1991 | fraud warning; absence not a defense |
| ORC 3916.02 | 12/10/2008 | (C)(2) five-year life agent as viatical broker |
| ORC 3901.46 | 2/12/2004 | HIV testing consent and limits |
| ORC 3911.091 | 11/3/1995 | employer insurable interest with written consent |
| OAC 3901-6-03 | 11/16/2023 | buyer's guide and policy summary timing |
| ORC 3917.06 | 10/12/2006 | (I) five-year conversion on group termination; (H) 31 days |
| ORC 3915.05 | 1/1/2021, HB 339 | (B) one-month grace; (J) three-year reinstatement; (K) two-month claim payment |
| ORC 3915.13 | 1/1/2021 | backdating limit six months |
| OAC 3901-6-05 | 11/16/2023 | replacement: 30-day right to return, five business days |
| ORC 5815.33 | 1/1/2007 | divorce revokes spouse beneficiary designation |
| OAC 3901-6-13 | 2/14/2021 | annuity best interest; one-time four-credit training |
| ORC 3901.491 | 4/6/2023, HB 281 | genetic testing ban in health underwriting |
| ORC 3923.13 | 1953 | blanket insurance, no individual application or certificate |
| ORC 1751.01 | 4/11/2021, SB 276 | basic vs supplemental health care services |
| ORC 1751.18 | 4/9/2025, HB 238 | no cancellation for health status; fraud exception |
| ORC 1751.61 | 6/30/1997 | HIC newborn 31 days |
| ORC 3923.04 | 1/1/2021, HB 339 | (C) grace 7/10/31 and 5-day nonrenewal notice |
| ORC 3923.31 | 7/1/1980 | 10-day free look |
| ORC 3923.38 | 4/1/2009 | state continuation 12 months; 3 months insured |
| ORC 3923.24 | 10/3/2023, HB 33 | dependents to 26; disabled child proof 31 days; dental and vision from 1/1/2024 |
| ORC 3923.26 | 6/30/1997 | newborn coverage, 31-day notice and premium |
| ORC 3924.01 | 4/9/2025, HB 238 | small employer 2 to 50 |
| OAC 3901-8-08 | 5/1/2023 | Medicare supplement 30-day right to return |
| ORC 3923.44 | 9/10/2007 | LTC: no cancellation for age or health; six-month preexisting; 30-day prior stay cap; (H)(1) 30-day free look |
| OAC 3901-4-01 | 9/13/2024 | (G)(1)(c) LTC unintentional lapse notice; guaranteed renewable or noncancellable only |

## Item-to-source map
| Item | Source |
|---|---|
| LHOH-OHLIC-001 | ORC 3905.04(C)(1)(c); Bulletin |
| LHOH-OHLIC-002 | ORC 3905.06(C)(1) |
| LHOH-OHLIC-003 | ORC 3905.481; OAC 3901-5-01 |
| LHOH-OHLIC-004 | ORC 3905.06(D), (E), (F) |
| LHOH-OHLIC-005 | ORC 3905.09(A)(1), (B), (D) |
| LHOH-OHLIC-006 | ORC 3905.22(B) |
| LHOH-OHLIC-007 | ORC 3905.061(A); OAC 3901-5-09 |
| LHOH-OHAPT-001 | ORC 3905.20(B)(1) |
| LHOH-OHAPT-002 | ORC 3905.21(A), (C) |
| LHOH-OHREG-001 | ORC 3905.14(B)(21) |
| LHOH-OHREG-002 | ORC 3905.18(D) |
| LHOH-OHREG-003 | ORC 3901.221 |
| LHOH-OHREG-004 | ORC 3905.14(E)(9) |
| LHOH-OHREG-005 | ORC 3905.14(B)(32) |
| LHOH-OHREG-006 | ORC 3999.21(B), (D) |
| LHOH-OHLIF-001 | ORC 3916.02(A), (C)(2) |
| LHOH-OHLIF-002 | ORC 3901.46(A), (B)(1) |
| LHOH-OHLIF-003 | ORC 3911.091(B), (D) |
| LHOH-OHLIF-004 | OAC 3901-6-03(E)(1) |
| LHOH-OHLIF-005 | ORC 3917.06(H), (I) |
| LHOH-OHLIF-006 | ORC 3915.05(J) |
| LHOH-OHLIF-007 | ORC 3915.05(K) |
| LHOH-OHLIF-008 | ORC 3915.13 |
| LHOH-OHLIF-009 | ORC 3905.14(B)(19) |
| LHOH-OHLIF-010 | OAC 3901-6-05(G)(1)(b), (d) |
| LHOH-OHLIF-011 | ORC 5815.33(B)(1) |
| LHOH-OHANN-001 | OAC 3901-6-13(F)(1) |
| LHOH-OHANN-002 | OAC 3901-6-13(G)(2) |
| LHOH-OHAH-001 | ORC 3901.491(A)(3), (B) |
| LHOH-OHAH-002 | ORC 3923.13 |
| LHOH-OHAH-003 | ORC Chapter 1751 (1751.01); outline 11.2 |
| LHOH-OHAH-004 | ORC 3923.31(A)(1) |
| LHOH-OHAH-005 | ORC 3923.04(C) |
| LHOH-OHAH-006 | ORC 3923.38(B) |
| LHOH-OHAH-007 | ORC 3923.38(A)(2) |
| LHOH-OHHIC-001 | ORC 1751.01(A), (B) |
| LHOH-OHHIC-002 | ORC 1751.18(A)(1), (B), (D) |
| LHOH-OHHIC-003 | ORC 1751.61 |
| LHOH-OHGRP-001 | ORC 3923.24(A)(1) |
| LHOH-OHGRP-002 | ORC 3923.24(A)(2), (B) |
| LHOH-OHGRP-003 | ORC 3923.24(E) |
| LHOH-OHGRP-004 | ORC 3923.26 |
| LHOH-OHGRP-005 | ORC 3924.01 (small employer definition) |
| LHOH-OHSR-001 | OAC 3901-8-08 (right-to-return notice) |
| LHOH-OHSR-002 | ORC 3923.44(H)(1); 3923.31 |
| LHOH-OHSR-003 | ORC 3923.44(B)(4), (5) |
| LHOH-OHSR-004 | ORC 3923.44 (prior institutional stay limit) |
| LHOH-OHSR-005 | OAC 3901-4-01(G)(1)(c) (unintentional lapse: 30-day notice by first-class mail, not before 30 days unpaid) |
| LHOH-OHSR-006 | ORC 3923.44(B)(1) |

## National picks, exclusions and overrides
National picks by outline area: regulation 6 (McCarran-Ferguson, alien insurer, twisting, rebating, FCRA, 18 USC 1033); general concepts and contract law 7 plus conditional receipt and estoppel; life basics 9 (insurable interest, human life value, needs, estate liquidity, key person, buy-sell, executive bonus, group master policy, viatical tax); life policy types 9 (term, convertible, whole life, limited pay, UL, variable licensing, survivorship, credit life); life provisions 7; annuities and tax 15; health basics 14 (DI, HMO/PPO/POS, ACA, renewability, HSA, COB, subrogation, workers' comp, SSDI); health provisions 10 (uniform provisions, COBRA, tax); health policy types 22 (DI riders and business DI, AD&D, major medical, dental, Medicare A/B/C, Medigap, Medicaid, LTC).

Overrides (wording only, keys unchanged):
- LH-REG-002: stem moved from Florida to Ohio; explanation notes an alien insurer needs an Ohio certificate of authority.
- LH-PROV-004: explanation cites ORC 3915.05(B) (one-month grace, overdue premium deducted).
- LH-HPRV-001: explanation cites ORC 3923.04(C) (7/10/31-day minimums).

Excluded on purpose:
- LH-LIFE-001 (ex-wife collects after divorce): ORC 5815.33 revokes a spouse beneficiary designation on divorce, so a candidate could defend a different answer depending on who made the designation.
- LH-PROV-014 (irrevocable beneficiary to ex-spouse): same statute; left out to avoid confusion with LHOH-OHLIF-011.
- LH-PROV-008 (concealment found three years after issue): ORC 3915.05(C) caps contestability at two years, but ORC 3911.07 separately estops defenses after three annual premiums "other than fraud", so concealment framed as fraud is arguable in Ohio.
- LH-PROV-011 (free look on a life policy): Ohio sets no general life free-look period (only the 10-day refund option in OAC 3901-6-03 and 30 days on replacements).
- LH-HTYP-002 and LH-HLTH-015: near duplicates of LH-HLTH-008 and LH-HTYP-012 (same lesson, same answer).

Checked and kept: health uniform provisions in the national bank (notice 20 days, forms 15, proof 90, legal action 60 days to 3 years, reinstatement 45/10 days, two-year time limit) match ORC 3923.04; group life conversion 31 days (LH-LIFE-015 area) matches ORC 3917.06(H); LTC guaranteed renewable (LH-HTYP-028) matches OAC 3901-4-01; variable products needing FINRA registration match ORC 3905.06(A)(1)(e).

## Facts deliberately not used
- Dollar amounts: civil penalty caps (ORC 3905.14(E)(1), $25,000), the $1,000 fraud-reporting threshold (ORC 3999.42) and guaranty association limits (Chapter 3956) are dollar trivia; not asked.
- Prior authorization (ORC 3923.041, 1751.72) and PPACA adverse benefit determination (Chapter 3922) timelines: long, frequently amended sections; not asked.
- PSI exam fees: the bulletin's fee table and third-party pages disagree, and fees are not exam content.
