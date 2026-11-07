# detheorie English translation: notes

Status: machine translation (by Claude, November 2026) from the German base bank, pending native
review. Review state "machine".

Files
- `t_gef.py`, `t_ver.py`, `t_vor_vz.py`, `t_rest.py`: the English text, one tuple per questionId
  (question, A, B, C, D, explanation), option order as in the German bank (the built JSON, not
  the q_*.py sources, whose key is written first).
- `build.py`: copies every structural field from `data/de-theorie-questions.json`, takes only the
  text from the sources, runs `check.py` and writes `data/de-theorie-questions_en.json`.
  `python3 -I tools/next100/detheorie/en/build.py`
- `check.py`: parity and style check (same ids, order, category, key; no dashes, no German
  quotes, no "both/all/none" options, no American spellings, no German left in stems or
  options, decimal point). `python3 -I tools/next100/detheorie/en/check.py`
- `glossary.md`: the terms used.

Edit the `t_*.py` sources and rebuild; never hand-edit the JSON. If the German bank changes
(q_*.py rebuilt, a key fix, a reworded stem), make the same change here with the same id and the
option order of the rebuilt German JSON. Note that the German builder places keys by position,
so a German edit that changes a key's letter changes the option order here too: rebuild both and
re-run `validate_translation.py`.

Choices
- British English for people living in Germany: lorry, motorway, hard shoulder, pavement, tyre,
  boot, dipped headlights, full beam, give way, zebra crossing, licence (noun), practise (verb).
- German rules, units and law names are kept (StVO, StVZO, StVG, FeV, StGB, § numbers); German
  words on signs and plates are quoted with a gloss.
- Stems were reworded for idiom, never changing the scenario, the options' meaning or the key.
  DETH-VOR-007's options became plain nouns ("The traffic lights", "The police officer").
- Key length: after the first pass the key was the uniquely longest option in 49 of 210 rows
  (German: 38); 28 keys were tightened or distractors lengthened without changing meaning, now 31.
- `validate_translation.py --lang en` warns only that DETH-EIG-009 option D ("10 ng/ml") is the
  same in both languages, which is right.
