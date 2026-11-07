# Sources for `hukreszmoto` (Hungary motorcycle theory exam, categories AM, A1, A2 and A)

All 200 questions are original, written in English from the Hungarian Highway Code (KRESZ), the
licence decree and the KAV motorcycle curricula. The official KAV question bank and commercial KRESZ
apps were not opened or copied. Signs are described in words (no images). Checked 2026-11-06 unless
noted.

## Who runs the exam, format and pass mark
- The exam is the computer-based theory exam "Közlekedési alapismeretek" taken at a centre of the
  KAV Közlekedési Alkalmassági és Vizsgaközpont Nonprofit Kft. (vizsgakozpont.hu / kavk.hu). The
  ministry publishes the curriculum and exam requirements ("Tantervi és vizsgakövetelmények") per
  category on the KAV site.
- A2 (KAV document, 4th version, 2020, read 2026-11-06): "A vizsga teljesítéséhez egy 55 kérdésből
  álló számítógépes, feleletválasztós tesztet kell sikeresen megoldani. A vizsga időtartama 55 perc,
  kérdésenként 1 perc a rendelkezésre álló idő. Az elérhető maximális pontszám 75 pont, melyből a
  sikeres vizsgához legalább 65 pontot kell elérni." So: 55 multiple-choice questions, 55 minutes,
  75 points, 65 to pass.
  https://vizsgakozpont.hu/uploads/2020/dokumentumok/motoros-kepzes-tantervi-es-vizsgakovetelmenyek-a2-kategoria-2020_10_02.pdf
- A after A1/A2/A korl. (6th version, in force 2023-08-24, signed, read 2026-11-06): the same 55
  questions, 55 minutes, 75 points, 65 to pass. Its exam content is the course subjects
  "Közlekedési alapismeretek", "Járművezetés elmélete" (riding theory: human factors, protective
  gear, pre-ride checks, moving off on a hill, cornering, braking, emergency braking, passengers and
  loads, centre and side stands, tram rails, skids, push starting, night, winter, water and dirt on
  the road, crosswind, hazard recognition) and "Szerkezeti és üzemeltetési ismeretek" (frame,
  suspension, tyres, springs and dampers, brakes, lubrication, cooling, clutch, gearbox, chain,
  shaft and belt drive). The bank's categories follow these subjects.
  https://vizsgakozpont.hu/uploads/2023/dokumentumok/tantervi_es_vizsgakov_a_a1_a2_akorl_kategoria_2023_alairt.pdf
- AM (signed 2023 document, read 2026-11-06): "egy 25 kérdésből álló számítógépes,
  feleletválasztós tesztet ... A vizsga időtartama 25 perc. Az elérhető maximális pontszám 35 pont,
  melyből a sikeres vizsgához legalább 30 pontot kell elérni." So AM is 25 questions, 25 minutes,
  35 points, 30 to pass.
  https://vizsgakozpont.hu/uploads/2023/dokumentumok/tantervi_es_vizsgakov_am_kategoria_2023_alairt.pdf
- Point weighting, GUIDES ONLY: the KAV documents give only the totals. eduKRESZ's table gives the
  same counts (AM 25 / 35 / 30, 5 error points allowed; A1, A2, A 55 / 75 / 65, 10 allowed).
  Tigertest scores every question equally and uses 87% (48 of 55) as the target.
  https://edukresz.hu/a-jarmuvezetok-vizsgaztatasa
- Conflicting third-party figures NOT used: autoviatest.com (65 minutes; different point totals).

## Languages
- GUIDES ONLY: eduKRESZ says the computer-based theory exam for motorcycle and category B can be
  taken in four languages: Hungarian, German, English and Romanian ("Ma Magyarországon négy nyelven
  lehet motoros és B kategóriás számítógépes elméleti vizsgát tenni"). Not found on a KAV page; the
  KAV exam rules (2024-10-01) provide for foreign-language banks and an interpreter-assisted oral
  exam where no bank exists in the candidate's language (see `tools/next100/hukresz/sources.md`).
  https://edukresz.hu/a-jarmuvezetok-vizsgaztatasa

## Licence categories and ages: Government Decree 326/2011. (XII. 28.) (in force text, read 2026-11-06)
https://net.jogtar.hu/jogszabaly?docid=a1100326.kor
- Annex 7 I (EU directive 2006/126 ages, from 2013-01-19): AM 14; A1 16; A2 18; A 20 with at least
  two years of A2 riding (until 21 an A licence allows only motor tricycles up to 15 kW); A 24
  without prior motorcycle experience. Annex 7 II.1: unrestricted A after two years on A2, or at 24
  with a separate test.
- Category definitions: AM = L1e two-wheeled or L2e three-wheeled mopeds with a design speed of
  45 km/h (not 25 km/h or less), up to 50 cm3 or 4 kW electric; and L6e light quadricycles (moped
  cars). A1 = up to 125 cm3, 11 kW and 0.1 kW/kg, and motor tricycles up to 15 kW. A2 = up to 35 kW
  and 0.2 kW/kg, not derived from a vehicle of more than double its power. A = everything else, and
  motor tricycles over 15 kW.
- That a higher category also covers the lower (A2 covers A1 and AM) follows directive 2006/126,
  Article 6, which the decree implements.

## The rules: KRESZ (1/1975. (II. 5.) KPM-BM joint decree), in force text read 2026-11-06
https://net.jogtar.hu/jogszabaly?docid=97500001.kpm (time state open-ended from 2026-04-11; the
draft new KRESZ was not in force, see `tools/next100/hukresz/sources.md`).
Rider rules used:
- s3(2): the rider of a two-wheeled vehicle may not use a hand-held phone while moving or while
  stopped for traffic.
- s4: fitness to ride, no impairing substances (s4(1)c).
- s14: "no entry for motor vehicles" excludes two-wheeled motorcycles; "no entry for motorcycles"
  covers two-wheeled, sidecar and motor tricycles; "no entry for mopeds"; the no overtaking sign
  does not apply to a motor vehicle overtaking two-wheelers. s13 minimum speed sign.
- s26(1): cars and motorcycles 130 / 110 / 90 / 50 km/h; mopeds 40 km/h; s26 (sign above 90 km/h
  outside built-up areas raises the limit only for cars, motorcycles and vehicles up to 3,500 kg).
- s27(1): following distance. s34(8)-(9): the ban on overtaking at junctions and level crossings
  does not cover a motor vehicle overtaking two-wheeled motorcycles, mopeds and bicycles.
- s36(8) be): two-wheeled motorcycles and mopeds may use a bus lane without disturbing buses and
  trolleybuses; s36(12): two-wheeled motorcycles and mopeds may move forward beside or between
  stopped vehicles at junctions, narrowings, level crossings or other traffic stops, if there is
  room and they do not hinder vehicles signalling a change of direction; the yellow advanced cycle waiting area (153/a) is for bicycles.
- s37(1)-(3): motorways and expressways only for vehicles able to do 60 km/h on the level; no
  joining from roadside property, no U-turn or reversing.
- s40(8)-(9): two-wheeled motorcycles and mopeds may stop on the pavement without a sign if they
  take at most half its width, leave 1.5 m free and do not exceed 1,000 kg axle load.
  s41(3): two-wheelers may stand two abreast or at an angle within a car's width.
- s44(7): motorcycles, and mopeds fitted with a dipped headlight, ride with dipped beam by day in
  good visibility too.
- s46(3): one pillion passenger, able to look after their own safety, whose feet reach the
  footrests.
- s48(9): rider and passenger on a motorcycle or moped with no enclosed cab wear a fastened
  motorcycle helmet.
- s54(1), (3), (7)b-f, (8), (9) and the cycle path sign: mopeds keep to the right edge, ride in
  single file, no riding hands-off, no towing by another vehicle, no loads sticking out sideways or
  more than 1 m, no leading animals; no cycle lane riding in built-up areas, no passenger on a
  two-wheeled moped, no trailer; three- or four-wheeled moped passengers only with a rider of 17+;
  two-wheeled mopeds may use cycle paths outside built-up areas unless a sign bans it.
- s56(6): the warning triangle rule for broken-down vehicles outside built-up areas excludes
  two-wheeled motorcycles. s57(3): two-wheeled motorcycles and mopeds may not be towed or tow.
- Definitions (Annex 1): motorcycle (L3e, L4e with sidecar, motor tricycles); moped (L1e, L2e,
  quad, moped car); a moped is not a motor vehicle (gépjármű); a person pushing a moped is not its
  driver, and walks on the right (s21).

## Riding technique and machine knowledge
From the subject lists of the KAV A curricula above (riding theory and structure and operation).
Technique answers (front brake does most stopping, countersteering, brake upright before a bend,
limit point, lean with the rider, keep a helmet on an injured rider unless the airway needs it)
follow standard rider training and first aid advice; no specific provider is followed.

## Left out on purpose
Fines, fees, penalty points, the practical and handling tests, novice rules, tread depths, licence
validity periods, the obsolete "A korlátozott" category, and anything in the draft new KRESZ.

## Lane and duplicates
Rules shared with car drivers (zero alcohol, foreign licence, car speed limits, signs that end at
the next junction, residential zone, inner lanes, following distance, emergency corridor, crashes)
are left to `hukresz`. Stems were compared with every `data/*-questions.json` bank (hukresz and the
moto, ukmoto, nzmoto, zak53moto, sgrtt, dkmoto, fimoto, ptmoto, semoto and demotorrad banks) and
reworded where they matched. Siblings `hugki`, `huelsoseg` and `hubizt` had no banks on disk when
this was written; none of them covers motorcycle rules.
