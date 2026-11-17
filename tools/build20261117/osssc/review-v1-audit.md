# Independent OSSSC CRE-2025 review

Reviewed all 200, not a sample. Options-only predictions were saved first; all full-stem answers with independently recomputed maths/reasoning were saved second; private keys and real-ID mapping were opened only afterwards. No writer explanations were used to solve questions. All indices below are zero-based in the shuffled review packet, NOT production option positions.

## Results

Full-stem agreement: 200/200. No incorrect keyed answers identified. Two English stems allow another grammatical completion despite the intended answers being clear. GS exceeds the specified options-only 40% ceiling; other domains pass. The options-only method used salient subject/plausibility cues when present and an explicitly declared index-zero tie-break otherwise. Chance tie-break successes are not evidence of flaws in the individual items.

| Domain | Full answer agreement | Options-only hits | Rate |
|---|---:|---:|---:|
| ossscComputer | 35/35 | 7/35 | 20.0% |
| ossscEnglish | 47/47 | 11/47 | 23.4% |
| ossscGeneral | 47/47 | 20/47 | 42.6% |
| ossscMaths | 47/47 | 8/47 | 17.0% |
| ossscReasoning | 24/24 | 7/24 | 29.2% |

## Actionable findings

1. **GS cue gate fails: 20/47 (42.6%).** Strongest specific culprits: OSSSC-GENERAL-001 offers Bay of Bengal against three geographically remote western waters; GENERAL-009 offers Eastern Ghats against three hill systems absent from Odisha; GENERAL-010 offers Nalaban against three islands outside Odisha; GENERAL-045 offers UV absorption against magnetic-field creation, oxygen supply and tidal-energy creation. The options and Odisha topic cue make the first three highly guessable; the last has only one credible scientific benefit. Revise these using nearby plausible alternatives or stem-dependent scenarios. GENERAL-043 also makes 0.30 kWh unusually plausible against 0.012/300/12 kWh; consider realistic conversion-error distractors. Rerun a fresh options-only pass after revision. Do not label all 47 GS items defective.
2. **OSSSC-ENGLISH-007 has two valid completions.** “No visitors entered the room ___ the meeting” permits both “during” and “until”, with different but coherent meanings. Specify the intended temporal relationship (e.g. ask for a preposition meaning within the period when the meeting was taking place), or replace “until”.
3. **OSSSC-ENGLISH-008 has a weaker related ambiguity.** “Applications will remain open ___ Friday and will close that evening” can use “during” Friday as well as “until” Friday. Make the endpoint explicit or remove “during”.
4. Minor polish: OSSSC-MATHS-042 has “25%of”; insert the space. Not an answer-validity issue.

## Scheme and product scope

Read lib/v2/exams/osssc.ts and app/osssc-cre-practice-test/page.tsx. Both clearly identify CRE-2025 advertisement IIE-120/2025-3219; distinguish OSSC, Odisha Police and CRE-2025(II); describe the 85-question English-language subset and chosen 90-minute timer; exclude Odia, current affairs and Stage II practical; and explain percentage correct has no official negative marking or normalization. No scope/score correction needed.

Independently opened the official PDF and read locally rendered pages 10–12: https://www.osssc.gov.in/Docs/CRE-2025-3219.pdf . Verified 100 questions/100 marks/90 minutes; subject counts 20/20/20/15/15/10; quarter-mark wrong-answer penalty; no blank penalty; minimum HSC standard; Stage II 50 marks/one hour/40% qualifying. Product wording matches this source.

## Independent primary-source fact checks

- Parliament, Council of States, executive responsibility, adoption and commencement: https://sansad.in/ls/about/introduction
- Chilika classification, Nalaban, freshwater/sea exchange and catchment silt load: https://www.chilika.com/chilika-at-a-glance.php
- Konark chariot architecture: https://whc.unesco.org/en/list/246/
- Bhubaneswar capital: https://www.bmc.gov.in/about/organization
- Supreme Court apex status: https://www.sci.gov.in/about-department/history/
- 26 January 1930 observance: https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=2&reg=48&relid=114947
- Cuttack/province history: official publisher search excerpts https://lokbhavan.odisha.gov.in/menuInternalPage/aboutPuri and https://cuttack.odisha.gov.in/en/tourism/culture-Heritage
- Ashoka/261 BCE and 1936: official publisher search excerpt https://odisha.gov.in/en/odisha-profile/about-odisha
- Kharavela/Hathigumpha: government-held epigraphic publication search excerpt https://ignca.gov.in/Asi_data/70824.pdf and Odisha district gazetteer https://puri.odisha.gov.in/sites/default/files/2023-08/CHAPTER-II_23.pdf
- Odisha physical geography: official publisher excerpt https://odisha.gov.in/en/odisha-profile/topography
- NCERT theory checked from publisher PDFs already downloaded locally: https://ncert.nic.in/textbook/pdf/jesc102.pdf ; https://ncert.nic.in/textbook/pdf/jesc105.pdf ; https://ncert.nic.in/textbook/pdf/jesc111.pdf ; https://ncert.nic.in/textbook/pdf/jesc113.pdf . Confirmed neutralisation, plant transport, alveoli/nephrons/villi, SI electricity concepts, decomposers and ozone. Calculations independently recomputed in ledger.
- Odisha “Land and People” direct fetch timed out; alternative official sources above used. Search excerpts are identified as such, not misrepresented as fully read documents.

## Full 200-question ledger

“Agree” means independent intended answer matches private key; ambiguity findings above remain despite agreement.

| Real ID | Blind ID | Independent index | Key index | Reason | Result | Options-only index/hit |
|---|---|---:|---:|---|---|---|
| OSSSC-COMPUTER-001 | 11be9d2796ee | 2 | 2 | SUM | Agree | 0/miss |
| OSSSC-COMPUTER-002 | 0f3de60dca4b | 2 | 2 | AVERAGE | Agree | 0/miss |
| OSSSC-COMPUTER-003 | 57f89c802edf | 1 | 1 | MAX | Agree | 0/miss |
| OSSSC-COMPUTER-004 | ab703ad47f05 | 3 | 3 | COUNT numeric | Agree | 0/miss |
| OSSSC-COMPUTER-005 | c1a359610dec | 1 | 1 | Both coordinates absolute | Agree | 0/miss |
| OSSSC-COMPUTER-006 | cfba65d7bdea | 2 | 2 | Dollar row only | Agree | 0/miss |
| OSSSC-COMPUTER-007 | b47720597a17 | 1 | 1 | Dollar column only | Agree | 0/miss |
| OSSSC-COMPUTER-008 | 7b7aac7890ff | 1 | 1 | A1 relative | Agree | 0/miss |
| OSSSC-COMPUTER-009 | 6efcd96f116a | 1 | 1 | Scanner digitises paper | Agree | 0/miss |
| OSSSC-COMPUTER-010 | 0b0b69841333 | 0 | 0 | Printer | Agree | 0/hit |
| OSSSC-COMPUTER-011 | 5d567660b73d | 3 | 3 | Microphone | Agree | 0/miss |
| OSSSC-COMPUTER-012 | 847fcd5f900e | 3 | 3 | Projector | Agree | 0/miss |
| OSSSC-COMPUTER-013 | e850ade8c5f2 | 3 | 3 | RAM volatile | Agree | 0/miss |
| OSSSC-COMPUTER-014 | 18e14145f9bd | 3 | 3 | SSD persistent no platters | Agree | 0/miss |
| OSSSC-COMPUTER-015 | 026d1f449694 | 1 | 1 | CPU | Agree | 0/miss |
| OSSSC-COMPUTER-016 | 7b4034fe6b37 | 2 | 2 | OS manages | Agree | 0/miss |
| OSSSC-COMPUTER-017 | 801396794f14 | 3 | 3 | Mailmerge | Agree | 0/miss |
| OSSSC-COMPUTER-018 | 7a13a7e20482 | 1 | 1 | Findreplace | Agree | 0/miss |
| OSSSC-COMPUTER-019 | 3dbe691782aa | 1 | 1 | Track changes | Agree | 0/miss |
| OSSSC-COMPUTER-020 | f829545a4dbd | 3 | 3 | Pagebreak | Agree | 0/miss |
| OSSSC-COMPUTER-021 | 722c2be0d07e | 0 | 0 | Copy | Agree | 0/hit |
| OSSSC-COMPUTER-022 | dfdbaba19181 | 1 | 1 | Cut | Agree | 0/miss |
| OSSSC-COMPUTER-023 | a66c45374c62 | 2 | 2 | Paste | Agree | 0/miss |
| OSSSC-COMPUTER-024 | e822a952e45e | 1 | 1 | Undo reverses | Agree | 0/miss |
| OSSSC-COMPUTER-025 | 57614c4cd071 | 2 | 2 | Browser renders | Agree | 0/miss |
| OSSSC-COMPUTER-026 | 2ea037597458 | 2 | 2 | Search indexing | Agree | 0/miss |
| OSSSC-COMPUTER-027 | 27c813de463f | 3 | 3 | Emailclient | Agree | 0/miss |
| OSSSC-COMPUTER-028 | 27496b10d5d9 | 0 | 0 | Spreadsheet | Agree | 0/hit |
| OSSSC-COMPUTER-029 | 8a2255a3b2df | 0 | 0 | Restore backup | Agree | 0/hit |
| OSSSC-COMPUTER-030 | 31dbdb552b5b | 2 | 2 | Patch vulnerability | Agree | 0/miss |
| OSSSC-COMPUTER-031 | 4bbee30522b9 | 1 | 1 | MFA | Agree | 0/miss |
| OSSSC-COMPUTER-032 | 983d18953b79 | 0 | 0 | Revocation disables link | Agree | 0/hit |
| OSSSC-COMPUTER-033 | 806634cae3dc | 0 | 0 | 8+3×2=14 | Agree | 0/hit |
| OSSSC-COMPUTER-034 | 94753fcc2f5f | 0 | 0 | 5+7+12=24 | Agree | 0/hit |
| OSSSC-COMPUTER-035 | 3e1fd6a796e6 | 2 | 2 | Relative row advances to5 | Agree | 0/miss |
| OSSSC-ENGLISH-001 | ad2f834f421b | 3 | 3 | Past perfect beforepast | Agree | 0/miss |
| OSSSC-ENGLISH-002 | 75c5a812ac60 | 3 | 3 | Present perfect links now | Agree | 0/miss |
| OSSSC-ENGLISH-003 | 76a821eecce8 | 1 | 1 | Futureperfect | Agree | 0/miss |
| OSSSC-ENGLISH-004 | b37d74ada1a3 | 2 | 2 | Now requires present progressive | Agree | 0/miss |
| OSSSC-ENGLISH-005 | 909ea4334d7d | 0 | 0 | Since starting date | Agree | 0/hit |
| OSSSC-ENGLISH-006 | 0e67c305b955 | 1 | 1 | For duration | Agree | 0/miss |
| OSSSC-ENGLISH-007 | 07e96de094ff | 1 | 1 | During meeting | Agree | 0/miss |
| OSSSC-ENGLISH-008 | 3e8a35636692 | 1 | 1 | Until endpoint | Agree | 0/miss |
| OSSSC-ENGLISH-009 | b25dafaf7c11 | 3 | 3 | Although concession | Agree | 0/miss |
| OSSSC-ENGLISH-010 | 2040a82ba46d | 3 | 3 | Because cause | Agree | 0/miss |
| OSSSC-ENGLISH-011 | 54d334dde7c7 | 1 | 1 | Unless exceptif | Agree | 0/miss |
| OSSSC-ENGLISH-012 | ddd267690480 | 1 | 1 | So that purpose | Agree | 0/miss |
| OSSSC-ENGLISH-013 | c5c132878868 | 0 | 0 | University consonant sound | Agree | 0/hit |
| OSSSC-ENGLISH-014 | b54fb68ea313 | 1 | 1 | Hour vowel sound an | Agree | 0/miss |
| OSSSC-ENGLISH-015 | ce4893247ef3 | 3 | 3 | Previously identified report the | Agree | 0/miss |
| OSSSC-ENGLISH-016 | 88a1a46c07a7 | 2 | 2 | Abstract generic no article | Agree | 0/miss |
| OSSSC-ENGLISH-017 | 154a8dbb2348 | 3 | 3 | Each singular is | Agree | 0/miss |
| OSSSC-ENGLISH-018 | e31171a5e92c | 2 | 2 | Plural forms are | Agree | 0/miss |
| OSSSC-ENGLISH-019 | 28a4b655a9d1 | 2 | 2 | Neither singular past was | Agree | 0/miss |
| OSSSC-ENGLISH-020 | 0d41a99a02c2 | 2 | 2 | Plural past were | Agree | 0/miss |
| OSSSC-ENGLISH-021 | aa49620e49da | 1 | 1 | Must obligation | Agree | 0/miss |
| OSSSC-ENGLISH-022 | f8a37734ccad | 3 | 3 | May permission | Agree | 0/miss |
| OSSSC-ENGLISH-023 | 88a586a49b4b | 0 | 0 | Should advice | Agree | 0/hit |
| OSSSC-ENGLISH-024 | b7d9cf7cadd0 | 2 | 2 | Odd ending5 cannot even | Agree | 0/miss |
| OSSSC-ENGLISH-025 | 76df5fce38b4 | 3 | 3 | Concise means brief | Agree | 0/miss |
| OSSSC-ENGLISH-026 | 624fd898f867 | 1 | 1 | Accurate closest | Agree | 0/miss |
| OSSSC-ENGLISH-027 | 50fd0957ca50 | 3 | 3 | Impartial | Agree | 0/miss |
| OSSSC-ENGLISH-028 | 12f78ee8f8a0 | 0 | 0 | Legible | Agree | 0/hit |
| OSSSC-ENGLISH-029 | dd629784b39c | 3 | 3 | Temporary antonym | Agree | 0/miss |
| OSSSC-ENGLISH-030 | 2d5b9e81e542 | 1 | 1 | Scarce antonym | Agree | 0/miss |
| OSSSC-ENGLISH-031 | 171f70e8d4bd | 2 | 2 | Transparent | Agree | 0/miss |
| OSSSC-ENGLISH-032 | ee9723f14f55 | 2 | 2 | Reluctant antonym | Agree | 0/miss |
| OSSSC-ENGLISH-033 | bcdd8721cf30 | 0 | 0 | Moved later postponed | Agree | 0/hit |
| OSSSC-ENGLISH-034 | ef025b2c5c5f | 0 | 0 | Cancelled | Agree | 0/hit |
| OSSSC-ENGLISH-035 | c17f1328f5d7 | 0 | 0 | Resumed | Agree | 0/hit |
| OSSSC-ENGLISH-036 | 70fc759b3cc1 | 3 | 3 | Ended concluded | Agree | 0/miss |
| OSSSC-ENGLISH-037 | 0d1a46556a9e | 1 | 1 | Simple past checked | Agree | 0/miss |
| OSSSC-ENGLISH-038 | 6c15e17e966c | 1 | 1 | Present progressive ischecking | Agree | 0/miss |
| OSSSC-ENGLISH-039 | e80fb295cbfa | 2 | 2 | Present perfect has checked | Agree | 0/miss |
| OSSSC-ENGLISH-040 | 8010f742d7d0 | 3 | 3 | Will check future | Agree | 0/miss |
| OSSSC-ENGLISH-041 | 6edd64257706 | 2 | 2 | Neither claim stated | Agree | 0/miss |
| OSSSC-ENGLISH-042 | 6e6bf51b8a1b | 2 | 2 | 11before noon only | Agree | 0/miss |
| OSSSC-ENGLISH-043 | b96f129c3a0f | 0 | 0 | Eligibility does not impose participation | Agree | 0/hit |
| OSSSC-ENGLISH-044 | e862a1b53653 | 2 | 2 | Both expressly stated | Agree | 0/miss |
| OSSSC-ENGLISH-045 | 167a40b9e3b6 | 1 | 1 | Valves causal evidence | Agree | 1/hit |
| OSSSC-ENGLISH-046 | bdf4ea0f3237 | 0 | 0 | Walkin access | Agree | 0/hit |
| OSSSC-ENGLISH-047 | a55375a66a73 | 2 | 2 | Totalcosts | Agree | 2/hit |
| OSSSC-GENERAL-001 | 84e243eca0a6 | 3 | 3 | BayBengal | Agree | 3/hit |
| OSSSC-GENERAL-002 | 7caee6bfce24 | 0 | 0 | Bhubaneswar | Agree | 0/hit |
| OSSSC-GENERAL-003 | 3bfc0e00787b | 2 | 2 | Cuttack | Agree | 2/hit |
| OSSSC-GENERAL-004 | a620a3dfb1a2 | 3 | 3 | Konark SunTemple | Agree | 3/hit |
| OSSSC-GENERAL-005 | 798109945f27 | 1 | 1 | Brackish lagoon | Agree | 1/hit |
| OSSSC-GENERAL-006 | c3d0d63686d9 | 3 | 3 | Ashoka | Agree | 0/miss |
| OSSSC-GENERAL-007 | 3a0f933acb6f | 1 | 1 | Kharavela | Agree | 0/miss |
| OSSSC-GENERAL-008 | 9d5fa0def16a | 3 | 3 | 1936 | Agree | 3/hit |
| OSSSC-GENERAL-009 | 8145dcf1fec9 | 3 | 3 | EasternGhats | Agree | 3/hit |
| OSSSC-GENERAL-010 | 89911cc869e5 | 3 | 3 | Nalaban sanctuary | Agree | 3/hit |
| OSSSC-GENERAL-011 | c904139dba36 | 3 | 3 | Freshwater dilutes | Agree | 3/hit |
| OSSSC-GENERAL-012 | 78106d8e5b58 | 2 | 2 | Less erosion lesssediment | Agree | 3/miss |
| OSSSC-GENERAL-013 | b7e9632e7253 | 1 | 1 | 26Nov1949 | Agree | 3/miss |
| OSSSC-GENERAL-014 | b89663d4388b | 3 | 3 | 26Jan1950 | Agree | 3/hit |
| OSSSC-GENERAL-015 | aa6ded91d6d6 | 2 | 2 | 15Aug1947 | Agree | 0/miss |
| OSSSC-GENERAL-016 | e4d812ed6ff7 | 3 | 3 | 26Jan1930 observance | Agree | 1/miss |
| OSSSC-GENERAL-017 | 1ca235246fdd | 1 | 1 | LokSabha collective responsibility | Agree | 0/miss |
| OSSSC-GENERAL-018 | 06fa8dcfe4cc | 2 | 2 | RajyaSabha | Agree | 0/miss |
| OSSSC-GENERAL-019 | 3b5046a7ef6b | 3 | 3 | President constitution article79 | Agree | 0/miss |
| OSSSC-GENERAL-020 | b8e9f7531bcd | 1 | 1 | SupremeCourt | Agree | 0/miss |
| OSSSC-GENERAL-021 | a1f69ff0507b | 3 | 3 | Xylem carries water | Agree | 0/miss |
| OSSSC-GENERAL-022 | 76a81908f6b2 | 1 | 1 | Phloem transports sugars | Agree | 0/miss |
| OSSSC-GENERAL-023 | 0fce7ac872e5 | 3 | 3 | Stomata pores | Agree | 0/miss |
| OSSSC-GENERAL-024 | 999e5ae0dc23 | 1 | 1 | Chlorophyll | Agree | 0/miss |
| OSSSC-GENERAL-025 | 7d47b8db3e55 | 1 | 1 | Alveoli | Agree | 0/miss |
| OSSSC-GENERAL-026 | 0a53739ee62c | 1 | 1 | Nephrons | Agree | 0/miss |
| OSSSC-GENERAL-027 | 823c1790240e | 0 | 0 | Villi | Agree | 0/hit |
| OSSSC-GENERAL-028 | d7653e8e2810 | 0 | 0 | Arteries away | Agree | 0/hit |
| OSSSC-GENERAL-029 | 0eb0175c5e27 | 3 | 3 | AcidicpH3 | Agree | 0/miss |
| OSSSC-GENERAL-030 | 14642c951a85 | 1 | 1 | NeutralpH7 | Agree | 0/miss |
| OSSSC-GENERAL-031 | 9e70a83ffa0c | 1 | 1 | BasicpH11 | Agree | 0/miss |
| OSSSC-GENERAL-032 | f10c6d8107d2 | 1 | 1 | No pH measurement given | Agree | 0/miss |
| OSSSC-GENERAL-033 | 21bd055c3cd4 | 2 | 2 | Ampere | Agree | 0/miss |
| OSSSC-GENERAL-034 | 6c601ac70d4b | 1 | 1 | Volt | Agree | 0/miss |
| OSSSC-GENERAL-035 | 5c9fc498f48b | 3 | 3 | Ohm | Agree | 0/miss |
| OSSSC-GENERAL-036 | 01b60e7e9318 | 3 | 3 | Power unit W | Agree | 0/miss |
| OSSSC-GENERAL-037 | b5cef1fb1317 | 0 | 0 | Grass produces food | Agree | 0/hit |
| OSSSC-GENERAL-038 | 0539a1c5b00c | 0 | 0 | Grasshopper primary consumer | Agree | 0/hit |
| OSSSC-GENERAL-039 | 00e997a31c7d | 1 | 1 | Frog secondary consumer | Agree | 0/miss |
| OSSSC-GENERAL-040 | a9ff9304b3ff | 0 | 0 | Decomposers | Agree | 0/hit |
| OSSSC-GENERAL-041 | 3ff69b7a16f0 | 1 | 1 | 24/8=3 | Agree | 0/miss |
| OSSSC-GENERAL-042 | a43ccb361cd5 | 0 | 0 | 4+6=10 | Agree | 0/hit |
| OSSSC-GENERAL-043 | f2146c7f11d5 | 3 | 3 | 60×5/1000=.30 | Agree | 3/hit |
| OSSSC-GENERAL-044 | eeed9ae88401 | 3 | 3 | Acid-base saltwater | Agree | 3/hit |
| OSSSC-GENERAL-045 | 81545919113e | 3 | 3 | Ozone absorbs UV | Agree | 3/hit |
| OSSSC-GENERAL-046 | 3cebddf858d7 | 1 | 1 | Parallel resistance halves so current doubles | Agree | 0/miss |
| OSSSC-GENERAL-047 | 08a48b47fda1 | 2 | 2 | Light excluded blocks starch | Agree | 2/hit |
| OSSSC-MATHS-001 | 222c9918b2d3 | 0 | 0 | 3000/25000×100=12 | Agree | 0/hit |
| OSSSC-MATHS-002 | 4c66baf3b49a | 0 | 0 | 30/200×100=15 | Agree | 0/hit |
| OSSSC-MATHS-003 | a9d5df1c536a | 3 | 3 | 90/500×100=18 | Agree | 0/miss |
| OSSSC-MATHS-004 | 3d3566101f0f | 2 | 2 | 96/.8-96=24 | Agree | 0/miss |
| OSSSC-MATHS-005 | 3779991d57a0 | 1 | 1 | 30×2/3=20 | Agree | 0/miss |
| OSSSC-MATHS-006 | 7a05d03eb061 | 1 | 1 | 92-67=25 | Agree | 0/miss |
| OSSSC-MATHS-007 | c57adfba3b8c | 2 | 2 | 18×5/3=30 | Agree | 0/miss |
| OSSSC-MATHS-008 | 15444e804360 | 1 | 1 | 18×60/27=40 | Agree | 0/miss |
| OSSSC-MATHS-009 | ef74842d9602 | 2 | 2 | 1000×.06×2=120 | Agree | 0/miss |
| OSSSC-MATHS-010 | 9258779f03ba | 1 | 1 | 900×.2=180 | Agree | 0/miss |
| OSSSC-MATHS-011 | 5226be023967 | 0 | 0 | 600×2/5=240 | Agree | 0/hit |
| OSSSC-MATHS-012 | b26d27693637 | 2 | 2 | 1080-780=300 | Agree | 0/miss |
| OSSSC-MATHS-013 | 136dde3193ce | 3 | 3 | 1/(1/6+1/6)=3 | Agree | 0/miss |
| OSSSC-MATHS-014 | 903517feb359 | 3 | 3 | 240/60=4 | Agree | 0/miss |
| OSSSC-MATHS-015 | 7529806e4d7c | 2 | 2 | 1/(.5-.3)=5 | Agree | 0/miss |
| OSSSC-MATHS-016 | fa42b71768df | 2 | 2 | 2+1+3=6 | Agree | 0/miss |
| OSSSC-MATHS-017 | 9df2305ab0d6 | 3 | 3 | (19-4)/3=5 | Agree | 0/miss |
| OSSSC-MATHS-018 | f7c777c3fb9b | 3 | 3 | (9+5)/2=7 | Agree | 0/miss |
| OSSSC-MATHS-019 | 62b63a9819a5 | 3 | 3 | 27/3=9 | Agree | 0/miss |
| OSSSC-MATHS-020 | 9d2129002de4 | 3 | 3 | 11mod3=2 mod5=1 | Agree | 0/miss |
| OSSSC-MATHS-021 | ecff431a0201 | 3 | 3 | 9×4=36 | Agree | 0/miss |
| OSSSC-MATHS-022 | 74292f1138fc | 1 | 1 | 4×3×4=48 | Agree | 0/miss |
| OSSSC-MATHS-023 | 3a8c596f31ae | 1 | 1 | 12×10/2=60 | Agree | 0/miss |
| OSSSC-MATHS-024 | f6617624f209 | 1 | 1 | Length12 area72 | Agree | 0/miss |
| OSSSC-MATHS-025 | d0b3e38f8eb4 | 2 | 2 | 180-80-70=30 | Agree | 0/miss |
| OSSSC-MATHS-026 | 7d175672af41 | 3 | 3 | (180-90)/2=45 | Agree | 0/miss |
| OSSSC-MATHS-027 | ef755e96b61a | 0 | 0 | 180/3=60 | Agree | 0/hit |
| OSSSC-MATHS-028 | f56ccba7b21f | 1 | 1 | 180/2=90 | Agree | 0/miss |
| OSSSC-MATHS-029 | b3c5071bbd50 | 2 | 2 | One of6 | Agree | 0/miss |
| OSSSC-MATHS-030 | 9a3adef660da | 3 | 3 | 5/6-3/6=1/3 | Agree | 0/miss |
| OSSSC-MATHS-031 | 67bd05c87d06 | 1 | 1 | 4/8=1/2 | Agree | 0/miss |
| OSSSC-MATHS-032 | 5cfe4f7bd146 | 0 | 0 | Repeating6=2/3 | Agree | 0/hit |
| OSSSC-MATHS-033 | b93494e3badb | 3 | 3 | GCD14 | Agree | 0/miss |
| OSSSC-MATHS-034 | f18d395f4299 | 3 | 3 | 16 squared256 | Agree | 0/miss |
| OSSSC-MATHS-035 | 4b027f7f6352 | 1 | 1 | 7×6/2=21 | Agree | 0/miss |
| OSSSC-MATHS-036 | d6569f4fc403 | 2 | 2 | 4+4×6=28 | Agree | 0/miss |
| OSSSC-MATHS-037 | 2f2410668da4 | 0 | 0 | Middle8 | Agree | 0/hit |
| OSSSC-MATHS-038 | 0b1e27af748a | 1 | 1 | 48-38=10 | Agree | 0/miss |
| OSSSC-MATHS-039 | 25a0f5308603 | 0 | 0 | Tuesday12 | Agree | 0/hit |
| OSSSC-MATHS-040 | f7d71b33f2e5 | 2 | 2 | 100-80=20 | Agree | 0/miss |
| OSSSC-MATHS-041 | 34b41b403472 | 2 | 2 | 62mod5=2 | Agree | 0/miss |
| OSSSC-MATHS-042 | 8b98c6229b8e | 1 | 1 | 16×.25=4 | Agree | 0/miss |
| OSSSC-MATHS-043 | be3ea40d5c1c | 1 | 1 | 30/5=6 | Agree | 0/miss |
| OSSSC-MATHS-044 | c5cfd7300cb2 | 3 | 3 | 12×2/3=8 | Agree | 0/miss |
| OSSSC-MATHS-045 | 28ce34ec5f80 | 1 | 1 | 640×1.25×.9=720 | Agree | 0/miss |
| OSSSC-MATHS-046 | 852d55dc41dd | 2 | 2 | 240/(3+2)=48 | Agree | 0/miss |
| OSSSC-MATHS-047 | 57af64292361 | 0 | 0 | 450/15×8=240 | Agree | 0/hit |
| OSSSC-REASONING-001 | 536e039dbac7 | 2 | 2 | E-N-E-N | Agree | 0/miss |
| OSSSC-REASONING-002 | 69ee79da44b2 | 2 | 2 | Net4east | Agree | 0/miss |
| OSSSC-REASONING-003 | 1d5fc3898934 | 2 | 2 | School southoffice | Agree | 0/miss |
| OSSSC-REASONING-004 | 6edf2c7abdbe | 0 | 0 | South right west | Agree | 0/hit |
| OSSSC-REASONING-005 | 4a42cbc684ee | 0 | 0 | Driver-surveyor subset trained only | Agree | 0/hit |
| OSSSC-REASONING-006 | 757379282680 | 1 | 1 | Roses no stones only | Agree | 0/miss |
| OSSSC-REASONING-007 | 629b3f3e266e | 3 | 3 | Existing clerk-musicians establish both | Agree | 0/miss |
| OSSSC-REASONING-008 | b1a0c8b6f820 | 3 | 3 | Overlap not implied | Agree | 0/miss |
| OSSSC-REASONING-009 | 7cd500b062ca | 0 | 0 | Asha left ofDeepa | Agree | 0/hit |
| OSSSC-REASONING-010 | b354ff58a1b5 | 2 | 2 | Bina>Asha>Charu>Deepa | Agree | 0/miss |
| OSSSC-REASONING-011 | 3db912048238 | 1 | 1 | Charu,Asha,Bina,Deepa | Agree | 0/miss |
| OSSSC-REASONING-012 | 0964d0c4d804 | 3 | 3 | Charu,Asha,Bina,Deepa | Agree | 0/miss |
| OSSSC-REASONING-013 | 798950ba916b | 0 | 0 | 8×2=16 | Agree | 2/miss |
| OSSSC-REASONING-014 | 16965862d515 | 3 | 3 | 5 squared25 | Agree | 1/miss |
| OSSSC-REASONING-015 | 2965d9a7250f | 3 | 3 | 20+12=32 | Agree | 3/hit |
| OSSSC-REASONING-016 | 96b40306fa01 | 0 | 0 | 37+24=61 | Agree | 0/hit |
| OSSSC-REASONING-017 | 5b748215a608 | 1 | 1 | Side sufficient diagonal inequality not | Agree | 0/miss |
| OSSSC-REASONING-018 | 07b3edc8c11e | 0 | 0 | II fixes14 I only parity | Agree | 0/hit |
| OSSSC-REASONING-019 | 38135e8c693a | 3 | 3 | Need priceandquantity | Agree | 0/miss |
| OSSSC-REASONING-020 | 56de7a78b2ff | 1 | 1 | Interval does not fix exactage | Agree | 0/miss |
| OSSSC-REASONING-021 | 9f1c259882d0 | 3 | 3 | P>R>Q>S | Agree | 0/miss |
| OSSSC-REASONING-022 | 7e1308563912 | 0 | 0 | TEAM has2 vowels Q | Agree | 0/hit |
| OSSSC-REASONING-023 | 6bf645ef4321 | 1 | 1 | R immediately aboveQ | Agree | 0/miss |
| OSSSC-REASONING-024 | b21b5783cb21 | 3 | 3 | S remains | Agree | 0/miss |

## Options-only rationale ledger (all 200)

| Real ID | Guess | Rationale recorded before stems |
|---|---:|---|
| OSSSC-COMPUTER-001 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-002 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-003 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-004 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-005 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-006 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-007 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-008 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-009 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-010 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-011 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-012 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-013 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-014 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-015 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-016 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-017 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-018 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-019 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-020 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-021 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-022 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-023 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-024 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-025 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-026 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-027 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-028 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-029 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-030 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-031 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-032 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-033 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-034 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-COMPUTER-035 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-001 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-002 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-003 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-004 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-005 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-006 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-007 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-008 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-009 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-010 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-011 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-012 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-013 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-014 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-015 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-016 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-017 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-018 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-019 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-020 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-021 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-022 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-023 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-024 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-025 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-026 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-027 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-028 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-029 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-030 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-031 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-032 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-033 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-034 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-035 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-036 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-037 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-038 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-039 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-040 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-041 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-042 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-043 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-044 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-ENGLISH-045 | 1 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-ENGLISH-046 | 0 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-ENGLISH-047 | 2 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-001 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-002 | 0 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-003 | 2 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-004 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-005 | 1 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-006 | 0 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-007 | 0 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-008 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-009 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-010 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-011 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-012 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-013 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-014 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-015 | 0 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-016 | 1 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-017 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-018 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-019 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-020 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-021 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-022 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-023 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-024 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-025 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-026 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-027 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-028 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-029 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-030 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-031 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-032 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-033 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-034 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-035 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-036 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-037 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-038 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-039 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-040 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-041 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-042 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-043 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-044 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-045 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-GENERAL-046 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-GENERAL-047 | 2 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-MATHS-001 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-002 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-003 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-004 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-005 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-006 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-007 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-008 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-009 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-010 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-011 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-012 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-013 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-014 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-015 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-016 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-017 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-018 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-019 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-020 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-021 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-022 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-023 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-024 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-025 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-026 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-027 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-028 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-029 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-030 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-031 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-032 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-033 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-034 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-035 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-036 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-037 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-038 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-039 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-040 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-041 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-042 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-043 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-044 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-045 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-046 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-MATHS-047 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-001 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-002 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-003 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-004 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-005 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-006 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-007 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-008 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-009 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-010 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-011 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-012 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-013 | 2 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-REASONING-014 | 1 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-REASONING-015 | 3 | Salient subject clue or comparatively plausible substantive option; low confidence without stem. |
| OSSSC-REASONING-016 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-017 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-018 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-019 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-020 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-021 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-022 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-023 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
| OSSSC-REASONING-024 | 0 | No decisive options-only cue; index-zero tie-break among plausible alternatives. |
