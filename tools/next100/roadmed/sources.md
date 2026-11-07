# Sources for `roadmed` (Romania medicine admission exam, Biology and Chemistry, in Romanian)

All 200 questions are original, written directly in Romanian on the topics of the shared
high-school syllabus (Biologie clasa a XI-a, anatomie și fiziologie umană; Chimie organică,
clasele a X-a și a XI-a, plus soluții, acizi și baze). Nothing was copied from a university's
caiet de concurs, a published question pool (culegere de teste), a past paper or a commercial
grile book. Checked 2026-11-07 unless noted.

## Exam format (confirmed)

Each university of medicine and pharmacy sets its own test, syllabus extracts and bibliography.
Two official documents were read in full:

- UMF "Carol Davila" Bucharest, Regulamentul de admitere licență 2026 (approved by the Senate on
  22.01.2026), read as PDF on 2026-11-07:
  https://umfcd.ro/wp-content/uploads/2026/ADMITERE_2026/REGULAMENTUL_DE_ADMITERE/UMFCD_Regulament%20admitere%20licenta%202026_SENAT%2022.01.2026.pdf
  - art. on the written test, item 14: grile "complement simplu, complement grupat".
  - item 20: 2 hours 30 minutes for Medicine, Dental Medicine and Pharmacy.
  - item 21: Medicine and Dental Medicine: Biology compulsory plus Physics or Chemistry by
    choice, 100 questions: 60 on the compulsory subject, 40 on the chosen one.
  - (2) item 2: each question has a single correct answer, 1 point; maximum 100 points.
  - (2) item 3 and 4: minimum admission grade 5; ranking by the written test score.
  - 4 booklet variants are distributed in the room.
- UMF "Iuliu Hațieganu" Cluj-Napoca, Ghid admitere 2026, read as PDF on 2026-11-07:
  https://cdn.umfcluj.ro/uploads/2026/07/GHID-ADMITERE-2026.pdf
  - "Concursul se desfășoară după sistemul grilă al întrebărilor cu răspunsuri multiopționale"
    (the answer sheet example shows "Răspuns corect: B, E").
  - Medicine and Dental Medicine: Biology and Chemistry; Pharmacy: Biology or organic chemistry.
  - Written test 2 hours; a calculator is handed out for chemistry, personal ones are banned.
  - July 2026 session: test on 26 July 2026.
  - Biology reference: Krumhardt and Alcamo, Anatomie și fiziologie umană pentru admiterea la
    facultățile de medicină (Barron's and UMF Târgu Mureș, 2022), selected chapters: cell,
    bones and joints, muscle tissue, nervous tissue and system, sense organs, endocrine system,
    blood, cardiovascular, lymphatic, respiratory, digestive, metabolism and nutrition, urinary,
    male and female reproductive systems.
  - Chemistry topics: solutions, acids and bases (pH, Ka, Kb), composition and structure of
    organic compounds, isomerism, alcohols, phenols, amines, aldehydes and ketones, carboxylic
    acids and derivatives, carbohydrates, amino acids, proteins, fats, nucleic acids, enzymes,
    hormones, vitamins, medicines, yield and conversion. Textbooks: Chimie IX, X and XI (C1).
- edupedu.ro, "Admitere Medicină 2026. Caietele cu întrebări de concurs la Chimie și Fizică, UMF
  Carol Davila" (read 2026-11-07): test on Sunday 26 July 2026 from 9:00; 6,916 candidates
  registered at Carol Davila.
  https://www.edupedu.ro/admitere-medicina-2026-caietele-cu-intrebari-de-concurs-la-chimie-si-fizica-umf-carol-davila-descarca/

So: number of questions, time, single versus multiple answers, the second subject and the
syllabus extracts all vary by university and year. The landing says so and gives the Carol Davila
and Cluj figures as examples, dated 2026. No question asks about the test itself.

## How the bank models it
- Four practice tests of 50: 30 biology, 20 chemistry, the 60:40 Carol Davila split.
- Single answer of four. Multiple-answer (complement multiplu, complement grupat) items are not
  modelled; the landing says so.
- Physics as the chosen subject is not modelled.
- Biology follows the Romanian grade XI textbook topics that every UMF syllabus shares
  (nervous system, analyzers, endocrine glands, movement, digestion, circulation, respiration,
  excretion, reproduction). Genetics (grade XII) is not in Cluj's 2026 biology list and is left
  out; where a university adds it, candidates should check its own syllabus.
- Chemistry: introduction and hydrocarbons (Chimie X), functional groups (X and XI), biological
  compounds, optical isomerism, acid-base character (XI and Cluj's solutions and pH topic).
- Passing: admission is ranked by score against the places available, with a minimum grade of 5
  at Carol Davila. Tigertest's 80% line is its own readiness target.

## Content sources (facts checked against)
- Manual de biologie clasa a XI-a (Corint, Art and other approved editions) and the Krumhardt
  and Alcamo reference above, for anatomy and physiology figures (31 spinal nerve pairs, 7
  cervical vertebrae, resting potential about -70 mV, cardiac cycle 0,8 s at 75/min, about 180
  L primary urine a day, 9,3 kcal per g of lipids, 4,1 kcal per g of carbohydrates and proteins).
- Chimie manual clasa a X-a and a XI-a (C1), Editura Art, for organic chemistry (Markovnikov,
  Baeyer reagent, Kucherov, Tollens and Fehling, 2^n stereoisomers, useful and total conversion).
- Every calculation item was recomputed: debit cardiac 70 ml x 75 = 5,25 L/min; capacitate
  vitală 500 + 1500 + 1500 = 3500 ml; M(C3H8) = 44 g/mol; C4H10 needs 6,5 mol O2; 2 mol gas =
  44,8 L at STP; 23 g ethanol = 0,5 mol; conversie utilă 4/5 = 80%; 2^3 = 8 stereoisomers.

## Siblings checked for overlap (2026-11-07)
`rorezid` (residency, clinical medicine), `rocpi`, `rotaxi`, `rodrpciv`: no shared facts.

## Review pass (2026-11-07)
Re-read the UMF Carol Davila 2026 regulation PDF (art. 14, 20, 21; (2) items 2 to 4) and the UMF
Cluj Ghid admitere 2026 PDF ("răspunsuri multiopționale", 2 hours, calculator for chemistry):
every figure on the landing, in the FAQ and in the WIRING examFacts block matches. All 200 items
read in Romanian; keys and numbers rechecked; locked all-number items put the key in an end slot
9 times out of 18. No overlap with rorezid, rocpi, rotaxi or rodrpciv.
