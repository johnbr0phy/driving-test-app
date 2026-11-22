# plaplik: Egzamin wstępny na aplikację adwokacką i radcowską (Poland)

- What: the Polish entrance exam for the advocate and legal adviser apprenticeships, one common
  paper set by the Ministry of Justice's question team (art. 75b Prawo o adwokaturze). Native
  Polish exam, `language: "pl"`, `review: { pl: "model" }`.
- Real format (checked 2026-11-21): 150 single-answer questions, three options, 1 point each,
  100 to pass (art. 75i); 150 minutes per the Ministry (2025); no aids (art. 75h ust. 3); once a
  year (27 September 2025, 26 September 2026); scope is the yearly wykaz aktów prawnych (52 acts, 2 April 2026);
  answers judged on the law on exam day.
- Tigertest: `data/pl-aplikacje-questions.json`, 200 items in 12 categories (civil 28, family 8,
  civil procedure 28, criminal and fiscal criminal 24, criminal procedure 24, petty offences 8,
  labour 16, company and commercial 20, administrative procedure and local government 16,
  administrative courts 8, constitutional 12, courts and legal professions 8); four 50-question
  tests 45601-45604 (7/2/7/6/6/2/4/5/4/2/3/2), five topic sets 45601-45605, 9 steps; passPct 67
  (34 of 50). Four options instead of three.
- IDs: idBase 45600, state `PLAPLIK`, prefix `PLAPL-`, segments CYW ROD KPC KAR KPK WYK PRA GOS
  ADM PSA KON UST.
- Routes: app `/poland-legal-apprenticeship-exam/*`, landing `/pl/egzamin-na-aplikacje`
  (`lib/landings/plaplik.pl.json`).
- Sources: `tools/next100/plaplik/sources.md` (Sejm ELI consolidated texts and amendments,
  gov.pl); terms: `tools/next100/plaplik/glossary.md`. Build: `python3 -I tools/next100/plaplik/build.py`.
- Theme `[data-theme="plaplik"]` deep indigo `255 100% 22%`; borrows the LSAT tiger. Region PL,
  hub group "Poland professional and licensing exams"; teacher-led.
- Not modelled: three-option format, EU treaty law (on the list), the notary and bailiff
  entrance exams held the same day, the 2027 commission changes (no effect on the test).
- Upkeep: each spring the new wykaz; re-check keys against the codes in force on the exam day.
