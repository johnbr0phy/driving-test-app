# Sources for `cpaisc` (Uniform CPA Examination, Information Systems and Controls discipline section)

All 200 questions are original, written by Tigertest from the AICPA's published ISC blueprint and
the standards, regulations and frameworks the blueprint lists as references. No AICPA released
question, sample test, commercial review course or app item was used. Checked 2026-11-19.

## Exam format and outline (official)
- AICPA, "Uniform CPA Examination Blueprints", effective January 1, 2026,
  https://assets.ctfassets.net/rb9cdnjh59cm/5d2r66sSSE8wJRZTqAshlE/f97ec39c394eeb61b20a5824784306df/CPA_Exam_Blueprints_2026.pdf
  linked from https://www.aicpa-cima.com/resources/download/learn-what-is-tested-on-the-cpa-exam,
  downloaded and read 2026-11-19 (Introduction pages 2 to 3 and ISC pages ISC1 to ISC16):
  - ISC is one of three Discipline sections (BAR, ISC, TCP).
  - 4 hours; 82 multiple-choice questions in two testlets of 41 and 6 task-based simulations
    (testlets of 1, 3 and 2). MCQs are 60% and TBSs 40% of the score (the other sections are 50/50).
  - Content areas: I Information Systems and Data Management 35-45%; II Security,
    Confidentiality and Privacy 35-45%; III Considerations for System and Organization Controls
    (SOC) Engagements 15-25%.
  - Skills: Remembering and Understanding 55-65%, Application 20-30%, Analysis 10-20%,
    Evaluation not tested.
  - The ISC references limit eligible content: AICPA Trust Services Criteria (2017, revised
    points of focus 2022), the 2018 SOC 2 description criteria, the SOC 1 and SOC 2 guides and
    the SSAEs; CIS Controls v8.1 (overview of each control); COSO cloud, blockchain and cyber
    guidance; HIPAA 45 CFR 164.103 to 164.530 excluding implementation specifications and
    compliance dates, with the definitions in 160.103 and 162.103; COBIT 2019 Framework
    Introduction and Methodology chapters 1 to 5; NIST CSF; NIST Privacy Framework
    (introduction, basics, glossary); NIST SP 800-53 Rev. 5 chapters 1 and 2; PCI DSS v4.x
    quick reference and introduction (goals and requirements); GDPR Articles 4 to 34; and
    textbooks on AIS, data management, IT audit, information security and incident response.
- AICPA, "Summary of Changes to the Exam Blueprints effective 01/01/2027",
  https://assets.ctfassets.net/rb9cdnjh59cm/5CsrSRU2mFGsmWEo9FqwLy/83e5ec97beab5daff376dba518589e75/Summary_of_Changes_to_the_Exam_Blueprints_effective_01012027.pdf
  (fetched 2026-11-19): for ISC, removes "Blockchain and Internal Control: The COSO Perspective"
  from the references, removes the task on using COSO to evaluate blockchain risks, and revises
  the ERP task to "recognize other systems with which they interact (e.g., blockchain, electronic
  data interchange)". The AICPA says the revisions are not intended to significantly change the
  scope of ISC. The bank has no COSO-blockchain item, so it fits both the 2026 and 2027 blueprints.
- Scoring: NASBA, "Score Information", https://nasba.org/exams/cpaexam/scores/ (as for cpafar,
  cpatcp and cpabar): scores 0 to 99, 75 passes, and 75 is a scaled score, not 75% correct.

## Attestation standards (AICPA primary text)
- AICPA, "AICPA SSAEs - currently effective", combined AT-C sections PDF,
  https://assets.ctfassets.net/rb9cdnjh59cm/5iAvJCRsZitbYGkL87ptLh/28734e53f84bfedcf278b5f70ba285a0/ps-at-c-sections.pdf
  linked from https://www.aicpa-cima.com/resources/download/aicpa-ssaes-currently-effective,
  fetched 2026-11-19 (includes SSAE No. 23 conforming changes, April 2026):
  - AT-C 320 (SOC 1): objectives; definitions of carve-out and inclusive methods, CSOCs, CUECs,
    control objectives, type 1 and type 2 reports, subservice organization (and .A9, a
    subservice organization's own provider is also one), user auditor and user entity;
    preconditions and management's responsibilities including identifying risks (.10);
    inclusive method representations (.11, .37); written assertion and withdrawal (.13);
    description criteria (.15); materiality (.19, .A28 to .A30); changes in the system and
    superseded controls (.29); prior-period evidence not a basis for reduced testing (.28);
    inquiry combined with inspection, observation or reperformance (.31); deviations and fraud
    (.32 to .33); subsequent events (.35); written representations and refusal as a scope
    limitation (.36 to .38); type 1 and type 2 report elements including the independent title,
    CUEC and carve-out statements, the description of tests with deviations, the restricted-use
    alert and the report date (.40 to .41); modified opinions and disclaimers (.42 to .44); the
    service auditor need not be independent of each user entity (.A12).
  - AT-C 205.49 to .51: subsequent events, subsequently discovered facts, written representations.
  - AT-C 105: suitable criteria attributes (also quoted in the TSC).
- AICPA, TSP Section 100, "2017 Trust Services Criteria for Security, Availability, Processing
  Integrity, Confidentiality, and Privacy" (AICPA's own PDF, March 2020 edition, as reposted at
  https://arpio.io/wp-content/uploads/2020/08/trust-services-criteria.pdf , fetched 2026-11-19;
  the AICPA download at
  https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022
  needs an account). The 2022 revision changed points of focus only, not the criteria, so the
  criteria text read is current. Used: the five categories and their definitions; privacy vs
  confidentiality (.09); alignment to the 17 COSO principles and the supplemental criteria to
  principle 12 (.05); common criteria complete for security (.07); subject matters including
  SOC for Cybersecurity, SOC 2 type 1 and 2 and SOC 3 (.11); commitments and system
  requirements (.14); points of focus not required (.04); CC6.2, CC7.3, CC7.4, A1.1 to A1.3,
  C1.1 to C1.2, PI1.1 to PI1.5, P6.1.
- AICPA, "SOC 3 - SOC for Service Organizations: Trust Services Criteria for General Use Report",
  https://www.aicpa-cima.com/category/resources/audit-assurance/audit-and-assurance-greater-than-soc-3
  (title checked via search 2026-11-19; the page body did not render): SOC 3 is the general use
  report.

## Security, privacy and IT frameworks and law
- NIST CSWP 29, The NIST Cybersecurity Framework (CSF) 2.0, February 26, 2024,
  https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf (fetched 2026-11-19): six Functions
  with Govern new; Core, Profiles and Tiers; Current and Target Profiles and gap analysis; Tier 1
  Partial to Tier 4 Adaptive.
- NIST Privacy Framework Version 1.0, January 16, 2020,
  https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.01162020.pdf (fetched 2026-11-19): three parts,
  Core, Profiles and Implementation Tiers. Function names are not asked because a 1.1 revision
  has been in draft.
- NIST SP 800-53 Rev. 5, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf
  (fetched 2026-11-19): 20 control families, 17 aligned with FIPS 200; baselines moved to SP 800-53B.
- CIS, "CIS Critical Security Controls v8.1 list", https://www.cisecurity.org/controls/cis-controls-list
  (fetched 2026-11-19): names and overviews of Controls 1 to 18.
- ISACA, "A New COBIT Is in Town" (2018),
  https://www.isaca.org/resources/news-and-trends/industry-news/2018/a-new-cobit-is-in-town-and-i-really-like-how-it-looks
  and "COBIT 2019 and COBIT 5 Comparison" (2020),
  https://www.isaca.org/resources/news-and-trends/industry-news/2020/cobit-2019-and-cobit-5-comparison
  (both fetched 2026-11-19): the seven components of a governance system; design factors; six
  governance system principles and three framework principles (counts only). The COBIT 2019
  framework PDF itself needs an ISACA login, so principle names are not asked.
- PCI SSC, "Payment Card Industry Data Security Standard: Requirements and Testing Procedures,
  v4.0.1" (June 2024), the Council's PDF as hosted at
  https://www.middlebury.edu/sites/default/files/2025-01/PCI-DSS-v4_0_1.pdf (fetched 2026-11-19;
  the Council's document library needs a license click-through): Table 1, the 12 principal
  requirements under six goals; account data, cardholder data and sensitive authentication
  data; sensitive authentication data not stored after authorization even if encrypted.
- eCFR, 45 CFR Part 164, https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164
  (fetched 2026-11-19 through the eCFR renderer): 164.103 and 164.304 definitions (security
  incident), 164.402 breach definition and low-probability risk assessment, 164.404 to 164.408
  notification standards (media for more than 500 residents of a state), 164.502(b) minimum
  necessary and its treatment exception; 45 CFR 160.103 covered entity and health plan
  definitions.
- GDPR, Regulation (EU) 2016/679, Articles 4, 5, 6, 12, 33 and 34, official text as reproduced
  at https://gdpr-info.eu/art-5-gdpr/ and the matching article pages (fetched 2026-11-19;
  EUR-Lex https://eur-lex.europa.eu/eli/reg/2016/679/oj refused automated requests): Article 4(5)
  pseudonymisation; the six Article 5(1) principles; Article 6(1) lawful bases; Article 12(3) one
  month, extendable by two; Article 33 72 hours and the processor's duty; Article 34.
- NIST SP 800-145, The NIST Definition of Cloud Computing,
  https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf (fetched
  2026-11-19): essential characteristics, IaaS, PaaS, SaaS, deployment models.
- NIST SP 800-34 Rev. 1, Contingency Planning Guide,
  https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf (fetched
  2026-11-19): BIA three steps, MTD, RTO, RPO, full, incremental and differential backups.
- NIST SP 800-40 Rev. 4, Enterprise Patch Management Planning,
  https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-40r4.pdf (fetched 2026-11-19).
- NIST SP 800-61 Rev. 3, Incident Response Recommendations,
  https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf (fetched
  2026-11-19): definitions of event and cybersecurity incident. Not an ISC reference itself;
  used only for the event versus incident distinction the blueprint asks for.
- COSO, Internal Control - Integrated Framework (2013) five components and 17 principles, as
  restated in COSO's own ICSR guidance, https://www.coso.org/_files/ugd/3059fc_a3a66be7a48c47e1a285cef0b1f64c92.pdf
  (fetched 2026-11-19).

## Textbook-level topics
The blueprint names textbooks as references for IT architecture, AIS cycles and application
controls, change management, conversion approaches, data storage and schemas, SQL, BPMN and
DFDs, attack types and stages, authentication and authorization models, encryption and
incident response phases. Those items use standard definitions. Every SQL result is computed
by running the query against the stem's data in SQLite inside `q_dat.py`, and every computed
key (availability percentages, restore counts, row counts) is asserted by `build.py`.

## Modelling
- Four 50-question multiple-choice mock tests: Area I 20, Area II 20, Area III 10 (40/40/20%,
  inside the 35-45/35-45/15-25 ranges). The split inside each area is Tigertest's. Pools are
  four times the per-test counts, so no item repeats across tests. The 75% target is a
  readiness line, not a pass mark.
- Task-based simulations, document review and research tasks are not modelled; the landing
  says so.

## Left out on purpose
- CCPA and other state privacy laws: not in the ISC references.
- HIPAA implementation specifications (including the 60-day and 30-day timing rules) and
  compliance dates: excluded by the blueprint.
- COSO cloud, cyber and blockchain guidance specifics: those PDFs were not loaded; the
  blockchain task leaves the blueprint in 2027.
- COBIT principle names and NIST Privacy Framework function names (see above).
- Kept clear of the `cpaaud`, `cpabar`, `cpafar`, `cpareg`, `cpatcp`, `cisa`, `cissp`, `secplus`
  and `cysa` banks: every item was compared by stem and key; seven that matched a sibling's
  scenario and answer (pretexting by a help desk caller, SaaS customer duties, fictitious
  employee payroll control, report dating, referential integrity, COBIT EDM, lessons-learned
  phase) were replaced.
