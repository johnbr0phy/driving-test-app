# Sources for `masterelec` (master electrician exam, 2023 NEC)

All 200 questions are original, written by Tigertest from the code rules themselves. No official
sample item, past exam, commercial question bank, exam-prep book (Mike Holt, Tom Henry or others)
or NFPA text was copied or reworded; options and explanations paraphrase the rules. The ICC and PSI
bulletins publish no sample questions for the master exam, so there was no official item set to
check against; the bank was checked instead against every bank in this repo (see "Duplicates").

## Exam format and outline (official)
- ICC 2024 National Contractor/Trades Examination Information Bulletin, published October 12, 2026:
  https://www.iccsafe.org/wp-content/uploads/2024-National_Contractor_Bulletin.pdf (fetched 2026-11-23).
  Exam R16-N-75%, National Master Electrician: 100 multiple-choice questions, open book, 5 hours,
  Pearson VUE, $120, based on the 2023 NEC (references: 2023 NEC and Ugly's Electrical References).
  Content outline: General Knowledge 12%, Services and Service Equipment 16%, Feeders 4%, Branch
  Circuits and Conductors 16%, Wiring Methods and Materials 19%, Equipment and Devices 10%, Control
  Devices 3%, Motors and Generators 8%, Special Occupancies, Equipment and Conditions 12%. Four-option
  questions, one correct answer, no guessing penalty, 10-day wait to retake a failed exam. From
  December 1, 2026 ICC offers 70% and 75% exam suites; the Master Electrician ID listed is the 75% one.
- ICC contractor and trades testing page: https://www.iccsafe.org/credentialing/contractor-trades/
  (fetched 2026-11-23): links the Exam Catalog, registration through Pearson and the 2015, 2018, 2021
  and 2024 national contractor bulletins.
- PSI, Texas Department of Licensing and Regulation, Electrician Candidate Information Bulletin:
  https://test-takers.psiexams.com/api/content/bulletin/5879 (fetched 2026-11-23). Master Electrician
  exam in two portions, NEC Knowledge (75 items including 5 non-scored, 150 minutes) and Calculations
  (33 items including 3 non-scored, 170 minutes), 70% to pass each; referenced to the 2026 NEC from
  September 1, 2026. Used on the landing as an example of state variation.
- PSI, Iowa Electrical Examining Board Candidate Information Bulletin:
  https://test-takers.psiexams.com/api/content/bulletin/3552 (fetched 2026-11-23). Master Electrician:
  100 scored items in 240 minutes plus 10 non-scored in 30 minutes, 70% to pass, 2023 NEC.

## Code (primary)
- NFPA 70, National Electrical Code, 2023 edition: https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70
  (code page checked 2026-11-23; the code text is NFPA's copyright and is not quoted). Articles used:
  90, 100, 110, 210, 215, 220, 225, 230, 240, 250, 300, 310, 312, 314, 320, 330, 334, 348, 352, 358,
  368, 392, 400, 404, 406, 408, 410, 422, 424, 426, 430, 440, 445, 450, 501, 514, 516, 517, 518, 550,
  551, 590, 600, 625, 645, 680, 700, 702, 705, 725, 760, and Chapter 9 Tables 4 and 5 (areas given in
  the stems). Explanations cite articles and tables by name, not section numbers.
- 2026 NEC: issued August 2025; load calculations move from Article 220 to Article 120, and Chapter 8
  is folded into Chapter 7 (IAEI summary of the 2026 changes,
  https://iaeimagazine.org/standards/nec-2026-significant-code-changes/, read 2026-11-23). The one item
  that depends on Chapter 8's independence names the 2023 NEC in its stem. A freshness event in
  lib/examFreshness.json tracks the move.

## Written from working knowledge of the 2023 text (not re-read line by line; reviewer should check)
- Dwelling standard and optional methods (Table 220.45 steps, 220.53 75 percent for four or more
  appliances, Table 220.54 dryers, Table 220.55 Column C with Notes 1 and 4, 220.61 neutral, 220.82,
  220.83, 220.84 multifamily percentages, Table 220.56 kitchen equipment, 220.47 receptacles, 220.14
  show windows, multioutlet assemblies and sign outlets, 220.57 EVSE at 7,200 W, 220.87).
- Transformer protection (Table 450.3(B)), 240.21(B)(1) and (C)(6) tap rules, 250.66, 250.102(C)(1)
  12.5 percent rule, 250.122, 230.95 ground-fault protection (1000 A, 1200 A setting).
- Table 430.250 and 430.248 full-load currents used: 460 V 10, 15, 20, 25, 30, 40 hp; 208 V 10 hp;
  230 V single-phase 3 hp. 430.32(C) 140 percent, 430.52 percentages, 430.62, 430.122, 440.22(A).
- Special occupancy figures: 514.3 20 ft and 514.11 20 to 100 ft, 501.15 5/8 in., 517 eight and
  14 receptacles and 5 mA monitor alarm, 680 15 V, 22 1/2 ft and 9 sq in., 700 1 1/2 hours,
  550.32 30 ft, 551 20 percent, 705.12 120 percent rule.

## Left out on purpose
- State licensing law, business and law (some states give a separate contractor business and law
  exam; Tigertest has `contractorlaw` for that), fees and local amendments.
- Nondwelling unit lighting loads from Table 220.12 (several values changed in 2020 and the
  125 percent note is easy to misstate) and the 110.16(B) arc-flash label threshold (it differs
  between editions); the label item asks only what the label must show.
- Anything already asked in `jelec` (journeyman electrician): items whose stem followed a jelec
  template were reworded, and transformer sizes were chosen so no item repeats the 75 kVA,
  208 A example in `caelec`.

## Duplicates
- Checked 2026-11-23 with a word-overlap scan of every stem against every bank in data/: no item
  repeats a fact and answer from jelec, caelec, uk18ed, nhie or contractorlaw.
