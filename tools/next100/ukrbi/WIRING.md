# Wiring for `ukrbi` (Registered Building Inspector, England, v1)

Bank only. Files written: `data/uk-registered-building-inspector-questions.json` (built by
`python3 -I tools/next100/ukrbi/build.py`), `tools/next100/ukrbi/{spec.json,sources.md,build.py,q_reg.py,q_proc.py,q_hrb.py,q_enf.py}`.
Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/uk-registered-building-inspector-questions.json --pool ukrbiRegistration=24 --pool ukrbiConduct=28 --pool ukrbiProcedure=28 --pool ukrbiDutyholders=24 --pool ukrbiHrb=28 --pool ukrbiEnforcement=24 --pool ukrbiOperational=28 --pool ukrbiLawSafety=16` prints PASS (key-longest 6%, key>1.2x 4%, letters 50 each).

Config: id `ukrbi`, stateCode `UKRBI`, idBase 27100 (tests 27101-27104, sets 27101-27104), prefix `UKRBI-`,
slug `/building-inspector`, landing `/registered-building-inspector-practice-test`, passPct 70 (readiness line),
icon `hardhat`, theme `[data-theme="ukrbi"]` 200 55% 30% (deep steel blue), borrow the `nhie` tiger, region UK,
hub group "UK workplace and trade certificates", teacher-led yes.

Blueprint (Tigertest's split; BSR publishes no weights): ukrbiRegistration 6, ukrbiConduct 7, ukrbiProcedure 7,
ukrbiDutyholders 6, ukrbiHrb 7, ukrbiEnforcement 6, ukrbiOperational 7, ukrbiLawSafety 4.

Category labels: Registration, Classes & Restricted Activities; Code of Conduct; Building Control Procedure;
Dutyholders & Competence; Higher-Risk Buildings; Enforcement & Dangerous Structures; Operational Standards & Inspection;
Wider Law, Guidance & Safety.

Training sets (topic sets, last one smallest):
1. 27101 "Registration and Code of Conduct": ukrbiRegistration, ukrbiConduct (52)
2. 27102 "Building Control Functions": ukrbiProcedure, ukrbiDutyholders (52)
3. 27103 "Inspections and Enforcement": ukrbiEnforcement, ukrbiOperational (52)
4. 27104 "Higher-Risk Buildings and Safety": ukrbiHrb, ukrbiLawSafety (44)

## (a) CLAUDE.md bullet
- **Registered Building Inspector** (`ukrbi`, competence knowledge for registration as a building inspector in England under Part 2A of the Building Act 1984 as inserted by the Building Safety Act 2022, `/building-inspector/*`, landing `/registered-building-inspector-practice-test`): `data/uk-registered-building-inspector-questions.json` (200 original questions: registration, classes 1 to 4, categories A to H and restricted activities 24, the RBI code of conduct (England) 28, building control procedure (building notice and full plans, 5-week determination, notices of starting (2 days) and commencement (5 days), regulation 46A commencement, 3-year lapse, completion, regularisation, RBCA initial notices) 28, Part 2A dutyholders and competence 24, higher-risk buildings (BSR as building control authority, gateways 2 and 3, 12/8/6/8-week periods, major and notifiable changes, mandatory occurrence reporting, golden thread) 28, enforcement (ss35, 35B, 35C, 36 with its 10-year limit, 77, 78, 80, 81) 24, operational standards rules and inspection practice (15-year records, 5 working days, geo-tagged evidence, BICoF levels) 28, wider law, guidance and safety (s6, s7, s8, Limitation Act s4B, RRFSO, CDM, Building Bulletins, HTMs) 16), test IDs 27101-27104, sets 27101-27104 (by topic), state `UKRBI`, prefix `UKRBI-`, 70% readiness line (Tigertest's: BSR publishes no assessment format; competence is assessed by BSR-approved independent schemes, each with its own method, and repeated at least every 4 years). 6/7/7/6/7/6/7/4 per test, Tigertest's split around the BICoF subject areas. England only (Wales has its own code, framework and appeals), law as in force 12 November 2026, including BSR's move out of HSE on 27 January 2026 and the code, BICoF and OSR wording updates of 22 May 2026; no fees, fines, CPD hours or the building safety levy; Approved Document values left to `ukbregs`. Built by `tools/next100/ukrbi/build.py`; sources in `tools/next100/ukrbi/sources.md`. Region UK, hub group "UK workplace and trade certificates", `[data-theme="ukrbi"]` deep steel blue (200 55% 30%), borrows the home inspector tiger, teacher-led (training providers).

## (b) lib/examFacts.ts entry (draft)
Answer: "To work as a building inspector in England (assessing plans, inspecting building work, or advising a building control body) you must be on the Building Safety Regulator's register. Class 1 is a supervised trainee; classes 2 and 3 must pass an independent competence assessment from a BSR-approved scheme, based on the Building Inspector Competence Framework, and repeat it at least every 4 years. Class 2 covers buildings under 18 m (categories A to F); class 3 adds non-standard and higher-risk buildings (G and H); class 4 is a technical manager. Every RBI must follow the BSR code of conduct. Each scheme sets its own assessment method, so Tigertest's 70% is a readiness line, not an official pass mark."
Facts rows:
- Who regulates it: Building Safety Regulator (standalone body since 27 January 2026, sponsored by MHCLG)
- Who assesses: BSR-approved independent competence schemes
- Classes: 1 trainee, 2 (A to F), 3 (G, H incl. HRBs), 4 technical manager
- Registration: 4 years; competence reassessed at least every 4 years
- Rules: Building Act 1984 Part 2A, BICoF, RBI code of conduct, operational standards rules
- Pass mark: set by each scheme (none published by BSR); Tigertest target 70%
- Source: gov.uk "Registered building inspectors", https://www.gov.uk/guidance/registered-building-inspectors (checked 2026-11-12), and the BICoF and code at https://www.gov.uk/government/publications/registered-building-inspectors-professional-codes-and-standards (last updated 22 May 2026)

## (c) Landing FAQ
1. Q: Do I need to register to work as a building inspector? A: Yes. In England it is a criminal offence to assess plans, inspect building work or advise a building control body on its regulated functions without being registered with the Building Safety Regulator.
2. Q: Which class do I need? A: Class 1 is for trainees working under supervision. Class 2 lets you work alone on buildings under 18 m (categories A to F). Class 3 adds non-standard and higher-risk buildings (G and H). Class 4 is for technical managers who already hold class 2 or 3.
3. Q: How is competence assessed? A: Classes 2 and 3 need a certificate from an independent, BSR-approved competence scheme, assessed against the Building Inspector Competence Framework. Each scheme sets its own method, and you must be reassessed at least every 4 years.
4. Q: What does this practice test cover? A: Registration and the code of conduct, building control procedure under the Building Regulations 2010, dutyholders and competence, the higher-risk building regime, enforcement notices, dangerous structures and demolition, the operational standards rules and the wider law an inspector works within. Technical Approved Document values are covered in our Building Regulations test.
5. Q: Does it cover Wales? A: No. It follows the law and BSR documents for England. Wales has its own register categories, code of conduct and appeal routes, run by the Welsh Ministers.

## (d) Catalog
- Blurb: "Practise the law, procedure and conduct rules every registered building inspector in England is assessed on."
- Org line: "Building Safety Regulator · RBI competence"
- Search aliases: "rbi registered building inspector building control inspector bicof building safety regulator bsr competence assessment class 2 class 3 building control surveyor building safety act"
