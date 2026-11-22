# Poland Driver CPC qualification test (plcpc) sources

Every question in `data/poland-driver-cpc-questions.json` (and its Polish translation) is original,
written from the laws and regulations below. No WORD question set, official catalogue item, past
paper, training-centre material or commercial app was used or reworded.

All Polish acts were downloaded as PDF from the Sejm ELI API (api.sejm.gov.pl) on 2026-11-21 and
read in the parts cited. Status of each act was checked through the same API on 2026-11-21.

## Format and syllabus (official, fetched 2026-11-21)
- Rozporządzenie Ministra Infrastruktury z dnia 7 października 2026 r. w sprawie szkolenia i
  egzaminowania kierowców wykonujących przewóz drogowy, Dz.U. 2026 poz. 1355
  (https://api.sejm.gov.pl/eli/acts/DU/2026/1355/text.pdf), in force from 2026-11-03. It replaced
  Dz.U. 2022 poz. 739 (https://api.sejm.gov.pl/eli/acts/DU/2022/739/text.pdf, status "uznany za
  uchylony" from 2026-11-03, read for comparison; the research note's par. 31 is par. 32 in the new
  text). Read:
  - par. 32(1): the test after initial qualification (kwalifikacja wstępna) or accelerated initial
    qualification has a basic part of 20 questions (at least 2 and at most 3 from each of annex 1
    sections 1.1, 1.2, 2.1, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6) and a specialist part of 10 questions
    (truck block C1, C1+E, C, C+E: 2 questions each from 1.3, 1.4, 1.5, 2.2, 3.7; bus block D1,
    D1+E, D, D+E: 1 or 2 each from 1.4, 1.5, 1.6, 1.7, 2.3, 3.8). The old 2022 text had 1.4(a) for
    hazard perception and 2 questions each for the bus block; the 2026 text renumbers it 1.5.
  - par. 32(2)-(3): one correct answer per question; a wrong answer, more than one answer or no
    answer counts as wrong.
  - par. 32(4): pass with at least 16 correct in the basic part and at least 5 in the specialist part.
  - par. 32(5): 45 minutes. par. 32(7)-(8): after supplementary qualification (uzupełniająca), the
    specialist part only, 10 questions in 15 minutes.
  - par. 31: computer-based, at the voivodeship road traffic centre (WORD), questions from the
    official catalogue of test questions (art. 39b1 of the Road Transport Act); at most 20 candidates
    at once; truck and bus blocks may run in the same room.
  - par. 25(2) and par. 30(1)(4): if the WORD provides the test in a language the candidate speaks,
    no sworn translator is needed; otherwise a candidate who does not speak Polish may bring a sworn
    translator up to the start of the test.
  - par. 11: initial qualification course 280 hours, accelerated 140 hours.
  - Annex 1, tables 1 to 3: the list of subjects used for the categories (see spec.json "annex").
- Ustawa o transporcie drogowym, consolidated text Dz.U. 2025 poz. 1490
  (https://api.sejm.gov.pl/eli/acts/DU/2025/1490/text.pdf): art. 39a (employment conditions:
  ages 18 for C/C+E with initial qualification, 21 for C/C+E with accelerated, 21 for D/D+E with
  initial, 21 for D on regular lines up to 50 km with accelerated, 23 for D/D+E with accelerated;
  no health or psychological contraindications; qualification and periodic training; exemptions),
  art. 39c (WORD director issues the certificate of professional competence, świadectwo
  kwalifikacji zawodowej, after a pass), art. 39d (periodic training every five years from the
  certificate, as a course or a cycle of classes over five years), art. 39j (driver medical
  examinations every 5 years until 60, then every 30 months); code 95 on the driving licence or
  driver qualification card (karta kwalifikacji kierowcy).

## Polish law used in questions (fetched 2026-11-21)
- Prawo o ruchu drogowym, consolidated text Dz.U. 2024 poz. 1251
  (https://api.sejm.gov.pl/eli/acts/DU/2024/1251/text.pdf): art. 19(3) gap for vehicles over 7 m
  on two-lane two-way roads, art. 19(4) tunnels over 500 m (50 m up to 3.5 t and buses, 80 m
  others), art. 20 speed limits (over 3.5 t: 80 km/h on motorways, expressways and dual
  carriageways with two lanes each way, 70 km/h elsewhere outside built-up areas; buses meeting
  extra conditions 100 km/h on motorways and expressways), art. 23 no reversing on motorways,
  expressways, tunnels, bridges; art. 39 seat belts (child under 3 in M2/M3 exempt; art. 39(2a)
  driver informs passengers unless the group leader or an audio-video message does), art. 44
  duties after an accident, art. 57 and 58 marking of vehicles carrying children and disabled
  people, art. 61 loads (side 23 cm on a 2.55 m vehicle, front 0.5 m and 1.5 m from the driver's
  seat, rear marking over 0.5 m, bulk in a tight covered body, height with load 4 m), art. 63
  passengers not over the registered places. A newer consolidated text may exist; the articles
  used were checked against amending notes in this text and are long-standing.
- Ustawa o czasie pracy kierowców, consolidated text Dz.U. 2026 poz. 477
  (https://api.sejm.gov.pl/eli/acts/DU/2026/477/text.pdf): night period definition (four hours
  between 00:00 and 07:00), art. 6 working time (waiting for loading of unknown length counts),
  art. 11 (8 h a day, 40 h average, settlement period up to 4 months), art. 12 (48 h average,
  60 h in a week), art. 13 (break after 6 h: 30 min up to 9 h of work, 45 min over 9 h, parts of at
  least 15 min, shortened by the 15-minute paid break), art. 14 (11 h daily rest, may be used in a
  stationary vehicle with a sleeping place; 35 h weekly rest), art. 21 (10 h with night work).
- Ustawa o kierujących pojazdami, consolidated text Dz.U. 2025 poz. 1226
  (https://api.sejm.gov.pl/eli/acts/DU/2025/1226/text.pdf): art. 8 and 9 minimum ages (C/C+E 18
  with initial qualification; D/D+E 21 with initial or accelerated qualification).
- Ustawa o tachografach, consolidated text Dz.U. 2024 poz. 1037
  (https://api.sejm.gov.pl/eli/acts/DU/2024/1037/text.pdf): art. 2(7) cards are issued by the
  state-owned security printer (PWPW, named in guides, e.g. gazetaprawna.pl, checked 2026-11-21).
- Kodeks karny: art. 162 (failure to help a person in danger), art. 264 (organising illegal
  border crossing). Long-standing; cited by article only.
- Polish tobacco act (ustawa o ochronie zdrowia przed następstwami używania tytoniu): smoking,
  including e-cigarettes, banned in public transport vehicles. Long-standing.
- e-TOLL for vehicles over 3.5 t on toll roads (viaTOLL ended 2021). Long-standing.

## EU rules used (long-standing texts)
- Regulation (EC) No 561/2006 as amended by (EU) 2020/1054: 4.5 h then 45 min (15 + 30), 9 h daily
  (10 h twice a week), 56 h weekly, 90 h fortnight, fixed week, 11 h daily rest (3 + 9 split, 9 h
  reduced three times), 24 h window (30 h multi-manning), 45 h weekly rest (24 h reduced,
  compensated en bloc by the end of the third week), start within six 24-hour periods, no regular
  weekly rest in the cab, return home every 4 weeks, two consecutive reduced weekly rests for
  international goods drivers, art. 10 pay, art. 12 extension.
- Regulation (EU) No 165/2014 and Implementing Regulation (EU) 2016/799: 56 days of records (art. 36 as amended by
  Regulation (EU) 2020/1054, from 31 December 2024; it was 28 days before), card
  validity 5 years, replacement within 7 calendar days, 15 days with printouts for damaged, faulty,
  lost or stolen cards, renewal 15 working days before expiry, inspection every 2 years, UTC,
  slots, company and control cards, one-minute rule (since 2011), out of scope mode.
- Directive (EU) 2022/2561 (codified Driver CPC directive); Directive 2002/15/EC as transposed.
- Regulation (EC) No 1072/2009 and Directive (EU) 2020/1057 (posting: cabotage and cross-trade
  posted, bilateral excluded). Regulation (EC) No 1073/2009 (regular, special regular, occasional
  services, journey form, authorisation). Regulation (EU) No 181/2011 (refusal of disabled
  passengers, 36 hours notice, information within 30 minutes, rerouting or refund after 120
  minutes, accommodation up to 2 nights, mobility equipment compensation).
- CMR Convention (art. 8 reservations, art. 30 7 days for non-apparent damage and 21 days for
  delay, art. 32 one year), ADR (driver training certificate, tunnel categories A to E), ATP, TIR.
- Resuscitation guidelines: 100 to 120 compressions a minute.

## Format facts that could not be confirmed officially
- Languages: the regulation only allows a WORD to provide the test in a language the candidate
  speaks. Trade press (trans.info, "Egzaminy kierowców po angielsku",
  https://trans.info/pl/egzaminy-kierowcow-po-angielsku-314098, via search 2026-11-21) reports
  WORD Warszawa ran the qualification test with question sets translated into English; reports
  on Ukrainian and Russian conflict (Radio Kraków says available, Forsal says not for D). The
  landing says "held in Polish; some WORDs offer translated sets; ask your WORD". The research
  note's "Polish, English, Ukrainian and Russian" (open-exam-prep.com, not official) is not used.
- No official weights by topic beyond par. 32; Tigertest's split follows it (34 basic, 8 C, 8 D).

## Modelling
- Four 50-question tests: 34 basic questions (the nine basic sections), 4 + 4 truck block and 4 + 4
  bus block, so both blocks appear in every test. passPct 70 (35 of 50) is the share of 21 of 30;
  the real test also needs 16/20 in the basic part, which the landing explains.
- Five topic training sets; set 4 is the truck block, set 5 the bus block.

## Not used
Fees, fines, penalty points, booking, retakes, the number of questions or pass mark (landing and
examFacts only). No item asks about the qualification test itself. Polish holiday driving bans
for trucks (changing dates) and the CMR liability limit (a money figure) left out.

## Duplicates (2026-11-21)
Checked by script (stem word overlap plus key overlap) against hungary-gki, romania-cpi,
ireland-truck-bus-theory, malta-driver-cpc, uk-lgv-theory, uk-pcv-theory, finland-truck-theory,
denmark-truck-theory, nz-heavy-vehicle-licence, cdl and the Poland siblings pl-teoria, pl-bron,
pl-aplikacje, poland-lek. Rewritten while writing: 34 items that repeated another bank's fact
and answer (EU hours and tachograph basics turned into scenario sums with new numbers, or
replaced with Polish Act facts), and one item on the idling ban that pl-teoria already asks.
Kept clear of pl-teoria's car facts (alcohol thresholds, triangle distances, emergency corridor,
zipper merge, chains, the 2 m rear overhang, bus-stop priority).

## Review pass (2026-11-22)
- Format re-checked against the official text: Sejm ELI record for Dz.U. 2026 poz. 1355
  (https://api.sejm.gov.pl/eli/acts/DU/2026/1355, status "obowiązujący", entry into force
  2026-11-03, replaces Dz.U. 2022 poz. 739) and its PDF par. 32 (20 basic + 10 specialist, one
  correct answer, pass 16 and 5, 45 minutes; 10 questions in 15 minutes after supplementary
  qualification) and par. 11 (280 and 140 hours). Landing, FAQ and WIRING examFacts agree.
- Road Traffic Act Dz.U. 2024 poz. 1251 re-read for art. 19(3)-(4), 20(3)-(4), 23(2), 39(2)-(2a),
  44(1)-(2), 57, 58, 61(5)-(10) and 63(1): items match.
- Corrected PLCPC-TAC-001: the roadside period is the current day and the previous 56 days
  (Regulation 165/2014 art. 36 as amended by Regulation (EU) 2020/1054, applying from 31 December
  2024), not 28; rewritten as a date sum.
- Rewritten for repeats of other driving banks (same scenario and answer in hungary-gki,
  romania-cpi, malta-driver-cpc, ireland-truck-bus-theory, uk-lgv-theory, cdl, nz and Canada
  banks, or pl-teoria's accident duties): HRS-013, 014, 015, 023, 024; TAC-004, 009, 016;
  SAF-005, 010, 013, 015; CRM-002, 003; EMG-002, 004, 008, 010, 011, 012, 016; LOD-002, 007, 008,
  009; BRK-008, 009, 011, 012; ECO-012; HLT-007, 008; FRT-016; PSG-003. New facts used:
  Reg 561/2006 art. 8(8) (employer pays accommodation for regular weekly rest), art. 10
  (undertaking liable), art. 12 (reason noted by hand on arrival); Reg 165/2014 art. 26 (card
  valid at most 5 years), art. 34 (manual entries), art. 35(2) (printout details and signature);
  Road Traffic Act art. 44(1)(4) (details and OC insurer on request); EN 12195-2 (no knots in web
  lashings, STF, edge protection). Polish translations rewritten to match.
