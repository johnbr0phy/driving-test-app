# plbron: Egzamin na pozwolenie na broń, część teoretyczna (Poland)

- What: the theory part of the exam every applicant for a Polish firearm permit sits before a
  police commission (art. 16 ustawy o broni i amunicji). Native Polish exam, `language: "pl"`,
  `review: { pl: "model" }`.
- Real format (checked 2026-11-21, rozporządzenie MSWiA z 28.07.2023, Dz. U. poz. 1475): 20
  single-choice questions with three options (A, B, C), 30 minutes, pass with 18 (§ 4); scope is
  the ustawa with its regulations and the KK on weapon offences; then a practical part at a range
  with a shooting test (§ 5); one resit of each part (§ 7). Paid (percentage of the minimum
  wage, § 8); no amount on Tigertest.
- Tigertest: `data/pl-bron-questions.json`, 200 items in 8 categories (plbrPojecia 28,
  plbrPozwolenia 36, plbrObowiazki 32, plbrPrzechowywanie 24, plbrGranica 16, plbrStrzelnica 20,
  plbrKarne 24, plbrObrona 20); six 20-question tests 45801-45806 (3/4/3/2/2/2/2/2), five topic
  sets 45801-45805 (28/36/32/60/44), 11 steps; passPct 90 (18 of 20). Four options instead of three.
- IDs: idBase 45800, state `PLBRON`, prefix `PLBRON-`, segments POJ POZ OBO PRZ EKB STR KAR OBR.
- Sources: `tools/next100/plbron/sources.md` (Sejm ELI texts: ustawa t.j. 2024 poz. 485,
  storage regulation t.j. 2023 poz. 364, wzorcowy regulamin strzelnic 2000 poz. 234 as amended,
  KK t.j. 2026 poz. 1342, KW t.j. 2026 poz. 1372). Build: `python3 -I tools/next100/plbron/build.py`.
- Theme `[data-theme="plbron"]` dark olive `68 30% 20%`, tiger borrowed from `capal`,
  region PL, hub group "Poland professional and licensing exams", teacher-led (shooting club courses), landing
  `/pl/egzamin-na-pozwolenie-na-bron`.
- Not modelled: the practical part, three-option format, the police-published regional banks
  (never copied), exam admin (fee, resits, exemptions), hunting law and entity rules beyond storage.
- Quirks: the 2026 psychologists' act (Dz. U. 2026 poz. 187, in force 19.05.2028) will change the
  art. 15 certificate wording; KK and KW consolidated texts of October 2026 used.
- Lane: the KK general part is shared with `plaplik`; this bank avoids its pairs (art. 9 § 1,
  10, 25 § 2a, 31 § 3).
