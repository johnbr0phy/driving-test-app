# nltheorie Dutch (nl-NL) translation: notes

Status: model translation (November 2026), final; review state "machine" on the ExamConfig.

Files
- `t_road.py`, `t_parking.py`, `t_priority.py`, `t_special.py`, `t_safety.py`, `t_signs.py`,
  `t_hazard.py`, `t_law.py`, `t_vehicle.py`: the Dutch text, one entry per English item in the same
  order as `../q_<name>.py` (stem, key, the three wrong answers in the English order, explanation).
- `build.py`: copies every structural field from `data/netherlands-driving-theory-questions.json`,
  places the key at the English row's `correctIndex` and the wrong answers in the other slots in
  order (so option order matches the English bank), checks that the English source still matches
  the built English bank, runs `check.py` and writes
  `data/netherlands-driving-theory-questions_nl.json`.
  `python3 -I tools/next100/nltheorie/nl/build.py` (`PARTIAL=1` checks the files written so far).
- `check.py`: standalone parity and style check.
  `python3 -I tools/next100/nltheorie/nl/check.py`
- `glossary.md`: the RVV 1990, Wegenverkeerswet and CBR terms used (written first).

Edit the `t_*.py` sources and rebuild; never hand-edit the JSON. If the English bank changes
(a key fix, a reworded stem, a new item), make the same change here at the same index and rebuild
both banks, then run `python3 -I .claude/skills/exam-bank/scripts/validate_translation.py
data/netherlands-driving-theory-questions.json data/netherlands-driving-theory-questions_nl.json --lang nl`.

Choices
- Netherlands Dutch, not Belgian Dutch: RVV 1990, autosnelweg/autoweg, vluchtstrook, spitsstrook,
  matrixbord, erf, fietsstraat, bebouwde kom, haaientanden, voorrangsweg, kentekencard, APK,
  WA-verzekering, mobiele telefoon. `check.py` rejects Wegcode, gsm, wagen, pechstrook and similar.
- "je" throughout, as CBR's own pages and theorie-examenplan address the candidate ("Je krijgt
  50 vragen"); `check.py` rejects the formal "u/uw".
- CBR's untranslated terms (erf, autoweg, APK, brommobiel, snorfiets, speed pedelec) are used as
  is; the English glosses the base bank adds for them are dropped in Dutch.
- Sign questions follow CBR's "Wat betekent dit bord?" with the sign described in words; BABW
  codes (B6, C2, G5, J8...) kept exactly.
- Decimal comma (0,5 promille, 1,35 m, 3,5 t, hectometer 34,6), thousands point (3.500 kg),
  times 10.30 uur, "km/u".
- Stems reworded for idiom, never changing the scenario, the options' meaning or the key.
- Key-length bias: after the first pass the key was the uniquely longest option in 89 of 350
  rows (English: 69); keys were shortened or distractors lengthened without changing meaning,
  to 60.
- No option refers to other options; the shuffle guard result is identical to the English bank
  (no guarded rows in either).
