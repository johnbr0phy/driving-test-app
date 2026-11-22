# pllek: Lekarski Egzamin Koncowy (LEK), Poland Medical Final Examination

- **What**: Poland's medical final exam, run by the Centrum Egzaminow Medycznych (CEM), Lodz, under
  the Ministry of Health (Act on the professions of physician and dentist, art. 14a). Needed for the
  full right to practise (art. 5(4)). Twice a year, February and September; applications via SMK.
- **Official format** (CEM, checked 2026-11-21): 200 single-answer questions, 5 options, 4 hours,
  pass 56% of valid questions (112 of 200). Offered in Polish and English.
- **Blueprint** (CEM thematic structure): internal 39, paediatrics 29, surgery 27, obstetrics and
  gynaecology 26, psychiatry 14, family medicine 20, emergency medicine and intensive therapy 20,
  bioethics and medical law 10, medical certification 7, public health 8; at least 20 oncology.
- **Tigertest model**: v1, English, 200 items, four 50-question tests at 10/7/7/6/4/5/5/2/2/2, pools
  4x (40/28/28/24/16/20/20/8/8/8), pass 56% (28 of 50). Seven topic sets (45701-45707), tests
  45701-45704. 4 options per item (the engine has 4; the real exam has 5). 23 oncology items.
- **IDs**: exam `pllek`, state code `PLLEK`, prefix `PLLEK-` with segments INT, PED, SUR, OBG, PSY,
  FAM, EMR, LAW, CER, PUB. Bank `data/poland-lek-questions.json`.
- **Sources**: `tools/next100/pllek/sources.md` (CEM pages; Sejm ELI consolidated texts of the
  physician act, the Patient Rights Act, the Mental Health Protection Act and the Sickness
  Benefits Act; NFZ DiLO page; named clinical guidelines). Build: `python3 -I tools/next100/pllek/build.py`.
- **Law and certification**: Polish statutes only (consent at 16, art. 30, 33, 34, 39, 40, 42, 43,
  record retention, e-ZLA codes A to E, 182/270-day limits, 5 days for alcohol, Mental Health Act
  art. 18, 23, 24). Sick-leave control rules amended in 2026 are not used.
- **Theme**: `[data-theme="pllek"]` 134 100% 26% (deep medical green; the suggested 172 60% 30% clashed and the only free teal, 172 80% 14%, was nearly black),
  borrows the `rorezid` tiger. Region PL, hub group "Poland professional and licensing exams", teacher-led (LEK courses).
- **Not modelled**: the fifth option, the CEM public question base (never copied), the LDEK
  (dental) sibling, score use in residency qualification, a Polish-language version (a `pl`
  translation can follow).
- **Overlap**: written against pknle, pance, rorezid, ccrn, cen, the nursing banks and the CPR and
  first-aid banks; repeats of fact and answer were rewritten.
