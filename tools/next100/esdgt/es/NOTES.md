# esdgt Spanish translation: notes

Status: machine translation (by Claude, November 2026), pending native review. Review state "machine".

Files
- `t_lic_sgn.py`, `t_mrk_pri.py`, `t_spd_ovt.py`, `t_prk_lgt_saf.py`: the Spanish text, one tuple
  per questionId (question, A, B, C, D, explanation), option order as in the English bank.
- `build.py`: copies every structural field from `data/spain-dgt-questions.json`, takes only the
  text from the sources, runs `check.py` and writes `data/spain-dgt-questions_es.json`.
  `python3 -I tools/next100/esdgt/es/build.py`
- `check.py`: standalone parity and style check (also usable on any later rebuild).
  `python3 -I tools/next100/esdgt/es/check.py`
- `glossary.md`: the DGT terms used.

Edit the `t_*.py` sources and rebuild; never hand-edit the JSON. If the English bank changes
(a key fix, a reworded stem), make the same change here: same id, same option order, same key.

Choices
- Questions and explanations in "usted", like the official exam. App copy and the landing in
  "tú", the house UI register (as the existing Spanish UI).
- Peninsular Spanish throughout: turismo, móvil, ordenador, estacionar, arcén, glorieta.
- Stems were reworded for idiom where English word order read badly (for example "Circulando por
  la AP-7...", "En Sevilla quiere dejar bajar a un amigo..."), never changing the scenario, the
  options' meaning or the key.
- After translation, the key was the uniquely longest option in 59 of 200 rows (English: 46). The
  worst 15 keys were shortened without changing meaning (55 of 200), then 15 more items had the key tightened or a distractor lengthened: now 40 of 200 (20%).
- English-language references kept: none in questions. "aquaplaning" is the DGT's own spelling.
  "DGT 3.0" (the DGT's connected-vehicle platform) is a product name.
- Sign codes (R-307, R-308, V-13, V-16) kept as in the English bank.
