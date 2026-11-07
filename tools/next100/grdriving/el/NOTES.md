# grdriving Greek translation: notes

Status: machine translation (by Claude, November 2026), pending native review. Review state "machine".

Files
- `t_lic_wrn.py`, `t_reg_inf.py`, `t_pri_spd.py`, `t_prk_saf_emg.py`: the Greek text, one tuple
  per questionId (question, A, B, C, D, explanation), option order as in the English bank.
- `build.py`: copies every structural field from `data/greece-driving-questions.json`, takes only
  the text from the sources, runs `check.py` and writes `data/greece-driving-questions_el.json`.
  `python3 -I tools/next100/grdriving/el/build.py`
- `check.py`: standalone parity and style check (Greek script in every text field, decimal comma,
  thousands dot, Latin words only from an allow-list, no dashes, no "όλα τα παραπάνω" options).
  `python3 -I tools/next100/grdriving/el/check.py`
- `glossary.md`: the ΚΟΚ terms used, written before the translation.

Edit the `t_*.py` sources and rebuild; never hand-edit the JSON. If the English bank changes
(a key fix, a reworded stem), make the same change here: same id, same option order, same key.

Validation (both PASS, November 2026):
`python3 -I .claude/skills/exam-bank/scripts/validate_translation.py data/greece-driving-questions.json data/greece-driving-questions_el.json --lang el`

Choices
- Questions and explanations in the polite plural (εσείς), as Greek official and driving school
  material addresses the candidate. App copy and the landing in the singular (εσύ), the house UI
  register of the existing Greek pages (grcitizen, grinsure, grsecurity).
- Official terms from the ΚΟΚ (ν. 5209/2025): άδεια οδήγησης, άδεια κυκλοφορίας, κατοικημένη
  περιοχή, οδός ταχείας κυκλοφορίας, Λωρίδα Έκτακτης Ανάγκης (ΛΕΑ), παραχώρηση προτεραιότητας,
  οδός προτεραιότητας, ισόπεδη διάβαση, φώτα διασταύρωσης / πορείας. Amber is "κίτρινο", as in the
  Code, not the everyday "πορτοκαλί".
- The English bank glosses Greek words (άδεια κυκλοφορίας, ΛΕΑ, φιλικός διακανονισμός, αδιέξοδο);
  in Greek the gloss is dropped. GRDRV-LIC-015 asked "which document is the registration
  certificate", which in Greek names the answer, so the stem became "which document belongs to the
  vehicle and certifies its registration"; options and key unchanged.
- Some stems ending in a bare "You:" became a question ("Τι κάνετε;") with options in the present
  tense, where a Greek infinitive-style list would read badly (LIC-016, INF-012, PRI-023 and
  others). Meaning, option order and key unchanged.
- After translation the key was the uniquely longest option in 52 of 200 rows (English: 36). About
  25 keys were shortened or distractors lengthened without changing meaning: now 34 of 200.
- Kept in Latin letters as they appear in Greece: STOP (sign text), ABS, BUS (bus lane marking),
  P (parking sign), D1, D, BE, B96 (licence codes), Gov.gr Wallet. Units km/h, kg, t, m, mm, g/l.
- Signs are described in words, as in the English bank; no sign codes added.
