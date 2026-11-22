# plteoria: Egzamin teoretyczny na prawo jazdy kat. B (Poland Driving Theory Test, Category B)

- What: the theory part of the Polish state driving exam for a category B car licence, taken on a
  computer at a WORD (wojewódzki ośrodek ruchu drogowego). Native-language exam, base language
  Polish (`language: "pl"`, `locale: "pl-PL"`, `review: { pl: "model" }`).
- Official format (Dz.U. 2023 poz. 2659, § 19, checked 2026-11-21): 32 random questions, 20 basic
  TAK/NIE (20 s + 15 s) and 12 specialist A/B/C (50 s); 3/2/1 points by importance (10/6/4 and
  6/4/2); 74 points, pass at 68; 25 minutes; no going back; every question has a photo or video.
  Languages: Polish, English, German, sign language, Ukrainian for category B.
- Pools and blueprint: 200 items in 8 categories, Znaki 38, Pierwszeństwo 31, Prędkość 25,
  Manewry 25, Postój 25, Niechronieni 19, Kierowca 19, Wypadki 18; per test 6/5/4/4/4/3/3/3 = 32;
  six tests 45501-45506 use 192 items, 8 spares (2 Znaki, 1 each in the next six) are
  training-only.
- Training sets 45501-45505: Znaki i sygnały drogowe 38, Pierwszeństwo i skrzyżowania 31,
  Prędkość i manewry 50, Postój, piesi i rowerzyści 44, Kierowca, wypadki i pojazd 37.
  Dashboard 11 steps. passPct 92 = 30 of 32 (Tigertest's target; the weighting is not modelled).
- IDs: idBase 45500, state `PLTEORIA`, prefix `PLTEO-` (segments ZN, PIE, PRE, MAN, POS, NIE, KIE, WYP).
- Routes: app `/poland-driving-theory/*`, landing `/pl/egzamin-teoretyczny-prawo-jazdy` from
  `lib/landings/plteoria.pl.json`. Region PL, homepage `/pl`.
- Sources: `tools/next100/plteoria/sources.md`; terms and register: `glossary.md`.
- Build: `python3 -I tools/next100/plteoria/build.py` (sorts all-number options with Polish
  decimal commas; the key's letter is found after sorting).
- Theme `[data-theme="plteoria"]` Polish red `354 90% 48%` (the suggested 354 72% 38% clashed with aplus, cpr, act, moto and the Canadian themes; 48% lightness is the only free red slot, white text 4.6:1); borrows the car tiger.
- Hub group: "EU driving theory tests".
- Rules as in force November 2026: PoRD t.j. Dz.U. 2024 poz. 1251 with Dz.U. 2025 poz. 1676 (from
  3 March 2026: okres próbny 2 years, 3 from 17, 0,0 alcohol; category B from 17 with a 25+ mentor,
  Poland only until 18; helmets under 16; no e-scooter up to 13; tractors 40 km/h).
- Not modelled: TAK/NIE and A/B/C formats, 1-3 point weighting, per-question timers, photos and
  video, the motorcycle and other categories (A/A2 is a later sibling bank). No fines, points or
  fees. The old 8-month novice speed limits were repealed on 3 March 2026 and are not asked.
- Quirks: questions use "ty" and avoid gendered verb forms; signs by code ("znak A-7"). The planned
  reform (smaller public catalogue, MI 30.03.2026) is on the landing only.
