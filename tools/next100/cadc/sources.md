# IC&RC ADC (Alcohol and Drug Counselor) bank sources

All 200 questions are original, written for Tigertest from the official IC&RC outline and the
primary federal sources below. None is copied, adapted or reworded from IC&RC's sample questions
(the six in the candidate guide), IC&RC practice exams, any state board's study material, or any
commercial review book, prep site or question pool. The facts the six official samples test
(family illness, precontemplation on a legal referral, alcohol and benzodiazepine
cross-tolerance, collateral sources in assessment, 12-step programs and counseling, a counselor's
limitations) were not turned into questions.

## Outline (International Certification & Reciprocity Consortium)

- IC&RC, Alcohol and Drug Counselor (ADC) Exam Candidate Guide, Effective Date: November 2022
  (file uploaded July 2025, still the guide linked on IC&RC's pages), fetched 2026-11-15:
  https://internationalcredentialing.org/wp-content/uploads/2025/07/ADC-Candidate-Guide-2022.pdf
  125 scored and 25 pretest questions, 150 in all, 3 hours. Domain weights: I Scientific
  Principles of Substance Use and Co-Occurring Disorders 25%, II Evidence-Based Screening and
  Assessment 20%, III Evidence-Based Treatment, Counseling, and Referral 30%, IV Professional,
  Ethical and Legal Responsibilities 25%, with the task lists (I.A to I.F, II.A to II.G,
  III.A to III.P, IV.A to IV.K) used to split each domain into categories. Questions are
  multiple choice with three or four choices and one correct or best answer; no penalty for
  guessing. Target audience: entry-to-mid-level professionals.
- IC&RC, Credentials page (ADC section), fetched 2026-11-15:
  https://internationalcredentialing.org/icrc-credentials/credentials/
  Links the ADC candidate guide and reference list; applicants must pass the IC&RC ADC
  examination; jurisdiction-specific standards come from the local Member Board. No notice of a
  new ADC exam (the AADC exam changed in 2025-2026; the ADC did not).
- IC&RC, Prep and Study Materials, fetched 2026-11-15:
  https://internationalcredentialing.org/prep-and-study-materials/
  Says new candidate guides carry an "Expected Exam Launch" date; the ADC guide is not marked new.
- IC&RC, Alcohol and Drug Counselor (ADC) Reference List (updated February 2025), fetched
  2026-11-15:
  https://internationalcredentialing.org/wp-content/uploads/2025/07/ADC-Reference-List-2022.pdf
  DSM-5, Corey (counseling, ethics, groups), Doweiko, Kinney, Inaba and Cohen, Van Wormer and
  Davis, and SAMHSA TIPs 39, 42 and 57. Standard textbook facts these references teach
  (drug classes, withdrawal courses, SOAP notes, record corrections, boundaries) are written at
  the level the references give them.

- Screening instruments: the outline names the ASI, ACE and SASSI; the AUDIT (a WHO screening
  test) is added as a standard tool. Items ask only what each tool is for, never its scoring.

## Format (IC&RC General Candidate Guide, 2025)

- IC&RC General Candidate Guide (2025), fetched 2026-11-15:
  https://internationalcredentialing.org/wp-content/uploads/2025/04/2025-ICRC-General-Candidate-Guide.pdf
  Exams are developed, administered and scored by Prometric; computer-based testing at a
  Prometric center or by remote proctoring if the administering board allows it. Scores are
  scaled from 200 to 800 with a minimum passing score of 500 for all IC&RC exams, equated across
  forms; preliminary scores at the end of the exam, official status from the Administering
  Board. Retakes need a wait of at least 90 days. Format facts go on the landing and in
  lib/examFacts.ts only, never into questions.

## Law and standards used in questions

- 42 CFR Part 2 (Confidentiality of Substance Use Disorder Patient Records), current text as
  amended by the February 2024 final rule (89 FR 12472), read through the eCFR versioner API
  (point in time 2026-11-01), fetched 2026-11-15:
  https://www.ecfr.gov/api/versioner/v1/full/2026-11-01/title-42.xml?part=2
  Used: 2.11 qualified service organization definition; 2.12 applicability and the exceptions
  for QSOs, crimes on premises or against staff (incident, patient status, name, address, last
  whereabouts) and reports of suspected child abuse under state law; 2.13 unconditional
  compliance and minimum necessary; 2.14 minors (minor alone where state law lets the minor
  obtain treatment alone); 2.16 security policies (paper records locked away, destruction to
  non-retrievable); 2.20 relationship to state law; 2.22 notice at admission; 2.31 consent
  elements (paper or electronic, single consent for treatment, payment and health care
  operations, right to revoke, expiration, SUD counseling notes and the bar on conditioning
  treatment on them, no disclosure on a revoked or expired consent); 2.32 redisclosure notice;
  2.51 medical emergencies and the documentation that must follow.
- NIAAA, Alcohol Use Disorder: A Comparison Between DSM-IV and DSM-5, fetched 2026-11-15:
  https://www.niaaa.nih.gov/publications/brochures-and-fact-sheets/alcohol-use-disorder-comparison-between-dsm
  11 criteria, 12-month window, mild 2-3, moderate 4-5, severe 6+, craving added, legal problems
  removed. Remission and maintenance-therapy specifiers and the rule that tolerance and
  withdrawal on supervised medication do not count are DSM-5 (on IC&RC's reference list).
- NIAAA, Understanding the Dangers of Alcohol Overdose, fetched 2026-11-15:
  https://www.niaaa.nih.gov/publications/brochures-and-fact-sheets/understanding-dangers-of-alcohol-overdose
  Overdose signs (slow breathing under 8 a minute), call 911, coffee and cold showers do not
  help, binge drinking to 0.08% BAC, standard drink 14 grams, alcohol with sedatives or opioids.
- NIDA, Drugs, Brains, and Behavior: Drugs and the Brain, fetched 2026-11-15:
  https://nida.nih.gov/publications/drugs-brains-behavior-science-addiction/drugs-brain
  Reward circuit (basal ganglia), extended amygdala, prefrontal cortex, brain stem and overdose,
  dopamine and reinforcement, cue-driven craving, receptor down-regulation, tolerance.
- NIDA, Drug Misuse and Addiction, fetched 2026-11-15:
  https://nida.nih.gov/publications/drugs-brains-behavior-science-addiction/drug-misuse-addiction
  Definition of addiction, impaired self-control as the hallmark, D2 receptor recovery example,
  risk and protective factors.
- CDC, About Adverse Childhood Experiences, fetched 2026-11-15:
  https://www.cdc.gov/aces/about/index.html
  ACEs are events from birth to age 17, including household substance use problems.
- CDC, Fentanyl Facts, fetched 2026-11-15:
  https://www.cdc.gov/overdose-prevention/about/fentanyl.html
  50 to 100 times more potent than morphine; illegally made fentanyl mixed into other drugs;
  naloxone reverses fentanyl overdose.
- FDA, Opioid Overdose Reversal Medications, fetched 2026-11-15:
  https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/information-about-naloxone-and-nalmefene
  Naloxone and nalmefene are the FDA-approved reversal medications; usable without medical
  training; OTC naloxone nasal spray.
- SAMHSA, Treatment Options for Substance Use Disorder, fetched 2026-11-15:
  https://www.samhsa.gov/substance-use/treatment/options
  MAUD (acamprosate, disulfiram, naltrexone), MOUD (buprenorphine, methadone, naltrexone;
  methadone a long-acting full agonist), extended-release naltrexone for both OUD and AUD,
  medications are evidence-based and not substitution, safe long-term, consult a doctor before
  stopping, improved birth outcomes.
- SAMHSA, Recovery and Recovery Support, fetched 2026-11-15:
  https://www.samhsa.gov/substance-use/recovery
  Peer support workers; recovery as living a self-directed life. The 988 Lifeline and
  FindTreatment.gov are listed in the same site's help pages.
- SAMHSA, Infographic: 6 Guiding Principles to a Trauma-informed Approach, fetched 2026-11-15:
  https://www.samhsa.gov/resource/dbhis/infographic-6-guiding-principles-trauma-informed-approach
  Names safety and peer support among the six principles; only those two are used.
- ASAM, About the ASAM Criteria, and ASAM Criteria 4th Edition, fetched 2026-11-15:
  https://www.asam.org/asam-criteria/about-the-asam-criteria
  https://asam.org/asam-criteria/asam-criteria-4th-edition
  Multidimensional assessment across six dimensions; fourth edition 2023; Dimension 6
  Person-Centered Considerations replaces Readiness to Change (third edition Dimension 4); levels
  1 to 4, higher numbers more intensive. Level names are not asked (they changed in 2023).
- SAMHSA, TIP 35: Enhancing Motivation for Change in Substance Use Disorder Treatment (updated
  2019, PEP19-02-01-003). library.samhsa.gov returned 403, so the identical SAMHSA PDF was read
  from the Irish Health Research Board's drug library, fetched 2026-11-15:
  https://www.drugsandalcohol.ie/20320/1/SAMHSA_tip35_Enhancing_Motivation_for-change-_02252020_0.pdf
  Stages of change and counselor tasks (raise doubt in precontemplation), ambivalence is normal,
  confrontation increases discord, righting reflex, Elicit-Provide-Elicit, double-sided
  reflection, the five summary types, decisional balance, self-efficacy, FRAMES, high-risk
  situations and the abstinence violation effect (Marlatt model), SMART Recovery as a
  mutual-help option.
- SAMHSA, TIP 41: Substance Abuse Treatment: Group Therapy (2005), SAMHSA PDF via the same
  library, fetched 2026-11-15:
  https://www.drugsandalcohol.ie/14166/1/Bookshelf_NBK64220_TIP_41.pdf
  Psychoeducational, skills development and interpersonal process groups; open-ended and
  heterogeneous groups; client preparation; cohesion; subgroups and scapegoating; confidentiality
  among members.

## Could not be loaded or confirmed

- library.samhsa.gov and store.samhsa.gov (TIPs 42, 57 and 63, TAP 21) returned 403; NCBI
  Bookshelf showed a browser check. Co-occurring items stay at the level of the DSM and the NIDA
  and SAMHSA pages above. Trauma-informed items use only the two principles confirmed.
- DEA scheduling pages returned 403, so no item depends on a drug schedule beyond SAMHSA's
  statement that methadone is Schedule II.
- The CIWA-Ar and alcohol withdrawal timelines are textbook facts (Doweiko, Kinney on IC&RC's
  list); only the broad 6 to 12 hour and 48 to 72 hour windows are used.

## Deliberately left out

- State credential rules (education hours, supervised hours, who may diagnose), state
  confidentiality or duty-to-warn law, fees, and anything about the exam itself.
- ASAM level names and Dimension 5 wording (they changed between editions); drug scheduling;
  medication doses; buprenorphine prescribing rules.
- Facts already tested in data/aswb-masters-questions.json, data/aswb-clinical-questions.json,
  data/nce-questions.json and data/rbt-questions.json with the same answer (for example OARS,
  sustain talk, change talk, evocation, developing discrepancy, Tuckman stages, Yalom factors,
  Korsakoff syndrome, early remission, CAGE, the Part 2 rule on records in proceedings against a
  patient, Tarasoff, vicarious trauma). Keys were compared mechanically against those banks.
