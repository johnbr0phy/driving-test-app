# plcpc: Poland Driver CPC Initial Qualification Test (test kwalifikacyjny, kwalifikacja wstępna)

- What it is: the computer-based qualification test at a WORD that ends the initial
  qualification (280 h) or accelerated initial qualification (140 h) every professional truck
  (C1, C1+E, C, C+E) and bus (D1, D1+E, D, D+E) driver in Poland needs. Pass gives the
  certificate of professional competence and code 95.
- Official format (Dz.U. 2026 poz. 1355 par. 32, in force 2026-11-03, replacing Dz.U. 2022 poz.
  739): 20 basic questions (2 or 3 from each of annex 1 sections 1.1, 1.2, 2.1, 3.1-3.6) and 10
  specialist questions for the truck block (1.3, 1.4, 1.5, 2.2, 3.7) or bus block (1.4-1.7, 2.3,
  3.8); 45 minutes; one correct answer; pass 16/20 and 5/10. Supplementary qualification: 10
  specialist questions in 15 minutes. Held in Polish; a WORD may provide another language, else
  a sworn translator.
- Model: v1, 4 tests x 50, 13 categories, 34 basic + 8 truck + 8 bus per test, passPct 70
  (35/50 = 21/30). Pools ECO 16, BRK 16, HRS 24, TAC 16, SAF 16, CRM 8, HLT 12, EMG 16, IMG 12,
  LOD 16, FRT 16, PSG 16, PRL 16. Five topic sets 45901-45905 (set 4 truck block, set 5 bus block),
  tests 45901-45904. State `PLCPC`, prefix `PLCPC-`.
- Languages: English base bank `data/poland-driver-cpc-questions.json`, Polish translation
  `data/poland-driver-cpc-questions_pl.json` (`translations.pl`, locale pl-PL, `review: { pl: "machine" }`),
  landings `/poland-driver-cpc-practice-test` and `/pl/kwalifikacja-wstepna-test` (x-default).
  No Ukrainian (not a site language yet).
- Law used: Road Transport Act (Dz.U. 2025 poz. 1490: art. 39a ages and conditions, 39c, 39d,
  39j), Road Traffic Act (Dz.U. 2024 poz. 1251: art. 19, 20, 23, 39, 44, 57, 58, 61, 63), Drivers'
  Working Time Act (Dz.U. 2026 poz. 477), Drivers Act art. 8-9, Tachographs Act, Reg 561/2006 with
  the Mobility Package, Reg 165/2014, Reg 1072/2009, Directive 2020/1057, Reg 1073/2009, Reg
  181/2011, CMR, ADR, ATP, TIR.
- Not modelled: the practical parts of the course, fees, retakes. No alcohol thresholds, triangle
  distances, emergency corridor or zipper items (plteoria's lane).
- Sources: `tools/next100/plcpc/sources.md`; terms: `glossary.md`. Build:
  `python3 -I tools/next100/plcpc/build.py` and `python3 -I tools/next100/plcpc/pl/build.py`.
- Theme `[data-theme="plcpc"]` deep magenta `305 75% 42%` (the blue band is full, and the builder's 266 100% 22% sat too close to plaplik's indigo), CDL tiger,
  region PL, hub group "EU driving theory tests" right after plteoria.
