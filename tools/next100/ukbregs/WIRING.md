# Wiring for `ukbregs` (Building Regulations knowledge test, England, v1)

Bank only. Built by `python3 -I tools/next100/ukbregs/build.py` (writes
`data/uk-building-regulations-questions.json`). Validator:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/uk-building-regulations-questions.json --pool bregsGeneral=8 --pool bregsStructure=20 --pool bregsFire=36 --pool bregsSite=12 --pool bregsSound=12 --pool bregsVentilation=16 --pool bregsWater=12 --pool bregsDrainage=16 --pool bregsCombustion=16 --pool bregsSafety=24 --pool bregsEnergy=16 --pool bregsServices=12`
prints PASS (letters 50/50/50/50, avg option 15 chars, key-longest 20%, key>1.2x 17%).

**There is no single official exam.** This is a "know the regs" test for builders, site managers,
construction students and building control trainees. 70% is Tigertest's readiness line and the
category weights are Tigertest's split; say so on the landing and in examFacts. Never call it an
official or accredited exam.

Re-check by 24 March 2027, when the 2026 editions of AD L and AD F (Future Homes Standard) take
effect: the figures asked were checked as unchanged in the 2026 editions, but the BREL, L3 and
heat pump guidance may justify new items then.

## (a) CLAUDE.md bullet

- **Building Regulations** (`ukbregs`, Building Regulations knowledge test for England: the technical requirements of Schedule 1 to the Building Regulations 2010 and the Approved Documents A to T, for builders, site managers, construction students and building control trainees, `/building-regulations/*`, landing `/building-regulations-practice-test`): `data/uk-building-regulations-questions.json` (200 original questions: regulations 4, 5 and 7, Schedule 2 and Approved Document status 8, structure (AD A strip foundations, wall thickness, ties, chases, strapping, disproportionate collapse) 20, fire safety (AD B Volume 1 2019 edition with the 2020, 2022, 2025 and 2026 amendments: LD3 alarms, escape windows, inner rooms, loft conversions, garages, cavity barriers, sprinklers over 11m, second stair at 18m from 30 September 2026, regulation 38) 36, site preparation, moisture and cavity fill (C, D) 12, sound (E) 12, ventilation (F) 16, sanitation and water efficiency (G1, G2, G4 to G6; G3 left to `ukg3`) 12, drainage and waste (H) 16, combustion appliances and oil storage (J) 16, stairs, guarding, glazing, access, overheating and toilets (K, M, O, T) 24, conservation of fuel and power (L, 2021 edition with 2023 amendments, facts checked against the 2026 edition) 16, electrical notification, security, gigabit broadband and EV charging (P, Q, R, S) 12), test IDs 27201-27204, sets 27201-27205 (by topic: Structure, Site & Moisture 40; Fire Safety 36; Sound, Ventilation & Energy 44; Water, Drainage & Combustion 44; Safety, Access & Services 36), state `UKBREGS`, prefix `UKBREGS-`, 70% readiness line (there is no single official exam; the weights are Tigertest's). 2/5/9/3/3/4/3/4/4/6/4/3 per test. England only (Wales has its own Approved Documents); no fees, fines or cost caps; no British Standard text. Kept clear of `ukrbi` (procedure, BSR, gateways, RBI code), `uk18ed`, `ukg3`, `ukwater`, `ukgas`, `cscs` and `nhie`. Built by `tools/next100/ukbregs/build.py`; sources in `tools/next100/ukbregs/sources.md`. Region UK, hub group "UK workplace and trade certificates", `[data-theme="ukbregs"]` deep teal cyan (190 60% 24%), borrows the home inspector (`nhie`) tiger, teacher-led (construction and building control courses).

## (b) lib/examFacts.ts entry (draft)

Answer: "There is no single official Building Regulations exam. Builders, site managers, construction
students and building control trainees are expected to know the requirements of Schedule 1 to the
Building Regulations 2010 and the Approved Documents that show how to meet them in England. This
practice test covers Parts A to T and regulation 7 with 200 original questions, in four 50-question
tests. Tigertest uses 70% as a readiness line."

Facts rows:
- Who sets the rules: Ministry of Housing, Communities and Local Government (Approved Documents approved by the Secretary of State)
- Law: Building Regulations 2010 (SI 2010/2214), Schedule 1, made under the Building Act 1984
- Covers: England only (Wales has its own Approved Documents)
- Format here: four practice tests of 50 questions, plus five topic training sets
- Pass mark: none official; 70% is Tigertest's readiness line
- Recent changes: AD B second stair for flats with a top storey of 18m or more from 30 September 2026; Future Homes Standard (AD L and F 2026) from 24 March 2027
- Source: gov.uk Approved Documents collection, https://www.gov.uk/government/collections/approved-documents, and legislation.gov.uk, https://www.legislation.gov.uk/uksi/2010/2214/schedule/1, checked 12 November 2026

## (c) Landing FAQ

1. **Is there an official Building Regulations exam?** No single one. Building control bodies, colleges and employers test knowledge of the Building Regulations in their own courses and assessments. This test checks that you know the technical requirements and the Approved Document figures used on site in England.
2. **Which Approved Documents does it cover?** Parts A (structure), B (fire), C and D (site, moisture, cavity fill), E (sound), F (ventilation), G (sanitation and water efficiency), H (drainage), J (combustion appliances), K (falling and glazing), L (energy), M (access), O (overheating), P (electrical safety), Q (security), R (broadband), S (EV charging) and T (toilets), plus regulation 7 on materials and workmanship.
3. **Is it up to date with the 2026 changes?** Yes. It includes the AD B amendments taking effect on 30 September 2026 (more than one common stair for flats with a top storey of 18m or more, evacuation lifts) and notes the Future Homes Standard, which changes Parts L and F from 24 March 2027.
4. **Does it cover Wales or Scotland?** No. Wales has its own Approved Documents and Scotland uses the Building Standards technical handbooks. The figures here are for England.
5. **Can I use it with a class?** Yes. Tutors on construction, site management and building control courses can set it as class practice and see each student's progress and the topics they miss most.

## (d) Catalog

- Blurb: "Practise the Approved Documents A to T for England: foundations, fire escape, ventilation, drainage, stairs, Part L U-values and more."
- Org line: "MHCLG · Building Regulations 2010 (England)"
- Search aliases: "building regs building regulations approved documents approved document part a part b part l part m part f site manager building control regs test bregs"

## Notes for the wirer
- Hue 190 60% 24%: arrt is 191 100% 28% (40 points saturation apart) and ccs 193 30% 26% (30 apart), so it passes the 15-point rule; check against any sibling (ukwater, ukplumb, ukgas, ukrbi, ukg3) given a nearby hue.
- Category labels are in spec.json; the last set (36) is the Premium step.
- Partner `ukrbi` covers procedure; this bank asks only regulations 4, 5, 7 and Schedule 2 lightly.
