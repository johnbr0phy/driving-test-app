# Sources for `dkindfoed` (Indfødsretsprøven, Danish citizenship test, written in Danish)

All 320 questions are original, written directly in Danish on the topics of SIRI's official
learning material (danske samfundsforhold, dansk kultur og historie) and on Danish law. Nothing
was copied from the learning material's own wording, from a past test (SIRI publishes every
past test with its answers), or from a commercial practice site or app. Checked 2026-11-06
unless noted.

## Exam format (confirmed)
- Re-checked 2026-11-07: Lex (https://lex.dk/indf%C3%B8dsretspr%C3%B8ve) still gives 45 questions
  in 45 minutes, three options or yes/no, 35 learning material + 5 current affairs (six months) +
  5 values, at least 36 right with at least 4 of 5 values, SIRI under the Ministry, twice a year
  (May/June, November/December) at selected language centres, 27 May 2025: 3,470 of 5,959 passed.
  UC+ Dansk (https://ucplusdansk.dk/en/dansk-og-vidensproever/indfoedsretsproeven/) still gives
  45 multiple-choice questions, 36 to pass, next test 25 November 2026.
- Lex (Den Store Danske), "Indfødsretsprøve", last changed 2025-10-28, read 2026-11-06:
  https://lex.dk/indf%C3%B8dsretspr%C3%B8ve
  - written test for applicants for Danish citizenship by law (indfødsret ved lov)
  - 45 questions in 45 minutes; most have three answer options (one correct), others are yes/no
  - 35 questions on Danish society (democracy, politics, economy, culture, history) from the
    free official learning material; 5 on current affairs (news and debate from the six months
    before the test); 5 on Danish norms and values (the last five)
  - pass: at least 36 of 45 correct, including at least 4 of the 5 values questions
  - run by Styrelsen for International Rekruttering og Integration (SIRI), under
    Udlændinge- og Integrationsministeriet; held twice a year (May/June and November/December)
    at selected language centres
  - 27 May 2025: 3,470 of 5,959 passed (58.2%)
- Lovguiden, "Indfødsretsprøven 2026: 6.535 tilmeldt til statsborgerskabstest" (2026-06-01),
  read through search results on 2026-11-06 (the page returned HTTP 429 to a direct fetch):
  https://lovguiden.dk/det-offentlige/styrelsen-for-international-rekruttering-og-integration/2026-06-01-indfoedsretsproeven-2026-6535-tilmeldt-til-statsborgerskabstest
  - 6,535 registered for 3 June 2026, 13.00 to 13.45, at 46 language centres
  - 45 multiple-choice questions in 45 minutes; 35 based on "Læremateriale til
    indfødsretsprøven: danske samfundsforhold, dansk kultur og historie" (text and audio);
    10 cannot be prepared for in advance
  - the test and the correct answers are published on siri.dk and danskogproever.dk right after
    each sitting; next sitting 25 November 2026, 13.00 to 13.45
- UC+ Dansk, "Indfødsretsprøven" (read 2026-11-06): 45 multiple-choice questions, 36 to pass,
  May/June and November/December, next test 25 November 2026 (registration deadline
  21 October 2026); study material link sent on registration:
  https://ucplusdansk.dk/en/dansk-og-vidensproever/indfoedsretsproeven/
- The Copenhagen Post, SIRI publishes full versions of the citizenship and permanent residence
  tests (read through search results 2026-11-06): https://cphpost.dk/?p=176710
- Folketinget documents (search results 2026-11-06): the revised learning material and its audio
  version from the winter 2021 sitting; the values questions came with the 2021 agreement that
  raised the test from 40 to 45 questions:
  https://ft.dk/samling/20211/almdel/uui/spm/160/svar/1846498/2513489.pdf
- Integrationsbarometer analysis of the November 2022 sitting (search results 2026-11-06): the
  values questions cannot be prepared from the learning material:
  https://integrationsbarometer.dk/tal-og-analyser/filer-tal-og-analyser/arkiv/Analyse_indfdsretsprvennovember2022_F229jun.pdf

Not confirmed on siri.dk itself (siri.dk/indfoedsretsproeven returned 404 on 2026-11-06), so the
landing cites Lex and Lovguiden. Whether aids are allowed is not stated in the sources read: the
landing does not say.

## Modelling decisions (Tigertest's own)
- The 5 current-affairs questions cannot be modelled (they follow the news of the last six
  months), so each Tigertest test has 40 questions: 35 on the learning material's topics and 5
  values questions. 36 of 40 to pass (passPct 90) keeps the real 90% line (36 of 45 would be 80%,
  but the real 45 includes 5 unprepared current-affairs questions).
- The real rule also needs 4 of the 5 values questions; the engine scores only the total, so the
  copy says to check the values questions after each test.
- Real questions have 3 options (some yes/no); Tigertest's have 4.
- The split of the 35 across history, democracy, society and culture is Tigertest's: SIRI
  publishes no topic weights.
- Eight tests of 40 (320 items, every item in exactly one test), set up like uklitu, cacit and
  aucit's eight real-length tests. The per-test split is 4/3/4/3/7/7/7/5 (history 14, Grundloven
  and folkestyret 7, samfund 7, kultur 7, values 5). Training is six topic sets of at most 60,
  so the dashboard has 6 + 8 = 14 steps.

## Content sources (law and reference, for facts in the bank)
- Danmarks Riges Grundlov (5 June 1953): https://www.retsinformation.dk/eli/lta/1953/169
  (§ 3 tredeling, § 4 folkekirken, § 14 ministres medunderskrift, § 15 mistillid, § 28 Folketinget
  højst 179 medlemmer, § 32 valg mindst hvert fjerde år, § 41 tre behandlinger, § 42 en tredjedel
  kan kræve folkeafstemning, § 44 indfødsret ved lov, § 55 ombudsmand, § 67 religionsfrihed,
  § 71 personlig frihed, § 76 undervisningspligt, § 77 ytringsfrihed, § 78 foreningsfrihed,
  § 79 forsamlingsfrihed, § 88 grundlovsændring: to Folketing og folkeafstemning med flertal og
  mindst 40 procent af vælgerne)
- Folketingsvalgloven (2 % spærregrænse, valgret ved 18 år): https://www.ft.dk/da/folkestyret/valg-og-afstemninger
- Forældreansvarsloven § 2 (no corporal punishment, from 1997): https://www.retsinformation.dk
- Ægteskabsloven (marriage age 18; forced marriage a criminal offence under straffeloven § 260):
  https://www.retsinformation.dk
- Ligelønsloven and ligebehandlingsloven: https://www.retsinformation.dk
- Lex.dk articles on Jellingstenene, Kalmarunionen, Reformationen, Enevælden, Grundloven 1849,
  Krigen 1864, Systemskiftet, Genforeningen, Besættelsen, Rigsfællesskabet, Strukturreformen:
  https://lex.dk
- Danmarks Statistik / Folketinget for institutions (98 kommuner, 5 regioner, 179 medlemmer):
  https://www.ft.dk
- Folkeafstemningen om forsvarsforbeholdet 1 June 2022 (Folketinget):
  https://www.ft.dk/da/aktuelt/nyheder/2022/06/folkeafstemning

## Facts added for the eight-test bank (2026-11-07)
- Grundloven § 13 (kongen ansvarsfri), § 20 (fem sjettedele eller folkeafstemning), § 30
  (valgbarhed), § 36 (folketingsåret første tirsdag i oktober), § 57 (immunitet), § 59-60
  (Rigsretten), § 61 (ingen særdomstole), § 64 (dommere retter sig alene efter loven), § 70,
  § 71, § 73, § 75 stk. 2: https://www.retsinformation.dk/eli/lta/1953/169
- Folketingsvalgloven: 10 storkredse, 3 landsdele, 40 tillægsmandater: https://www.ft.dk/da/folkestyret/valg-og-afstemninger
- Selvstyreloven § 20 (grønlandsk officielt sprog), Inatsisartut and Naalakkersuisut, Lagtinget:
  https://www.retsinformation.dk/eli/lta/2009/473
- CPR-loven (moving reported within five days): https://www.retsinformation.dk
- Lex.dk articles on Guldhornene, Egtvedpigen, Skuldelevskibene, Valdemar Atterdag, Den sorte død,
  Roskilde Domkirke, Kronborg, Saxo, Hedeby, Tycho Brahe, Ole Rømer, Kongeloven, Trankebar,
  Thorvald Stauning, Påskekrisen, Genforeningen 1920, Storebæltsforbindelsen, Oliekrisen 1973,
  Hjemmestyret 1979, Johannes V. Jensen, Pontoppidan, Nexø, Hammershøi, Eckersberg, Utzon,
  Bournonville, Wegner, Babettes gæstebud, Gasolin', Ertholmene, Arresø, Gudenåen: https://lex.dk
- Arveloven (children inherit equally): https://www.retsinformation.dk
- Forskelsbehandlingsloven (sexual orientation, religion, age at work): https://www.retsinformation.dk

## Review pass (2026-11-07)
- Format re-checked by search: 45 questions, 45 minutes, 35 learning material + 5 current
  affairs + 5 values, 36 to pass with at least 4 of 5 values (Lex; Kolding Sprogskole's
  candidate information page, https://sprogskolen.kolding.dk/prover/indfodsretsprove-hvis-du-soger-dansk-pas/information-til-provedeltagere-om-indfodsretsproven).
  Landing, FAQ and WIRING examFacts agree with this.
- Nævninger: since the 2008 reform, nævningesager start in byretten and go to landsretten on
  appeal (retsplejeloven); explanation of DKIND-GRL-055 corrected.
- Equal inheritance: the year (1845 forordning or its 1857 amendment) could not be pinned down,
  so DKIND-VAE-039 no longer names a year.
