# rodrpciv Romanian translation: notes

Status: machine translation (by Claude, November 2026), pending native review. Review state "machine".

Files
- `t_lic_wrn.py`, `t_reg_mrk.py`, `t_pri_spd.py`, `t_prk_saf_emg.py`: the Romanian text, one tuple
  per questionId (question, A, B, C, D, explanation), option order as in the English bank.
- `build.py`: copies every structural field from `data/romania-drpciv-questions.json`, takes only
  the text from the sources, runs `check.py` and writes `data/romania-drpciv-questions_ro.json`.
  `python3 -I tools/next100/rodrpciv/ro/build.py`
- `check.py`: standalone parity and style check.
  `python3 -I tools/next100/rodrpciv/ro/check.py`
- `glossary.md`: the Codul rutier and DGPCI terms used (written before the translation).

Also run the skill's validator (PASS, November 2026):
`python3 -I .claude/skills/exam-bank/scripts/validate_translation.py data/romania-drpciv-questions.json data/romania-drpciv-questions_ro.json --lang ro`
and `validate_bank.py data/romania-drpciv-questions_ro.json --lang ro` (PASS, key-longest 21%).

Edit the `t_*.py` sources and rebuild; never hand-edit the JSON. If the English bank changes (a
key fix, a reworded stem), make the same change here: same id, same option order, same key.

Choices
- Questions and explanations in the formal second person ("dumneavoastră": aveți, trebuie să
  opriți), the register of the official DGPCI questionnaires. App copy and the landing in "tu", the
  house UI register (as `roadmed.ro.json`).
- Romanian quotes „...”, comma-below ș and ț, decimal comma (0,80 g/l, 1,5 m, 7,5 t), thousands with
  a point (1.500 kg).
- Sign names are the annex names (glossary). Signs are still described in words, as in English.
- Stems were reworded for idiom (for example "Ieșind din Sibiu, treceți pe lângă..."), never
  changing the scenario, the options' meaning or the key.
- Option rewording kept keys from standing out: after translation the key was the uniquely longest
  option in 49 of 200 rows (English 34); twelve keys were shortened or distractors lengthened
  without changing meaning, leaving 21% (validate_bank). Two option texts use the everyday word
  "talon" for the registration certificate (the explanation gives the legal name) and
  "Distanță minimă de 70 m" for the minimum gap sign.
- RODRP-EMG-007: "Both drivers are licensed" became "Cei doi conducători au permis" so the option
  does not start with "Ambii", which the shuffle guard treats as an option reference.
- RODRP-SAF-001 explanation: any alcohol is a contravenție (minor offence) and above 0,80 g/l an
  infracțiune, the Codul rutier and Codul penal split; the English says "an offence" and "a crime".
