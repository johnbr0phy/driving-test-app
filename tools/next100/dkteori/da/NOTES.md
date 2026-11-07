# dkteori Danish translation: notes

Status: machine translation (by Claude, November 2026), pending native review. Review state "machine".

Files
- `t_veh_beh_bas.py`, `t_lan_pas.py`, `t_jnc.py`, `t_mwy.py`: the Danish text, one tuple per
  questionId (question, A, B, C, D, explanation), option order as in the English bank.
- `build.py`: copies every structural field from `data/denmark-driving-theory-questions.json`,
  takes only the text from the sources, runs `check.py` and writes
  `data/denmark-driving-theory-questions_da.json`.
  `python3 -I tools/next100/dkteori/da/build.py`
- `check.py`: standalone parity and style check.
  `python3 -I tools/next100/dkteori/da/check.py`
- `glossary.md`: the Færdselsstyrelsen terms used. Written first.

Edit the `t_*.py` sources and rebuild; never hand-edit the JSON. If the English bank changes
(a key fix, a reworded stem), make the same change here: same id, same option order, same key.

Choices
- Everything in "du", like Færdselsstyrelsen's undervisningsplan, its øveprøve and Danish
  learner material. No formal "De".
- Terms from the undervisningsplan and færdselsloven: vigepligt, højre vigepligt, ubetinget
  vigepligt, hajtænder (vigelinje), spærrelinje, varslingslinje, spærreflade, tættere bebygget
  område, lygtetændingstid, nødspor, motortrafikvej, krybespor, 2-1 vej, genstand, promille.
- The English bank already named several Danish terms in brackets ("the shark's teeth
  (hajtænder)"); in Danish the bracket is dropped and the term is used directly.
- Decimal comma (1,6 mm, 0,5 promille), thousands point (3.500 kg, 1.500 m), times as kl. 22.00.
- After the first pass the key was the uniquely longest option in 52 of 200 rows (English: 13);
  keys were tightened and distractors lengthened without changing meaning: now 2 of 200
  (DKTEO-JNC-012 "Langsommere end 15 km/h", DKTEO-MWY-035 "Orange", which is the English word too).
- "Orange" (BAS-002, MWY-035) is the same word in both languages; `validate_translation.py` warns
  only and `check.py` allows it.
