# Ohio Property and Casualty Insurance Agent exam (Series 11-36): sources (all accessed 2026-10-18)

## Official exam facts

| Fact | Value | Source |
|---|---|---|
| Regulator | Ohio Department of Insurance (ODI), superintendent of insurance; property and casualty are separate lines of authority (ORC 3905.06(B)(3), (4)) | ORC 3905.06, https://codes.ohio.gov/ohio-revised-code/section-3905.06 |
| Vendor | PSI Services LLC, in-person at PSI test centers (remote proctored exams ended 3/13/2026) | PSI Ohio Insurance License Examination Candidate Information Bulletin, updated 3/24/2026, hosted by ODI: https://dam.assets.ohio.gov/image/upload/insurance.ohio.gov/Agent/Documents/Candidate_Handbook_updated_3.20.2025.pdf (same text at https://test-takers.psiexams.com/api/content/bulletin/5493) |
| Exams | Combined "Ohio Property and Casualty Insurance Agent", Series 11-36; Ohio also offers separate Property (Series 11-46), Casualty (Series 11-47) and Personal Lines (Series 11-43) exams | Bulletin, "Examination Content Outlines" |
| Items and time | 150 questions, 2.5 hours | Bulletin, Series 11-36 outline header |
| Unscored items | Up to about 10% experimental items may be added; they count against time | Bulletin, "Non-Scored Questions" |
| Pass mark | Minimum passing score 70% | Bulletin, "Examination Content Outlines" |
| State vs general | Not separate parts: Ohio law is cited inside the regulation section and in section 3.4 "Ohio laws, regulations and required provisions", the auto, workers' compensation and residual market sections; one score | Series 11-36 outline |
| Prelicensing | 20 hours per line; the combined exam needs both property and casualty certificates; certificates valid 180 days | ORC 3905.04(C)(1)(c); Bulletin |

The bulletin is real text (pdftotext, 66 pages, "Updated 3/24/2026"); the ODI and PSI copies match. Local copies in the scratchpad `oh-src/`.

### Series 11-36 outline weights (150 items)
1.0 Insurance Regulation 10%; 2.0 General Insurance 9%; 3.0 Property and Casualty Insurance Basics 16% (principles, policy structure, common provisions, 3.4 Ohio laws: valued policy law, guaranty association, cancellation and nonrenewal, binders, controlled business, retaliatory provisions, fraud, mine subsidence, TRIA, unfair claims settlement, fire loss demolition fund); 4.0 Dwelling ('14) 6%; 5.0 Homeowners ('22) 14%; 6.0 Auto 14% (Ohio financial responsibility, UM/UIM, cancellation, intrafamily exclusion, non-OEM parts, PAP, commercial auto); 7.0 Commercial Package Policy 12% (CGL, commercial property, crime, inland marine, equipment breakdown, farm); 8.0 Businessowners ('13) 8%; 9.0 Workers' Compensation 4% (Ohio Chapter 4123); 10.0 Other Coverages 7% (umbrella, specialty liability, surplus lines, bonds, aviation, ocean marine, NFIP, residual markets incl. Ohio FAIR plan and Ohio Automobile Insurance Plan).

## Chosen form
150 items, the real scored count (equal to the 150 cap), pass 70%. Ohio itself offers the combined P&C exam. Ohio law is integrated, so the 35 Ohio items are the statute and rule items the outline cites, and 115 are national picks.

| Category | Outline areas served | National | Ohio | Total |
|---|---|---|---|---|
| pcGeneral | 1.0 regulation (15), 2.0 general (13.5), 3.1 principles | 20 | 12 | 32 |
| pcPolicy | 3.2, 3.3 provisions; 3.4 valued policy, claims rule, commercial cancellation | 15 | 5 | 20 |
| pcHomeowners | 4.0 dwelling (9) and 5.0 homeowners (21); 3.4 mine subsidence, personal lines cancellation, demolition fund | 26 | 4 | 30 |
| pcAuto | 6.0 auto (21) | 14 | 7 | 21 |
| pcCommercial | 7.0 commercial property, crime, inland marine; 8.0 BOP | 21 | 0 | 21 |
| pcLiability | 7.2 CGL, 9.0 workers' comp, 10.1 umbrella, 10.2 professional | 13 | 3 | 16 |
| pcOther | 10.0 NFIP, bonds, TRIA, residual and surplus markets | 6 | 4 | 10 |
| Total | | 115 | 35 | 150 |

State items rotate the correct letter A, B, C, D across all Ohio items.

## Law sources (official current text, codes.ohio.gov)
URL patterns: ORC https://codes.ohio.gov/ohio-revised-code/section-<section>, OAC https://codes.ohio.gov/ohio-administrative-code/rule-<rule>. Each page fetched as real text with its "Effective" line (local copies in scratchpad `oh-src/law/`).

| Section | Effective / latest legislation | Facts used |
|---|---|---|
| ORC 3905.04 | 9/30/2021, HB 110 | 20 hours per line |
| ORC 3905.06 | 7/21/2022, SB 256 | biennial birth-month renewal |
| ORC 3905.481; OAC 3901-5-01 | 12/19/2016; 11/14/2024 | 24 hours CE incl. 3 ethics; carryover |
| ORC 3905.09 | 9/1/2002 | temporary license for military designee, 180 days |
| ORC 3905.22 | 9/1/2002 | (A) other-state administrative action, 30 days after final disposition |
| ORC 3905.14 | 10/24/2024, SB 175 | (B)(21) 21-day response; (B)(34) license used mainly for own property |
| ORC 3905.20, 3905.21 | 5/26/2010; 9/1/2002 | appointment 30 days; termination copy and 30-day comments |
| ORC 3933.01 | 1953 | P&C anti-rebating; own-policy commission exception (six months in business) |
| ORC 3905.64 | 10/7/1991 | controlled business written disclosure |
| ORC 3901.86 | 9/1/2002 | retaliatory taxes and fees |
| ORC 3929.25 | 6/18/1992 | valued policy law; cellar and foundation walls excluded |
| OAC 3901-1-54 | 2/14/2022 | acknowledge in 15 days; decide in 21 days, updates every 45 days |
| ORC 3937.25 | 3/20/2019, SB 273 | commercial cancellation after 90 days: listed grounds, 30/10-day notice |
| ORC 3929.50, 3929.56 | 4/27/2005; 10/3/2023, HB 33 | mine subsidence definition; 26 mandatory and 11 optional counties |
| ORC 3937.47 | 3/20/2019 | personal lines nonpayment cancellation, 10 days |
| ORC 3929.86 | 9/29/2015 | fire claims over $5,000: county treasurer certificate; 60% demolition holdback |
| ORC 3937.18 | 3/14/2023, SB 56 | UM/UIM optional; UIM not excess; 3-year claim limit |
| ORC 3937.31, 3937.32 | 9/22/2013; 9/29/2017 | auto cancellation after 90 days only for listed reasons; 30/10-day notice |
| ORC 1345.81 | 9/13/2022 | non-OEM aftermarket crash parts estimate notice |
| ORC 3937.41 | 10/24/2024, HB 158 | on-duty emergency vehicle accidents may not be used to rate or nonrenew |
| ORC 4123.35, 4123.82 | 3/24/2021; 9/17/2014 | state insurance fund or self-insurance; private WC insurance void |
| ORC 4123.74 | 10/20/1993 | complying employer immune from damage suits |
| ORC 4123.84 | 3/20/2025, SB 196 | one-year claim notice |
| ORC 3929.44 | 10/24/2024, SB 175 | FAIR plan: certify two insurers contacted |
| ORC 4509.70 | 9/30/2025, HB 96 | Ohio Automobile Insurance Plan |
| ORC 3905.30, 3905.33 | 3/20/2019, SB 273 | surplus lines: due diligence five insurers; signed no-OIGA statement |

## Item-to-source map
| Item | Source |
|---|---|
| PCOH-OHLIC-001 | ORC 3905.04(C)(1)(c); Bulletin note on Series 11-36 certificates |
| PCOH-OHLIC-002 | ORC 3905.481; OAC 3901-5-01 |
| PCOH-OHLIC-003 | ORC 3905.06(C)(1), (D); OAC 3901-5-01 |
| PCOH-OHLIC-004 | ORC 3905.09(A)(3), (B), (D) |
| PCOH-OHLIC-005 | ORC 3905.22(A) |
| PCOH-OHLIC-006 | ORC 3905.14(B)(21) |
| PCOH-OHREG-001 | ORC 3905.20(B)(1) |
| PCOH-OHREG-002 | ORC 3905.21(C)(1), (2) |
| PCOH-OHREG-003 | ORC 3933.01 |
| PCOH-OHREG-004 | ORC 3905.64 |
| PCOH-OHREG-005 | ORC 3905.14(B)(34) |
| PCOH-OHREG-006 | ORC 3901.86(A) |
| PCOH-OHPOL-001 | ORC 3929.25 |
| PCOH-OHPOL-002 | ORC 3929.25 |
| PCOH-OHPOL-003 | OAC 3901-1-54 (acknowledgment of claims) |
| PCOH-OHPOL-004 | OAC 3901-1-54(G)(1) |
| PCOH-OHPOL-005 | ORC 3937.25(B), (D) |
| PCOH-OHHOM-001 | ORC 3929.56(A)(1), (A)(2)(a) |
| PCOH-OHHOM-002 | ORC 3929.50(A) |
| PCOH-OHHOM-003 | ORC 3937.47(A), (B), (C) |
| PCOH-OHHOM-004 | ORC 3929.86(A), (B), (C) |
| PCOH-OHAUT-001 | ORC 3937.18(A) |
| PCOH-OHAUT-002 | ORC 3937.18(C) |
| PCOH-OHAUT-003 | ORC 3937.18(H) |
| PCOH-OHAUT-004 | ORC 3937.31(A), (C) |
| PCOH-OHAUT-005 | ORC 3937.32(A) |
| PCOH-OHAUT-006 | ORC 1345.81(B), (E) |
| PCOH-OHAUT-007 | ORC 3937.41(B), (F) |
| PCOH-OHWC-001 | ORC 4123.35(A), (B); 4123.82(A) |
| PCOH-OHWC-002 | ORC 4123.74; 4123.54 |
| PCOH-OHWC-003 | ORC 4123.84(A) |
| PCOH-OHMKT-001 | ORC 3929.44(D), (E) |
| PCOH-OHMKT-002 | ORC 4509.70(A) |
| PCOH-OHMKT-003 | ORC 3905.33(B)(1), (3), (4) |
| PCOH-OHMKT-004 | ORC 3905.33(C) |

## National picks, exclusions and overrides
National picks by outline area: general and regulation 20 (risk, hazards, law of large numbers, risk techniques, insurable interest, indemnity, contract characteristics, representations and concealment, estoppel, adverse selection, reinsurance, alien insurer, apparent authority, binders); provisions 15 (policy parts, open perils, indirect loss, ACV, coinsurance, other insurance, excess, subrogation, appraisal, mortgage clause, pro rata return, liberalization); dwelling 6 and homeowners 20; auto 14 (PAP Parts A to E, split and single limits, UM/UIM definitions, collision vs other than collision, eligibility); commercial 21 (CPP, common conditions, BPP, causes of loss, coinsurance, agreed value, business income, extra expense, BOP, inland marine, crime); liability 13 (CGL coverages and triggers, aggregate, products, employee exclusion, workers' comp policy Parts One and Two, umbrella, professional); other 6 (NFIP, surety, FAIR plans, TRIA, twisting).

No overrides were needed.

Excluded on purpose:
- PC-AUTO-030 (ISO PAP: after 60 days cancel only for listed reasons): Ohio's statute counts 90 days (ORC 3937.31(C)); replaced by PCOH-OHAUT-004.
- PC-AUTO-018 (UM stacking "varies by state"): Ohio expressly lets policies bar stacking (ORC 3937.18(F)), and the key is a "varies" phrase.
- PC-LIA-019 (why workers' comp is an exclusive remedy): its distractor "Only one insurer may write it in each state" is literally true of Ohio's monopolistic state fund, so an Ohio candidate could defend it; PCOH-OHWC-002 covers exclusive remedy instead.
- Remaining national items not picked were left out only for count and duplication (for example the PC-HO-011 and PC-HO-014 special limits, beyond the two kept).

Checked and kept: PAP UM definitions (PC-AUTO-015, PC-AUTO-016 insolvent or denying insurer) match ORC 3937.18(B); UIM "too little insurance" (PC-AUTO-017) matches the limits-to-limits test in 3937.18(C); valued policy concept (PC-POL-028 not picked, but PCOH-OHPOL-001 covers Ohio's version); binders (PC-GEN-028) consistent with ORC 4509.56; FAIR plan purpose (PC-OTH-014) matches ORC 3929.41.

## Facts deliberately not used
- Ohio financial responsibility minimums (ORC 4509.51, 25/50/25): verified, but X/Y/Z limits are off-limits as asked facts.
- Mine subsidence premium caps and the $300,000 reinsured value (ORC 3929.52, 3929.56(B)), the UM property damage $7,500 figure (ORC 3937.181) and the surplus lines broker bond amount (ORC 3905.35): dollar trivia.
- Intrafamily liability exclusion (ORC 3937.46): its exception (UM/UIM without its own intrafamily exclusion) is too conditional for a fair four-option item.
- Total-loss auto sales tax reimbursement (OAC 3901-1-54, 30 days): correct but narrower than the items kept.
