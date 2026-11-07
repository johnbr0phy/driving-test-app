# bedriving Dutch (nl-BE) translation: notes

Status: machine translation (by Claude, November 2026), pending native review. Review state "machine".

Files
- `t_lic_dng.py`, `t_pri_sgn.py`, `t_mrk_spd_man.py`, `t_prk_vul_saf.py`: the Dutch text, one
  tuple per questionId (question, A, B, C, D, explanation), option order as in the English bank.
- `build.py`: copies every structural field from `data/belgium-driving-questions.json`, takes only
  the text from the sources, runs `check.py` and writes `data/belgium-driving-questions_nl.json`.
  `python3 -I tools/next100/bedriving/nl/build.py`
- `check.py`: standalone parity and style check (also usable on any later rebuild).
  `python3 -I tools/next100/bedriving/nl/check.py`
- `glossary.md`: the Wegcode and Vlaanderen.be terms used (written first).

Edit the `t_*.py` sources and rebuild; never hand-edit the JSON. If the English bank changes
(a key fix, a reworded stem), make the same change here: same id, same option order, same key.
Then run `python3 -I .claude/skills/exam-bank/scripts/validate_translation.py
data/belgium-driving-questions.json data/belgium-driving-questions_nl.json --lang nl`.

Choices
- Belgian Dutch (Flemish standard), not Netherlands Dutch: rijbewijs B, voorlopig rijbewijs,
  bebouwde kom, autosnelweg, pechstrook, reddingsstrook, gsm, fluovestje, parking, wagen,
  "eender welk", "halfweg", "km/u" (the Wegcode's own unit spelling).
- Questions and explanations in "u", like the Flemish theory exam; app copy and the landing in
  "je" (house UI register, as `lib/landings/bevracht.nl.json`). `check.py` rejects je/jij/jouw
  in the bank.
- Decimal comma (0,5 g/l, 1,5 m, 3,5 ton), thousands point (1.500 kg), times as 19.30 uur.
- Sign codes (A1a, B9, C43, F12a...) kept exactly; they are the Wegcode's codes. "speed pedelec"
  is the Wegcode's own term and is allowed by `check.py`.
- Stems reworded for idiom (for example "Bij Bastenaken...", "Bij een park in Namen..."; Belgian
  Dutch place names for Bastogne, Namur, Liège), never changing the scenario, the options'
  meaning or the key.
- Key-length bias: after translation the key was the uniquely longest option in 51 of 200 rows
  (English: 46). Seven keys were shortened or distractors lengthened without changing meaning.
- No option refers to other options; the shuffle guard result is identical to the English bank
  (no guarded rows in either).
