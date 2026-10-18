# New York Life, Accident and Health agent/broker exam (Series 17-55): sources (all accessed 2026-10-18)

## Official exam facts

| Fact | Value | Source |
|---|---|---|
| Regulator | New York State Department of Financial Services (DFS), headed by the superintendent of financial services (Financial Services Law 202) | https://www.dfs.ny.gov/apps_and_licensing/agents_and_brokers |
| Vendor | PSI Services LLC (PSI test centers in New York; DFS: "PSI Services provides all examination services") | DFS agents and brokers page above; PSI portal https://test-takers.psiexams.com/nyins |
| Exams | Life 17-51 (100 items, 2 h); Accident and Health 17-52 (100 items, 2 h); combined Life, Accident and Health 17-55 (150 items, 2.5 h), offered "for those wishing to apply for both the Life, and Accident and Health lines of authority at the same time" | New York Insurance Candidate Information Bulletin (PSI, "Updated 4/28/2023", the copy PSI currently serves): https://test-takers.psiexams.com/api/content/bulletin/7228 |
| Scored items | 150 scored on 17-55, plus 5 to 10 unscored experimental items | Bulletin, "Examination content outlines" and "Experimental items" |
| State vs general split | None. New York exams are integrated: every outline section cites New York Insurance Law and regulations alongside general concepts, and there is one score | Bulletin 17-55 outline |
| Pass mark | "You must get 70% correct to pass the examination" (raw percent, not scaled) | Bulletin, "Score reporting" |
| Prelicensing | 40 hours for Life/Accident and Health (Insurance Law 2103) | Bulletin p. 2; Ins. Law 2103 |
| Retakes | No same-day retest; may retest as soon as the second day after a failure | Bulletin, "Retaking a failed examination" |
| Apply within | Two years of passing | Bulletin, "Applying for a license" |

The bulletin PDF was downloaded with curl and checked as real text (pdftotext, 80 pages). It is dated April 2023; no newer New York bulletin could be found on the PSI portal or DFS site, and its outlines already include the current regulations (Reg 187 best interest, Reg 194, Reg 23 cybersecurity). Copy: session scratchpad `nysrc/bulletin7228.pdf`.

### 17-55 outline (150 items; percent x 150)
Insurance Regulation 7; General Insurance 4; Life Insurance Basics 8; Life Insurance Policies 8; Life Policy Provisions, Options and Riders 10; Annuities 7; Federal Tax Considerations 2; Qualified Plans 2; Life Settlement 3; Accident and Health Basics 5; Individual Health General Provisions 4; Disability Income 6; Medical Plans 6; ACA 6; Long-Term Care 6; Group Health and Blanket 5; Government Insurance Plans 5; Private Insurance for Senior Citizens and Special Needs 6 (sums to 100).

## Chosen form
150 items, the real combined 17-55 length, pass 70%. Because the exam has no separate state part, New York items were written wherever the outline cites New York law (licensing, Reg 194, 3105, 3205/3208/2611, 3209, Reg 60, Reg 187, life settlements, 3203, 3207, 3219, 3220, 3216, 3221, 3231, 4326, DBL/PFL, Reg 62 LTC, the Partnership, Child Health Plus, Medigap), and national items fill the general concepts.

Outline percent x 150, rounded, mapped to the family's categories:

| Category | Outline areas (items) | National | New York | Total |
|---|---|---|---|---|
| insuranceRegulation | Regulation (11) | 3 | 8 | 11 |
| generalInsurance | General Insurance (6) | 5 | 1 | 6 |
| lifeBasics | Life Basics (12) + Life Settlement (5) | 6 | 11 | 17 |
| lifePolicyTypes | Life Policies (12) | 10 | 2 | 12 |
| lifeProvisions | Provisions, Options, Riders (15) | 12 | 3 | 15 |
| annuitiesRetirement | Annuities (10) + Tax (3) + Qualified Plans (3) | 14 | 2 | 16 |
| healthBasics | A&H Basics (7) + Medical Plans (9) | 10 | 6 | 16 |
| healthProvisions | Individual Provisions (6) + ACA (9) + Group (8) | 16 | 7 | 23 |
| healthPolicyTypes | Disability (9) + LTC (9) + Government (7) + Seniors (9) | 25 | 9 | 34 |
| Total | | 101 | 49 | 150 |

National picks by area: regulation 3 (alien insurer reworded for New York, FCRA, 18 USC 1033); general insurance 5 (morale hazard, mutual insurer, unilateral, concealment, statement of good health); life basics 6 (insurable interest, needs approach, estate liquidity, key person, cross purchase, group life conversion); policy types 10 (term variants, conversion, whole life, limited pay, UL, UL option B, variable licensing, IUL); provisions 12; annuities 7 product items, 4 tax, 3 qualified plan; health basics 10; health provisions 16 (uniform provisions that match 3216, COBRA, ACA); health policy types 25 (disability 10, major medical 3, Medicare 5, Medigap 3, Medicaid 1, LTC 3).

## Law sources
New York statutes were read on the Senate's official Open Legislation pages, https://www.nysenate.gov/legislation/laws/<LAW>/<section> (ISC = Insurance Law, FIS = Financial Services Law, WKC = Workers' Compensation Law, PBH = Public Health Law), each page checked for its "most recent revision" date. The pages sit behind a Cloudflare challenge for curl, so they were read with a browser-style fetch; nothing rests on a challenge page. Regulations (11 NYCRR) were read on Cornell LII's mirror of the official NYCRR (https://www.law.cornell.edu/regulations/new-york/11-NYCRR-<part.section>), with each page's NYS Register history note checked. DFS pages and the Department of Health Partnership brochure were downloaded with curl.

Changes watched for: Ins. Law 2103 revised 2023-04-07, 2137 revised 2023-04-07, 3209 revised 2023-01-06, 3231 revised 2023-10-27 (a further version takes effect 2028-12-28, not relevant to the facts used), 11 NYCRR Part 20 CE topics amended 2021, Reg 79 not used here. No item rests on a figure changed in 2025-2026.

## Item-to-source map
| Item | Source |
|---|---|
| LHNY-NYLIC-001 | Financial Services Law 202 |
| LHNY-NYLIC-002 | Ins. Law 2103(j) |
| LHNY-NYLIC-003 | Ins. Law 2132(c); 11 NYCRR Part 20 topic hours per DFS CE page https://www.dfs.ny.gov/apps_and_licensing/agents_and_brokers/continuing_education |
| LHNY-NYLIC-004 | Ins. Law 2134(a) |
| LHNY-NYLIC-005 | Ins. Law 2110(j); 2110(i) in explanation |
| LHNY-NYLIC-006 | Ins. Law 2109(e) |
| LHNY-NYMKT-001 | Ins. Law 405(a) |
| LHNY-NYMKT-002 | 11 NYCRR 30.3(a), (b) (Reg 194) |
| LHNY-NYCON-001 | Ins. Law 3105(b), (c) |
| LHNY-NYUND-001 | Ins. Law 3205(c) |
| LHNY-NYUND-002 | Ins. Law 3208(a), (b) |
| LHNY-NYUND-003 | Ins. Law 2611(a), (b) |
| LHNY-NYSAL-001 | Ins. Law 3209(b) |
| LHNY-NYSAL-002 | 11 NYCRR 51.6(d) (Reg 60) |
| LHNY-NYSAL-003 | 11 NYCRR 224.4 (Reg 187); 30.3(b) for the Reg 194 contrast |
| LHNY-NYLS-001 | Ins. Law 7813(j) |
| LHNY-NYLS-002 | Ins. Law 7813(g) |
| LHNY-NYLS-003 | Ins. Law 7814(a)(8) |
| LHNY-NYLS-004 | Ins. Law 7815(a), (c) |
| LHNY-NYLS-005 | Ins. Law 2137(f)(1)(A) |
| LHNY-NYTYP-001 | Ins. Law 3207(b) |
| LHNY-NYTYP-002 | Ins. Law 3220(a) (conversion notice paragraph) |
| LHNY-NYPRV-001 | Ins. Law 3203(a)(1) |
| LHNY-NYPRV-002 | Ins. Law 3203(a)(11); 11 NYCRR 51.6(d) |
| LHNY-NYPRV-003 | Ins. Law 3203(a)(10) |
| LHNY-NYANN-001 | Ins. Law 3219(a) |
| LHNY-NYANN-002 | 11 NYCRR 51.6(b) |
| LHNY-NYMED-001 | Ins. Law 3231(a) (4317(a) for Article 43 corporations) |
| LHNY-NYMED-002 | Ins. Law 3231(a) |
| LHNY-NYMED-003 | Ins. Law 3216(a)(4) |
| LHNY-NYMED-004 | Ins. Law 3216(a)(4)(C) |
| LHNY-NYMED-005 | Ins. Law 3216(c)(4)(C) |
| LHNY-NYMED-006 | Ins. Law 3216(c)(4)(A) |
| LHNY-NYHPR-001 | Ins. Law 3216(d)(1) grace period |
| LHNY-NYHPR-002 | Ins. Law 3216(d)(1) time limit on certain defenses |
| LHNY-NYHPR-003 | Ins. Law 3216(d)(1) proofs of loss ("within one hundred twenty days after the date of such loss") |
| LHNY-NYHPR-004 | Ins. Law 3216(d)(1) legal actions |
| LHNY-NYHPR-005 | Ins. Law 3221(e) |
| LHNY-NYHPR-006 | Ins. Law 3221(m) |
| LHNY-NYHPR-007 | Ins. Law 3221(m) |
| LHNY-NYHPT-001 | Workers' Comp. Law 204, 205 |
| LHNY-NYHPT-002 | Workers' Comp. Law 204, 205 |
| LHNY-NYHPT-003 | NYS Partnership for Long-Term Care 2026 brochure, https://nyspltc.health.ny.gov/docs/2026_brochure.pdf; 11 NYCRR Part 39 |
| LHNY-NYHPT-004 | 11 NYCRR 52.25(b)(2) |
| LHNY-NYHPT-005 | 11 NYCRR 52.25(c)(3) |
| LHNY-NYHPT-006 | 11 NYCRR 52.25(c)(7) |
| LHNY-NYHPT-007 | Ins. Law 4326 |
| LHNY-NYHPT-008 | Public Health Law 2511 |
| LHNY-NYHPT-009 | Ins. Law 3231(a) |

## National overrides (text only, keys unchanged)
- LH-REG-002: stem moved from Florida to New York; explanation cites Ins. Law 107(a) (alien = organized under the laws of a foreign nation).
- LH-HLTH-009: explanation said ACA premiums may vary by age and tobacco; New York community rating (3231) bans both, so the explanation now says so.
- LH-HTYP-023: explanation said insurers "in most states may underwrite" after the six-month window; it now adds that New York requires year-round acceptance at community rates (3231).
- LH-HTYP-028: explanation now describes New York Partnership protection (dollar for dollar or total asset) and cites 11 NYCRR 52.25.
- LH-HPRV-001: explanation now cites Ins. Law 3216(d)(1) (7/10/31-day grace periods, which match).

## National exclusions (conflict with New York law)
- LH-PROV-004: keyed $98,800 (face minus the full annual premium). Ins. Law 3203(a)(2) limits the grace-period deduction to the unpaid premium for the period ending with the policy month of death, so the New York answer would differ.
- LH-HPRV-003: keys 90 days for proof of loss; New York 3216(d)(1) requires 120 days for non-periodic claims (90 only for periodic benefits).
- LH-LIFE-018: calls the seller a "viator"; New York's Article 78 replaced viatical terminology with life settlements and the "owner".
- LH-PROV-011 (free look "varies"), LH-PROV-005 (reinstatement, replaced by the New York 3-year item), LH-TYPE-021 and the COBRA-only continuation framing were left out for space or overlap, not conflict.

## Checked and left alone
Life incontestability 2 years (3203(a)(3)), misstatement of age (3203(a)(5)), suicide exclusion 2 years (3203(b)), group life conversion 31 days (3220), health reinstatement 45/10 days and time limit 2 years (3216(d)(1)), monthly grace 10 days, LTC guaranteed renewable and no prior hospitalization (11 NYCRR 52.25), and federal items (FCRA, 1033, COBRA, Medicare, tax, SECURE 2.0) match.

## Facts deliberately not used
- Rebating: 2324 allows gifts up to $25; dollar trivia, not asked.
- Disability Benefits Law weekly maximum ($170) and PFL dollar caps: change or are dollar trivia; only percentages and weeks are asked.
- Healthy NY wage threshold and Child Health Plus FPL percentage: adjusted over time; not asked as the key.
