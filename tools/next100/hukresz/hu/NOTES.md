# hukresz Hungarian translation: notes

Status: machine translation (by Claude, November 2026), pending native review. Review state "machine".

Files
- `glossary.md`: the KRESZ terms used, written first.
- `t_lic_wrn_reg.py`, `t_mrk_pri.py`, `t_spd_mwy.py`, `t_prk_saf.py`: the Hungarian text, one
  tuple per questionId (question, A, B, C, D, explanation), option order as in the English bank.
- `build.py`: copies every structural field from `data/hungary-kresz-questions.json`, takes only
  the text from the sources, runs `check.py` and writes `data/hungary-kresz-questions_hu.json`.
  `python3 -I tools/next100/hukresz/hu/build.py`
- `check.py`: parity and style check (ids, order, category, key, no dashes, decimal comma, no
  informal "te" forms in questions, no English left).

Edit the `t_*.py` sources and rebuild; never hand-edit the JSON. If the English bank changes
(a key fix, a reworded stem), make the same change here: same id, same option order, same key.

Validation (both PASS, 2026-11-07):
- `python3 -I .claude/skills/exam-bank/scripts/validate_translation.py data/hungary-kresz-questions.json data/hungary-kresz-questions_hu.json --lang hu`
- `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/hungary-kresz-questions_hu.json --lang hu`
  (key longest 20%, key over 1.2x the mean wrong option 23%; first pass was 32% / 35%, so about
  50 options were tightened or a distractor lengthened, never changing meaning or key).

Choices
- Questions and explanations formal and impersonal (third-person verbs, "Ön" where a subject is
  needed), as KAV-style questions are written. App copy and the landing in "te", like the other
  Hungarian Tigertest pages.
- Official KRESZ terms throughout: lakott terület, főútvonal, jobbkéz-szabály, záróvonal,
  terelővonal, leállósáv, csatlakozó útszakasz, lakó-pihenő övezet, megállás / várakozás,
  elakadásjelző háromszög, fényvisszaverő mellény, gyermekbiztonsági rendszer.
- Sign names in „ ” quotes as the KRESZ annex names them („Elsőbbségadás kötelező”,
  „Megállni tilos”, „Korlátozott sebességű övezet”).
- Decimal comma (0,5 g/l, 5,5 m, 3,5 t), four-digit masses without a separator (3500 kg, 7500 kg)
  as the KRESZ writes them, "6 és 22 óra között".
- Stems reworded for Hungarian word order where a literal rendering read badly, never changing
  the scenario, the options' meaning or the key.
- Hungarian places in stems (Balaton, Duna, Bükk) kept as in English.
