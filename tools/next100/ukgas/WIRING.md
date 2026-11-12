# Wiring notes for `ukgas` (Gas Safe ACS CCN1 knowledge, v1)

Bank only. Built by `python3 -I tools/next100/ukgas/build.py data/uk-gas-safe-acs-questions.json`.
Validator (PASS):

```
python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/uk-gas-safe-acs-questions.json \
  --pool ukgasLaw=24 --pool ukgasEmergency=16 --pool ukgasCombustion=16 --pool ukgasCo=16 \
  --pool ukgasVent=16 --pool ukgasTightness=20 --pool ukgasMeters=16 --pool ukgasUnsafe=20 \
  --pool ukgasDevices=16 --pool ukgasFlues=20 --pool ukgasAppliances=20
```

Spec in `spec.json` (categories, blueprint, five topic training sets, hue `194 95% 47%`, borrow the
`caplumb` tiger). Pass 70% is Tigertest's readiness line: no ACS pass mark or question count is
published.

## (a) CLAUDE.md bullet

- **Gas Safe ACS** (`ukgas`, the knowledge side of the ACS CCN1 core domestic gas safety assessment under the Nationally Accredited Certification Scheme, which gas engineers need, with the appliance assessments, to register with Gas Safe Register, `/gas-safe-acs/*`, landing `/gas-safe-acs-ccn1-practice-test`): `data/uk-gas-safe-acs-questions.json` (200 original questions on the 16 competence sections of the IGEM Standard Setting Body's CCN1 Safety Assessment Criteria, Issue 20.1: gas safety legislation (GSIUR 1998 and HSE L56 5th ed.: competence, Gas Safe registration, regs 5 to 8, 26, 35, landlords' reg 36 and 36A) 24, gas emergency actions (reg 37, 0800 111 999, GS(M)R, IGEM/G/11 gas incidents) 16, combustion and gas properties (UKHSA: methane SG 0.55, 5 to 15%; propane SG 1.6, 2.1 to 9.5%) 16, carbon monoxide (HSE signs and symptoms, AD J 2022 alarm siting, England's 2022 landlord alarm rule) 16, ventilation 16, tightness testing and purging (the criteria's 7 to 10 mbar let-by, 20 to 21 mbar, 1 minute stabilisation, 2 minute test, 0.25/0.2 mbar perceptible movement, MP with and without MIV, reg 22) 20, meters, regulators and ECVs (regs 2, 9, 12 to 16, 18; LPG 37 and 28 mbar) 16, unsafe situations (IGEM/G/11 Ed 2 with 2022 and 2024 amendments: ID and AR, turn-off order, DANGER DO NOT USE, warning notices, RIDDOR 11(2) within 14 days) 20, gas safety devices and controls 16, chimneys and flues (reg 27, 32, L56 Appendix 3 flue flow and spillage tests, AD J Table 5) 20, appliance installation (regs 26, 28 to 30, 33, gas rate and heat input sums, combustion analysis) 20), test IDs 27001-27004 (50 questions each), sets 27001-27005 (by topic: legislation and emergency actions 40, combustion, CO and ventilation 48, chimneys and appliances 40, tightness testing and meters 36, unsafe situations and safety devices 36), state `UKGAS`, prefix `UKGAS-`, 70% readiness line (Tigertest's: certification bodies run ACS as practical plus theory assessments and publish no question count, time or pass mark). 6/4/4/4/4/5/4/5/4/5/5 per test, Tigertest's split over the criteria's sections (no official weights). The practical assessment (pipework, live tightness testing, combustion analysis, appliance work) is not modelled. Great Britain law (GSIUR extends to England, Wales and Scotland; Northern Ireland has its own regulations); Building Regulations items are England's Approved Document J. No fees, CPD, registration costs or paid-standard figures (IGEM/UP/1B permitted drops, purge volumes, BS 5440 vent sizes per kW, terminal distances); the 21 mbar meter outlet figure was dropped because Issue 20.1 removed it. Kept clear of `uk18ed`, `cscs`, `osha`, `caplumb`, `nhie` and the sibling `ukwater`, `ukg3` and `ukplumb` banks. Built by `tools/next100/ukgas/build.py`; sources in `tools/next100/ukgas/sources.md`. Region UK, hub group "UK workplace and trade certificates", `[data-theme="ukgas"]` bright flame blue (194 95% 47%; check against globals.css when wiring), borrows the `caplumb` tiger, teacher-led (gas training centres and colleges running ACS preparation).

## (b) lib/examFacts.ts entry (draft content)

Answer paragraph:
"The ACS CCN1 assessment is the core domestic gas safety assessment of the Nationally Accredited
Certification Scheme (ACS). Gas engineers in Great Britain who want to join Gas Safe Register show
their competence either by a recognised qualification or by passing CCN1 plus the appliance
assessments they need (for example CENWAT for boilers) at a UKAS-accredited certification body's
assessment centre. Assessments combine practical tasks and theory, and certificates are renewed
every five years. Tigertest's practice tests cover the knowledge side: the Gas Safety
(Installation and Use) Regulations 1998, the HSE L56 code of practice, the unsafe situations
procedure (IGEM/G/11), combustion and carbon monoxide, ventilation, flues, tightness testing,
meters and safety devices. The practical assessment is not modelled."

Facts rows:
- Who sets it: IGEM's Standard Setting Body (scheme owner: the ACS Strategic Management Board); assessments run by UKAS-accredited certification bodies at ACS assessment centres
- What it leads to: a certificate of competence that Gas Safe Register recognises for registration
- Format: practical and theory assessments against the CCN1 criteria (Issue 20.1); no official question count, time or pass mark is published
- Renewal: every 5 years, by ACS reassessment or the Group Competency Scheme
- Law covered: Gas Safety (Installation and Use) Regulations 1998 as amended (England, Wales and Scotland)
- Tigertest practice: 4 tests of 50, 5 topic training sets, 70% readiness line
- Source: IGEM, "Assessment", https://www.igem.org.uk/technical/standard-setting-body/assessment.html, and CCN1 Safety Assessment Criteria Issue 20.1, checked 12 November 2026; HSE L56 (5th ed., 2018)

## (c) Landing FAQ

1. **What is ACS CCN1?** It is the core domestic natural gas safety assessment of the Nationally
   Accredited Certification Scheme. Passing it, with the appliance assessments for the work you
   do, gives a certificate of competence that Gas Safe Register accepts for registration.
2. **Does this practice test cover the practical assessment?** No. It covers the knowledge side:
   the law, L56, the unsafe situations procedure, combustion, CO, ventilation, flues, tightness
   testing, meters and safety devices. Pipework, live testing and appliance work are assessed
   hands-on at the assessment centre.
3. **What pass mark should I aim for?** The scheme does not publish a percentage for the theory
   papers. Tigertest uses 70% as a readiness line; aim well above it, because a single wrong call
   on an Immediately Dangerous situation matters more than a score.
4. **Which rules does it follow?** The Gas Safety (Installation and Use) Regulations 1998 as
   amended and HSE's L56 code of practice, IGEM/G/11 Edition 2 (with the 2022 and 2024
   amendments), the CCN1 criteria Issue 20.1 and, for building rules, England's Approved Document
   J. Northern Ireland has its own regulations.
5. **How often do gas engineers have to be reassessed?** ACS certificates are renewed every five
   years, through ACS reassessment or the Group Competency Scheme.

## (d) Catalog

- Blurb: "Practise the knowledge side of the ACS CCN1 core domestic gas safety assessment: GSIUR, L56, unsafe situations, CO, ventilation, flues and tightness testing."
- Org line: "ACS · core domestic gas safety (CCN1)"
- Search aliases: "gas safe acs ccn1 core gas safety domestic gas engineer gas safe register gsiur l56 tightness test unsafe situations giusp igem g11 acs reassessment gas fitter corgi"
