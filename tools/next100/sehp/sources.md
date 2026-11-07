# Högskoleprovet (sehp): sources

All checked 2026-11-06. Format facts go on the landing, in `lib/examFacts.ts` and in the config
comment, never into the bank. Every question, text, table and number in the bank is original;
no item, text, word list or data set was taken from a published högskoleprov (UHR publishes
past tests, which are copyrighted) or from a commercial prep book or app.

## Official (UHR, studera.nu)

| Fact | Source | URL |
|---|---|---|
| Five provpass, 160 scored uppgifter (80 verbal, 80 quantitative); two verbal, two quantitative, one utprövningspass that does not count; given in Swedish; results usable for programmes starting the term after the test and valid until the end of the calendar half-year eight years after the test; best valid result is used | studera.nu, "Vad är högskoleprovet?" | https://www.studera.nu/hogskoleprov/om/intro/ |
| Raw score 1 point per correct answer, no penalty for wrong or blank answers; verbal and quantitative parts normed separately with two norm tables to 0,00 to 2,00; result is the mean of the two normed scores, given with two decimals on a scale in steps of 0,05 (re-checked 2026-11-07: the page states the 0,05 steps for the overall result, not for each part); relation raw to normed depends on the test's difficulty, and earlier norm tables are not suitable for estimating a result; results valid eight years | studera.nu, "Så räknas resultatet fram" | https://www.studera.nu/hogskoleprov/resultat/resultat/rakna/ |
| Latest test 18 October 2026; published passes 1 and 4 (kvantitativ) and 2 and 5 (verbal, without ELF); pass 3 was the try-out pass; ELF texts shown for one week only | studera.nu, "Frågor och facit senaste provet" | https://www.studera.nu/hogskoleprov/resultat/resultat/senaste/ |
| Kvantitativ provpass cover (2026-10-18, provpass 1): 40 uppgifter, 55 minutes; XYZ 12 (uppg. 1 to 12, 12 min recommended), KVA 10 (13 to 22, 10 min), NOG 6 (23 to 28, 10 min), DTK 12 (29 to 40, 23 min); "Du får inte minuspoäng om du svarar fel"; KVA's four fixed alternatives (I är större än II / II är större än I / I är lika med II / informationen är otillräcklig); NOG's five fixed alternatives after "Tillräcklig information för lösningen erhålls" (i (1) men ej i (2) / i (2) men ej i (1) / i (1) tillsammans med (2) / i (1) och (2) var för sig / ej genom de båda påståendena) | provhäfte, read for its instructions page only | https://www.studera.nu/globalassets/05-hogskoleprovet/hp-2026-10-18/provpass-1-kvant.pdf |
| Verbal provpass cover (2026-10-18, provpass 2): 40 uppgifter, 55 minutes; ORD 10 (3 min), LÄS 10 (22 min), MEK 10 (8 min), ELF 10 (22 min); ORD items have five alternatives (A to E), the others four | provhäfte, read for its instructions page only | https://www.studera.nu/globalassets/05-hogskoleprovet/hp-2026-10-18/provpass-2-verb-utan-elf.pdf |
| Mathematics at the level of Matematik 1b (GY 2011) | studera.nu, "Förbereda dig inför provet" | https://www.studera.nu/hogskoleprov/om/forbereda/ |
| UHR's own report on the test's use (background) | UHR, "Siffror från UHR 6" | https://uhr.se/globalassets/_uhr.se/publikationer/2025/siffror-fran-uhr-6-anvands-hogskoleprovet-for-det-andamal-som-det-skapades.pdf |

The fixed KVA and NOG answer frames are the format's instructions, not test content, and are the
only wording shared with the real test.

## Universities and press (secondary, labelled where used)

| Fact | Source | URL |
|---|---|---|
| Spring 2027 test on 10 April 2027, registration 7 to 14 January; spring and autumn sittings; results about four weeks after the test; Stockholm University arranges the test in Stockholm County | Stockholms universitet (updated 2026-11-05) | https://www.su.se/utbildning/anmalan-och-antagning/hogskoleprovet |
| Autumn 2026 test on 18 October 2026, registration 11 to 18 August | hurbra.se guide (secondary) | https://hurbra.se/?p=15628 |
| Just over 100,000 registered for the 18 April 2026 test | Uppsala universitet news, 2026-04-16 | https://www.uu.se/medarbetare/nyheter/2026/2026-04-16-hogskoleprov-engagerar-manga |
| Calculator not allowed (listed among prohibited aids) | a gymnasium lesson handout on the test (secondary; the official list of aids was not found) | https://studnet.gymnasium.ax/system/files/lektion_5_hogskoleprovet.pdf |

Not stated anywhere in Tigertest copy: the registration fee (a price), dates beyond spring 2027,
an average result, cut-off scores for programmes, or any norm table.

## What Tigertest models and how

- One practice test = one verbal provpass + one kvantitativ provpass (80 items, 2 x 55 minutes, a
  5-minute break), half of the 160 scored items at the real pace. Two tests; Test 2 is held out of
  the drills. Eight drills, one per delprov (10 dashboard steps).
- Each part is estimated on 0 to 2 by `curve()` anchors over 40 items (verbal 24 correct = 1,0,
  31 = 1,5, 38 = 2,0; quantitative 23 = 1,0, 30 = 1,5, 37 = 2,0), rounded to 0,05, and the result is
  the mean of the two. These anchors are Tigertest's own estimate, not a UHR table; the landing,
  `scoreNote` and the FAQ say so.
- DTK: diagrams and maps are given as tables with a sentence saying what the figure shows; no
  images. The data are invented.
- ELF: original English texts; questions and options in English, explanations in Swedish.
- The real ELF sometimes uses short texts with one question each and gap texts; here every ELF and
  LÄS text has three or four questions.
