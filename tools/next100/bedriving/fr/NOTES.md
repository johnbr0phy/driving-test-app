# bedriving French (fr-BE) translation: notes

Status: machine translation (by Claude, November 2026), pending native review. Review state "machine".

Files
- `glossary.md`: the Code de la route and Wallonie.be terms used (written first).
- `t_lic_dng.py`, `t_pri_sgn.py`, `t_mrk_spd_man.py`, `t_prk_vul_saf.py`: the French text, one
  tuple per questionId (question, A, B, C, D, explanation), option order as in the English bank.
  Plain spaces before ? ! : ; in the sources.
- `build.py`: copies every structural field from `data/belgium-driving-questions.json`, takes only
  the text from the sources, applies French typography (non-breaking space before ? ! : ; and as
  the thousands separator), runs `check.py` and writes `data/belgium-driving-questions_fr.json`.
  `python3 -I tools/next100/bedriving/fr/build.py`
- `check.py`: standalone parity and style check.
  `python3 -I tools/next100/bedriving/fr/check.py`
- `copy_src.py` + `build_copy.py`: the exam copy and landing content, written to
  `lib/examTranslations/bedriving.fr.json` and `lib/landings/bedriving.fr.json` with the same
  typography. `python3 -I tools/next100/bedriving/fr/build_copy.py`

Edit the sources and rebuild; never hand-edit the JSON. If the English bank changes (a key fix,
a reworded stem), make the same change here and in the Dutch bank: same id, same option order,
same key. Then run `python3 -I .claude/skills/exam-bank/scripts/validate_translation.py
data/belgium-driving-questions.json data/belgium-driving-questions_fr.json --lang fr`.

Choices
- Belgian French, as the Code de la route and Wallonie.be write it: permis de conduire
  provisoire, guide, agglomération, bande de circulation (never "voie" for a lane), bande d'arrêt
  d'urgence, couloir de secours, circulation en tirette, feu jaune-orange (the Belgian name of the
  amber light), certificat de visite, assurance RC, GSM, rue cyclable, zone résidentielle ou de
  rencontre, allure du pas, surveillant habilité, école de conduite.
- "vous" throughout, in the bank (like the Walloon and Brussels exam) and in the app copy and
  landing (the French house UI register). `check.py` rejects tu/toi/ton/tes.
- Decimal comma (0,5 g/l, 1,5 m, 3,5 t), thousands with a non-breaking space (1 500 kg), km/h,
  times as 9 h, 18 h, 19 h 30.
- Sign codes (A1a, B9, C43, F12a...) kept exactly; "speed pedelec" is the Code's own term.
- Places in their French names: Liège, Namur, Bastogne, Louvain (Leuven), Malines (Mechelen),
  the Ardennes. Scenarios, option meanings and keys unchanged.
- Key-length bias: after the first pass the key was the uniquely longest option in 28% of rows
  and over 1.2x the wrong options' mean in 30% (English 23% and 21%). 21 options were shortened
  or lengthened without changing their meaning; now 20% and 24%, and `validate_bank.py --lang fr`
  passes.
- "2 tonnes" and "12 tonnes" (BEDRV-SPD-009) are the same in both languages, on purpose.
- No option refers to other options; the shuffle guard result is identical to the English bank
  (no guarded rows in either).
