# Illinois broker exam: sources (all accessed 2026-10-18)

Illinois has no salesperson license. The entry license is **broker** (a managing broker license is the supervisory level), so this variant models the Illinois broker exam and every item uses Illinois terms: sponsoring broker, designated managing broker, sponsored licensee, designated agent.

## Official exam facts

| Fact | Value | Source |
|---|---|---|
| Regulator | Illinois Department of Financial and Professional Regulation (IDFPR), Division of Real Estate | 225 ILCS 454/5-35; PSI booklet p. 1 |
| Vendor | PSI Services LLC | IDFPR Division of Real Estate Candidate Information Booklet, PSI, dated 6/24/2026, https://test-takers.psiexams.com/api/content/bulletin/4655 (21-page PDF, text verified with pypdf) |
| National portion | 100 scored items (100 points), 150 minutes, 70% to pass | Booklet "Examination Summary Table". The 70% raw pass "is equivalent to a scaled score of 75 as previously reported" |
| State portion | 40 scored items (40 points), 90 minutes, **75%** to pass (30 of 40) | Booklet "Examination Summary Table" |
| Pretest items | 5 to 10 unscored experimental items may be added | Booklet "Experimental Questions" |
| Scoring | Portions scored separately; a failed portion is retaken alone | Booklet "Re-taking a Failed Portion" |
| Retakes | 4 consecutive failures require repeating pre-license education | 225 ILCS 454/5-35(c); Rule 1450.420(b) |
| Score validity | Apply for licensure within one year of passing | 225 ILCS 454/5-35(b); booklet p. 7 |
| Eligibility | Age 18, high school, 75 hours pre-license (60 topics + 15 applied, interactive) | 225 ILCS 454/5-27; Rule 1450.400; booklet p. 1 |

### National outline (PSI, in the 6/24/2026 booklet, broker weights)
Property ownership 10%, land use controls 5%, valuation 8%, financing 10%, contracts 19%, agency 13%, property disclosures 7%, property management 3%, transfer of title 6%, practice of real estate 12%, calculations 7%. Of 100 items.

### Illinois state outline (broker column, effective 6/24/2026)
I Licensing requirements 4 (10%); II Illinois Real Estate License Act 16 (40%); III Additional Illinois laws and regulations 10 (25%); IV Disclosures 10 (25%). Total 40. (The managing broker column is 3/15/7/5 plus 20 managing-broker-only items and is not modeled.)

## Chosen form
140 items = 100 national picks + 40 Illinois items, the real scored counts (under the 150 cap, so no scaling). National picks follow the PSI broker weights exactly; state items follow the state outline exactly (ILLIC 4, ILACT 16, ILLAW 10, ILDSC 10). Pretest items are not modeled. The app uses one pass mark; 70% is the national mark, while the real state portion needs 75%.

### National picks by outline area
| PSI area | n | Picks |
|---|---|---|
| Property ownership | 10 | PROP-001, 002, 014, 015, 017, 026, 028; OWN-001, 002, 015 |
| Land use controls | 5 | PROP-021, 022, 023, 025; OWN-007 |
| Valuation | 8 | VAL-001, 003, 005, 011, 014, 016, 022, 026 |
| Financing | 10 | FIN-002, 003, 004, 006, 008, 009, 010, 012, 013, 014 |
| Contracts | 19 | CON-001, 002, 003, 004, 005, 006, 007, 009, 010, 011, 014, 015, 016, 018, 019, 020, 021, 022; OWN-013 |
| Agency | 13 | CON-026, 027, 031, 032, 033, 035, 036, 037, 038, 039, 040; PRAC-006, 007 |
| Property disclosures | 7 | DISC-001, 004, 007, 009, 011, 017, 020 |
| Property management | 3 | PRAC-011, 019, 020 |
| Transfer of title | 6 | OWN-017, 018, 019, 020, 024; FIN-016 |
| Practice of real estate | 12 | PRAC-003, 004, 005, 013, 014, 015, 016, 017, 018, 022, 023, 024 |
| Calculations | 7 | MATH-004, 005, 008, 011, 013, 014, 017 |

## Law sources (official current text)
Statutes from the Illinois General Assembly ILCS section pages (https://ilga.gov/legislation/ilcs/documents/<code>.htm, e.g. 022504540K15-45.htm); rules from the Illinois Administrative Code, 68 Ill. Adm. Code 1450, section index https://www.ilga.gov/agencies/JCAR/Sections?PartID=06801450 (section pages https://www.ilga.gov/commission/jcar/admincode/068/068014500G07500R.html and siblings). Local copies in the session scratchpad `re-il/dl/`.

- **Real Estate License Act of 2000, 225 ILCS 454** (scheduled repeal January 1, 2030), sections current through P.A. 104-852 (eff. 8-21-26, amending 5-50 and 10-25). Used: 1-10 (broker definition incl. assignable-contract pattern, team, brokerage agreement), 5-27, 5-35, 5-40, 5-50, 5-70, 10-5, 10-10, 10-15, 10-20, 10-25, 10-30, 10-45, 15-10, 15-15, 15-20, 15-25, 15-35, 15-45, 15-50, 15-55, 15-75, 20-20.
- **68 Ill. Adm. Code 1450** (many sections amended 49 Ill. Reg. 9512, eff. July 7, 2025): 1450.140, 1450.400, 1450.410, 1450.420, 1450.450, 1450.705, 1450.715, 1450.740, 1450.750, 1450.760, 1450.770, 1450.775, 1450.810, 1450.830.
- Homestead: 735 ILCS 5/12-901 (P.A. 104-120, eff. 1-1-26: $50,000 per individual, $100,000 cap for co-owners; was $15,000).
- Joint Tenancy Act: 765 ILCS 1005/1 and 1005/1c (P.A. 104-40, eff. 1-1-26; tenancy by the entirety for homestead only, both must sign).
- Condominium Property Act: 765 ILCS 605/22.1 (10 business days; text before and after P.A. 104-734 both say 10 business days).
- Real estate transfer tax: 35 ILCS 200/31-10 (state 50 cents per $500), 35 ILCS 200/31-5; county 55 ILCS 5/5-1031 (25 cents per $500).
- Plat Act: 765 ILCS 205/1.
- Illinois Human Rights Act: 775 ILCS 5/1-103, 5/3-102 (source of income, immigration status, arrest record), 5/3-106.
- Assistance Animal Integrity Act: 310 ILCS 120/5, 120/10.
- Security Deposit Return Act: 765 ILCS 710/1.
- Commercial Real Estate Broker Lien Act: 770 ILCS 15/5, 15/10.
- Radon Resistant Construction Act: 420 ILCS 52/15, 52/20.
- Illinois Radon Awareness Act: 420 ILCS 46/10, 46/20, 46/26 (P.A. 103-298).
- Residential Real Property Disclosure Act: 765 ILCS 77/5, 77/15, 77/20, 77/25, 77/35, 77/40 (P.A. 102-765: 5 business days).
- Landlord and Tenant Act flood disclosure: 765 ILCS 705/25 (P.A. 103-754).
- Case law: Chicago Bar Association v. Quinlan and Tyson, Inc., 34 Ill. 2d 116, 214 N.E.2d 771 (1966) (brokers may fill in blanks on customary offer and contract forms as an incident of brokerage).

## Item-to-source map
| Item | Source |
|---|---|
| REIL-ILLIC-001 | 225 ILCS 454/5-27(a)(5); Rule 1450.400 |
| REIL-ILLIC-002 | 225 ILCS 454/5-50(b), 5-70(b); Rules 1450.410, 1450.450(a)(2) |
| REIL-ILLIC-003 | 225 ILCS 454/5-40(b); Rule 1450.115(c) |
| REIL-ILLIC-004 | 225 ILCS 454/1-10 ("Broker", item (5), pattern of business) |
| REIL-ILACT-001 | 225 ILCS 454/15-10, 15-55 |
| REIL-ILACT-002 | 225 ILCS 454/15-75; Rule 1450.770(b) |
| REIL-ILACT-003 | 225 ILCS 454/10-25 |
| REIL-ILACT-004 | 225 ILCS 454/15-20, 15-25; Rule 1450.810 |
| REIL-ILACT-005 | 225 ILCS 454/15-25 |
| REIL-ILACT-006 | 225 ILCS 454/15-55 |
| REIL-ILACT-007 | 225 ILCS 454/10-30(d)-(f); Rule 1450.715(b) |
| REIL-ILACT-008 | 225 ILCS 454/10-30(a); Rule 1450.715(a)(2) |
| REIL-ILACT-009 | Rule 1450.740(a)-(c) |
| REIL-ILACT-010 | Rule 1450.750(d) |
| REIL-ILACT-011 | 225 ILCS 454/20-20(a)(17); Rule 1450.750(b) |
| REIL-ILACT-012 | 225 ILCS 454/20-20(a)(32), (33) |
| REIL-ILACT-013 | 225 ILCS 454/10-5(b), (d) |
| REIL-ILACT-014 | Rule 1450.775(b), (c) |
| REIL-ILACT-015 | 225 ILCS 454/10-45(a)(4), (b) |
| REIL-ILACT-016 | Chicago Bar Ass'n v. Quinlan and Tyson (1966) |
| REIL-ILLAW-001 | 735 ILCS 5/12-901 (P.A. 104-120) |
| REIL-ILLAW-002 | 765 ILCS 1005/1c |
| REIL-ILLAW-003 | 420 ILCS 52/15, 52/20 |
| REIL-ILLAW-004 | 765 ILCS 605/22.1(b) |
| REIL-ILLAW-005 | 35 ILCS 200/31-10; 55 ILCS 5/5-1031 |
| REIL-ILLAW-006 | 765 ILCS 205/1(a), (b) |
| REIL-ILLAW-007 | 775 ILCS 5/1-103, 5/3-102 |
| REIL-ILLAW-008 | 310 ILCS 120/5, 120/10(b), (d), (f) |
| REIL-ILLAW-009 | 765 ILCS 710/1(a), (c) |
| REIL-ILLAW-010 | 770 ILCS 15/5, 15/10(d) |
| REIL-ILDSC-001 | 225 ILCS 454/15-45(a)-(c) |
| REIL-ILDSC-002 | 225 ILCS 454/15-45(a) (statutory dual agency form) |
| REIL-ILDSC-003 | 225 ILCS 454/15-35(c) |
| REIL-ILDSC-004 | 225 ILCS 454/15-15(b); Rule 1450.830 |
| REIL-ILDSC-005 | 225 ILCS 454/10-30(c)(2) |
| REIL-ILDSC-006 | 225 ILCS 454/10-10(c); Rule 1450.760 |
| REIL-ILDSC-007 | 765 ILCS 77/20, 77/40(a) |
| REIL-ILDSC-008 | 765 ILCS 77/25(b), (c), 77/35 (definition of aware) |
| REIL-ILDSC-009 | 420 ILCS 46/10(a) |
| REIL-ILDSC-010 | 765 ILCS 705/25(b), (c) |

## National exclusions (reasons)
- RE-FIN-001 (deed of trust trustee and nonjudicial sale): Illinois practice is the mortgage with judicial foreclosure.
- RE-OWN-004 (community property): Illinois is not a community property state.
- RE-OWN-003 (tenancy by the entirety, stated generally): Illinois limits it to homestead property; covered by REIL-ILLAW-002 instead.
- RE-OWN-021 (12-year adverse possession period in the stem): states a statutory period that is not Illinois's (not re-verified here), so it could mislead.
- RE-CON-028 (transaction broker): Illinois codifies designated agency in Article 15 and has no transaction-broker status.
- RE-CON-029 (subagency offered through the MLS): barred by 225 ILCS 454/15-55.
- RE-PRAC-009 (net listing math): left out; net listings are not on the Illinois outline and their status was not verified.
- RE-PRAC-021 (vicarious liability of the employing broker): Article 15 displaces common law agency concepts (15-5, 15-60); left out to avoid a defensible second answer.
- RE-CON-017 (UETA): Illinois electronic-signature statute not checked, so the item was left out.
- RE-MATH-015 (seller prepaid the year's taxes): Illinois property taxes are paid in arrears, so the scenario misleads.
- Items worded around a "salesperson" or "employing broker" were either excluded (RE-VAL-027, RE-PRAC-001, RE-PRAC-002) or reworded (below).

## Overrides (wording only; keys unchanged)
| Item | Change | Reason / source |
|---|---|---|
| RE-FIN-013 | stem and options A, B: sponsored broker, sponsoring broker, managing broker; explanation adds 10-15(f) | Illinois has no salesperson license; 225 ILCS 454/10-15(f) |
| RE-CON-026 | explanation | 225 ILCS 454/15-45 |
| RE-CON-027 | stem: sponsoring broker names licensees; explanation | 225 ILCS 454/15-50, 15-55 |
| RE-CON-032 | stem: broker instead of salesperson | terminology |
| RE-CON-036 | stem drops "fiduciary"; explanation | Article 15 replaces common law fiduciary duties (15-5); 15-15(a)(2)(D) |
| RE-CON-037 | explanation | 225 ILCS 454/15-25 |
| RE-CON-039 | explanation | 225 ILCS 454/15-25, 15-15 |
| RE-CON-040 | explanation | 225 ILCS 454/15-35(c) |
| RE-CON-022 | explanation | Rule 1450.750(h) |
| RE-PRAC-005 | stem, options C, D: broker, sponsoring broker; explanation | 225 ILCS 454/10-20, 10-55; Rule 1450.705 |
| RE-PRAC-016 | stem: broker instead of salesperson | terminology |
| RE-PRAC-024 | stem: Illinois broker | terminology |
| RE-PRAC-014 | explanation: Illinois protects marital status | 775 ILCS 5/1-103(Q) |
| RE-FIN-003 | explanation: Illinois is a lien-theory state | |

## Category table
| Category | National | Illinois | Total |
|---|---|---|---|
| rePropertyCharacteristics | 11 | 1 | 12 |
| reOwnershipTitle | 10 | 4 | 14 |
| reValuation | 8 | 1 | 9 |
| reContractsAgency | 29 | 11 | 40 |
| rePractice | 17 | 13 | 30 |
| reDisclosures | 7 | 9 | 16 |
| reFinancing | 11 | 0 | 11 |
| reMath | 7 | 1 | 8 |
| **Total** | **100** | **40** | **140** |
