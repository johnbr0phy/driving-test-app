# Sources for `ngcustoms` (Nigeria Customs Service recruitment CBT)

All 200 questions are original. Customs "past questions" sites and PDFs turned up in searches were
not opened or copied. Checked 2026-11-01 unless noted.

## The exam (latest exercise: 2024-25)
- Nigeria Customs Service press release NCS/PR/SP/S.582/025/028/VOLIII, "Nigeria Customs Service
  update members of the public on its ongoing recruitment exercise" (September 2025), PDF on the
  NCS CMS (read with pdftotext 2026-11-01):
  https://cms.customs.gov.ng/wp-content/uploads/2026/06/PRESS-RELEASE-RECRUITMENT-CBT-pdf.pdf
  - advertisement published in national newspapers on Friday 27 December 2024;
  - 3,927 vacancies across the Superintendent, Inspectorate and Customs Assistant cadres;
  - 573,523 applications; 286,697 invited after documentary scrutiny;
  - second stage: an online computer-based test (CBT), scheduled 14 to 21 September 2025, taken
    at any location with reliable internet on a laptop or desktop with a webcam and full-screen
    display (not mobile phones); facial verification at login; noise, movement and switching
    windows can log a candidate out or be flagged as malpractice;
  - a mandatory pre-test two days before the CBT, with separate links for the pre-test and test;
  - Superintendent Cadre (Level 8) applicants take an additional CBT in the next phase; this does
    not apply to the Inspectorate and Customs Assistant cadres.
  - The release gives NO number of questions, duration, subjects or pass mark.
- Nairametrics, 7 October 2025, "Nigeria Customs to hold CBT exams for recruitment exercise on
  Oct 9": Inspectorate and Customs Assistant CBT on 9 October 2025 in batches A, B and C; login with
  NIN; calculators, phones and other devices not allowed.
  https://nairametrics.com/2025/10/07/nigeria-customs-to-hold-cbt-exams-for-recruitment-exercise-on-oct-9
- The Frontier, "10 things candidates should know about Customs recruitment CBT exams" (restates
  the press release; no count, time or subjects).
  https://thefrontierng.com/10-things-candidates-should-know-about-customs-recruitment-cbt-exams/
- Entry qualifications by cadre (news reports of the December 2024 advertisement, via search,
  2026-11-01; not read on an NCS page): Superintendent, a degree or HND with NYSC discharge or
  exemption; Inspectorate, ND or NCE; Customs Assistant, O'Level (WAEC or NECO). An age range of
  18 to 30 appears only on a guide site (awajis.com) and is NOT used.
  https://nairametrics.com/2024/12/27/nigeria-customs-service-opens-applications-for-2025-recruitment
- Subjects: guides (teststreams.com, androidpols.com.ng, via search) list English language,
  general mathematics, general knowledge and current affairs, with questions on the Service.
  Guides only; NCS has not published a subject list. One guide says "1 to 2 hours"; not used.

### What Tigertest models
Four 50-question mock tests at a 70% target (Tigertest's, labelled as such), in English, maths,
reasoning and general knowledge weighted to the Service's work (customs, trade, ports, economics,
ECOWAS trade, world geography). Current affairs and office-holders are left out because they date.

## Facts used in the general knowledge items
- Nigeria Customs Service Act 2023 repeals the Customs and Excise Management Act (CEMA), Cap. C45
  LFN 2004, first enacted 1958; establishes the Service and its powers (KPMG Tax newsflash July 2023;
  UNEP LEAP entry "Nigeria Customs Service Act No. 35, 2023"; Mondaq review).
  https://assets.kpmg.com/content/dam/kpmg/us/pdf/2023/07/tnf-nigeria-july14-2023.pdf
  https://leap.unep.org/en/countries/ng/national-legislation/nigeria-customs-service-act-no-35-2023
  The signing date is reported differently (April or May 2023), so no date is asked.
- NCS supervised by the Federal Ministry of Finance; head titled Comptroller-General of Customs
  (customs.gov.ng; general knowledge, not dated).
- World Customs Organization: headquarters Brussels; International Customs Day 26 January (first
  session of the Customs Co-operation Council, 1953); Harmonized System; Revised Kyoto Convention;
  SAFE Framework and Authorised Economic Operators. https://www.wcoomd.org/
- WTO Trade Facilitation Agreement, in force 22 February 2017. https://www.wto.org/english/tratop_e/tradfa_e/tradfa_e.htm
- Incoterms (CIF, FOB): International Chamber of Commerce definitions.
- Nigerian Ports Authority manages the seaports; Onne is in Rivers State; Seme border post (Lagos
  State) is on the road to Cotonou, Benin. https://nigerianports.gov.ng/
- ECOWAS Trade Liberalisation Scheme and Common External Tariff (ECOWAS Commission, ecowas.int).
  ECOWAS's founding year and seat are left to `ngarmy` (lane split).
- AfCFTA secretariat in Accra (au-afcfta.org). Naira introduced 1 January 1973 (CBN).
- Economics definitions (balance of trade, quota, embargo, dumping, Ricardo's comparative
  advantage 1817, devaluation, inflation, entrepot trade, free trade zones): standard WAEC/NECO
  economics syllabus content.
- World geography (oceans, canals, straits, capitals, tropics, time zones): standard reference
  facts, none that change yearly.

## Lane and duplicate checks
Batch 5 splits GK lanes: ngpolice civics and policing, cdcfib the four services and Nigerian
geography, ngarmy Nigerian history and Africa/ECOWAS/AU, ngcustoms customs, trade, ports, economics,
ECOWAS trade and world geography. On 2026-11-01 the English, maths and reasoning items were grepped
against `tools/next100/{ngpolice,cdcfib,ngarmy,trcnpqe}/*.py`, `data/nigeria-frsc-questions.json`
and `data/v2/jamb*/questions.json`; shared numbers (HCF of 84 and 126, LCM of 12, 18 and 30,
0.04867, 101101, the 1 : 50,000 map, 5x - 7, the die and bag probabilities) and shared sentences
(neither...nor, each of, news, hardly, no sooner, accused of, taller of the two, accommodation,
surveillance, temporary, red herring, blind eye) were rewritten. ECOWAS founding and seat, Niamey,
Yaounde, N'Djamena and Mali were dropped because `ngarmy` asks them.

## Review pass (2026-11-01)
- Press release PDF re-read with pdftotext: 27 December 2024 advert, 3,927 vacancies, 573,523
  applications, 286,697 invited, laptop/desktop with webcam and full-screen display, facial
  verification, pre-test two days before, extra CBT for Superintendent (Level 8), no payment and no
  social-media recruitment. All confirmed.
- NCS Act 2023 repeals CEMA (KPMG newsflash; signing date still reported as 20 April, 27 April or
  23 May 2023, so still not asked). AfCFTA secretariat in Accra (handed to the AU 17 August 2020,
  africarenewal.un.org). ETLS: originating goods move free of customs duties and taxes of
  equivalent effect (etls.ecowas.int). Afreximbank global HQ in Cairo (a new HQ in Egypt's New
  Administrative Capital is due 2029; agbi.com, Dec 2025). Jebel Ali described as the largest port
  in the Middle East (DP World flagship).
- Items rewritten to avoid duplicates with cdcfib, ngpolice, jambeng, ibpspo, ibpsrrb, ssccgl,
  sscchsl, sscmts, cuet, upscse, rrbgroupd, agniveervayu and biharpolice: Suez, Panama, Gibraltar,
  Malacca and IMF items replaced by Kiel Canal, Mombasa, Jebel Ali, Shanghai and Afreximbank;
  lucid, frugal, lenient, scarce and meticulous replaced by succinct, illicit, covert, conspicuous
  and lax; deny + gerund and "between you and me" replaced by "object to" and "except him".
