# fitheory Finnish translation: notes

Status: machine translation (by Claude, November 2026), pending native review. Review state "machine".

Files
- `t_yld_pos.py`, `t_ovt_prk.py`, `t_sgn_mrk.py`, `t_usr_drv_veh.py`: the Finnish text, one tuple
  per questionId (question, A, B, C, D, explanation), option order as in the English bank.
- `build.py`: copies every structural field from `data/finland-driving-theory-questions.json`,
  takes only the text from the sources, runs `check.py` and writes
  `data/finland-driving-theory-questions_fi.json`.
  `python3 -I tools/next100/fitheory/fi/build.py`
- `check.py`: standalone parity and style check.
- `glossary.md`: the official Finnish terms used (written first).

Edit the `t_*.py` sources and rebuild; never hand-edit the JSON. If the English bank changes
(a key fix, a reworded stem), make the same change here: same id, same option order, same key.

Choices
- "Sinä" register throughout, as Finnish learner materials and the real teoriakoe use it.
- The English bank's bracketed Finnish terms ("pihakatu (residential street)") are just the
  Finnish term here, so a few stems are shorter (POS-015 warns in validate_translation.py).
- Stems were reworded for idiom (e.g. DRV-014, DRV-016 turned into questions so every option is a
  grammatical answer), never changing the scenario, the options' meaning or the key.
- After translation the key was the uniquely longest option in 64 of 200 rows (English: 40);
  about 25 keys were tightened or distractors lengthened without changing meaning: now 54 of 200.
- VEH-011 ranges are written "1 ja 3 metrin välillä" (no en dash ranges).
- No option refers to other options; `validate_translation.py` reports 0 guarded rows in both banks.
