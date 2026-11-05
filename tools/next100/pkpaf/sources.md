# Sources for `pkpaf` (Pakistan Air Force airman recruitment, initial academic and intelligence test)

All 200 questions are original. No past paper, "PAF initial test MCQs" pack or prep-site item was
copied. Checked 2026-11-05.

## Format of the real test (what could and could not be confirmed)
- The official recruitment portal, https://joinpaf.gov.pk (also tried https://www.joinpaf.gov.pk),
  and the PAF's site, https://www.paf.gov.pk, returned HTTP 503 through WebFetch on 2026-11-05.
  No PAF advertisement, syllabus or test format could be read this session.
- The session's web search budget was exhausted before any news report of a PAF airman intake
  could be found, so no news source for the current advertisement is cited. Re-tried
  https://www.joinpaf.gov.pk on 2026-11-05 in the fact-check pass: still HTTP 503, and web search
  was again unavailable, so the format, selection stages and "official portal" wording stay hedged
  as guides' descriptions; no question in the bank depends on them.
- Not confirmed anywhere this session: airman categories and trades for the current intake, age
  and education rules, the stages of selection, the subjects of the academic test, the intelligence
  test's format, question count, time, pass mark, negative marking. The landing and examFacts say
  the PAF publishes none of these figures and that candidates should check the advertisement.
- Widely repeated in guides (NOT confirmed by the PAF this session): airmen are selected at PAF
  Selection and Recruitment Centres through an academic test (English, mathematics, and physics
  for technical trades such as aero apprentice), verbal and non-verbal intelligence tests, a
  medical and an interview. Used only as "candidates and guides describe".
- Tigertest models four 50-question tests at a 70% target (35 of 50) and says so; weights are
  Tigertest's own.

## Content: Pakistan Air Force (checked)
- Officer ranks Pilot Officer, Flying Officer, Flight Lieutenant, Squadron Leader, Wing Commander,
  Group Captain, Air Commodore, Air Vice Marshal, Air Marshal, Air Chief Marshal (Marshal of the
  PAF above); airman ranks Aircraftman, Leading Aircraftman, Senior Aircraftman, Junior Technician,
  Corporal Technician, Senior Technician, Chief Technician, Assistant Warrant Officer, Warrant
  Officer, Chief Warrant Officer:
  https://en.wikipedia.org/wiki/Air_Force_ranks_and_insignia_of_Pakistan (2026-11-05)
- PAF Academy Asghar Khan, Risalpur, Nowshera District; named after Air Marshal Asghar Khan, the
  first native chief of the PAF; trains officer cadets: https://en.wikipedia.org/wiki/PAF_Academy
- PAF Airmen Academy, Korangi, Karachi (Sindh), set up in 2019 to train airmen of all trades:
  https://en.wikipedia.org/wiki/PAF_Airmen_Academy
- Established as the Royal Pakistan Air Force in August 1947 (15 August in the History section,
  14 August in the infobox, so the bank says only "August 1947"); Air Headquarters in Islamabad;
  PAF Base Nur Khan in Rawalpindi; MFI-17 Mushshak listed as a trainer; JF-17 in service:
  https://en.wikipedia.org/wiki/Pakistan_Air_Force
- PAF Base Nur Khan, Chaklala (Rawalpindi), named after Air Marshal Nur Khan (1923-2011), former
  Commander-in-Chief of the PAF: https://en.wikipedia.org/wiki/PAF_Base_Nur_Khan (2026-11-05)
- Air Commodore = Brigadier and Group Captain = Colonel: both pairs share the NATO codes OF-6 and
  OF-5 in the rank tables at https://en.wikipedia.org/wiki/Air_Force_ranks_and_insignia_of_Pakistan
  and https://en.wikipedia.org/wiki/Army_ranks_and_insignia_of_Pakistan (2026-11-05; inferred from
  the insignia codes, neither page states the equivalence in words; no PAF source loaded).
- "Royal Pakistan Air Force (RPAF) was established on 15 August 1947":
  https://en.wikipedia.org/wiki/Pakistan_Air_Force (2026-11-05). The date the "Royal" prefix was
  dropped was not found (search budget exhausted), so the bank still says only "later".

## Content: aviation, physics, electricity, maths, English, reasoning
Standard matric/intermediate physics and general aviation knowledge (four forces of flight,
Bernoulli and lift, angle of attack and stall, ailerons/elevator/rudder, flaps, take-off into wind,
runway numbering by magnetic heading, knot = 1 nautical mile per hour = 1,852 m, altimeter and VSI,
Mach 1 and sonic boom, jet thrust by Newton's third law, helicopter tail rotor and torque, radar,
cumulonimbus, the Wright brothers' flight of 17 December 1903 at Kitty Hawk, flight recorders
painted bright orange). Checked 2026-11-05: flight recorders "required to be painted bright
orange" (https://en.wikipedia.org/wiki/Flight_recorder); first powered flights 17 December 1903
near Kitty Hawk, North Carolina, at what is now Kill Devil Hills (https://en.wikipedia.org/wiki/Wright_Flyer;
explanation reworded from "at" to "near" Kitty Hawk); knot = one nautical mile per hour, nautical
mile 1,852 m (https://en.wikipedia.org/wiki/Knot_(unit)); runway number = magnetic heading in tens
of degrees (https://en.wikipedia.org/wiki/Runway). The rest were not checked against a source
this session (web search budget exhausted). Every maths,
physics and electricity calculation was worked by hand and its key matches the explanation.
English uses British spelling as used in Pakistan; word problems use rupees (Rs) and Pakistani
names. Non-verbal reasoning (mirror and water images, rotation, folding, counting shapes, cube
painting) is written as text, because the real section uses pictures.

## Lane and overlap check
GK lane in this batch: the PAF's ranks and institutions, aviation and flight basics, physics and
electricity (ppsc: Pakistan Studies and the Constitution; punjabpolice: Punjab and law; pakarmy:
the Army, everyday science, Islamiat). No current affairs, office-holders, conflicts or Kashmir.
Stems were compared by script with every `data/*-questions.json` bank and `data/v2/asvab`,
`data/v2/phcse`, and by similarity with ppsc, punjabpolice, pakarmy, pkdrive, afpsat,
nigerian-army, nigeria-police and napolcom. Rewritten after the check: items with the same word or
number set as another bank (VIGILANT, SCARCE, EXPAND, TEMPORARY, the idiom "keep a low profile",
3/8 + 5/12, the 13 m by 7.5 m rectangle, 25% up then 20% down, sound in a vacuum, the unit of
resistance, the most-symmetric shape, paper folded twice, the odd number out) and the electricity
items that matched ASVAB EI (12 V across 4 Ω, two 10 Ω resistors, the fuse, the diode, the
transformer's AC rule).
