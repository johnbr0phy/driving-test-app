# Sources for `dkmedborger` (Medborgerskabsprøven, Danish permanent residence test, written in Danish)

All 200 questions are original, written directly in Danish on the topics of SIRI's official
learning material for the test and on Danish law. Nothing was copied from the learning
material's own wording, from a past test (SIRI publishes every past test with its answers; only
the cover page and the example question of the May 2025 booklet were read, to confirm the
format), or from a commercial practice site or app. Checked 2026-11-06 unless noted.

## Exam format (confirmed)
- Bekendtgørelse nr. 452 af 13. maj 2024 om medborgerskabsprøven (Lovtidende A, published
  14 May 2024), PDF read 2026-11-06:
  https://www.retsinformation.dk/eli/lta/2024/452
  (PDF: https://www.retsinformation.dk/eli/lta/2024/452/pdf)
  - § 1: a passed test meets the citizenship requirement (krav om medborgerskab), one of four
    supplementary integration conditions, two of which must be met, for tidsubegrænset
    opholdstilladelse (permanent residence); the test measures familiarity with Danish society,
    everyday life, culture and history
  - § 9: a booklet of 25 questions on folkestyret and everyday life, Danish culture and history,
    within the framework of the learning material SIRI has published; objectively right or wrong
    answers, including multiple choice; written, individual, no aids (except special conditions
    under §§ 23-24); 30 minutes; pass with at least 20 of 25 correct
  - § 10: topics: everyday life and citizenship (associations, libraries, active participation in
    work and leisure); Danish society (welfare, labour market and workplace culture, education,
    democracy and basic values, Denmark and the world, geography); Danish history, art and culture
  - § 11: held by approved providers of Danish education designated by SIRI
  - § 35 stk. 2-3: pass if at least 20 of 25 are correct; all questions weigh equally;
    assessed Bestået / Ikke-bestået
- Medborgerskabsprøven, 27 May 2025, test booklet cover and instructions (published by SIRI,
  copy hosted by The Copenhagen Post), read 2026-11-06 (cover and instructions only):
  https://cphpost.dk/wp-content/uploads/2025/05/medborgerskabsproeven-2025-05.pdf
  - "Hjælpemidler: Ingen", "Tid: 30 minutter", held 11.00 to 11.30
  - 25 multiple-choice questions with two or three options, written from "Læremateriale til
    medborgerskabsprøven: demokrati og hverdagsliv i Danmark"; answered by a cross on paper,
    one cross per question
- UC+ Dansk, "Medborgerskabsprøven" (read 2026-11-06):
  https://ucplusdansk.dk/en/dansk-og-vidensproever/medborgerskabsproeven/
  - 25 multiple-choice questions, at least 20 correct to pass; tests knowledge of Danish
    community, culture and history
  - held twice a year, May/June and November/December; next test 25 November 2026, registration
    deadline 21 October 2026; a link to the study material is sent on registration
  - one of the 2-of-4 supplementary conditions for permanent residence; a fee is charged (amount
    not used on Tigertest)
- The Copenhagen Post, SIRI publishes full versions of the citizenship and permanent residence
  tests (via search results 2026-11-06): https://cphpost.dk/?p=176710
- Studieskolen, "Medborgerskabsprøven - Active citizen exam" (via search results 2026-11-06):
  https://www.studieskolen.dk/en/tests/danish-tests/medborgerskabsproeven

Not read directly: siri.dk and danskogproever.dk (the medborgerskabsprøve page returned 404 on
2026-11-06); sprogskolen.kolding.dk's participant page also returned 404. Format facts are taken
from the bekendtgørelse and the 2025 booklet.

## Learning material (the topic source)
- Udlændinge- og Integrationsministeriet / SIRI, "Læremateriale til medborgerskabsprøven:
  demokrati og hverdagsliv i Danmark", August 2024 (editing closed June 2024), 26 fakta-ark,
  copy read 2026-11-06:
  https://nearlydanish.com/media/1354/laeremateriale-til-medborgerskabsproeven-2024.pdf
  Fakta-ark: 1 Skole, 2 Uddannelse, 3 Dagtilbud, 4 Det danske arbejdsmarked, 5 Dansk erhvervsliv,
  6 Det danske velfærdssamfund, 7 Familieliv, 8 Forenings- og fritidsliv, 9 Sundhed og sygdom,
  10 Ligestilling, 11 Demokrati og grundloven, 12 Det danske retssamfund, 13 Folketing og
  regering, 14 Det lokale selvstyre, 15 Folkestyret i praksis, 16 Borgernes rettigheder og
  pligter, 17 Religion og kirke, 18 Danmark og omverdenen, 19 Danmarks geografi og befolkning,
  20 og 21 Danmarks historie før og efter 1945, 22 Dansk kultur, 23 Traditioner og mærkedage,
  24 Forsvars- og sikkerhedspolitik, 25 Diskrimination, antisemitisme, hadforbrydelser og
  ekstremisme, 26 Klima.
  No newer edition was found as of 2026-11-06.

## Facts left out on purpose (they change or were changing)
- Region names, number of regions and regionsråd members (the 2024 health reform reorganises the
  regions from 2027); folkepension age; abortion week limit (raised in 2025); age limits for
  alcohol (raised for strong drinks in 2025) except the stable 18 for cigarettes; conscription
  length, numbers and the extension to women; free dental care age; EU presidency dates; party
  lists; vote shares; any money figure (benefits, fees, aid amounts).
- No current officeholder is named. Living cultural figures (Thomas Vinterberg) are not
  officeholders.

## Lane vs `dkindfoed` (indfødsretsprøven, written at the same time)
`data/dk-indfoedsret-questions.json` was on disk while writing. This bank keeps to everyday
citizenship (school and daycare, the labour market in practice, health care, family law in
daily life, voting in practice, police and courts, the municipality, church membership,
discrimination, geography and climate). Every fact-and-answer pair was checked against
dkindfoed's 200 items with a script (same key or a stem similarity over 0.7); none repeat. The
facts dkindfoed asks (179 seats, two Greenland seats, 98 municipalities, regions run hospitals,
a-kasse, dagpenge, CPR, MitID, SU, moms as a word, flexicurity, Christiansborg, Grundtvig and
most history and culture names) were avoided.
