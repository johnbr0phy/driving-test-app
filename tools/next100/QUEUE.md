# Next 100 tests: build queue

Chosen from the Build Priority tab of the "Top 30 tests by country" sheet (Oct 31, 2026): the
highest-scoring tests that are multiple choice, reachable through Google or ChatGPT, and can be
written in English with today's site. Left out on purpose: China (Google and ChatGPT blocked),
practical-only tests, school-leaving board exams (10 to 20 written subjects each), four-skill
language tests that need audio (IELTS, TOEFL, TOEIC, CELPIP), and tests that need a new UI language
(Spanish, Portuguese, Indonesian, Turkish, French, German driving tests: a later wave once the site
can run an exam whose own language is not English).

Engine: v1 = `lib/exams.ts` registry exam (template `tools/next30/nzroad`, `app/nz-learner-licence`);
v2 = sectioned/timed exam (template named in the batch brief). Region is the Tigertest country
(`lib/region.ts`); PK and GH are not regions yet, so they go in as GLOBAL until they get one.

| # | Batch | id | Test | Country | Engine |
|---|---|---|---|---|---|
| 1 | 1 | rrbgroupd | RRB Group D (Level 1) CBT | IN | v2 |
| 2 | 1 | sscgd | SSC GD Constable | IN | v2 |
| 3 | 1 | sscchsl | SSC CHSL Tier 1 | IN | v2 |
| 4 | 1 | sscmts | SSC MTS and Havaldar | IN | v2 |
| 5 | 1 | uppolice | UP Police Constable | IN | v2 |
| 6 | 1 | ibpsclerk | IBPS Clerk Prelims | IN | v2 |
| 7 | 1 | jnvst | JNVST Class 6 (Navodaya) | IN | v2 |
| 8 | 1 | jambeng | JAMB UTME Use of English | NG | v2 |
| 9 | 1 | appsych | AP Psychology | US | v2 |
| 10 | 1 | pkdrive | Pakistan driving licence test | PK (GLOBAL) | v1 |
| 11 | 2 | sbiclerk | SBI Clerk Prelims | IN | v2 |
| 12 | 2 | sbipo | SBI PO Prelims | IN | v2 |
| 13 | 2 | ibpsrrb | IBPS RRB Office Assistant Prelims | IN | v2 |
| 14 | 2 | biharpolice | Bihar Police Constable (CSBC) | IN | v2 |
| 15 | 2 | rajpolice | Rajasthan Police Constable | IN | v2 |
| 16 | 2 | delhipolice | Delhi Police Constable (SSC) | IN | v2 |
| 17 | 2 | mppolice | MP Police Constable | IN | v2 |
| 18 | 2 | apush | AP US History | US | v2 |
| 19 | 2 | apbio | AP Biology | US | v2 |
| 20 | 2 | phcse | Civil Service Exam (Professional and Subprofessional) | PH | v2 |
| 21 | 3 | upsccse | UPSC Civil Services Prelims (GS Paper I) | IN | v2 |
| 22 | 3 | nda | NDA and NA Exam | IN | v2 |
| 23 | 3 | agniveer | Agniveer Army CEE | IN | v2 |
| 24 | 3 | agniveervayu | Agniveer Vayu (Air Force) | IN | v2 |
| 25 | 3 | rrbalp | RRB ALP CBT 1 | IN | v2 |
| 26 | 3 | rpfconst | RPF Constable | IN | v2 |
| 27 | 3 | ssccpo | SSC CPO (Sub-Inspector) Paper 1 | IN | v2 |
| 28 | 3 | apworld | AP World History | US | v2 |
| 29 | 3 | aplang | AP English Language | US | v2 |
| 30 | 3 | phlet | Licensure Exam for Professional Teachers (LET) | PH | v1 |
| 31 | 4 | neet | NEET-UG | IN | v2 |
| 32 | 4 | jeemain | JEE Main Paper 1 | IN | v2 |
| 33 | 4 | cuet | CUET-UG General Test | IN | v2 |
| 34 | 4 | mhtcet | MHT-CET (PCM) | IN | v2 |
| 35 | 4 | ugcnet | UGC-NET Paper 1 | IN | v2 |
| 36 | 4 | reet | REET Level 1 | IN | v2 |
| 37 | 4 | uptet | UPTET Paper 1 | IN | v2 |
| 38 | 4 | aissee | Sainik School AISSEE Class 6 | IN | v2 |
| 39 | 4 | apcalcab | AP Calculus AB | US | v2 |
| 40 | 4 | aphug | AP Human Geography | US | v2 |
| 41 | 5 | jambmath | JAMB UTME Mathematics | NG | v2 |
| 42 | 5 | jambbio | JAMB UTME Biology | NG | v2 |
| 43 | 5 | jambchem | JAMB UTME Chemistry | NG | v2 |
| 44 | 5 | jambphys | JAMB UTME Physics | NG | v2 |
| 45 | 5 | ngpolice | Nigeria Police Force constable recruitment | NG | v1 |
| 46 | 5 | cdcfib | CDCFIB recruitment CBT | NG | v1 |
| 47 | 5 | ngarmy | Nigerian Army recruitment exam | NG | v1 |
| 48 | 5 | ngcustoms | Nigeria Customs Service recruitment CBT | NG | v1 |
| 49 | 5 | trcnpqe | TRCN Professional Qualifying Examination | NG | v1 |
| 50 | 5 | apgov | AP US Government and Politics | US | v2 |
| 51 | 6 | mdcat | MDCAT | PK (GLOBAL) | v2 |
| 52 | 6 | ppsc | PPSC general ability and GK screening | PK (GLOBAL) | v1 |
| 53 | 6 | cssmpt | CSS MPT (FPSC screening) | PK (GLOBAL) | v2 |
| 54 | 6 | punjabpolice | Punjab Police Constable | PK (GLOBAL) | v1 |
| 55 | 6 | pakarmy | Pakistan Army soldier recruitment test | PK (GLOBAL) | v1 |
| 56 | 6 | nustnet | NUST Entry Test (NET Engineering) | PK (GLOBAL) | v2 |
| 57 | 6 | ecat | ECAT (UET) | PK (GLOBAL) | v2 |
| 58 | 6 | apstats | AP Statistics | US | v2 |
| 59 | 6 | apchem | AP Chemistry | US | v2 |
| 60 | 6 | lsat | LSAT | US | v2 |
| 61 | 7 | phnapolcom | NAPOLCOM PNP Entrance Exam | PH | v1 |
| 62 | 7 | phcle | Criminologist Licensure Exam | PH | v1 |
| 63 | 7 | phnle | Philippine Nurse Licensure Exam | PH | v1 |
| 64 | 7 | upcat | UPCAT | PH | v2 |
| 65 | 7 | afpsat | AFP Service Aptitude Test | PH | v1 |
| 66 | 7 | nmat | NMAT | PH | v2 |
| 67 | 7 | cpafar | CPA Exam FAR | US | v2 |
| 68 | 7 | cpaaud | CPA Exam AUD | US | v2 |
| 69 | 7 | cpareg | CPA Exam REG | US | v2 |
| 70 | 7 | mbe | Multistate Bar Exam (MBE) | US | v2 |
| 71 | 8 | gtle | Ghana Teacher Licensure Exam | GH (GLOBAL) | v1 |
| 72 | 8 | ghpolice | Ghana Police Service recruitment aptitude test | GH (GLOBAL) | v1 |
| 73 | 8 | gharmy | Ghana Armed Forces recruitment exam | GH (GLOBAL) | v1 |
| 74 | 8 | zanbt | National Benchmark Tests (AQL and MAT) | ZA | v2 |
| 75 | 8 | zare5 | RE5 regulatory exam (FAIS) | ZA | v1 |
| 76 | 8 | zasaps | SAPS police trainee assessment | ZA | v1 |
| 77 | 8 | mcat | MCAT | US | v2 |
| 78 | 8 | cfal1 | CFA Level I | GLOBAL | v2 |
| 79 | 8 | istqb | ISTQB Certified Tester Foundation Level | GLOBAL | v2 |
| 80 | 8 | sfadmin | Salesforce Certified Administrator | GLOBAL | v2 |
| 81 | 9 | accabt | ACCA Business and Technology (BT) | GLOBAL | v2 |
| 82 | 9 | accama | ACCA Management Accounting (MA) | GLOBAL | v2 |
| 83 | 9 | accafa | ACCA Financial Accounting (FA) | GLOBAL | v2 |
| 84 | 9 | ucat | UCAT | UK | v2 |
| 85 | 9 | fsenglish | Functional Skills English Level 2 | UK | v2 |
| 86 | 9 | aatl2 | AAT Level 2 Foundation Certificate in Accounting | UK | v1 |
| 87 | 9 | lantite | LANTITE | AU | v2 |
| 88 | 9 | naplan3 | NAPLAN Year 3 | AU | v2 |
| 89 | 9 | naplan5 | NAPLAN Year 5 | AU | v2 |
| 90 | 9 | adfyou | ADF YOU Session aptitude test | AU | v2 |
| 91 | 10 | nswboat | NSW Boat Driving Licence test | AU | v1 |
| 92 | 10 | smartserve | Smart Serve (Ontario) | CA | v1 |
| 93 | 10 | servingitright | Serving It Right (BC) | CA | v1 |
| 94 | 10 | cfat | Canadian Forces Aptitude Test | CA | v2 |
| 95 | 10 | cafoodsafe | Canadian food handler certification | CA | v1 |
| 96 | 10 | nzfirearms | NZ firearms licence safety test | NZ | v1 |
| 97 | 10 | nceaco | NCEA literacy and numeracy co-requisite | NZ | v2 |
| 98 | 10 | iesafepass | Safe Pass (Ireland) | IE | v1 |
| 99 | 10 | iegarda | Garda Trainee assessment | IE | v2 |
| 100 | 10 | ieclerical | Clerical Officer competition (publicjobs) | IE | v2 |
