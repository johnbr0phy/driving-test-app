# Michigan real estate salesperson variant: sources

All sources accessed 2026-10-18. Local copies of the PDFs and extracted text are in the builder's scratchpad (`re-mi/dl/`).

## Official exam facts

| Fact | Value | Source |
|---|---|---|
| Regulator | Department of Licensing and Regulatory Affairs (LARA) and the Board of Real Estate Brokers and Salespersons | MCL 339.2502; PSI bulletin p. 14 note ("Department" and "Board") |
| Vendor | PSI Services LLC, test centers in Michigan | PSI Michigan Real Estate Candidate Information Bulletin, updated 7/6/2026, https://test-takers.psiexams.com/api/content/bulletin/837 (landing page https://test-takers.psiexams.com/mire) |
| Salesperson exam | **115 scored questions (115 points), 180 minutes**, plus 1 to 10 unscored experimental items that count against the time | Bulletin "Examination Summary Table" and "Experimental Questions" (p. 11) |
| Split | National (Real Estate Principles and Practices) outline in percentages; Michigan State Laws and Rules portion 35 items (3 + 5 + 10 + 5 + 12). 115 - 35 = 80 national items. | Bulletin content outlines (pp. 11 to 14) |
| Pass mark | **70%**, passing raw score 80 of 115 | Bulletin summary table |
| Scored separately? | **No.** One examination, one pass mark; passers see only PASS, failers get a score per major outline section. | Bulletin "Score Reporting" |
| Score validity | 1 year from the exam date | MCL 339.2505(6)(b) |
| Eligibility | 40 clock hours of approved prelicensure courses (4 on civil rights and fair housing) within 36 months; apply through MiPLUS before scheduling with PSI | MCL 339.2504(2); R 339.22111(4); bulletin p. 2 |
| Exam fee | $79 | Bulletin p. 2 |

### National outline (Real Estate Principles and Practices, salesperson weights)
I Property ownership 10%; II Land use controls 5%; III Valuation 8%; IV Financing 10%; V Contracts 19%; VI Agency 13%; VII Property disclosures 7%; VIII Property management 3%; IX Transfer of title 6%; X Practice of real estate 12%; XI Real estate calculations 7%.

### Michigan state outline (salesperson items)
Duties and powers of the Department and the Board 3; Licensing requirements 5; Statutory requirements governing the activities of licensees 10 (advertising, commissions, disclosure/conflict of interest, handling of contracts, monies and trust accounts, record keeping, inducements, stigmatized property, closing responsibilities); Contractual relationships 5 (transaction coordinator, designated agency, dual agency, agency disclosures, broker/salesperson relationships, service provision agreements); Additional state topics 12 (Land Division Act private road disclosure, Elliott-Larsen and Persons with Disabilities Civil Rights Acts, Landlord Tenant Relationship Act and Truth in Renting Act, state transfer tax, Condominium Act, MSHDA, antitrust, Right to Farm Act, land contract changes). Usury is broker only.

## Chosen form

115 items = 80 national picks + 35 Michigan items, one full-length test at the real scored count (under the 150 cap), 70% pass.

National picks follow the outline percentages applied to 80 (8 / 4 / 6 / 8 / 15 / 10 / 6 / 2 / 5 / 10 / 6). By outline area:

| Area | n | National items |
|---|---|---|
| I Property ownership | 8 | PROP-001, 014, 017, 026, 028; OWN-001, 003, 015 |
| II Land use controls | 4 | PROP-021, 022, 023, 025 |
| III Valuation | 6 | VAL-001, 003, 014, 020, 026, 027 |
| IV Financing | 8 | FIN-003, 004, 006, 008, 010, 012, 013, 014 |
| V Contracts | 15 | CON-002, 004, 005, 006, 007, 009, 010, 014, 015, 017, 018, 019, 020, 021; OWN-013 (types of leases) |
| VI Agency | 10 | CON-026, 027, 031, 032, 033, 035, 036, 039, 040; PRAC-006 |
| VII Property disclosures | 6 | DISC-001, 004, 009, 011, 016, 017 |
| VIII Property management | 2 | OWN-011, PRAC-020 |
| IX Transfer of title | 5 | OWN-017, 018, 020, 024; FIN-016 |
| X Practice of real estate | 10 | PRAC-002, 003, 005, 014, 015, 016, 017, 023, 024; CON-022 |
| XI Calculations | 6 | MATH-004, 008, 011, 013, 015, 017 |

The picked list is `mi-national.json`.

## National exclusions (conflict with Michigan law or practice)

| Item | Reason |
|---|---|
| RE-FIN-001 | Deed of trust trustee and nonjudicial trustee sale; Michigan finances with mortgages (lien theory, foreclosure by advertisement) |
| RE-OWN-004 | Community property; Michigan is not a community property state |
| RE-PRAC-009 | Net listing compensation; R 339.22135 bars a licensee from a net service provision agreement |
| RE-MATH-016 | Local transfer tax at $1.10 per $500 conflicts with Michigan's county rate (55 cents per $500, MCL 207.504) and state rate ($3.75 per $500, MCL 207.525) |
| RE-OWN-021 | Asserts a 12-year adverse possession period; Michigan's is 15 years |
| RE-CON-028 | "Transaction broker"; Michigan's non-agency role is the transaction coordinator (MCL 339.2517(11)(k)), tested on the state side |
| RE-DISC-015 | "Requirements vary by state" adds nothing beside the Michigan Seller Disclosure Act items |

## National overrides (explanation only; keys and options unchanged)

| Item | Change |
|---|---|
| RE-CON-026 | Cites Michigan's dual agency consent (MCL 339.2517 form, 339.2512(1)(a)) |
| RE-CON-027 | Cites MCL 339.2517(6) to (8): affiliated designated agents are not dual agents; broker and supervisory brokers are disclosed consensual dual agents |
| RE-CON-040 | Cites MCL 339.2517(1): written agency disclosure before confidential information |
| RE-PRAC-002 | Cites MCL 339.2512(1)(k)(ii) and (v): salesperson delivers on receipt, broker deposits within 2 banking days after acceptance |
| RE-CON-022 | Cites R 339.22134(9): disputed deposit held until civil action or written agreement; interpleader allowed |
| RE-DISC-016 | Cites R 339.22139 (no misrepresentation of material facts) |

## Law sources (official current text)

- Occupational Code, 1980 PA 299, Article 25 (MCL 339.2501 to 339.2518), legislature.mi.gov PDF "Complete Through PA 103 of 2026": https://www.legislature.mi.gov/documents/mcl/pdf/mcl-299-1980-25.pdf (includes 2024 PA 122, right-to-list home sale agreements)
- Occupational Code Articles 3, 4, 5, 6: https://www.legislature.mi.gov/documents/mcl/pdf/mcl-299-1980-5.pdf, ...-6.pdf (and -3, -4)
- Real Estate Brokers and Salespersons General Rules, R 339.22101 to 339.22667, as rewritten by 2025 MR 12, effective June 4, 2025 (old R 339.22305, 22307, 22313 etc. rescinded and renumbered): https://ars.apps.lara.state.mi.us/AdminCode/DownloadAdminCodeFile?FileName=R%20339.22101%20to%20R%20339.22667.pdf
- Seller Disclosure Act, 1993 PA 92: https://www.legislature.mi.gov/documents/mcl/pdf/mcl-act-92-of-1993.pdf
- Elliott-Larsen Civil Rights Act, 1976 PA 453 (housing article as amended by 2023 PA 6 and 2024 PA 180, eff. April 2, 2025): https://www.legislature.mi.gov/documents/mcl/pdf/mcl-act-453-of-1976.pdf
- Landlord-Tenant Act, 1972 PA 348 (source-of-income definition added by 2024 PA 179, eff. April 2, 2025): https://www.legislature.mi.gov/documents/mcl/pdf/mcl-act-348-of-1972.pdf
- Truth in Renting Act, 1978 PA 454 (amended by 2026 PA 103, eff. Sept 21, 2026; the new rent-payment-fee clause is not tested): https://www.legislature.mi.gov/documents/mcl/pdf/mcl-act-454-of-1978.pdf
- State Real Estate Transfer Tax Act, 1993 PA 330: https://www.legislature.mi.gov/documents/mcl/pdf/mcl-act-330-of-1993.pdf ; county Real Estate Transfer Tax, 1966 PA 134: https://www.legislature.mi.gov/documents/mcl/pdf/mcl-act-134-of-1966.pdf
- Condominium Act, 1978 PA 59: https://www.legislature.mi.gov/documents/mcl/pdf/mcl-act-59-of-1978.pdf
- Land Division Act, 1967 PA 288: https://www.legislature.mi.gov/documents/mcl/pdf/mcl-act-288-of-1967.pdf
- Michigan Right to Farm Act, 1981 PA 93: https://www.legislature.mi.gov/documents/mcl/pdf/mcl-act-93-of-1981.pdf
- Michigan Antitrust Reform Act, 1984 PA 274: https://www.legislature.mi.gov/documents/mcl/pdf/mcl-act-274-of-1984.pdf
- State Housing Development Authority Act, 1966 PA 346: https://www.legislature.mi.gov/documents/mcl/pdf/mcl-act-346-of-1966.pdf

## Item-to-source map

| Item | Source |
|---|---|
| REMI-MIBRD-001 | MCL 339.602(e); 339.601(6) in explanation |
| REMI-MIBRD-002 | MCL 339.601(1), (4), (5) |
| REMI-MIBRD-003 | MCL 339.2512(2) |
| REMI-MILIC-001 | MCL 339.2504(1)(b), (2); R 339.22111(4) |
| REMI-MILIC-002 | MCL 339.2504a(2)(a); R 339.22161(1) |
| REMI-MILIC-003 | MCL 339.2507(1), 339.2512(1)(f), 339.2506(5) |
| REMI-MILIC-004 | MCL 339.2505(6)(b) |
| REMI-MILIC-005 | MCL 339.2503(1), 339.2501(u), (v) |
| REMI-MIACT-001 | MCL 339.2512(1)(k)(v); R 339.22134(3) |
| REMI-MIACT-002 | MCL 339.2502b(3), (1)(d) |
| REMI-MIACT-003 | MCL 339.2510(1) |
| REMI-MIACT-004 | MCL 339.2512e(3) |
| REMI-MIACT-005 | MCL 339.2512e(4) |
| REMI-MIACT-006 | R 339.22132(1), (3) |
| REMI-MIACT-007 | R 339.22134(8) |
| REMI-MIACT-008 | MCL 339.2518(b) |
| REMI-MIACT-009 | MCL 339.2511 |
| REMI-MIACT-010 | MCL 339.2512d(3)(e) |
| REMI-MIAGY-001 | MCL 339.2517(1), (3) |
| REMI-MIAGY-002 | MCL 339.2517(5), (11)(k) |
| REMI-MIAGY-003 | MCL 339.2517(6) |
| REMI-MIAGY-004 | MCL 339.2517(7), (8) |
| REMI-MIAGY-005 | MCL 339.2512d(2), (3), (5); 339.2517(4) |
| REMI-MISPC-001 | MCL 37.2502(1) |
| REMI-MISPC-002 | MCL 37.2503(1)(a); 42 USC 3603(b)(2) in explanation |
| REMI-MISPC-003 | MCL 37.2502(3), (4) (2024 PA 180); MCL 554.601(f) |
| REMI-MISPC-004 | MCL 554.602 |
| REMI-MISPC-005 | MCL 554.633(1)(d), (3) |
| REMI-MISPC-006 | MCL 445.772, 445.778(2) |
| REMI-MISPC-007 | MCL 207.525(1); 207.504 (55 cents, up to 75 cents in counties of 2,000,000 or more) |
| REMI-MISPC-008 | MCL 559.184(2), (4)(a) |
| REMI-MISPC-009 | MCL 560.261 |
| REMI-MISPC-010 | MCL 560.109(4); 286.473 |
| REMI-MISPC-011 | MCL 565.954(3), (4) |
| REMI-MISPC-012 | MCL 125.1401 |

## Category table

| Category | National | Michigan | Total |
|---|---|---|---|
| rePropertyCharacteristics | 9 | 0 | 9 |
| reOwnershipTitle | 9 | 4 | 13 |
| reValuation | 6 | 0 | 6 |
| reContractsAgency | 24 | 6 | 30 |
| rePractice | 11 | 19 | 30 |
| reDisclosures | 6 | 3 | 9 |
| reFinancing | 9 | 2 | 11 |
| reMath | 6 | 1 | 7 |
| **Total** | **80** | **35** | **115** |

Correct letters across the 115: A 31, B 26, C 33, D 25 (state items A 11, B 9, C 8, D 7, rotated per segment).
